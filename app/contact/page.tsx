import type { Metadata } from "next";
export const metadata: Metadata = { title: "Contact" };
export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh" }}>
      <header className="guide-header"><div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.5rem" }}>
        <a href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".9rem", color: "var(--text-1)", textDecoration: "none" }}>NASforBeginners</a>
        <a href="/#guides" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "var(--text-3)", textDecoration: "none" }}>Guides</a>
      </div></header>
      <main id="main" style={{ padding: "4rem 1.5rem 6rem" }}>
        <div className="wrap-prose">
          <h1 className="display" style={{ fontSize: "2.5rem", color: "var(--text-1)", marginBottom: ".75rem" }}>Contact</h1>
          <p className="serif" style={{ color: "var(--text-2)", marginBottom: "2.5rem", lineHeight: 1.75 }}>Corrections, guide requests, or anything else.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {[
              { id: "email", label: "Your email", type: "email", ph: "you@example.com" },
              { id: "subject", label: "Subject", type: "text", ph: "Guide request, correction, other" },
            ].map(f => (
              <div key={f.id}>
                <label htmlFor={f.id} className="sans" style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>{f.label}</label>
                <input type={f.type} id={f.id} placeholder={f.ph} className="sans" style={{ width: "100%", padding: ".65rem 1rem", background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: "var(--radius)", fontSize: ".9rem", color: "var(--text-1)", outline: "none", minHeight: 44 }} />
              </div>
            ))}
            <div>
              <label htmlFor="msg" className="sans" style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>Message</label>
              <textarea id="msg" rows={5} className="sans" style={{ width: "100%", padding: ".65rem 1rem", background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: "var(--radius)", fontSize: ".9rem", color: "var(--text-1)", outline: "none", resize: "vertical" }} />
            </div>
            <button type="submit" className="btn btn-primary sans" style={{ alignSelf: "flex-start" }}>Send message</button>
          </div>
        </div>
      </main>
    </div>
  );
}
