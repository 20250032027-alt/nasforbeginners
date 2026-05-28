import type { Metadata } from "next";
export const metadata: Metadata = { title: "Page not found" };
export default function NotFound() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <p className="display" style={{ fontFamily: "'Fraunces',serif", fontSize: "6rem", color: "var(--bg-4)", lineHeight: 1, marginBottom: "1.5rem" }}>404</p>
      <h1 className="display" style={{ fontFamily: "'Fraunces',serif", fontSize: "1.75rem", color: "var(--text-1)", marginBottom: ".75rem" }}>Page not found</h1>
      <p className="serif" style={{ fontFamily: "'Instrument Serif',serif", color: "var(--text-2)", marginBottom: "2rem", maxWidth: "24rem", lineHeight: 1.7 }}>This guide might not be published yet. Check back soon.</p>
      <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <a href="/" className="btn btn-primary sans" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".875rem", background: "var(--teal)", color: "#0d1210", padding: ".7rem 1.4rem", borderRadius: "9999px", textDecoration: "none", minHeight: 44, display: "inline-flex", alignItems: "center" }}>Back to homepage</a>
        <a href="/#guides" className="btn btn-ghost sans" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".875rem", color: "var(--text-2)", border: "1px solid var(--border-2)", padding: ".7rem 1.4rem", borderRadius: "9999px", textDecoration: "none", minHeight: 44, display: "inline-flex", alignItems: "center" }}>Browse guides</a>
      </div>
    </div>
  );
}
