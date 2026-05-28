import type { Metadata } from "next";
export const metadata: Metadata = { title: "Coming soon | NASforBeginners" };
export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh" }}>
      <header className="guide-header"><div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.5rem" }}>
        <a href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".9rem", color: "var(--text-1)", textDecoration: "none" }}>NASforBeginners</a>
        <a href="/#guides" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "var(--text-3)", textDecoration: "none" }}>All guides</a>
      </div></header>
      <main id="main" style={{ padding: "4rem 1.5rem 6rem" }}>
        <div className="wrap-prose" style={{ maxWidth: "36rem" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--teal)", marginBottom: ".875rem" }}>Coming soon</p>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 900, color: "var(--text-1)", marginBottom: "1rem", lineHeight: 1.15 }}>This guide is being written.</h1>
          <p style={{ fontFamily: "'Instrument Serif',serif", color: "var(--text-2)", marginBottom: "2rem", lineHeight: 1.75 }}>Subscribe and you'll get an email the day it drops. No other emails.</p>
          <a href="/#newsletter" style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".875rem", background: "var(--teal)", color: "#0d1210", padding: ".7rem 1.4rem", borderRadius: "9999px", textDecoration: "none", minHeight: 44 }}>Get notified</a>
        </div>
      </main>
    </div>
  );
}
