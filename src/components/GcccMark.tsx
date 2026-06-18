interface GcccMarkProps {
  width?: number;
  height?: number;
  className?: string;
  strokeColor?: string;
}

export default function GcccMark({
  width = 60,
  height = 65,
  className = "",
  strokeColor = "#211E18",
}: GcccMarkProps) {
  return (
    <svg
      className={`gccc-mark ${className}`}
      width={width}
      height={height}
      viewBox="0 0 220 232"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GCCC Church Logo"
    >
      {/* Group styles to dynamically color and style strokes */}
      <g fill="none" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        {/* Three Nested concentric C-arcs */}
        <path d="M110 40 A58 58 0 0 0 110 156" strokeWidth="6" />
        <path d="M110 53 A45 45 0 0 0 110 143" strokeWidth="5" />
        <path d="M110 66 A32 32 0 0 0 110 130" strokeWidth="4" />

        {/* Cross Vertical Stem */}
        <path d="M110 26 L110 186" strokeWidth="6.5" />
        {/* Cross Horizontal Bar */}
        <path d="M90 66 L140 66" strokeWidth="5.5" />

        {/* Open book left page */}
        <path d="M107 190 C88 186 68 185 59 188 L62 208 C77 205 93 205 107 209 Z" strokeWidth="4.5" />
        {/* Open book right page */}
        <path d="M113 190 C132 186 152 185 161 188 L158 208 C143 205 127 205 113 209 Z" strokeWidth="4.5" />
        {/* Book baseline */}
        <path d="M48 215 L172 215" strokeWidth="5" />

        {/* Outer G ring — open arc with a real gap */}
        <path d="M171 47 A80 80 0 1 0 189 109" strokeWidth="6.5" />

        {/* Inward horizontal arm — independent final stroke drawn last */}
        <path d="M110 112 L168 112" strokeWidth="6.5" />
      </g>
    </svg>
  );
}
