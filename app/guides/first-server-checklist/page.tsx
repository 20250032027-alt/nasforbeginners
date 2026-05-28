import type { Metadata } from "next";
import { PageHeader } from "@/app/_guide-nav";

export const metadata: Metadata = {
  title: "Your First Server: Step by Step",
  description: "What to actually do first, second, and third when setting up a home server. Hardware, OS, Docker, remote access — in order.",
};

const steps = [
  { n: "01", title: "Pick your hardware", body: "For most beginners, a used mini PC with an Intel N100 is the right answer. It idles at 6W, handles Jellyfin transcoding, and costs around $150. If you already have a spare PC or laptop, start with that instead.", tips: ["Beelink EQ12 or TRIGKEY S5 are the common picks at $150-180 new", "Add a USB hard drive if you need storage and don't want to open the case", "16GB RAM is enough to start. You can add more later.", "Check the used hardware guide for eBay and e-waste options under $100"], next: null },
  { n: "02", title: "Choose your OS", body: "New to Linux: use Unraid ($69 license). Comfortable with command line: use Debian 12 with Docker Compose. Not sure which: use Unraid. You can always reinstall later.", tips: ["Unraid: download from unraid.net, write to USB drive, boot from it", "Debian: download the netinstall ISO, use Rufus on Windows to flash to USB"], next: null },
  { n: "03", title: "Set a static IP before anything else", body: "Your server needs a fixed IP address on your network so it doesn't change and break your app URLs. Set this in your router's DHCP settings, not on the server itself.", tips: ["Look for 'DHCP reservations' or 'static DHCP' in your router admin page", "Reserve the IP by MAC address — your router admin page shows connected devices", "Test SSH access after: ssh username@192.168.x.x from another machine"], next: null },
  { n: "04", title: "Run your first container", body: "Start with something low-stakes before you put anything important on the server. Pi-hole (network ad blocking) or Vaultwarden (password manager) are good first containers. Simple, useful, low risk.", tips: ["Pi-hole blocks ads for every device on your network at the DNS level", "Vaultwarden is compatible with all Bitwarden apps and uses almost no RAM", "Both teach you the basics of volumes, ports, and compose files"], next: "docker-for-beginners" },
  { n: "05", title: "Set up your main use case", body: "Now that you know how Docker works, tackle why you started. Photo backup or media streaming are the most common reasons people start a server.", tips: ["Photo backup: see the Immich setup guide", "Media streaming: see the Jellyfin vs Plex guide to decide which to install"], next: null },
  { n: "06", title: "Set up remote access", body: "You'll want to reach your server from outside your home network eventually. Tailscale is the easiest option by a wide margin: install it on your server and your phone, and they connect as if they were on the same network.", tips: ["Tailscale is free for personal use up to 3 users and 100 devices", "It handles the networking so you don't have to open ports on your router", "See the remote access guide for alternatives like Cloudflare Tunnel"], next: "expose-server-safely" },
  { n: "07", title: "Set up backups", body: "RAID is not a backup. Before you trust the server with anything important, set up an actual backup. The 3-2-1 rule: three copies of data, on two different media types, with one copy offsite.", tips: ["Minimum: an external drive with automatic backups of your important data", "Immich has built-in external backup support", "Rclone can sync to cloud storage for the offsite copy — it's free and runs on everything"], next: "raid-vs-backup" },
];

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-1)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <PageHeader />
      <main id="main" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div className="wrap-prose">
          <nav className="bc" style={{ marginBottom: "2rem" }}><a href="/">Home</a> / <a href="/#guides">Guides</a> / <span>First Server Checklist</span></nav>

          <p style={{ fontSize: ".62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--accent)", marginBottom: ".875rem" }}>Getting Started</p>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 5vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-.025em", color: "var(--text-1)", marginBottom: ".75rem" }}>Your First Server: Step by Step</h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-2)", marginBottom: ".75rem", lineHeight: 1.7 }}>What to actually do, in what order.</p>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontSize: ".75rem", color: "var(--text-4)" }}>5 min read</span>
            <span style={{ color: "var(--border-2)" }}>|</span>
            <span style={{ fontSize: ".75rem", color: "var(--text-4)" }}>Last updated May 2026</span>
          </div>

          <p style={{ fontSize: ".95rem", color: "var(--text-2)", lineHeight: 1.8, marginBottom: "3rem" }}>
            Most guides explain what things are. This one tells you what to do first, second, and third. Skip to whatever step you're on. Each one links to a deeper guide if you need it.
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "1.5rem", paddingBottom: "2.5rem", position: "relative" }}>
                {i < steps.length - 1 && <div style={{ position: "absolute", left: "1.05rem", top: "2.5rem", bottom: 0, width: 1, background: "var(--border)" }} />}
                <div style={{ flexShrink: 0, width: "2.1rem", height: "2.1rem", background: "var(--accent)", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                  <span style={{ fontWeight: 800, fontSize: ".65rem", color: "white" }}>{step.n}</span>
                </div>
                <div style={{ flex: 1, paddingTop: ".25rem" }}>
                  <h2 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-1)", marginBottom: ".5rem", lineHeight: 1.35 }}>{step.title}</h2>
                  <p style={{ fontSize: ".9rem", color: "var(--text-2)", lineHeight: 1.75, marginBottom: ".75rem" }}>{step.body}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".35rem", marginBottom: step.next ? ".875rem" : 0 }}>
                    {step.tips.map((tip, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: ".5rem", fontSize: ".85rem", color: "var(--text-3)" }}>
                        <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: ".1rem" }}>+</span>{tip}
                      </li>
                    ))}
                  </ul>
                  {step.next && (
                    <a href={`/guides/${step.next}`} style={{ display: "inline-flex", alignItems: "center", gap: ".3rem", fontSize: ".8rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none", marginTop: ".25rem" }}>
                      Read the full guide →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1rem", padding: "1.35rem", background: "var(--bg-3)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-4)", marginBottom: ".5rem" }}>Not sure what hardware to pick?</p>
            <a href="/tools/build-recommender" style={{ textDecoration: "none" }}>
              <p style={{ fontWeight: 700, fontSize: ".975rem", color: "var(--text-1)", marginBottom: ".2rem" }}>Use the Build Recommender</p>
              <p style={{ fontSize: ".85rem", color: "var(--text-3)" }}>Enter your budget and use case. Get a specific hardware recommendation.</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
