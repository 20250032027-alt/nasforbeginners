"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, Menu, X, Server, HardDrive, Cpu, Shield, Zap, Camera, MonitorPlay, Search, Check } from "lucide-react";

// ── REVEAL HOOK ───────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── DATA ──────────────────────────────────────────────────────────────────────

const guides = [
  {
    slug: "proxmox-vs-unraid-vs-truenas",
    category: "Operating Systems",
    title: "Proxmox vs Unraid vs TrueNAS",
    subtitle: "Which one should a beginner actually pick?",
    desc: "Three operating systems, three completely different approaches. Proxmox is a hypervisor. Unraid is a NAS OS with Docker bolted on. TrueNAS is built around keeping your data intact. The right answer depends on what you want to do, not which one sounds most impressive.",
    time: "8 min read",
    icon: <Server size={20} />,
    color: "#2d6bc8",
    bg: "#eff6ff",
  },
  {
    slug: "jellyfin-vs-plex",
    category: "Media Streaming",
    title: "Jellyfin vs Plex",
    subtitle: "Free and open source, or polished with a price?",
    desc: "Plex looks better and works on more devices out of the box. Jellyfin costs nothing and gives you full control. The choice mostly comes down to who else uses your server and how much you care about remote streaming quality.",
    time: "6 min read",
    icon: <MonitorPlay size={20} />,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    slug: "n100-mini-pc-guide",
    category: "Hardware",
    title: "The N100 Mini PC Buyer Guide",
    subtitle: "The cheapest capable server most beginners should buy",
    desc: "The Intel N100 idles at 6 watts. It handles 4K direct play and 1080p transcoding. It fits behind your TV. For most people starting out, it is the answer before they even finish asking the question.",
    time: "7 min read",
    icon: <Cpu size={20} />,
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    slug: "expose-server-safely",
    category: "Networking",
    title: "How to Access Your Server from Anywhere",
    subtitle: "Without opening your home network to the internet",
    desc: "Every beginner post eventually asks this. VPN, Tailscale, and Cloudflare Tunnel are three different answers to the same problem. One of them is almost certainly right for your situation.",
    time: "9 min read",
    icon: <Shield size={20} />,
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    slug: "raid-vs-backup",
    category: "Storage",
    title: "RAID vs Backup: What You Actually Need",
    subtitle: "RAID is not a backup. This mistake costs people their data.",
    desc: "RAID protects you from a drive dying. Backup protects you from deleting the wrong file, a virus, a house fire, or RAID itself failing. You probably need both, but only one is strictly required to not lose everything.",
    time: "6 min read",
    icon: <HardDrive size={20} />,
    color: "#dc2626",
    bg: "#fef2f2",
  },
  {
    slug: "immich-setup-guide",
    category: "Photo Backup",
    title: "Replace Google Photos with Immich",
    subtitle: "The #1 reason people set up a home server right now",
    desc: "Immich is the Google Photos replacement that finally works. Face recognition, mobile app, automatic backup, shared albums. This guide gets you from zero to running in about an hour.",
    time: "10 min read",
    icon: <Camera size={20} />,
    color: "#c85c2d",
    bg: "#fdf0eb",
  },
  {
    slug: "docker-for-beginners",
    category: "Docker",
    title: "Docker Explained for Normal People",
    subtitle: "Every home server guide assumes you already know this",
    desc: "Docker lets you run apps in isolated boxes so they don't interfere with each other and you can start, stop, or delete them without touching anything else on your system. Once it clicks, you will wonder how you ran apps any other way.",
    time: "8 min read",
    icon: <Server size={20} />,
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    slug: "first-server-checklist",
    category: "Getting Started",
    title: "Your First Server: A Practical Checklist",
    subtitle: "What to actually do, in what order",
    desc: "Most guides explain what everything is. This one tells you what to do first, second, and third. Hardware, OS install, first Docker container, remote access. In order.",
    time: "5 min read",
    icon: <Check size={20} />,
    color: "#6b7280",
    bg: "#f9fafb",
  },
];

const whyItems = [
  {
    q: "You're paying for things you could run yourself.",
    a: "Google Photos charges once your storage fills up. Netflix, Spotify, iCloud. A home server can replace most of them for the cost of a used mini PC.",
  },
  {
    q: "Your data is on someone else's computer.",
    a: "Photos, documents, family videos. Cloud services get hacked, shut down, or change their terms. A server you own is a server you control.",
  },
  {
    q: "The guides that exist are written for sysadmins.",
    a: "The official Proxmox documentation is not for someone who just bought a used mini PC off eBay. This site is.",
  },
];

