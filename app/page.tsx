"use client";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ChevronRight, ArrowUpRight, Menu, X,
  Server, HardDrive, Cpu, Shield, Zap, Camera,
  MonitorPlay, Check, Terminal, Search, BarChart2,
  Wifi, Package, DollarSign, Layers
} from "lucide-react";

// ── REVEAL HOOK ───────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("shown"); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── DATA ──────────────────────────────────────────────────────
const guides = [
  {
    slug: "proxmox-vs-unraid-vs-truenas",
    cat: "Operating Systems", time: "8 min",
    title: "Proxmox vs Unraid vs TrueNAS",
    sub: "Which one should a beginner actually pick?",
    desc: "Three operating systems. Three totally different ideas about what a home server should be. The right choice depends on what you want to do, not which name sounds most impressive.",
    icon: <Server size={19} />, color: "var(--blue)", dim: "var(--blue-dim)",
  },
  {
    slug: "jellyfin-vs-plex",
    cat: "Media Streaming", time: "6 min",
    title: "Jellyfin vs Plex",
    sub: "Free and open source, or polished with a catch?",
    desc: "Plex looks better. Jellyfin costs nothing and gives you full control. The real answer depends on who else uses your server and how much remote streaming matters to you.",
    icon: <MonitorPlay size={19} />, color: "var(--purple)", dim: "var(--purple-dim)",
  },
  {
    slug: "n100-mini-pc-guide",
    cat: "Hardware", time: "7 min",
    title: "The N100 Mini PC Guide",
    sub: "6W idle. Handles 4K. Fits behind your TV.",
    desc: "The Intel N100 is the answer to most beginner hardware questions before they finish asking. This guide covers which model to buy, what to avoid, and how to set it up.",
    icon: <Cpu size={19} />, color: "var(--green)", dim: "var(--green-dim)",
  },
  {
    slug: "expose-server-safely",
    cat: "Networking", time: "9 min",
    title: "Access Your Server from Anywhere",
    sub: "Without exposing your home network",
    desc: "VPN, Tailscale, and Cloudflare Tunnel are three different answers to the same problem. One is almost certainly right for your situation. No, you don't just open port 80.",
    icon: <Shield size={19} />, color: "var(--amber)", dim: "var(--amber-dim)",
  },
  {
    slug: "raid-vs-backup",
    cat: "Storage", time: "6 min",
    title: "RAID vs Backup",
    sub: "This confusion costs people their data.",
    desc: "RAID protects you from a drive dying. Backup protects you from deleting the wrong file, a ransomware attack, or RAID itself failing. You probably need both.",
    icon: <HardDrive size={19} />, color: "var(--red)", dim: "var(--red-dim)",
  },
  {
    slug: "immich-setup-guide",
    cat: "Photo Backup", time: "10 min",
    title: "Replace Google Photos with Immich",
    sub: "The #1 reason people start a home server right now",
    desc: "Face recognition, shared albums, automatic mobile backup, a proper iOS and Android app. Immich is the Google Photos replacement that finally works. Here's how to get it running.",
    icon: <Camera size={19} />, color: "var(--teal)", dim: "var(--teal-dim)",
  },
  {
    slug: "docker-for-beginners",
    cat: "Docker", time: "8 min",
    title: "Docker for Normal People",
    sub: "Every guide assumes you already know this",
    desc: "Docker runs apps in isolated boxes so they can't interfere with each other. Once it clicks, you'll wonder how you ran apps any other way. This is the explanation that actually lands.",
    icon: <Package size={19} />, color: "var(--blue)", dim: "var(--blue-dim)",
  },
  {
    slug: "first-server-checklist",
    cat: "Getting Started", time: "5 min",
    title: "Your First Server: Step by Step",
    sub: "What to do, in what order",
    desc: "Hardware, OS install, first Docker container, remote access. In order. Most guides explain what things are. This one tells you what to do first, second, and third.",
    icon: <Check size={19} />, color: "var(--green)", dim: "var(--green-dim)",
  },
  {
    slug: "used-hardware-guide",
    cat: "Hardware", time: "7 min",
    title: "Buying Used Hardware for Your Server",
    sub: "eBay, Facebook Marketplace, and e-waste",
    desc: "The most upvoted posts in r/homeserver are people who built servers from salvaged office machines. Here's what to look for, what to avoid, and which old hardware is still worth running.",
    icon: <Search size={19} />, color: "var(--amber)", dim: "var(--amber-dim)",
  },
  {
    slug: "why-multiple-mini-pcs",
    cat: "Architecture", time: "6 min",
    title: "Why Use Multiple Mini PCs Instead of One Big Machine?",
    sub: "A question that comes up constantly",
    desc: "Three N100s costs more than one powerful machine, so why do people do it? Redundancy, power efficiency, and isolation are the real answers. This guide breaks down when it makes sense.",
    icon: <Layers size={19} />, color: "var(--purple)", dim: "var(--purple-dim)",
  },
];

