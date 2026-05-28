import type { Metadata } from "next";
import { PageHeader } from "@/app/_guide-nav";
export const metadata: Metadata = { title: "Contact" };
export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-1)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <PageHeader />
      <main id="main" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div className="wrap-prose" style={{ maxWidth: "36rem" }}>
          <h1 style={{ fontWeight: 800, fontSize: "2.25rem", letterSpacing: "-.025em", color: "var(--text-1)", marginBottom: ".75rem" }}>Contact</h1>
          <p style={{ color: "var(--text-2)", marginBottom: "2.5rem", lineHeight: 1.7, fontSize: ".95rem" }}>Corrections, guide requests, or anything else.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[{ id: "email", label: "Your email", type: "email", ph: "you@example.com" }, { id: "subject", label: "Subject", type: "text", ph: "Guide request, correction, other" }].map(f => (
              <div key={f.id}>
                <label htmlFor={f.id} style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>{f.label}</label>
                <input type={f.type} id={f.id} placeholder={f.ph} style={{ width: "100%", padding: ".65rem 1rem", background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: "var(--radius)", fontSize: ".875rem", color: "var(--text-1)", outline: "none", minHeight: 44 }} />
              </div>
            ))}
            <div>
              <label htmlFor="msg" style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>Message</label>
              <textarea id="msg" rows={5} style={{ width: "100%", padding: ".65rem 1rem", background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: "var(--radius)", fontSize: ".875rem", color: "var(--text-1)", outline: "none", resize: "vertical" }} />
            </div>
            <button type="submit" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", fontWeight: 600, fontSize: ".875rem", background: "var(--accent)", color: "white", padding: ".65rem 1.35rem", borderRadius: "9999px", border: "none", cursor: "pointer", minHeight: 44 }}>Send message</button>
          </div>
        </div>
      </main>
    </div>
  );
}