const faqItems = [
  {
    q: "How much does it cost to get started?",
    a: "A used mini PC with an Intel N100 runs around $150. Add a hard drive for storage and you're under $250 total. Running costs are around $3-5 a month in electricity.",
  },
  {
    q: "Do I need to know Linux?",
    a: "Not much. Unraid has a web interface that hides most of the Linux layer. If you can use a router admin page, you can use Unraid. More advanced setups need a bit more, but nothing a few hours of reading won't cover.",
  },
  {
    q: "Is this actually reliable? I don't want to lose my files.",
    a: "As reliable as you make it. With a proper backup strategy (which this site covers), a home server can be significantly more reliable than a single cloud service.",
  },
  {
    q: "What can a home server actually do?",
    a: "Replace Google Photos (Immich), stream your own movies (Jellyfin), sync files across devices (Syncthing), run a password manager (Vaultwarden), block ads network-wide (Pi-hole), and dozens of other things.",
  },
  {
    q: "What if something breaks?",
    a: "Things will break. That's part of it. The community around home servers is genuinely helpful, and the guides here include troubleshooting sections for the common failure points.",
  },
];

// ── NAV ───────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Guides", href: "#guides" },
    { label: "Tools", href: "#tools" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="site-nav">
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.5rem" }}>
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <div style={{ width: "28px", height: "28px", background: "var(--ink)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Server size={14} color="white" />
            </div>
            <span className="font-display" style={{ fontSize: "1rem", color: "var(--ink)", letterSpacing: "-0.02em" }}>
              NASforBeginners
            </span>
          </a>

          {/* Desktop links */}
          <nav className="desktop-only" aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {links.map(l => (
              <a key={l.label} href={l.href} className="btn btn-ghost font-sans" style={{ fontSize: "0.85rem" }}>
                {l.label}
              </a>
            ))}
            <a href="#newsletter" className="btn btn-fill font-sans" style={{ marginLeft: "0.5rem", fontSize: "0.85rem" }}>
              Get Updates
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="mobile-only btn btn-ghost"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{ padding: "0.5rem" }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mobile-only" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
          <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="font-sans"
                style={{ padding: "0.75rem 0", color: "var(--ink-2)", textDecoration: "none", fontSize: "1rem", borderBottom: "1px solid var(--border)" }}
              >{l.label}</a>
            ))}
            <a href="#newsletter" className="btn btn-fill font-sans" style={{ marginTop: "0.75rem", justifyContent: "center" }}>
              Get Updates
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{ padding: "5rem 1.5rem 4rem", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        <div style={{ maxWidth: "52rem" }}>
          <p className="label label-accent animate-fade-up stagger-1 font-sans" style={{ marginBottom: "1.25rem" }}>
            Home server guides for actual beginners
          </p>

          <h1 className="font-display animate-fade-up stagger-2" style={{
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            marginBottom: "1.5rem",
          }}>
            Stop paying for things<br />
            <span style={{ color: "var(--accent)" }}>you can run yourself.</span>
          </h1>

          <p className="animate-fade-up stagger-3" style={{
            fontSize: "1.15rem",
            color: "var(--ink-2)",
            lineHeight: 1.75,
            maxWidth: "36rem",
            marginBottom: "2rem",
            fontFamily: "'Lora', serif",
          }}>
            Google Photos, Netflix, iCloud, Spotify. A home server can replace most of them.
            This site covers how to build one, what software to run, and what to actually do first.
          </p>

          <div className="animate-fade-up stagger-4" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href="#guides" className="btn btn-fill font-sans">
              Start here
              <ArrowRight size={16} />
            </a>
            <a href="/guides/first-server-checklist" className="btn btn-outline font-sans">
              First server checklist
            </a>
          </div>

          {/* Social proof — understated */}
          <p className="animate-fade-up stagger-5 font-sans" style={{ marginTop: "2rem", fontSize: "0.8rem", color: "var(--ink-4)" }}>
            Guides written from 999 real beginner posts in r/homeserver.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── WHY ───────────────────────────────────────────────────────────────────────

function Why() {
  const { ref, visible } = useReveal();
  return (
    <section style={{ padding: "4rem 1.5rem", borderBottom: "1px solid var(--border)", background: "var(--bg-warm)" }}>
      <div className="container">
        <div ref={ref} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "2rem",
        }}>
          {whyItems.map((item, i) => (
            <div key={i} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.08}s`,
            }}>
              <p className="font-sans" style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--ink)", marginBottom: "0.5rem", lineHeight: 1.4 }}>
                {item.q}
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-3)", lineHeight: 1.65 }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── GUIDES ────────────────────────────────────────────────────────────────────

function GuideCard({ g, i }: { g: typeof guides[0]; i: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${(i % 4) * 0.06}s`,
    }}>
      <a href={`/guides/${g.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <article className="card" style={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {/* Category + time */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="label font-sans" style={{ color: g.color }}>{g.category}</span>
            <span className="font-sans" style={{ fontSize: "0.72rem", color: "var(--ink-4)" }}>{g.time}</span>
          </div>

          {/* Icon */}
          <div style={{ width: "2.5rem", height: "2.5rem", background: g.bg, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: g.color }}>
            {g.icon}
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <h2 className="font-display" style={{ fontSize: "1.05rem", lineHeight: 1.3, color: "var(--ink)", marginBottom: "0.35rem", letterSpacing: "-0.01em" }}>
              {g.title}
            </h2>
            <p className="font-sans" style={{ fontSize: "0.8rem", color: "var(--ink-3)", marginBottom: "0.75rem", fontWeight: 500 }}>
              {g.subtitle}
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--ink-2)", lineHeight: 1.65, fontFamily: "Lora, serif" }}>
              {g.desc}
            </p>
          </div>

          {/* CTA */}
          <div className="font-sans" style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.82rem", fontWeight: 600, color: g.color, marginTop: "auto", paddingTop: "0.5rem" }}>
            Read guide <ChevronRight size={14} />
          </div>
        </article>
      </a>
    </div>
  );
}

function Guides() {
  const { ref, visible } = useReveal();
  return (
    <section id="guides" className="section" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        <div ref={ref} style={{
          marginBottom: "2.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}>
          <p className="label font-sans" style={{ marginBottom: "0.6rem" }}>The Guides</p>
          <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.2 }}>
            What everyone asks, actually answered
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "1rem",
        }}>
          {guides.map((g, i) => <GuideCard key={g.slug} g={g} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ── TOOLS ─────────────────────────────────────────────────────────────────────

function Tools() {
  const { ref, visible } = useReveal();
  return (
    <section id="tools" style={{ padding: "5rem 1.5rem", borderBottom: "1px solid var(--border)", background: "var(--bg-warm)" }}>
      <div className="container">
        <div ref={ref} style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          marginBottom: "2.5rem",
        }}>
          <p className="label font-sans" style={{ marginBottom: "0.6rem" }}>Free Tools</p>
          <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.2, maxWidth: "30rem" }}>
            Two questions no guide quite answers
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "1rem" }}>
          {/* Build recommender */}
          <a href="/tools/build-recommender" style={{ textDecoration: "none" }}>
            <div className="card" style={{ padding: "2rem", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <div style={{ width: "3rem", height: "3rem", background: "#eff6ff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Cpu size={22} color="#2d6bc8" />
                </div>
                <ArrowUpRight size={18} color="var(--ink-4)" />
              </div>
              <p className="label font-sans" style={{ color: "#2d6bc8", marginBottom: "0.5rem" }}>Build Recommender</p>
              <h3 className="font-display" style={{ fontSize: "1.2rem", letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "0.75rem" }}>
                What should I build and run?
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-2)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                The most common question in the sub by a wide margin. Enter your budget, what you want to run,
                and your comfort with Linux. Get a specific hardware recommendation and a prioritized app list.
              </p>
              <div className="font-sans" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {["Budget", "Use case", "Linux comfort"].map(t => (
                  <span key={t} style={{ fontSize: "0.72rem", fontWeight: 600, background: "#eff6ff", color: "#2d6bc8", padding: "0.2rem 0.6rem", borderRadius: "9999px" }}>{t}</span>
                ))}
              </div>
            </div>
          </a>

          {/* Power calc */}
          <a href="/tools/power-calculator" style={{ textDecoration: "none" }}>
            <div className="card" style={{ padding: "2rem", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <div style={{ width: "3rem", height: "3rem", background: "#fdf0eb", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={22} color="#c85c2d" />
                </div>
                <ArrowUpRight size={18} color="var(--ink-4)" />
              </div>
              <p className="label font-sans" style={{ color: "#c85c2d", marginBottom: "0.5rem" }}>Power Calculator</p>
              <h3 className="font-display" style={{ fontSize: "1.2rem", letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "0.75rem" }}>
                How much will this cost to run?
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-2)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                The highest-voted single post in r/homeserver is about power consumption. Plug in your hardware.
                Get your estimated monthly electricity bill and see whether switching to an N100 actually saves money.
              </p>
              <div className="font-sans" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {["CPU TDP", "Drive count", "kWh rate"].map(t => (
                  <span key={t} style={{ fontSize: "0.72rem", fontWeight: 600, background: "#fdf0eb", color: "#c85c2d", padding: "0.2rem 0.6rem", borderRadius: "9999px" }}>{t}</span>
                ))}
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

function FAQ() {
  const { ref, visible } = useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="container" style={{ maxWidth: "52rem" }}>
        <div ref={ref} style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          marginBottom: "2.5rem",
        }}>
          <p className="label font-sans" style={{ marginBottom: "0.6rem" }}>Common Questions</p>
          <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em", color: "var(--ink)" }}>
            Before you go down the rabbit hole
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }} itemScope itemType="https://schema.org/FAQPage">
          {faqItems.map((item, i) => (
            <div
              key={i}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="font-sans"
                style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "1.25rem 0", textAlign: "left", gap: "1rem",
                  minHeight: "44px",
                }}
              >
                <span itemProp="name" style={{ fontWeight: 700, fontSize: "0.975rem", color: "var(--ink)", lineHeight: 1.4 }}>
                  {item.q}
                </span>
                <ChevronRight
                  size={18}
                  color="var(--ink-4)"
                  style={{ flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }}
                />
              </button>
              {open === i && (
                <div
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                  style={{ paddingBottom: "1.25rem" }}
                >
                  <p itemProp="text" style={{ fontSize: "0.925rem", color: "var(--ink-2)", lineHeight: 1.75, maxWidth: "44rem" }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── NEWSLETTER ────────────────────────────────────────────────────────────────

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const { ref, visible } = useReveal();

  return (
    <section id="newsletter" style={{ padding: "5rem 1.5rem", borderBottom: "1px solid var(--border)", background: "var(--ink)" }}>
      <div className="container-prose">
        <div ref={ref} style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}>
          <p className="label font-sans" style={{ color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>Stay in the loop</p>
          <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em", color: "white", marginBottom: "0.875rem", lineHeight: 1.2 }}>
            New guides when they're ready.
            <br />No filler.
          </h2>
          <p className="font-sans" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", marginBottom: "2rem", lineHeight: 1.65 }}>
            One email per guide. No affiliate links, no sponsored posts, no AI-generated filler.
            Just the next guide when it's done.
          </p>

          {done ? (
            <p className="font-sans" style={{ color: "#4ade80", fontWeight: 600 }}>You're in. First guide notification coming when the next one drops.</p>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem", maxWidth: "28rem", flexWrap: "wrap" }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && email && setDone(true)}
                placeholder="your@email.com"
                aria-label="Email address"
                className="font-sans"
                style={{
                  flex: 1, minWidth: "200px", background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)", color: "white",
                  borderRadius: "9999px", padding: "0.65rem 1.1rem", fontSize: "0.875rem",
                  outline: "none", minHeight: "44px",
                }}
              />
              <button
                onClick={() => email && setDone(true)}
                className="btn font-sans"
                style={{ background: "var(--accent)", color: "white", borderRadius: "9999px" }}
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      heading: "Guides",
      links: [
        { label: "Proxmox vs Unraid vs TrueNAS", href: "/guides/proxmox-vs-unraid-vs-truenas" },
        { label: "Jellyfin vs Plex", href: "/guides/jellyfin-vs-plex" },
        { label: "N100 Mini PC Guide", href: "/guides/n100-mini-pc-guide" },
        { label: "RAID vs Backup", href: "/guides/raid-vs-backup" },
        { label: "Replace Google Photos", href: "/guides/immich-setup-guide" },
      ],
    },
    {
      heading: "More Guides",
      links: [
        { label: "Docker for Beginners", href: "/guides/docker-for-beginners" },
        { label: "Expose Your Server Safely", href: "/guides/expose-server-safely" },
        { label: "First Server Checklist", href: "/guides/first-server-checklist" },
      ],
    },
    {
      heading: "Tools",
      links: [
        { label: "Build Recommender", href: "/tools/build-recommender" },
        { label: "Power Calculator", href: "/tools/power-calculator" },
      ],
    },
  ];

  return (
    <footer style={{ padding: "3rem 1.5rem 2rem" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem", marginBottom: "2.5rem" }}>
          {/* Brand */}
          <div>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", marginBottom: "0.875rem" }}>
              <div style={{ width: "24px", height: "24px", background: "var(--ink)", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Server size={13} color="white" />
              </div>
              <span className="font-display" style={{ fontSize: "0.9rem", color: "var(--ink)" }}>NASforBeginners</span>
            </a>
            <p className="font-sans" style={{ fontSize: "0.8rem", color: "var(--ink-3)", lineHeight: 1.6 }}>
              Home server guides written for people who are actually new to this.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.heading}>
              <p className="label font-sans" style={{ marginBottom: "0.875rem" }}>{col.heading}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="font-sans" style={{ fontSize: "0.82rem", color: "var(--ink-3)", textDecoration: "none", lineHeight: 1.4 }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-3)")}
                    >{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule" style={{ marginBottom: "1.25rem" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <p className="font-sans" style={{ fontSize: "0.75rem", color: "var(--ink-4)" }}>
            Not affiliated with Reddit, Proxmox, Unraid, or any hardware vendor.
          </p>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Contact", href: "/contact" },
              { label: "About", href: "/about" },
            ].map(l => (
              <a key={l.label} href={l.href} className="font-sans" style={{ fontSize: "0.75rem", color: "var(--ink-4)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink-3)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-4)")}
              >{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Why />
        <Guides />
        <Tools />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
