import type { Metadata } from "next";
import { PageHeader } from "@/app/_guide-nav";

export const metadata: Metadata = {
  title: "Running a Website from Home | NASforBeginners",
  description: "Can you host a website from a home server? Yes, but there are real tradeoffs. Here's what actually works, what doesn't, and what to use instead.",
};

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-1)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <PageHeader section="Running a Website from Home" />
      <main id="main" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div className="wrap-prose">
          <nav className="bc" style={{ marginBottom: "2rem" }}><a href="/">Home</a> / <a href="/#guides">Guides</a> / <span>Running a Website from Home</span></nav>
          <p style={{ fontSize: ".62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--accent)", marginBottom: ".875rem" }}>Hosting</p>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 5vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-.025em", color: "var(--text-1)", marginBottom: ".75rem" }}>
            Running a Website from Home
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-2)", marginBottom: ".75rem", lineHeight: 1.7 }}>What works, what doesn't, and what to use instead.</p>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2.25rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontSize: ".75rem", color: "var(--text-4)" }}>10 min read</span>
            <span style={{ color: "var(--border-2)" }}>|</span>
            <span style={{ fontSize: ".75rem", color: "var(--text-4)" }}>Last updated May 2026</span>
          </div>

          <div className="callout" style={{ marginBottom: "2.25rem" }}>
            <strong>Short answer:</strong> You can host a personal site, portfolio, or low-traffic hobby project from home without much trouble. If you're expecting real traffic or care about uptime, use a cheap VPS alongside your home server — they're $4-6/month and do the job better.
          </div>

          <div className="prose">
            <h2>Why people want to do this</h2>
            <p>Two reasons come up constantly in r/homeserver. First, "I already have a server running — why not use it?" Second, "I want to learn how websites actually work." Both are good reasons. The second one is the better one.</p>
            <p>Hosting a website from home is a genuinely useful thing to know how to do. The tradeoffs are real, though, and worth understanding before you point your domain at your home IP.</p>

            <h2>The actual problems with hosting from home</h2>
            <p><strong>Your IP address changes.</strong> Most residential ISPs give you a dynamic IP — it can change at any point, and when it does, your site goes down until you update your DNS. Dynamic DNS (DDNS) services like DuckDNS or Cloudflare solve this, but it's one more thing to set up and maintain.</p>
            <p><strong>Your ISP might block port 80 and 443.</strong> A lot of residential contracts explicitly prohibit running servers, and some ISPs enforce this by blocking the ports that websites use. Check your contract. If yours blocks them, a Cloudflare Tunnel sidesteps the problem — your server connects out to Cloudflare, and Cloudflare handles the incoming traffic.</p>
            <p><strong>Your home internet goes down.</strong> When your router needs a restart, when there's a local outage, when your ISP has a bad day — your site goes down with it. For a personal project this is fine. For anything people depend on, it's a problem.</p>
            <p><strong>Your home server goes down too.</strong> Updates, power cuts, experiments gone wrong. A VPS in a data center has redundant power and is managed by people whose job is keeping it running. Your home server is managed by you, between other things you need to do.</p>

            <h2>What works well from home</h2>
            <p>Personal sites and portfolios work fine. If someone visits your blog at 3am and it's down for five minutes because your router glitched, that's not the end of the world.</p>
            <p>Internal tools work great. If the website is only for people on your home network or your Tailscale network, all the above problems disappear. You're not exposing anything to the internet, so ISP restrictions and dynamic IPs don't matter.</p>
            <p>Learning works best. Running Nginx or Caddy on a home server, pointing a domain at it, watching the logs — this teaches you more about how websites work than reading about it ever would. For that purpose specifically, do it from home.</p>

            <h2>The Cloudflare Tunnel approach</h2>
            <p>If you want to expose a website without opening ports or dealing with a dynamic IP, Cloudflare Tunnel is free and genuinely works. You install a small daemon on your server, it makes an outbound connection to Cloudflare, and Cloudflare proxies incoming traffic through that connection.</p>
            <p>Your home IP is never exposed. Port 80 and 443 never need to be open. It works even if your ISP blocks server ports. The downside: you're depending on Cloudflare, and Cloudflare's free tier has limits on what you can serve (no video streaming, for instance).</p>

            <h2>The VPS hybrid approach</h2>
            <p>This is what a lot of experienced home server people end up doing. A cheap VPS — Hetzner, BuyVM, and Vultr all have options around $4-6/month — handles the public-facing parts. The home server handles everything that doesn't need to be public: Immich, Jellyfin, Nextcloud, backups.</p>
            <p>The VPS gets a static IP, reliable uptime, and proper bandwidth. Your home server gets to run your personal stuff without being exposed to the internet. They're complementary, not competing.</p>

            <h2>What to actually run on it</h2>
            <p>If you decide to host a site from home, Caddy is the easiest web server to start with. It handles HTTPS certificates automatically through Let's Encrypt, the config file is readable, and it works well behind Cloudflare. Nginx is more powerful and more widely documented. Apache is mostly legacy at this point — fine, but there's no reason to start with it.</p>
            <p>For a simple static site, Caddy + a git repository you push to is fast to set up and requires almost no maintenance. For a dynamic site or an app, you'll want to run it in Docker alongside Caddy as a reverse proxy.</p>

            <h2>One more thing</h2>
            <p>Whatever you expose to the internet, keep it updated. Public-facing services get probed constantly by automated bots. A Caddy or Nginx server with nothing behind it is fine. An old WordPress install that hasn't been updated in eight months is a real security problem. If you're going to host something publicly from home, make a habit of keeping it current.</p>
          </div>

          <div style={{ marginTop: "3rem", padding: "1.35rem", background: "var(--bg-3)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-4)", marginBottom: ".5rem" }}>Related</p>
            <a href="/guides/expose-server-safely" style={{ textDecoration: "none" }}>
              <p style={{ fontWeight: 700, fontSize: ".975rem", color: "var(--text-1)", marginBottom: ".2rem" }}>Access Your Server from Anywhere</p>
              <p style={{ fontSize: ".85rem", color: "var(--text-3)" }}>Tailscale, VPNs, and Cloudflare Tunnel compared.</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
