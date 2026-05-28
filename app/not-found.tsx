import type { Metadata } from "next";
export const metadata: Metadata = { title: "Page not found" };
export default function NotFound() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <p style={{ fontWeight: 800, fontSize: "5rem", color: "var(--bg-4)", lineHeight: 1, marginBottom: "1.25rem", letterSpacing: "-.04em" }}>404</p>
      <h1 style={{ fontWeight: 800, fontSize: "1.5rem", color: "var(--text-1)", marginBottom: ".65rem", letterSpacing: "-.02em" }}>Page not found</h1>
      <p style={{ color: "var(--text-3)", marginBottom: "2rem", maxWidth: "22rem", lineHeight: 1.65, fontSize: ".9rem" }}>This guide might not be published yet. Check back soon or subscribe to get notified.</p>
      <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", fontWeight: 600, fontSize: ".875rem", background: "var(--accent)", color: "white", padding: ".65rem 1.25rem", borderRadius: "9999px", textDecoration: "none", minHeight: 44 }}>Back to homepage</a>
        <a href="/#guides" style={{ display: "inline-flex", alignItems: "center", fontWeight: 600, fontSize: ".875rem", color: "var(--text-2)", border: "1px solid var(--border-2)", padding: ".65rem 1.25rem", borderRadius: "9999px", textDecoration: "none", minHeight: 44 }}>Browse guides</a>
      </div>
    </div>
  );
}
