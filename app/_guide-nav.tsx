"use client";
import { useState, useEffect } from "react";
import { Server, ArrowLeft, Menu, X } from "lucide-react";

export function PageHeader({ section, backHref = "/", backLabel = "Home" }: { section?: string; backHref?: string; backLabel?: string }) {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrolled(el.scrollTop > 20);
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: "var(--bg-3)", zIndex: 200 }}>
        <div style={{ height: "100%", background: "var(--accent)", width: `${progress}%`, transition: "width .1s linear" }} />
      </div>

      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(15,15,16,.95)" : "rgba(15,15,16,.7)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? "var(--border-2)" : "var(--border)"}`,
        padding: "0 1.5rem",
        transition: "background .3s, border-color .3s",
      }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", height: "3.25rem", gap: "1rem" }}>
          {/* Left: logo + back */}
          <div style={{ display: "flex", alignItems: "center", gap: ".875rem", flex: 1 }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: ".45rem", textDecoration: "none", flexShrink: 0 }}>
              <div style={{ width: 24, height: 24, background: "var(--accent)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Server size={13} color="white" />
              </div>
              <span style={{ fontWeight: 700, fontSize: ".82rem", color: "var(--text-1)", letterSpacing: "-.01em" }}>NASforBeginners</span>
            </a>
            {section && (
              <>
                <span style={{ color: "var(--text-4)", fontSize: ".8rem" }}>/</span>
                <span style={{ fontSize: ".8rem", color: "var(--text-3)", fontWeight: 500 }}>{section}</span>
              </>
            )}
          </div>

          {/* Right: nav links */}
          <nav style={{ display: "flex", gap: ".125rem", alignItems: "center" }}>
            <a href="/#guides" style={{ fontSize: ".78rem", color: "var(--text-3)", textDecoration: "none", padding: ".3rem .65rem", borderRadius: "var(--radius-sm)", transition: "color .2s, background .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >Guides</a>
            <a href="/#tools" style={{ fontSize: ".78rem", color: "var(--text-3)", textDecoration: "none", padding: ".3rem .65rem", borderRadius: "var(--radius-sm)", transition: "color .2s, background .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >Tools</a>
            <a href="/#newsletter" style={{ display: "inline-flex", alignItems: "center", fontWeight: 600, fontSize: ".75rem", background: "var(--accent)", color: "white", padding: ".3rem .8rem", borderRadius: "9999px", textDecoration: "none", marginLeft: ".25rem" }}>
              Subscribe
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
