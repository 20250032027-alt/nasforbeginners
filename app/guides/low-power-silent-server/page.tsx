import type { Metadata } from "next";
import { PageHeader } from "@/app/_guide-nav";
import { VideoEmbed } from "@/app/_video-embed";

export const metadata: Metadata = {
  title: "Building a Silent, Low-Power Server | NASforBeginners",
  description: "What actually matters for a quiet, efficient home server. Fan choices, CPU selection, drive configuration, and the mistakes most beginners make.",
};

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-1)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <PageHeader section="Silent Low-Power Server" />
      <main id="main" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div className="wrap-prose">
          <nav className="bc" style={{ marginBottom: "2rem" }}><a href="/">Home</a> / <a href="/#guides">Guides</a> / <span>Silent Low-Power Server</span></nav>
          <p style={{ fontSize: ".62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--accent)", marginBottom: ".875rem" }}>Hardware</p>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 5vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-.025em", color: "var(--text-1)", marginBottom: ".75rem" }}>
            Building a Silent, Low-Power Server
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-2)", marginBottom: ".75rem", lineHeight: 1.7 }}>What actually matters, and what doesn't.</p>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2.25rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontSize: ".75rem", color: "var(--text-4)" }}>8 min read</span>
            <span style={{ color: "var(--border-2)" }}>|</span>
            <span style={{ fontSize: ".75rem", color: "var(--text-4)" }}>Last updated May 2026</span>
          </div>

          <div className="callout" style={{ marginBottom: "2.25rem" }}>
            <strong>The short version:</strong> Start with a mini PC or a T-series Intel CPU. Both idle under 15W and run quietly without any effort. Building a quiet server out of a power-hungry machine is much harder and usually not worth it.
          </div>

          <div className="prose">
            <h2>Why people care about this</h2>
            <p>A home server that runs 24/7 is with you constantly. If it's loud, you will hear it. If it uses 80W at idle, you'll pay for that all year. One r/homeserver post titled "First Home Server! Lessons learned from trying to go for low power and silence" got 382 upvotes — this matters to people, and the lessons learned are worth sharing.</p>

            <h2>Start with the right hardware</h2>
            <p>The single best thing you can do for noise and power is pick hardware that's efficient to begin with. You cannot make a Core i9 desktop quiet without significant effort and money. You can make an N100 mini PC essentially silent with no effort at all.</p>
            <p>The Intel N100 idles at around 6W and never needs to spin its fan fast under typical home server workloads. It handles Jellyfin transcoding, Immich, Pi-hole, and a dozen other containers without breaking a sweat. For most people, this is the answer.</p>
            <p>If you need more CPU than an N100 offers, look at Intel T-series desktop CPUs: i5-12600T, i5-13500T. These are desktop chips with a 35W TDP instead of the usual 65W. They're noticeably cheaper to run and noticeably cooler under load.</p>
            <p>Laptop chips (U and P series) are another option if you're building into a small form factor. They're designed to operate in a thin chassis with limited cooling, so they run well at low fan speeds.</p>

            <h2>Fans: size matters more than brand</h2>
            <p>Larger fans move the same amount of air at lower RPM. Lower RPM means lower noise. This is the single most impactful thing you can change on a system you already have.</p>
            <p>A 120mm fan at 600 RPM is nearly inaudible. An 80mm fan at 1200 RPM to move the same air is clearly audible from across the room. A 40mm fan at 3000 RPM — common in server equipment — sounds like a hair dryer.</p>
            <p>If you're buying a case, get one that fits 120mm or 140mm fans. If you're stuck with 80mm mounts, a quality Noctua at low voltage runs much better than a generic fan at full speed. Noctua fans are expensive and dull-looking, but they're worth it for this purpose.</p>
            <p>Stock CPU coolers are cheap, not quiet. An aftermarket cooler with a larger heatsink and a slow fan makes a real difference on any system that's not a mini PC. A $25-30 budget gets you something much better than stock.</p>

            <h2>Hard drives are a noise source people forget about</h2>
            <p>HDDs click, seek, and hum. Each one adds to the noise floor. If you're putting drives in the same machine as everything else, this matters — especially at night when everything else is quiet.</p>
            <p>A few options: SSDs are completely silent. If you can use an SSD for your OS and a separate NAS machine for bulk storage, you get the best of both. If you need HDDs in your main machine, look at NAS-rated drives (WD Red, Seagate IronWolf) with vibration dampening mounts — they're meaningfully quieter than desktop drives at seek.</p>
            <p>Spin-down is an option in some configurations, but it has a cost: every time the drive spins back up, you wait a few seconds, and the spin-up itself is audible. For drives you access constantly, spin-down just adds latency. For cold storage that you read rarely, it's fine.</p>

            <h2>Where you put the server matters a lot</h2>
            <p>A server that's audible but in a closet with the door closed is effectively silent from everywhere you spend time. A server that's inaudible on its own but sits next to your desk is still present. Location is underrated.</p>
            <p>Closets work well if they have some airflow — hot air needs somewhere to go. Basements and utility rooms are excellent and usually close enough to run a cable to your router. Under-desk placement works for mini PCs but not for tower systems with fans.</p>
            <p>If the server has to be in your bedroom or office, a mini PC with passive or near-passive cooling is the only real option. Anything else will bother you.</p>

            <h2>What doesn't matter as much as people think</h2>
            <p>Cable management doesn't affect noise. Sound-dampening foam panels in cases help slightly at high frequencies but do almost nothing against low-frequency fan rumble — which is the noise that actually carries through walls and floors. Anti-vibration feet help a bit with HDDs. The GPU cooler is irrelevant if you're not running a GPU.</p>
            <p>The biggest wins are hardware selection, fan size, and location — in that order. Everything else is marginal.</p>

            <h2>Checking actual numbers</h2>
            <p>A Kill-A-Watt meter (around $20) is one of the most useful purchases for home server building. Plug your server into it and see what it actually draws at idle, under load, and during drive spin-up. Guessing from TDP specs is inaccurate — real world idle power is often 40-60% of TDP for modern hardware, and sometimes lower.</p>
            <p>The Power Calculator tool on this site gives estimates based on typical real-world measurements if you want a starting point before buying hardware.</p>
          </div>

          
          <VideoEmbed
            videoId="ZE0bDgzjtKg"
            title="Homelab Beginner's Guide — Start With What You Already Have"
            channel="MackeyTech"
            note="Published November 2025. Covers how to make the most of existing hardware, including noise and power considerations."
          />
          <div style={{ marginTop: "3rem", padding: "1.35rem", background: "var(--bg-3)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-4)", marginBottom: ".5rem" }}>Related</p>
            <a href="/tools/power-calculator" style={{ textDecoration: "none" }}>
              <p style={{ fontWeight: 700, fontSize: ".975rem", color: "var(--text-1)", marginBottom: ".2rem" }}>Power Calculator</p>
              <p style={{ fontSize: ".85rem", color: "var(--text-3)" }}>Estimate your monthly electricity cost before you commit to hardware.</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