const tools = [
  {
    href: "/tools/build-recommender",
    color: "var(--teal)", dim: "var(--teal-dim)", border: "var(--teal-border)",
    icon: <Cpu size={22} />,
    label: "Build Recommender",
    title: "What should I build and run?",
    desc: "The most common question in r/homeserver by far. Enter your budget, use case, and Linux comfort level. Get a specific hardware recommendation and a prioritized app list.",
    tags: ["Budget", "Use case", "Linux comfort"],
  },
  {
    href: "/tools/power-calculator",
    color: "var(--amber)", dim: "var(--amber-dim)", border: "rgba(245,166,35,.25)",
    icon: <Zap size={22} />,
    label: "Power Calculator",
    title: "How much will this actually cost to run?",
    desc: "The single highest-voted post in the sub is about power consumption (805 upvotes). Plug in your CPU, drives, and electricity rate. See your monthly bill and whether an N100 saves you money.",
    tags: ["CPU TDP", "Drive count", "kWh rate"],
  },
  {
    href: "/tools/app-picker",
    color: "var(--purple)", dim: "var(--purple-dim)", border: "rgba(155,114,232,.25)",
    icon: <Package size={22} />,
    label: "App Picker",
    title: "Which self-hosted apps should I run?",
    desc: "Tell us what cloud services you currently pay for. We'll show you the self-hosted alternative, how hard it is to set up, and whether it's actually worth the effort.",
    tags: ["Your subscriptions", "Skill level", "Time budget"],
  },
  {
    href: "/tools/storage-planner",
    color: "var(--green)", dim: "var(--green-dim)", border: "rgba(82,199,122,.25)",
    icon: <HardDrive size={22} />,
    label: "Storage Planner",
    title: "How much storage do I actually need?",
    desc: "Photos, movies, backups, and surveillance footage grow at very different rates. Enter what you're storing and get a realistic projection of how much drive space you'll need over 3 years.",
    tags: ["Media type", "Current size", "Growth rate"],
  },
];

const faqs = [
  { q: "How much does it cost to start?", a: "A used mini PC with an Intel N100 runs around $150. Add a hard drive and you're under $250 total. Running costs are roughly $3 to $5 a month in electricity, depending on where you live." },
  { q: "Do I need to know Linux?", a: "Not much. Unraid has a web interface that hides most of the Linux layer. If you can navigate a router admin page, you can use Unraid. More advanced setups ask for a bit more, but nothing a few hours of reading won't cover." },
  { q: "Is a home server actually reliable enough to trust with my photos?", a: "As reliable as you make it. With a proper backup strategy, which this site covers, a home server can be significantly more resilient than relying on a single cloud service that can change its terms or shut down." },
  { q: "What can it actually do?", a: "Replace Google Photos with Immich, stream your own movies with Jellyfin, sync files across devices with Syncthing, run a password manager with Vaultwarden, block ads network-wide with Pi-hole, and dozens of other things." },
  { q: "My 14-year-old got an old machine for free. Where do they start?", a: "The First Server Checklist guide is the right starting point. Old hardware is genuinely fine for learning, and the community around home servers is one of the more welcoming ones on the internet." },
  { q: "What if something breaks?", a: "Things will break. That's part of the deal. The guides here include the most common failure points and how to recover from them. The r/homeserver community is also very patient with beginners." },
];

