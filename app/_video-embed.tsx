"use client";
import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";

interface VideoEmbedProps {
  videoId: string;
  title: string;
  channel: string;
  note?: string;
}

export function VideoEmbed({ videoId, title, channel, note }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div style={{ margin: "2.25rem 0" }}>
      <p style={{
        fontSize: ".62rem", fontWeight: 600, textTransform: "uppercase",
        letterSpacing: ".14em", color: "var(--text-4)", marginBottom: ".75rem"
      }}>
        Watch alongside this guide
      </p>

      <div style={{
        background: "var(--bg-3)",
        border: "1px solid var(--border-2)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}>
        {/* Thumbnail / player */}
        <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000" }}>
          {loaded ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          ) : (
            <button
              onClick={() => setLoaded(true)}
              aria-label={`Play: ${title}`}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                background: "none", border: "none", cursor: "pointer", padding: 0,
              }}
            >
              {/* Thumbnail */}
              <img
                src={thumb}
                alt={title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              {/* Overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,.45)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background .2s",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,.3)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,.45)")}
              >
                <div style={{
                  width: "3.5rem", height: "3.5rem", borderRadius: "9999px",
                  background: "var(--accent)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 24px rgba(0,0,0,.4)",
                  transition: "transform .3s var(--spring)",
                }}>
                  <Play size={20} color="white" fill="white" style={{ marginLeft: "2px" }} />
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Meta row */}
        <div style={{
          padding: ".875rem 1.1rem",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
          borderTop: "1px solid var(--border)",
        }}>
          <div>
            <p style={{ fontWeight: 600, fontSize: ".85rem", color: "var(--text-1)", lineHeight: 1.35 }}>{title}</p>
            <p style={{ fontSize: ".75rem", color: "var(--text-3)", marginTop: ".2rem" }}>{channel}</p>
            {note && <p style={{ fontSize: ".72rem", color: "var(--text-4)", marginTop: ".3rem", lineHeight: 1.5 }}>{note}</p>}
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open on YouTube"
            style={{
              display: "flex", alignItems: "center", gap: ".35rem",
              fontSize: ".72rem", fontWeight: 600, color: "var(--text-3)",
              textDecoration: "none", flexShrink: 0,
              padding: ".35rem .65rem", borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-2)", transition: "all .2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-3)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; }}
          >
            YouTube <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
