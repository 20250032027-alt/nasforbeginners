import type { Metadata } from "next";
import { PageHeader } from "@/app/_guide-nav";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-1)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <PageHeader />
      <main id="main" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div className="wrap-prose">
          <h1 style={{ fontWeight: 800, fontSize: "2.25rem", letterSpacing: "-.025em", color: "var(--text-1)", marginBottom: "2rem" }}>Privacy Policy</h1>
          <div className="prose">
            <p><strong>Last updated:</strong> May 2026</p>
            <h2>What we collect</h2>
            <p>If you subscribe to the newsletter, we store your email address. That's it. No tracking pixels, no session recording software.</p>
            <p>This site uses Google Analytics to understand traffic in aggregate. You can opt out via your browser settings or an extension like uBlock Origin.</p>
            <h2>Advertising</h2>
            <p>This site uses Google AdSense. AdSense may use cookies to serve ads based on your interests. You can opt out at <a href="https://adssettings.google.com">adssettings.google.com</a>.</p>
            <h2>Email</h2>
            <p>If you subscribe, your email is used only to send guide notifications. We don't sell it, share it, or use it for anything else. Unsubscribe any time from any email.</p>
            <h2>Contact</h2>
            <p>Questions: <a href="/contact">contact page</a>.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