// ── NAV ───────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Guides", href: "#guides" },
    { label: "Tools", href: "#tools" },
    { label: "FAQ", href: "#faq" },
  ];
  return (
    <>
      {/* Desktop floating pill */}
      <nav className="nav-float" aria-label="Main navigation">
        <a href="/" style={{ display: "flex", alignItems: "center", gap: ".55rem", textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, background: "var(--teal)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Server size={14} color="#0d1210" />
          </div>
          <span className="sans" style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--text-1)", letterSpacing: "-.01em" }}>NASforBeginners</span>
        </a>
        <div style={{ display: "flex", gap: ".125rem" }}>
          {links.map(l => (
            <a key={l.label} href={l.href} className="btn btn-ghost sans" style={{ padding: ".4rem .875rem", fontSize: ".8rem", minHeight: 36 }}>{l.label}</a>
          ))}
        </div>
        <a href="#newsletter" className="btn btn-primary sans" style={{ padding: ".45rem 1rem", fontSize: ".8rem", minHeight: 36 }}>
          Get updates
          <span className="btn-icon" style={{ width: "1.3rem", height: "1.3rem" }}><ArrowRight size={11} /></span>
        </a>
      </nav>

      {/* Mobile */}
      <div className="nav-mobile">
        <a href="/" style={{ display: "flex", alignItems: "center", gap: ".5rem", textDecoration: "none" }}>
          <div style={{ width: 26, height: 26, background: "var(--teal)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Server size={13} color="#0d1210" />
          </div>
          <span className="sans" style={{ fontWeight: 700, fontSize: ".875rem", color: "var(--text-1)" }}>NASforBeginners</span>
        </a>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-2)", padding: ".375rem", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div style={{ position: "relative", width: 20, height: 20 }}>
            <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .35s var(--spring)", opacity: open ? 0 : 1, transform: open ? "rotate(45deg) scale(.5)" : "rotate(0) scale(1)" }}><Menu size={20} /></span>
            <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .35s var(--spring)", opacity: open ? 1 : 0, transform: open ? "rotate(0) scale(1)" : "rotate(-45deg) scale(.5)" }}><X size={20} /></span>
          </div>
        </button>
      </div>
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(14,12,10,.92)", backdropFilter: "blur(24px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.25rem" }}>
          <button onClick={() => setOpen(false)} style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", color: "var(--text-2)", cursor: "pointer", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}><X size={22} /></button>
          {links.map((l, i) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="display"
              style={{ fontSize: "2.25rem", color: "var(--text-1)", textDecoration: "none", opacity: 0, animation: `fadeUp .4s var(--spring) ${i * .08 + .05}s forwards` }}
            >{l.label}</a>
          ))}
          <a href="#newsletter" onClick={() => setOpen(false)} className="btn btn-primary sans" style={{ marginTop: ".75rem", opacity: 0, animation: `fadeUp .4s var(--spring) .3s forwards` }}>
            Get updates <span className="btn-icon"><ArrowRight size={13} /></span>
          </a>
        </div>
      )}
    </>
  );
}

// ── HERO ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "8rem 1.5rem 6rem", textAlign: "center" }}>
      {/* Glows */}
      <div className="glow" style={{ width: "36rem", height: "18rem", background: "rgba(78,205,196,.09)", top: "28%", left: "50%", transform: "translateX(-50%)" }} />
      <div className="glow" style={{ width: "22rem", height: "22rem", background: "rgba(155,114,232,.07)", top: "38%", right: "8%", animationDelay: "2.5s" }} />
      <div className="glow" style={{ width: "18rem", height: "18rem", background: "rgba(92,158,224,.06)", bottom: "20%", left: "6%", animationDelay: "1.5s" }} />

      <div style={{ maxWidth: "54rem", position: "relative", zIndex: 1 }}>
        <div style={{ opacity: 0, animation: "fadeUp .7s var(--spring) .05s forwards", marginBottom: "1.5rem" }}>
          <span className="eyebrow">Your first server, demystified</span>
        </div>

        <h1 className="display" style={{ fontSize: "clamp(2.75rem, 8vw, 5.5rem)", marginBottom: "1.5rem", opacity: 0, animation: "fadeUp .8s var(--spring) .15s forwards" }}>
          <span style={{ color: "var(--text-1)" }}>Build a server.</span>
          <br />
          <span style={{ color: "var(--teal)" }}>Own your data.</span>
        </h1>

        <p className="serif" style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "var(--text-2)", maxWidth: "36rem", margin: "0 auto 2.5rem", lineHeight: 1.75, opacity: 0, animation: "fadeUp .8s var(--spring) .25s forwards" }}>
          Google Photos, Netflix, iCloud. A home server can replace most of them.
          These guides cover how to build one, what to run, and where to actually start.
          No sysadmin degree required.
        </p>

        <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap", opacity: 0, animation: "fadeUp .8s var(--spring) .35s forwards" }}>
          <a href="#guides" className="btn btn-primary sans">
            Start reading
            <span className="btn-icon"><ArrowRight size={14} /></span>
          </a>
          <a href="/guides/first-server-checklist" className="btn btn-ghost sans">
            First server checklist
          </a>
        </div>

        <p className="sans" style={{ marginTop: "2.25rem", fontSize: ".72rem", color: "var(--text-4)", opacity: 0, animation: "fadeUp .6s var(--spring) .5s forwards", letterSpacing: ".05em" }}>
          Written from 999 posts in r/homeserver. No affiliate links. No sponsored content.
        </p>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", opacity: .25 }}>
        <div style={{ width: 1, height: "3rem", background: "linear-gradient(to bottom, transparent, var(--text-3))" }} />
      </div>
    </section>
  );
}

