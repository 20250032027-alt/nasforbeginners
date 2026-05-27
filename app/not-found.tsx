import type { Metadata } from "next";
export const metadata: Metadata = { title: "Page not found" };
export default function NotFound() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", fontFamily: "'Lora', Georgia, serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "5rem", color: "var(--border-dark)", lineHeight: 1, marginBottom: "1.5rem" }}>404</p>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--ink)", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>Page not found</h1>
      <p style={{ color: "var(--ink-3)", marginBottom: "2rem", maxWidth: "26rem", lineHeight: 1.65 }}>
        This page does not exist. The guide you are looking for might not be published yet.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.875rem", background: "var(--ink)", color: "white", padding: "0.65rem 1.25rem", borderRadius: "9999px", textDecoration: "none", minHeight: "44px" }}>
          Back to homepage
        </a>
        <a href="/#guides" style={{ display: "inline-flex", alignItems: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.875rem", background: "transparent", color: "var(--ink-2)", border: "1px solid var(--border-dark)", padding: "0.65rem 1.25rem", borderRadius: "9999px", textDecoration: "none", minHeight: "44px" }}>
          Browse all guides
        </a>
      </div>
    </div>
  );
}
