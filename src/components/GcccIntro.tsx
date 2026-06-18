import { useEffect, useState } from "react";
import "./GcccIntro.css";

const SESSION_KEY = "gccc_intro_seen";

interface GcccIntroProps {
  /** Optional key to force retriggering the clean React component lifecycle */
  key?: any;
  /** Force the animation to play even if it already played this session (for testing) */
  forceReplay?: boolean;
  /** Called once the intro has fully finished (fade-out completes) */
  onDone?: () => void;
}

export default function GcccIntro({
  forceReplay = false,
  onDone,
}: GcccIntroProps) {
  const [shouldPlay, setShouldPlay] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const seen = sessionStorage.getItem(SESSION_KEY);
      if (forceReplay || !seen) {
        setShouldPlay(true);
        sessionStorage.setItem(SESSION_KEY, "1");
      } else {
        onDone?.();
      }
    } catch {
      setShouldPlay(true);
    }
  }, [forceReplay]);

  useEffect(() => {
    if (!shouldPlay) return;
    // Matches the fade-out delay (4.7s) + duration (0.9s) in GcccIntro.css => 5.6s
    const t = setTimeout(() => {
      onDone?.();
    }, 5600);
    return () => clearTimeout(t);
  }, [shouldPlay, onDone]);

  if (!mounted || !shouldPlay) return null;

  return (
    <div
      className="gccc-intro"
      role="presentation"
      aria-hidden="true"
      id="gccc_intro_screen"
    >
      <div className="gccc-intro__lockup">
        <svg
          className="gccc-intro__mark"
          width="200"
          height="218"
          viewBox="0 0 220 232"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. Three nested concentric C-arcs (inner to outer), each delayed slightly after the previous */}
          <path
            className="s s--inner"
            style={{ animationDelay: ".24s" }}
            pathLength={1}
            d="M110 66 A32 32 0 0 0 110 130"
          />
          <path
            className="s s--inner"
            style={{ animationDelay: ".12s" }}
            pathLength={1}
            d="M110 53 A45 45 0 0 0 110 143"
          />
          <path
            className="s s--inner"
            style={{ animationDelay: "0s" }}
            pathLength={1}
            d="M110 40 A58 58 0 0 0 110 156"
          />

          {/* 2 & 3. Cross: vertical stem, then horizontal bar */}
          <path
            className="s s--inner"
            style={{ animationDelay: ".42s" }}
            pathLength={1}
            d="M110 26 L110 186"
          />
          <path
            className="s s--inner"
            style={{ animationDelay: ".58s" }}
            pathLength={1}
            d="M90 66 L140 66"
          />

          {/* 4. Open book: left page, right page, then baseline */}
          <path
            className="s s--inner s--book"
            style={{ animationDelay: ".74s" }}
            pathLength={1}
            d="M107 190 C88 186 68 185 59 188 L62 208 C77 205 93 205 107 209 Z"
          />
          <path
            className="s s--inner s--book"
            style={{ animationDelay: ".8s" }}
            pathLength={1}
            d="M113 190 C132 186 152 185 161 188 L158 208 C143 205 127 205 113 209 Z"
          />
          <path
            className="s s--inner s--book"
            style={{ animationDelay: ".94s" }}
            pathLength={1}
            d="M48 215 L172 215"
          />

          {/* 6. Outer G ring — open arc with a real gap, second-to-last stroke */}
          <path
            className="s s--gring"
            pathLength={1}
            d="M171 47 A80 80 0 1 0 189 109"
          />

          {/* 7. Inward horizontal arm — independent final stroke from centerline outward, drawn last */}
          <path className="s s--garm" pathLength={1} d="M189 109 L120 109" />

        </svg>

        {/* 8. Wordmark (甘城華人教會 / Gainesville Chinese Christian Church) fades in beneath the mark */}
        <div className="gccc-intro__name">
          <span className="gccc-intro__zh">甘城華人教會</span>
          <span className="gccc-intro__en">
            Gainesville Chinese Christian Church
          </span>
        </div>
      </div>
    </div>
  );
}
