import type { Metadata } from "next";
export const metadata: Metadata = { title: "Contact", description: "Get in touch with NASforBeginners." };
export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", fontFamily: "'Lora', Georgia, serif" }}>
      <header style={{ borderBottom: "1px solid var(--border)", padding: "0 1.5rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", height: "3.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "var(--ink)", textDecoration: "none", letterSpacing: "-0.02em" }}>NASforBeginners</a>
          <a href="/#guides" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "var(--ink-3)", textDecoration: "none" }}>All guides</a>
        </div>
      </header>
      <main id="main" style={{ padding: "3.5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: "1rem" }}>Contact</h1>
          <p style={{ color: "var(--ink-2)", marginBottom: "2.5rem", lineHeight: 1.7 }}>Corrections, guide requests, or anything else.</p>
          <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { label: "Your email", type: "email", placeholder: "you@example.com", id: "email" },
              { label: "Subject", type: "text", placeholder: "Guide request, correction, other", id: "subject" },
            ].map(f => (
              <div key={f.id}>
                <label htmlFor={f.id} style={{ display: "block", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "var(--ink-2)", marginBottom: "0.4rem" }}>{f.label}</label>
                <input type={f.type} id={f.id} placeholder={f.placeholder} style={{ width: "100%", padding: "0.65rem 0.9rem", background: "var(--bg-card)", border: "1px solid var(--border-dark)", borderRadius: "6px", fontSize: "0.9rem", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--ink)", outline: "none" }} />
              </div>
            ))}
            <div>
              <label htmlFor="message" style={{ display: "block", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "var(--ink-2)", marginBottom: "0.4rem" }}>Message</label>
              <textarea id="message" rows={5} placeholder="What's on your mind?" style={{ width: "100%", padding: "0.65rem 0.9rem", background: "var(--bg-card)", border: "1px solid var(--border-dark)", borderRadius: "6px", fontSize: "0.9rem", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--ink)", outline: "none", resize: "vertical" }} />
            </div>
            <button type="submit" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.875rem", background: "var(--ink)", color: "white", padding: "0.75rem 1.5rem", borderRadius: "9999px", border: "none", cursor: "pointer", minHeight: "44px" }}>
              Send message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
