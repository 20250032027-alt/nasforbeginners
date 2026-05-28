export function GuideNav({ title }: { title: string }) {
  return (
    <header className="guide-header">
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.5rem" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: ".55rem", textDecoration: "none" }}>
          <div style={{ width: 26, height: 26, background: "var(--teal)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0d1210" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          </div>
          <span className="sans" style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--text-1)", letterSpacing: "-.01em" }}>NASforBeginners</span>
        </a>
        <a href="/#guides" className="sans" style={{ fontSize: ".8rem", color: "var(--text-3)", textDecoration: "none", transition: "color .2s" }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "var(--text-1)")}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "var(--text-3)")}
        >All guides</a>
      </div>
    </header>
  );
}
