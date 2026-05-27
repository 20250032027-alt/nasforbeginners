import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy policy for NASforBeginners.com." };
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
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: "2rem" }}>Privacy Policy</h1>
          <div className="prose">
            <p><strong>Last updated:</strong> May 2026</p>
            <h2>What we collect</h2>
            <p>If you subscribe to the newsletter, we store your email address. That is it. We do not run any tracking pixels or session recording software.</p>
            <p>This site may use Google Analytics to understand traffic patterns in aggregate. Google Analytics may set cookies. You can opt out via your browser settings or a browser extension.</p>
            <h2>Advertising</h2>
            <p>This site uses Google AdSense to display advertisements. Google AdSense may use cookies and web beacons to serve ads based on your interests. You can opt out of personalized advertising at <a href="https://adssettings.google.com" className="text-link" style={{ color: "var(--accent-2)", textDecoration: "underline" }}>adssettings.google.com</a>.</p>
            <h2>Email</h2>
            <p>If you subscribe to the newsletter, your email is used only to send guide notifications. We do not sell it, share it, or use it for anything else. You can unsubscribe at any time from any email.</p>
            <h2>Contact</h2>
            <p>Questions about this policy: use the <a href="/contact" className="text-link" style={{ color: "var(--accent-2)", textDecoration: "underline" }}>contact page</a>.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
