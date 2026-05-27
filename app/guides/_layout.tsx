// Shared guide shell — used by stub pages
export function GuideShell({ children, title, category, time, slug }: {
  children: React.ReactNode;
  title: string;
  category: string;
  time: string;
  slug: string;
}) {
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
              <a href="/" style={{ color: "var(--ink-4)", textDecoration: "none" }}>Home</a>
              {" / "}
              <a href="/#guides" style={{ color: "var(--ink-4)", textDecoration: "none" }}>Guides</a>
              {" / "}
              <span style={{ color: "var(--ink-3)" }}>{title}</span>
            </p>
          </nav>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: "0.875rem" }}>
            {category}
          </p>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: "1rem" }}>
            {title}
          </h1>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "var(--ink-4)" }}>{time}</span>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
