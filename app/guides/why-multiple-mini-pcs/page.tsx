import type { Metadata } from "next";
import { PageHeader } from "@/app/_guide-nav";

export const metadata: Metadata = {
  title: "Why Multiple Mini PCs? | NASforBeginners",
  description: "This guide is being written. Subscribe to get notified when it's published.",
};

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-1)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <PageHeader section="Guide" />
      <main id="main" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div className="wrap-prose" style={{ maxWidth: "36rem" }}>
          <nav className="bc" style={{ marginBottom: "2rem" }}><a href="/">Home</a> / <a href="/#guides">Guides</a> / <span>Why Multiple Mini PCs?</span></nav>
          <p style={{ fontSize: ".62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--accent)", marginBottom: ".875rem" }}>Architecture</p>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 5vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-.025em", color: "var(--text-1)", marginBottom: "1rem" }}>Why Multiple Mini PCs?</h1>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontSize: ".75rem", color: "var(--text-4)" }}>6 min read</span>
          </div>
          <div style={{ background: "var(--bg-3)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "2rem", textAlign: "center" }}>
            <p style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-1)", marginBottom: ".6rem" }}>This guide is being written.</p>
            <p style={{ fontSize: ".875rem", color: "var(--text-2)", marginBottom: "1.5rem", lineHeight: 1.7 }}>Subscribe and you'll get one email when it drops. No other emails.</p>
            <a href="/#newsletter" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", fontWeight: 600, fontSize: ".875rem", background: "var(--accent)", color: "white", padding: ".65rem 1.25rem", borderRadius: "9999px", textDecoration: "none", minHeight: 44 }}>Get notified</a>
          </div>
          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-4)", marginBottom: ".45rem" }}>Read while you wait</p>
            <a href="/guides/proxmox-vs-unraid-vs-truenas" style={{ textDecoration: "none" }}>
              <p style={{ fontWeight: 700, fontSize: ".95rem", color: "var(--text-1)", marginBottom: ".2rem" }}>Proxmox vs Unraid vs TrueNAS</p>
              <p style={{ fontSize: ".82rem", color: "var(--text-3)" }}>Already published.</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
