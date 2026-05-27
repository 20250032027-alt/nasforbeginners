import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Access Your Server from Anywhere | NASforBeginners",
  description: "This guide is being written. Subscribe to get notified when it drops.",
};

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", fontFamily: "'Lora', Georgia, serif" }}>
      <header style={{ borderBottom: "1px solid var(--border)", padding: "0 1.5rem", position: "sticky", top: 0, background: "rgba(247,245,240,0.92)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", height: "3.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <div style={{ width: "26px", height: "26px", background: "var(--ink)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "var(--ink)", letterSpacing: "-0.02em" }}>NASforBeginners</span>
          </a>
          <a href="/#guides" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "var(--ink-3)", textDecoration: "none" }}>All guides</a>
        </div>
      </header>
      <main id="main" style={{ padding: "3.5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "var(--ink-4)" }}>
              <a href="/" style={{ color: "var(--ink-4)", textDecoration: "none" }}>Home</a>{" / "}
              <a href="/#guides" style={{ color: "var(--ink-4)", textDecoration: "none" }}>Guides</a>{" / "}
              <span style={{ color: "var(--ink-3)" }}>How to Access Your Server from Anywhere</span>
            </p>
          </nav>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: "0.875rem" }}>Networking</p>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: "1rem" }}>
            How to Access Your Server from Anywhere
          </h1>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "var(--ink-4)" }}>9 min read</span>
          </div>

          <div style={{ background: "var(--bg-warm)", border: "1px solid var(--border)", borderRadius: "8px", padding: "2rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--ink)", marginBottom: "0.75rem" }}>
              This guide is being written.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-2)", marginBottom: "1.5rem", lineHeight: 1.65 }}>
              Subscribe on the homepage and you will get an email when it drops. No other emails.
            </p>
            <a href="/#newsletter" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.875rem", background: "var(--ink)", color: "white", padding: "0.65rem 1.25rem", borderRadius: "9999px", textDecoration: "none" }}>
              Get notified
            </a>
          </div>

          <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--bg-warm)", border: "1px solid var(--border)", borderRadius: "8px" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-3)", marginBottom: "0.5rem" }}>Read while you wait</p>
            <a href="/guides/docker-for-beginners" style={{ textDecoration: "none" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "var(--ink)", marginBottom: "0.3rem" }}>Docker Explained for Normal People</p>
              <p style={{ fontSize: "0.875rem", color: "var(--ink-3)" }}>Already published and ready to read.</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
