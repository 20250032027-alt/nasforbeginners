"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Server, HardDrive, Cpu, Shield, Zap, BookOpen, 
  ArrowRight, ChevronRight, Star, TrendingUp, 
  MonitorPlay, Camera, Box, Globe, Wrench,
  Menu, X, ExternalLink, Terminal
} from "lucide-react";

// ── DATA ────────────────────────────────────────────────────────────────────

const guides = [
  {
    tag: "Most Requested",
    color: "blue",
    icon: <Server size={18} />,
    title: "Proxmox vs Unraid vs TrueNAS — Plain English",
    desc: "Three operating systems, three very different philosophies. Here's which one actually fits what you're trying to do without a homelab degree.",
    href: "/guides/proxmox-vs-unraid-vs-truenas",
    stat: "15x in titles",
  },
  {
    tag: "Eternal Debate",
    color: "purple",
    icon: <MonitorPlay size={18} />,
    title: "Jellyfin vs Plex — Full 2026 Comparison",
    desc: "Plex has the polish. Jellyfin has no subscription. The actual answer depends on who else uses your server and how much you care about remote streaming.",
    href: "/guides/jellyfin-vs-plex",
    stat: "30x Plex, 15x Jellyfin",
  },
  {
    tag: "Best Entry Point",
    color: "green",
    icon: <Cpu size={18} />,
    title: "N100 Mini PC Buyer Guide",
    desc: "The cheapest capable server most people should actually buy. 15W idle, enough CPU for Jellyfin transcoding, and it fits behind your TV.",
    href: "/guides/n100-mini-pc-guide",
    stat: "Dominant in comments",
  },
  {
    tag: "Everyone Asks",
    color: "orange",
    icon: <Shield size={18} />,
    title: "How to Expose Your Server Safely",
    desc: "VPN, Tailscale, Cloudflare Tunnel — three real options with real tradeoffs. No, you don't just open port 80.",
    href: "/guides/expose-server-safely",
    stat: "VPN question in every post",
  },
  {
    tag: "Massively Misunderstood",
    color: "red",
    icon: <HardDrive size={18} />,
    title: "RAID vs Backup — What You Actually Need",
    desc: "RAID is not a backup. Backup is not RAID. You probably need both, but only one is strictly required to not lose your data.",
    href: "/guides/raid-vs-backup",
    stat: "16x RAID + 16x backup",
  },
  {
    tag: "Top Use Case",
    color: "pink",
    icon: <Camera size={18} />,
    title: "Immich Setup Guide — Replace Google Photos",
    desc: "The #1 reason people spin up a home server right now. Immich hit a stable milestone and it actually works. Here's how to get it running.",
    href: "/guides/immich-setup-guide",
    stat: "#1 reason to start a server",
  },
];

const stats = [
  { label: "Upvote record", value: "3,732", sub: "DDR4 pulled from office machines" },
  { label: "Top question", value: "805", sub: "upvotes on power consumption" },
  { label: "Posts analyzed", value: "999", sub: "from r/homeserver" },
  { label: "Avg first question", value: "\"Proxmox?\"", sub: "most common title keyword" },
];

const colorMap: Record<string, string> = {
  blue: "rgba(59,130,246,0.12)",
  purple: "rgba(168,85,247,0.12)",
  green: "rgba(34,197,94,0.12)",
  orange: "rgba(249,115,22,0.12)",
  red: "rgba(239,68,68,0.12)",
  pink: "rgba(236,72,153,0.12)",
};

const borderColorMap: Record<string, string> = {
  blue: "rgba(59,130,246,0.25)",
  purple: "rgba(168,85,247,0.25)",
  green: "rgba(34,197,94,0.25)",
  orange: "rgba(249,115,22,0.25)",
  red: "rgba(239,68,68,0.25)",
  pink: "rgba(236,72,153,0.25)",
};

const textColorMap: Record<string, string> = {
  blue: "#60a5fa",
  purple: "#c084fc",
  green: "#4ade80",
  orange: "#fb923c",
  red: "#f87171",
  pink: "#f472b6",
};

