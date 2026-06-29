"use client";

/**
 * Minimal Lexical JSON → HTML renderer.
 *
 * Payload's Lexical editor stores content as a JSON tree. This component
 * walks the tree and converts nodes to JSX. Only the node types actually
 * used in this project are handled; unknown nodes are rendered as plain text.
 */

interface LexicalNode {
  type: string;
  version?: number;
  text?: string;
  format?: number; // bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code, 32=subscript, 64=superscript
  tag?: string;    // heading level: h1–h6
  url?: string;
  target?: string;
  children?: LexicalNode[];
  listType?: "bullet" | "number" | "check";
  value?: number; // list item value
  indent?: number;
}

interface LexicalRoot {
  root: LexicalNode;
}

interface RichTextProps {
  content?: unknown;
  className?: string;
}

function applyFormat(text: string, format: number): React.ReactNode {
  let node: React.ReactNode = text;
  if (format & 1) node = <strong>{node}</strong>;
  if (format & 2) node = <em>{node}</em>;
  if (format & 8) node = <u>{node}</u>;
  if (format & 4) node = <s>{node}</s>;
  if (format & 16) node = <code className="bg-black/8 px-1 py-0.5 rounded text-[0.9em] font-mono">{node}</code>;
  return node;
}

function renderNode(node: LexicalNode, idx: number): React.ReactNode {
  switch (node.type) {
    case "root":
      return (
        <span key={idx}>
          {node.children?.map((c, i) => renderNode(c, i))}
        </span>
      );

    case "paragraph":
      return (
        <p key={idx} className="mb-4 last:mb-0">
          {node.children?.map((c, i) => renderNode(c, i))}
        </p>
      );

    case "heading": {
      const Tag = (node.tag ?? "h2") as keyof JSX.IntrinsicElements;
      const sizeMap: Record<string, string> = {
        h1: "text-4xl font-bold mb-4",
        h2: "text-3xl font-bold mb-3",
        h3: "text-2xl font-semibold mb-3",
        h4: "text-xl font-semibold mb-2",
        h5: "text-lg font-semibold mb-2",
        h6: "text-base font-semibold mb-2",
      };
      return (
        <Tag key={idx} className={`font-serif ${sizeMap[node.tag ?? "h2"] ?? ""}`}>
          {node.children?.map((c, i) => renderNode(c, i))}
        </Tag>
      );
    }

    case "text":
      return (
        <span key={idx}>
          {applyFormat(node.text ?? "", node.format ?? 0)}
        </span>
      );

    case "linebreak":
      return <br key={idx} />;

    case "link":
      return (
        <a
          key={idx}
          href={node.url}
          target={node.target ?? "_self"}
          rel={node.target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-[#9A2B27] underline underline-offset-2 hover:text-[#7a2220] transition-colors"
        >
          {node.children?.map((c, i) => renderNode(c, i))}
        </a>
      );

    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      return (
        <Tag
          key={idx}
          className={`mb-4 pl-5 ${node.listType === "number" ? "list-decimal" : "list-disc"} space-y-1`}
        >
          {node.children?.map((c, i) => renderNode(c, i))}
        </Tag>
      );
    }

    case "listitem":
      return (
        <li key={idx} className="leading-relaxed">
          {node.children?.map((c, i) => renderNode(c, i))}
        </li>
      );

    case "quote":
      return (
        <blockquote
          key={idx}
          className="border-l-2 border-[#9A2B27] pl-5 py-1 my-4 italic text-[#6F685B]"
        >
          {node.children?.map((c, i) => renderNode(c, i))}
        </blockquote>
      );

    default:
      // Unknown node: render children if any, or nothing
      return (
        <span key={idx}>
          {node.children?.map((c, i) => renderNode(c, i))}
        </span>
      );
  }
}

export default function RichText({ content, className }: RichTextProps) {
  if (!content) return null;

  const tree = content as LexicalRoot;
  if (!tree?.root) return null;

  return (
    <div className={className}>
      {tree.root.children?.map((node, i) => renderNode(node, i))}
    </div>
  );
}