// ── TRUST BAR ─────────────────────────────────────────────────
function TrustBar() {
  const ref = useReveal();
  const items = [
    { val: "999", label: "posts analyzed" },
    { val: "805↑", label: "top-voted question" },
    { val: "10+", label: "free guides" },
    { val: "4", label: "interactive tools" },
  ];
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "0 1.5rem" }}>
      <div className="wrap">
        <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))" }}>
          {items.map((item, i) => (
            <div key={i} style={{ padding: "1.75rem 1rem", borderRight: i < items.length - 1 ? "1px solid var(--border)" : "none", textAlign: "center" }}>
              <div className="display" style={{ fontSize: "1.65rem", color: "var(--text-1)", letterSpacing: "-.02em" }}>{item.val}</div>
              <div className="sans" style={{ fontSize: ".72rem", color: "var(--text-3)", marginTop: ".2rem", letterSpacing: ".04em" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── WHY ───────────────────────────────────────────────────────
function Why() {
  const ref = useReveal();
  const items = [
    { icon: <DollarSign size={18} />, color: "var(--teal)", title: "You're paying for things you could run yourself", body: "Google Photos, Netflix, iCloud, Spotify. A home server can replace most of them for the cost of a used mini PC and a few hours on a weekend." },
    { icon: <Shield size={18} />, color: "var(--amber)", title: "Your data lives on someone else's computer", body: "Photos, documents, family videos. Cloud services get hacked, change their terms, or shut down. A server you own is a server you control." },
    { icon: <Wifi size={18} />, color: "var(--purple)", title: "The guides that exist assume too much", body: "The official Proxmox documentation is not written for someone who just picked up a used mini PC. This site is." },
  ];
  return (
    <section className="section" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="wrap">
        <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: "var(--bg)", padding: "2rem" }}>
              <div style={{ width: "2.25rem", height: "2.25rem", background: "var(--bg-3)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: item.color, marginBottom: "1rem", border: "1px solid var(--border-2)" }}>
                {item.icon}
              </div>
              <h3 className="sans" style={{ fontWeight: 700, fontSize: ".975rem", color: "var(--text-1)", marginBottom: ".5rem", lineHeight: 1.4 }}>{item.title}</h3>
              <p className="serif" style={{ fontSize: ".9rem", color: "var(--text-2)", lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── GUIDE CARD ────────────────────────────────────────────────
function GuideCard({ g, i }: { g: typeof guides[0]; i: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${(i % 4) * .06}s` }}>
      <a href={`/guides/${g.slug}`} className="card card-link" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: ".875rem", height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="sans" style={{ fontSize: ".6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: g.color }}>{g.cat}</span>
          <span className="sans" style={{ fontSize: ".7rem", color: "var(--text-4)" }}>{g.time}</span>
        </div>
        <div style={{ width: "2.5rem", height: "2.5rem", background: g.dim, border: `1px solid ${g.color}22`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: g.color }}>
          {g.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="sans" style={{ fontWeight: 700, fontSize: "1.025rem", color: "var(--text-1)", marginBottom: ".3rem", lineHeight: 1.35 }}>{g.title}</h2>
          <p className="sans" style={{ fontSize: ".78rem", color: "var(--text-3)", marginBottom: ".7rem", fontWeight: 500 }}>{g.sub}</p>
          <p className="serif" style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.7 }}>{g.desc}</p>
        </div>
        <div className="sans" style={{ display: "flex", alignItems: "center", gap: ".3rem", fontSize: ".8rem", fontWeight: 600, color: g.color, marginTop: "auto", paddingTop: ".5rem" }}>
          Read guide <ChevronRight size={14} />
        </div>
      </a>
    </div>
  );
}

function Guides() {
  const ref = useReveal();
  return (
    <section id="guides" className="section" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="wrap">
        <div ref={ref} className="reveal" style={{ marginBottom: "3rem" }}>
          <span className="eyebrow" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>Guides</span>
          <h2 className="display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--text-1)", maxWidth: "26rem", lineHeight: 1.15 }}>
            Every question that comes up in every thread
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1rem" }}>
          {guides.map((g, i) => <GuideCard key={g.slug} g={g} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ── TOOLS ─────────────────────────────────────────────────────
function Tools() {
  const ref = useReveal();
  return (
    <section id="tools" className="section" style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-2)" }}>
      <div className="wrap">
        <div ref={ref} className="reveal" style={{ marginBottom: "3rem" }}>
          <span className="eyebrow" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>Free Tools</span>
          <h2 className="display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--text-1)", maxWidth: "32rem", lineHeight: 1.15 }}>
            Questions no guide quite answers
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "1rem" }}>
          {tools.map((t, i) => {
            const ref = useReveal();
            return (
              <div key={i} ref={ref} className="reveal" style={{ transitionDelay: `${i * .07}s` }}>
                <a href={t.href} className="card card-link" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem", height: "100%", borderColor: `${t.color}18` }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div style={{ width: "3rem", height: "3rem", background: t.dim, border: `1px solid ${t.border}`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: t.color }}>
                      {t.icon}
                    </div>
                    <ArrowUpRight size={16} color="var(--text-4)" />
                  </div>
                  <div>
                    <p className="sans" style={{ fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: t.color, marginBottom: ".4rem" }}>{t.label}</p>
                    <h3 className="sans" style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-1)", marginBottom: ".6rem", lineHeight: 1.35 }}>{t.title}</h3>
                    <p className="serif" style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.7, marginBottom: "1rem" }}>{t.desc}</p>
                  </div>
                  <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap", marginTop: "auto" }}>
                    {t.tags.map(tag => (
                      <span key={tag} className="sans" style={{ fontSize: ".68rem", fontWeight: 600, background: t.dim, color: t.color, border: `1px solid ${t.border}`, padding: ".2rem .6rem", borderRadius: "9999px" }}>{tag}</span>
                    ))}
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useReveal();
  return (
    <section id="faq" className="section" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="wrap" style={{ maxWidth: "52rem" }}>
        <div ref={ref} className="reveal" style={{ marginBottom: "3rem" }}>
          <span className="eyebrow" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>Before you dive in</span>
          <h2 className="display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--text-1)", lineHeight: 1.15 }}>Common questions</h2>
        </div>
        <div itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((item, i) => (
            <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ borderBottom: "1px solid var(--border)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="sans"
                style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 0", textAlign: "left", gap: "1rem", minHeight: 44 }}
              >
                <span itemProp="name" style={{ fontWeight: 600, fontSize: ".975rem", color: "var(--text-1)", lineHeight: 1.4 }}>{item.q}</span>
                <ChevronRight size={17} color="var(--text-4)" style={{ flexShrink: 0, transition: "transform .3s var(--spring)", transform: open === i ? "rotate(90deg)" : "rotate(0)" }} />
              </button>
              {open === i && (
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" style={{ paddingBottom: "1.25rem" }}>
                  <p itemProp="text" className="serif" style={{ fontSize: ".925rem", color: "var(--text-2)", lineHeight: 1.8, maxWidth: "44rem" }}>
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

// ── NEWSLETTER ────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const ref = useReveal();
  return (
    <section id="newsletter" style={{ padding: "6rem 1.5rem", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
      <div className="glow" style={{ width: "30rem", height: "16rem", background: "rgba(78,205,196,.07)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div className="wrap-prose" style={{ position: "relative", zIndex: 1 }}>
        <div ref={ref} className="reveal">
          <span className="eyebrow" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>Stay in the loop</span>
          <h2 className="display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--text-1)", marginBottom: ".875rem", lineHeight: 1.15 }}>
            New guides when they're ready.
          </h2>
          <p className="serif" style={{ color: "var(--text-2)", marginBottom: "2rem", fontSize: ".975rem", lineHeight: 1.7 }}>
            One email per guide. No roundups, no affiliate spam, no AI filler.
            Just the next guide when it's done.
          </p>
          {done ? (
            <p className="sans" style={{ color: "var(--teal)", fontWeight: 600 }}>You're in. We'll email you when the next guide drops.</p>
          ) : (
            <div style={{ display: "flex", gap: ".5rem", maxWidth: "28rem", flexWrap: "wrap" }}>
              <div className="bezel" style={{ flex: 1, minWidth: 180, borderRadius: "9999px", padding: "2px" }}>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && email && setDone(true)}
                  placeholder="your@email.com" aria-label="Email address"
                  className="sans"
                  style={{ width: "100%", background: "var(--surface)", border: "none", color: "var(--text-1)", borderRadius: "9999px", padding: ".65rem 1.1rem", fontSize: ".875rem", outline: "none", minHeight: 44 }}
                />
              </div>
              <button onClick={() => email && setDone(true)} className="btn btn-primary sans">
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { head: "Guides", links: [
      { l: "Proxmox vs Unraid vs TrueNAS", h: "/guides/proxmox-vs-unraid-vs-truenas" },
      { l: "Jellyfin vs Plex", h: "/guides/jellyfin-vs-plex" },
      { l: "N100 Mini PC Guide", h: "/guides/n100-mini-pc-guide" },
      { l: "Docker for Beginners", h: "/guides/docker-for-beginners" },
      { l: "RAID vs Backup", h: "/guides/raid-vs-backup" },
    ]},
    { head: "More Guides", links: [
      { l: "Replace Google Photos", h: "/guides/immich-setup-guide" },
      { l: "Access Your Server Remotely", h: "/guides/expose-server-safely" },
      { l: "Buying Used Hardware", h: "/guides/used-hardware-guide" },
      { l: "Multiple Mini PCs?", h: "/guides/why-multiple-mini-pcs" },
      { l: "First Server Checklist", h: "/guides/first-server-checklist" },
    ]},
    { head: "Tools", links: [
      { l: "Build Recommender", h: "/tools/build-recommender" },
      { l: "Power Calculator", h: "/tools/power-calculator" },
      { l: "App Picker", h: "/tools/app-picker" },
      { l: "Storage Planner", h: "/tools/storage-planner" },
    ]},
  ];
  return (
    <footer style={{ padding: "3.5rem 1.5rem 2.5rem" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
          <div>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: ".5rem", textDecoration: "none", marginBottom: "1rem" }}>
              <div style={{ width: 24, height: 24, background: "var(--teal)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Server size={13} color="#0d1210" />
              </div>
              <span className="sans" style={{ fontWeight: 700, fontSize: ".875rem", color: "var(--text-1)" }}>NASforBeginners</span>
            </a>
            <p className="serif" style={{ fontSize: ".8rem", color: "var(--text-3)", lineHeight: 1.65, maxWidth: "15rem" }}>
              Home server guides written for people who are actually new to this.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.head}>
              <p className="sans" style={{ fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--text-4)", marginBottom: ".875rem" }}>{col.head}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".45rem" }}>
                {col.links.map(l => (
                  <li key={l.l}>
                    <a href={l.h} className="sans" style={{ fontSize: ".8rem", color: "var(--text-3)", textDecoration: "none", lineHeight: 1.4, transition: "color .2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
                    >{l.l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".75rem" }}>
          <p className="sans" style={{ fontSize: ".72rem", color: "var(--text-4)" }}>
            Not affiliated with Reddit, Proxmox, Unraid, or any hardware vendor.
          </p>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {[{ l: "About", h: "/about" }, { l: "Privacy", h: "/privacy" }, { l: "Contact", h: "/contact" }].map(l => (
              <a key={l.l} href={l.h} className="sans" style={{ fontSize: ".72rem", color: "var(--text-4)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-2)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-4)")}
              >{l.l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── PAGE ──────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <TrustBar />
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
