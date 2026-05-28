"use client";
import { useState, useEffect } from "react";
import { Server } from "lucide-react";

export function PageHeader() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className="reading-progress">
        <div className="reading-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <header className="page-header">
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.25rem" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: ".5rem", textDecoration: "none" }}>
            <div style={{ width: 26, height: 26, background: "var(--accent)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Server size={13} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: ".875rem", color: "var(--text-1)", letterSpacing: "-.01em" }}>NASforBeginners</span>
          </a>
          <nav style={{ display: "flex", gap: ".25rem" }}>
            <a href="/#guides" style={{ fontSize: ".78rem", color: "var(--text-3)", textDecoration: "none", padding: ".35rem .7rem", borderRadius: "var(--radius-sm)", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
            >All guides</a>
            <a href="/#tools" style={{ fontSize: ".78rem", color: "var(--text-3)", textDecoration: "none", padding: ".35rem .7rem", borderRadius: "var(--radius-sm)", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
            >Tools</a>
          </nav>
        </div>
      </header>
    </>
  );
}
