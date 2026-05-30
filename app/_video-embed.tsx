"use client";
import { ExternalLink, Play } from "lucide-react";

interface VideoEmbedProps {
  videoId: string;
  title: string;
  channel: string;
  note?: string;
}

export function VideoEmbed({ videoId, title, channel, note }: VideoEmbedProps) {
  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const url   = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div style={{ margin: "2.25rem 0" }}>
      <p style={{
        fontSize: ".62rem", fontWeight: 600, textTransform: "uppercase",
        letterSpacing: ".14em", color: "var(--text-4)", marginBottom: ".75rem",
      }}>
        Watch alongside this guide
      </p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block" }}
      >
        <div style={{
          background: "var(--bg-3)",
          border: "1px solid var(--border-2)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          transition: "border-color .25s var(--spring), transform .3s var(--spring), box-shadow .3s var(--spring)",
        }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "var(--border-3)";
            el.style.transform = "translateY(-2px)";
            el.style.boxShadow = "0 8px 28px rgba(0,0,0,.35)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "var(--border-2)";
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "none";
          }}
        >
          {/* Thumbnail */}
          <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000", overflow: "hidden" }}>
            <img
              src={thumb}
              alt={title}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", display: "block",
              }}
              onError={e => {
                // fallback to mqdefault if hqdefault fails
                const img = e.target as HTMLImageElement;
                if (!img.src.includes("mqdefault")) {
                  img.src = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
                }
              }}
            />
            {/* Dark overlay + play button */}
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,.38)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: "3.25rem", height: "3.25rem",
                borderRadius: "9999px",
                background: "rgba(255,255,255,.92)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,.4)",
              }}>
                <Play size={18} color="#0f0f10" fill="#0f0f10" style={{ marginLeft: "2px" }} />
              </div>
            </div>

            {/* YouTube logo watermark bottom-right */}
            <div style={{
              position: "absolute", bottom: ".6rem", right: ".75rem",
              background: "rgba(0,0,0,.7)", borderRadius: "4px",
              padding: ".15rem .45rem",
              display: "flex", alignItems: "center", gap: ".3rem",
            }}>
              <svg height="10" viewBox="0 0 90 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.9 3.5c-.3-1.3-1.4-2.2-2.7-2.5C23 .5 14.5.5 14.5.5S6 .5 3.8 1c-1.3.3-2.4 1.2-2.7 2.5C.6 5.7.5 10 .5 10s.1 4.3.6 6.5c.3 1.3 1.4 2.2 2.7 2.5 2.2.5 10.7.5 10.7.5s8.5 0 10.7-.5c1.3-.3 2.4-1.2 2.7-2.5.5-2.2.6-6.5.6-6.5s-.1-4.3-.6-6.5z" fill="red"/>
                <path d="M11.5 14.5v-9l7 4.5-7 4.5z" fill="white"/>
                <text x="32" y="15" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">YouTube</text>
              </svg>
            </div>
          </div>

          {/* Meta row */}
          <div style={{
            padding: ".875rem 1.1rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "1rem", borderTop: "1px solid var(--border)",
          }}>
            <div style={{ minWidth: 0 }}>
              <p style={{
                fontWeight: 600, fontSize: ".85rem", color: "var(--text-1)",
                lineHeight: 1.35, marginBottom: ".2rem",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{title}</p>
              <p style={{ fontSize: ".73rem", color: "var(--text-3)" }}>{channel}</p>
              {note && <p style={{ fontSize: ".72rem", color: "var(--text-4)", marginTop: ".3rem", lineHeight: 1.55 }}>{note}</p>}
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: ".3rem",
              fontSize: ".72rem", fontWeight: 600, color: "var(--accent)",
              flexShrink: 0, whiteSpace: "nowrap",
            }}>
              Watch <ExternalLink size={11} />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
