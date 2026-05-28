import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh" }}>
      <header className="guide-header"><div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.5rem" }}>
        <a href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".9rem", color: "var(--text-1)", textDecoration: "none" }}>NASforBeginners</a>
        <a href="/#guides" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "var(--text-3)", textDecoration: "none" }}>Guides</a>
      </div></header>
      <main id="main" style={{ padding: "4rem 1.5rem 6rem" }}>
        <div className="wrap-prose">
          <h1 className="display" style={{ fontSize: "2.5rem", color: "var(--text-1)", marginBottom: "2rem" }}>Privacy Policy</h1>
          <div className="prose">
            <p><strong>Last updated:</strong> May 2026</p>
            <h2>What we collect</h2>
            <p>If you subscribe to the newsletter, we store your email address. That is it. No tracking pixels, no session recording.</p>
            <p>This site uses Google Analytics to understand traffic in aggregate. You can opt out via your browser settings or a browser extension like uBlock Origin.</p>
            <h2>Advertising</h2>
            <p>This site uses Google AdSense to display advertisements. Google AdSense may use cookies to serve ads based on your interests. You can opt out at <a href="https://adssettings.google.com" className="tlink">adssettings.google.com</a>.</p>
            <h2>Email</h2>
            <p>If you subscribe, your email is used only to send guide notifications. We don't sell it, share it, or use it for anything else. Unsubscribe any time from any email.</p>
            <h2>Contact</h2>
            <p>Questions: <a href="/contact" className="tlink">contact page</a>.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