// ── INTERSECTION OBSERVER HOOK ───────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { label: "Guides", href: "#guides" },
    { label: "Tools", href: "#tools" },
    { label: "About", href: "#about" },
  ];

  return (
    <>
      <nav className="nav-pill">
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <div style={{ width: "1.75rem", height: "1.75rem", background: "var(--accent)", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Server size={14} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>NASforBeginners</span>
        </a>
        <div style={{ display: "flex", gap: "0.25rem" }}>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="btn-ghost" style={{ padding: "0.4rem 0.9rem", fontSize: "0.8rem" }}>
              {l.label}
            </a>
          ))}
        </div>
        <a href="#newsletter" className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
          Get Guides
        </a>
      </nav>

      {/* Mobile nav */}
      <nav style={{
        position: "fixed", top: "1rem", left: "1rem", right: "1rem", zIndex: 100,
        background: "rgba(10,10,10,0.9)", backdropFilter: "blur(20px)",
        border: "1px solid var(--border)", borderRadius: "1rem",
        padding: "0.75rem 1rem", display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }} className="mobile-nav-bar">
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <div style={{ width: "1.5rem", height: "1.5rem", background: "var(--accent)", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Server size={12} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-primary)" }}>NASforBeginners</span>
        </a>
        <button
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", padding: "0.25rem" }}
          aria-label="Toggle menu"
        >
          <div style={{ position: "relative", width: "1.25rem", height: "1.25rem" }}>
            <span style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
              opacity: open ? 0 : 1, transform: open ? "rotate(45deg) scale(0.5)" : "rotate(0) scale(1)",
            }}><Menu size={18} /></span>
            <span style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
              opacity: open ? 1 : 0, transform: open ? "rotate(0) scale(1)" : "rotate(-45deg) scale(0.5)",
            }}><X size={18} /></span>
          </div>
        </button>
        {open && (
          <div style={{
            position: "absolute", top: "calc(100% + 0.5rem)", left: 0, right: 0,
            background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)",
            border: "1px solid var(--border)", borderRadius: "1rem",
            padding: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem",
          }}>
            {navLinks.map((l, i) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                style={{
                  color: "var(--text-secondary)", textDecoration: "none", padding: "0.6rem 0.75rem",
                  borderRadius: "0.5rem", fontSize: "0.9rem", fontWeight: 500,
                  opacity: 0, animation: `fadeUp 0.3s cubic-bezier(0.32,0.72,0,1) ${i * 0.06}s forwards`,
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >{l.label}</a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

function Hero() {
  return (
    <section style={{
      minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", position: "relative", overflow: "hidden",
      padding: "8rem 1.5rem 6rem",
    }}>
      {/* Glow orbs */}
      <div className="glow-orb" style={{ width: "40rem", height: "20rem", background: "rgba(59,130,246,0.12)", top: "20%", left: "50%", transform: "translateX(-50%)" }} />
      <div className="glow-orb" style={{ width: "20rem", height: "20rem", background: "rgba(168,85,247,0.08)", top: "40%", right: "10%", animationDelay: "2s" }} />

      <div style={{ maxWidth: "56rem", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="fade-up delay-1" style={{ marginBottom: "1.5rem" }}>
          <span className="pill-tag">
            <TrendingUp size={10} />
            Built from 999 real r/homeserver posts
          </span>
        </div>

        <h1 className="fade-up delay-2" style={{
          fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, lineHeight: 1.1,
          letterSpacing: "-0.03em", marginBottom: "1.5rem",
        }}>
          <span className="gradient-text">Home server setup</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>without the enterprise docs</span>
        </h1>

        <p className="fade-up delay-3" style={{
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "var(--text-secondary)",
          maxWidth: "38rem", margin: "0 auto 2.5rem", lineHeight: 1.7,
        }}>
          Every guide here started as a question that showed up in dozens of posts.
          Proxmox, Jellyfin, Immich, Docker — explained for people who are actually new to this.
        </p>

        <div className="fade-up delay-4" style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#guides" className="btn-primary">
            Read the Guides
            <span className="icon-arrow"><ArrowRight size={13} /></span>
          </a>
          <a href="#tools" className="btn-ghost">
            <Wrench size={15} />
            Free Tools
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", opacity: 0.3 }}>
        <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, transparent, var(--text-muted))" }} />
      </div>
    </section>
  );
}

function StatsBar() {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ padding: "0 1.5rem 5rem" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <div className="card-bezel">
          <div className="card-inner" style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "0", padding: 0,
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: "1.75rem 1.5rem",
                borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.6s cubic-bezier(0.32, 0.72, 0, 1) ${i * 0.08}s`,
              }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", marginTop: "0.25rem" }}>{s.label}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GuideCard({ g, i }: { g: typeof guides[0], i: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `all 0.7s cubic-bezier(0.32, 0.72, 0, 1) ${(i % 3) * 0.07}s`,
    }}>
      <a href={g.href} style={{ textDecoration: "none", display: "block", height: "100%" }}
        onMouseEnter={e => {
          const el = e.currentTarget.querySelector(".card-bezel") as HTMLElement;
          if (el) el.style.borderColor = borderColorMap[g.color];
        }}
        onMouseLeave={e => {
          const el = e.currentTarget.querySelector(".card-bezel") as HTMLElement;
          if (el) el.style.borderColor = "var(--border)";
        }}
      >
        <div className="card-bezel" style={{ height: "100%", transition: "border-color 0.3s" }}>
          <div className="card-inner" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: colorMap[g.color], border: `1px solid ${borderColorMap[g.color]}`,
                color: textColorMap[g.color],
                fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.12em", padding: "0.25rem 0.6rem", borderRadius: "9999px",
              }}>
                {g.icon}
                {g.tag}
              </span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{g.stat}</span>
            </div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4 }}>
              {g.title}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, flex: 1 }}>
              {g.desc}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: textColorMap[g.color], fontSize: "0.8rem", fontWeight: 600, marginTop: "auto" }}>
              Read guide <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

function Guides() {
  const { ref, visible } = useReveal();
  return (
    <section id="guides" style={{ padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div ref={ref} style={{
          textAlign: "center", marginBottom: "3.5rem",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
        }}>
          <span className="pill-tag" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            <BookOpen size={10} />
            Core Guides
          </span>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            The questions that show up in every thread
          </h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.75rem", fontSize: "1rem" }}>
            Every page here maps to a real cluster of posts. None of these are made up.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          gap: "1.25rem",
        }}>
          {guides.map((g, i) => <GuideCard key={i} g={g} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function Tools() {
  const { ref, visible } = useReveal();
  return (
    <section id="tools" style={{ padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <div ref={ref} style={{
          textAlign: "center", marginBottom: "3rem",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
        }}>
          <span className="pill-tag" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            <Terminal size={10} />
            Free Tools
          </span>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            The #1 question in the sub is{" "}
            <span style={{ color: "#60a5fa" }}>"what should I build?"</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.75rem" }}>
            Two tools that answer the questions no guide quite covers.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "1.25rem" }}>
          {/* Build Recommender */}
          <div className="tool-card">
            <div className="tool-card-inner">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Cpu size={18} color="#60a5fa" />
                </div>
                <div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 600, color: "#60a5fa", textTransform: "uppercase", letterSpacing: "0.12em" }}>Tool 1</div>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>Home Server Build Recommender</div>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                Enter your budget, what you want to run (media server, Immich, game server, general self-hosting), 
                power limit, and how comfortable you are with Linux. Get a specific hardware recommendation 
                and a prioritized list of Docker apps to install.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {["Budget", "Use case", "Power budget", "Comfort level"].map(t => (
                  <span key={t} style={{ fontSize: "0.7rem", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)", color: "#93c5fd", padding: "0.2rem 0.6rem", borderRadius: "9999px" }}>{t}</span>
                ))}
              </div>
              <a href="/tools/build-recommender" className="btn-primary" style={{ fontSize: "0.85rem", padding: "0.65rem 1.25rem" }}>
                Try it free
                <span className="icon-arrow"><ArrowRight size={12} /></span>
              </a>
            </div>
          </div>

          {/* Power Calculator */}
          <div className="tool-card" style={{ background: "rgba(168,85,247,0.05)", borderColor: "rgba(168,85,247,0.15)" }}>
            <div className="tool-card-inner" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.05), rgba(59,130,246,0.05))" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.25)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={18} color="#c084fc" />
                </div>
                <div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 600, color: "#c084fc", textTransform: "uppercase", letterSpacing: "0.12em" }}>Tool 2</div>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>Power Consumption Calculator</div>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                The single highest-voted post in r/homeserver is about power consumption. 
                Enter your CPU, RAM, and drive count. Get your estimated monthly electricity cost 
                and see whether something like an N100 would actually save you money.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {["CPU TDP", "Drive count", "RAM", "kWh rate"].map(t => (
                  <span key={t} style={{ fontSize: "0.7rem", background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)", color: "#c084fc", padding: "0.2rem 0.6rem", borderRadius: "9999px" }}>{t}</span>
                ))}
              </div>
              <a href="/tools/power-calculator" className="btn-primary" style={{ fontSize: "0.85rem", padding: "0.65rem 1.25rem", background: "#7c3aed" }}>
                Calculate yours
                <span className="icon-arrow" style={{ background: "rgba(255,255,255,0.1)" }}><ArrowRight size={12} /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, visible } = useReveal();
  return (
    <section id="about" style={{ padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "44rem", margin: "0 auto" }}>
        <div ref={ref} className="card-bezel" style={{
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
        }}>
          <div className="card-inner" style={{ padding: "2.5rem" }}>
            <span className="pill-tag" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
              <Star size={10} />
              Why this site exists
            </span>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "1.25rem", lineHeight: 1.3 }}>
              The guides that don't exist yet
            </h2>
            <div style={{ color: "var(--text-secondary)", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.925rem" }}>
              <p>
                r/homeserver gets the same beginner posts every week. Not because people are lazy — 
                because most existing docs assume you already know what you're doing. 
                The official Proxmox wiki is not written for someone who just bought a used mini PC off eBay.
              </p>
              <p>
                Every guide here starts from a real cluster of posts: actual questions, actual confusion, 
                actual mistakes. The content is driven by what the community actually struggles with, not 
                by what's easy to write.
              </p>
              <p>
                NAS is the top keyword by a wide margin (115 posts). Power consumption is the top-voted 
                individual post (805 upvotes). "Is this an okay build? I have no clue what I'm doing" got 294 upvotes. 
                The audience is beginners who need real answers, not enterprise documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { ref, visible } = useReveal();

  return (
    <section id="newsletter" style={{ padding: "5rem 1.5rem 8rem" }}>
      <div style={{ maxWidth: "40rem", margin: "0 auto", textAlign: "center" }}>
        <div ref={ref} style={{
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
        }}>
          <div className="glow-orb" style={{ width: "25rem", height: "15rem", background: "rgba(59,130,246,0.08)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", position: "absolute", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="pill-tag" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
              <Globe size={10} />
              New guides weekly
            </span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
              Get notified when new guides drop
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontSize: "0.925rem" }}>
              No AI fluff, no affiliate spam. Just the guides when they're ready.
            </p>
            {sent ? (
              <div style={{ color: "#4ade80", fontWeight: 600 }}>Done. You're in.</div>
            ) : (
              <div style={{ display: "flex", gap: "0.5rem", maxWidth: "26rem", margin: "0 auto" }}>
                <div className="card-bezel" style={{ flex: 1, borderRadius: "9999px", padding: "2px" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      width: "100%", background: "var(--bg-surface)", border: "none",
                      color: "var(--text-primary)", fontSize: "0.875rem", padding: "0.7rem 1.1rem",
                      borderRadius: "9999px", outline: "none",
                    }}
                  />
                </div>
                <button onClick={() => email && setSent(true)} className="btn-primary" style={{ padding: "0.7rem 1.25rem", fontSize: "0.85rem", flexShrink: 0 }}>
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "1.5rem", height: "1.5rem", background: "var(--accent)", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Server size={12} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-secondary)" }}>NASforBeginners</span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Guides", "Tools", "About", "Contact"].map(l => (
            <a key={l} href={`/${l.toLowerCase()}`} style={{ color: "var(--text-muted)", fontSize: "0.8rem", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-secondary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >{l}</a>
          ))}
        </div>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          Not affiliated with Reddit or any hardware manufacturer.
        </span>
      </div>
    </footer>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <style>{`
        @media (min-width: 640px) { .mobile-nav-bar { display: none !important; } }
        @media (max-width: 639px) { .nav-pill { display: none !important; } }
      `}</style>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Guides />
        <Tools />
        <About />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
