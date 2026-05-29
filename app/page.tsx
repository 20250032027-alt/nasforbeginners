"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronRight, ArrowUpRight, Menu, X, Server, HardDrive, Cpu, Shield, Zap, Camera, MonitorPlay, Check, Package, DollarSign, Wifi, Layers, Search, Volume2 } from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("shown"); obs.disconnect(); } }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const Logo = () => (
  <a href="/" style={{ display: "flex", alignItems: "center", gap: ".5rem", textDecoration: "none" }}>
    <div style={{ width: 28, height: 28, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Server size={14} color="white" />
    </div>
    <span style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--text-1)", letterSpacing: "-.01em" }}>NASforBeginners</span>
  </a>
);

const navLinks = [
  { label: "Tools", href: "#tools" },
  { label: "Guides", href: "#guides" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "/about" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="nav-float" aria-label="Main navigation">
        <Logo />
        <div style={{ display: "flex", gap: ".1rem" }}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} className="btn btn-ghost" style={{ padding: ".35rem .8rem", fontSize: ".8rem", minHeight: 36 }}>{l.label}</a>
          ))}
        </div>
        <a href="#newsletter" className="btn btn-primary" style={{ padding: ".4rem 1rem", fontSize: ".8rem", minHeight: 36 }}>
          Get updates <span className="btn-icon" style={{ width: "1.25rem", height: "1.25rem" }}><ArrowRight size={11} /></span>
        </a>
      </nav>
      <div className="nav-mobile">
        <Logo />
        <button onClick={() => setOpen(!open)} aria-label={open ? "Close" : "Menu"} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-2)", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(10,10,11,.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <button onClick={() => setOpen(false)} style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", color: "var(--text-2)", cursor: "pointer", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}><X size={22} /></button>
          {navLinks.map((l, i) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-1)", textDecoration: "none", opacity: 0, animation: `fadeUp .35s var(--spring) ${i * .065 + .04}s forwards`, letterSpacing: "-.02em" }}>
              {l.label}
            </a>
          ))}
          <a href="#newsletter" onClick={() => setOpen(false)} className="btn btn-primary" style={{ marginTop: ".75rem", opacity: 0, animation: `fadeUp .35s var(--spring) .32s forwards` }}>
            Get updates
          </a>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "8rem 1.5rem 5rem", textAlign: "center" }}>
      <div className="glow" style={{ width: "40rem", height: "20rem", background: "rgba(101,117,244,.09)", top: "30%", left: "50%", transform: "translateX(-50%)" }} />
      <div className="glow" style={{ width: "18rem", height: "18rem", background: "rgba(101,117,244,.05)", bottom: "25%", right: "8%", animationDelay: "2s" }} />
      <div style={{ maxWidth: "50rem", position: "relative", zIndex: 1 }}>
        <div style={{ opacity: 0, animation: "fadeUp .6s var(--spring) .04s forwards", marginBottom: "1.5rem" }}>
          <span className="eyebrow">Your first server, step by step</span>
        </div>
        <h1 style={{ fontWeight: 800, fontSize: "clamp(2.5rem, 7vw, 4.75rem)", lineHeight: 1.1, letterSpacing: "-.03em", marginBottom: "1.5rem", opacity: 0, animation: "fadeUp .7s var(--spring) .1s forwards", color: "var(--text-1)" }}>
          Build a server.<br /><span style={{ color: "var(--accent)" }}>Own your data.</span>
        </h1>
        <p style={{ fontSize: "clamp(.975rem, 2.5vw, 1.1rem)", color: "var(--text-2)", maxWidth: "32rem", margin: "0 auto 2.5rem", lineHeight: 1.8, opacity: 0, animation: "fadeUp .7s var(--spring) .18s forwards" }}>
          Google Photos, Netflix, iCloud. A home server can replace most of them.
          These guides cover what to build, what to run, and where to actually start.
          No sysadmin background needed.
        </p>
        <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap", opacity: 0, animation: "fadeUp .7s var(--spring) .26s forwards" }}>
          <a href="#tools" className="btn btn-primary">See the tools <span className="btn-icon"><ArrowRight size={13} /></span></a>
          <a href="/guides/first-server-checklist" className="btn btn-ghost">First server checklist</a>
        </div>
        <p style={{ marginTop: "2.25rem", fontSize: ".7rem", color: "var(--text-4)", opacity: 0, animation: "fadeUp .6s var(--spring) .38s forwards", letterSpacing: ".04em" }}>
          Written from 999 real posts in r/homeserver. No ads, no affiliate links.
        </p>
      </div>
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", opacity: .18 }}>
        <div style={{ width: 1, height: "3rem", background: "linear-gradient(to bottom, transparent, var(--text-3))" }} />
      </div>
    </section>
  );
}

function TrustBar() {
  const ref = useReveal();
  const items = [
    { val: "12", label: "guides" },
    { val: "6", label: "free tools" },
    { val: "999", label: "posts analyzed" },
    { val: "0", label: "affiliate links" },
  ];
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="wrap">
        <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {items.map((item, i) => (
            <div key={i} style={{ padding: "1.5rem 1rem", borderRight: i < items.length - 1 ? "1px solid var(--border)" : "none", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-1)", letterSpacing: "-.025em" }}>{item.val}</div>
              <div style={{ fontSize: ".7rem", color: "var(--text-3)", marginTop: ".15rem" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TOOLS ─────────────────────────────────────────────────────
const tools = [
  { href: "/tools/build-recommender", icon: <Cpu size={19} />, label: "Build Recommender", title: "What should I build and run?", desc: "Enter your budget, use case, and Linux comfort level. Get specific hardware and a prioritized app list.", tags: ["Budget", "Use case", "Linux comfort"] },
  { href: "/tools/power-calculator", icon: <Zap size={19} />, label: "Power Calculator", title: "How much will this cost to run?", desc: "The highest-voted post in r/homeserver is about electricity costs. Plug in your hardware and see your monthly bill.", tags: ["CPU TDP", "Drive count", "kWh rate"] },
  { href: "/tools/app-picker", icon: <Package size={19} />, label: "App Picker", title: "Which self-hosted apps should I run?", desc: "Tell us what cloud services you pay for. See the self-hosted alternative and whether it's worth the effort.", tags: ["Your subscriptions", "Skill level"] },
  { href: "/tools/storage-planner", icon: <HardDrive size={19} />, label: "Storage Planner", title: "How much storage do I actually need?", desc: "Photos, movies, and backups grow differently. Enter what you're storing and get a 3-year projection.", tags: ["Media type", "Growth rate"] },
  { href: "/tools/hardware-identifier", icon: <Search size={19} />, label: "Hardware Identifier", title: "Got random hardware. What can I do with it?", desc: "Found something in a garage sale or office skip? Tell us what you have and we'll tell you what it's actually useful for.", tags: ["CPU model", "RAM", "Form factor"] },
  { href: "/tools/noise-estimator", icon: <Volume2 size={19} />, label: "Noise Estimator", title: "How loud will my server be?", desc: "Noise is consistently underestimated. Tell us your setup and where it's going. Find out if you'll be able to sleep.", tags: ["Fan config", "Location"] },
];

function Tools() {
  const hRef = useReveal();
  return (
    <section id="tools" className="section" style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-2)" }}>
      <div className="wrap">
        <div ref={hRef} className="reveal" style={{ marginBottom: "2.75rem" }}>
          <span className="eyebrow" style={{ marginBottom: "1rem", display: "inline-flex" }}>Free Tools</span>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)", letterSpacing: "-.025em", color: "var(--text-1)", lineHeight: 1.2, maxWidth: "32rem" }}>
            Start here if you're not sure where to start
          </h2>
          <p style={{ color: "var(--text-2)", marginTop: ".6rem", fontSize: ".9rem", lineHeight: 1.7 }}>
            Six tools that answer the questions you'll have before you've read a single guide.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: ".875rem" }}>
          {tools.map((t, i) => {
            const ref = useReveal();
            return (
              <div key={i} ref={ref} className="reveal" style={{ transitionDelay: `${i * .05}s` }}>
                <a href={t.href} className="card card-link" style={{ padding: "1.35rem", display: "flex", flexDirection: "column", gap: ".8rem", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", background: "var(--accent-dim)", border: "1px solid var(--accent-border)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0 }}>
                      {t.icon}
                    </div>
                    <ArrowUpRight size={14} color="var(--text-4)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: ".58rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--accent)", marginBottom: ".35rem" }}>{t.label}</p>
                    <h3 style={{ fontWeight: 700, fontSize: ".95rem", color: "var(--text-1)", marginBottom: ".4rem", lineHeight: 1.4 }}>{t.title}</h3>
                    <p style={{ fontSize: ".83rem", color: "var(--text-2)", lineHeight: 1.7 }}>{t.desc}</p>
                  </div>
                  <div style={{ display: "flex", gap: ".3rem", flexWrap: "wrap", marginTop: "auto" }}>
                    {t.tags.map(tag => (
                      <span key={tag} style={{ fontSize: ".63rem", fontWeight: 600, background: "var(--bg-3)", color: "var(--text-3)", border: "1px solid var(--border)", padding: ".15rem .5rem", borderRadius: "9999px" }}>{tag}</span>
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

// ── GUIDES ────────────────────────────────────────────────────
// difficulty: 1=easy, 2=moderate, 3=involved
const guides = [
  { slug: "first-server-checklist",       cat: "Start Here",        time: "5 min",  icon: <Check size={16} />,       title: "Your First Server: Step by Step",           sub: "What to do first, second, and third",                    diff: 1, ready: true,  featured: true },
  { slug: "proxmox-vs-unraid-vs-truenas", cat: "Operating Systems", time: "8 min",  icon: <Server size={16} />,      title: "Proxmox vs Unraid vs TrueNAS",               sub: "Which one should a beginner pick?",                       diff: 2, ready: true },
  { slug: "docker-for-beginners",         cat: "Docker",            time: "8 min",  icon: <Package size={16} />,     title: "Docker for Normal People",                   sub: "Every guide assumes you know this already",              diff: 1, ready: true },
  { slug: "immich-setup-guide",           cat: "Photo Backup",      time: "10 min", icon: <Camera size={16} />,      title: "Replace Google Photos with Immich",           sub: "The #1 reason people start a server",                    diff: 2, ready: false },
  { slug: "jellyfin-vs-plex",             cat: "Media Streaming",   time: "6 min",  icon: <MonitorPlay size={16} />, title: "Jellyfin vs Plex",                            sub: "Free and open source, or polished with a catch?",         diff: 1, ready: false },
  { slug: "n100-mini-pc-guide",           cat: "Hardware",          time: "7 min",  icon: <Cpu size={16} />,         title: "The N100 Mini PC Guide",                     sub: "6W idle, handles 4K, fits anywhere",                     diff: 1, ready: false },
  { slug: "expose-server-safely",         cat: "Networking",        time: "9 min",  icon: <Shield size={16} />,      title: "Access Your Server from Anywhere",            sub: "Without exposing your home network",                     diff: 2, ready: false },
  { slug: "raid-vs-backup",               cat: "Storage",           time: "6 min",  icon: <HardDrive size={16} />,   title: "RAID vs Backup",                             sub: "This confusion costs people their data",                 diff: 1, ready: false },
  { slug: "used-hardware-guide",          cat: "Hardware",          time: "7 min",  icon: <Search size={16} />,      title: "Buying Used Hardware for Your Server",        sub: "eBay, Facebook Marketplace, and office e-waste",          diff: 1, ready: false },
  { slug: "why-multiple-mini-pcs",        cat: "Architecture",      time: "6 min",  icon: <Layers size={16} />,      title: "Why Multiple Mini PCs?",                     sub: "A question that comes up a lot",                         diff: 3, ready: false },
  { slug: "self-hosting-a-website",       cat: "Hosting",           time: "10 min", icon: <Wifi size={16} />,        title: "Running a Website from Home",                sub: "What works, what doesn't, and what to use instead",      diff: 3, ready: false },
  { slug: "low-power-silent-server",      cat: "Hardware",          time: "8 min",  icon: <Zap size={16} />,         title: "Building a Silent, Low-Power Server",         sub: "What actually matters for noise and efficiency",         diff: 2, ready: false },
];

function DiffDots({ level }: { level: number }) {
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }} title={level === 1 ? "Beginner" : level === 2 ? "Moderate" : "Involved"}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ width: 5, height: 5, borderRadius: "9999px", background: i <= level ? "var(--accent)" : "var(--bg-4)" }} />
      ))}
    </div>
  );
}

function GuideCard({ g, i, featured }: { g: typeof guides[0]; i: number; featured?: boolean }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${(i % 3) * .05}s`, gridColumn: featured ? "1 / -1" : undefined }}>
      <a href={`/guides/${g.slug}`} className="card card-link" style={{ padding: featured ? "1.75rem" : "1.25rem", display: "flex", flexDirection: featured ? "row" : "column", gap: featured ? "2rem" : ".7rem", height: "100%", alignItems: featured ? "center" : undefined }}>
        {featured && (
          <div style={{ width: "3rem", height: "3rem", background: "var(--accent-dim)", border: "1px solid var(--accent-border)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0 }}>
            {g.icon}
          </div>
        )}
        {!featured && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: ".58rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--text-4)" }}>{g.cat}</span>
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              <DiffDots level={g.diff} />
              <span style={{ fontSize: ".68rem", color: "var(--text-4)" }}>{g.time}</span>
            </div>
          </div>
        )}
        {!featured && (
          <div style={{ width: "2rem", height: "2rem", background: "var(--bg-3)", border: "1px solid var(--border)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)" }}>
            {g.icon}
          </div>
        )}
        <div style={{ flex: 1 }}>
          {featured && <p style={{ fontSize: ".6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--accent)", marginBottom: ".4rem" }}>{g.cat}</p>}
          <h2 style={{ fontWeight: 700, fontSize: featured ? "1.1rem" : ".925rem", color: "var(--text-1)", marginBottom: ".25rem", lineHeight: 1.35 }}>{g.title}</h2>
          <p style={{ fontSize: featured ? ".9rem" : ".78rem", color: "var(--text-2)", lineHeight: 1.6 }}>{g.sub}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: featured ? 0 : "auto", paddingTop: featured ? 0 : ".35rem", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".25rem", fontSize: ".78rem", fontWeight: 600, color: g.ready ? "var(--accent)" : "var(--text-4)" }}>
            {g.ready ? <>Read <ChevronRight size={13} /></> : <span style={{ fontSize: ".68rem", padding: ".18rem .5rem", background: "var(--bg-3)", borderRadius: "9999px", fontWeight: 500 }}>Coming soon</span>}
          </div>
          {featured && <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}><DiffDots level={g.diff} /><span style={{ fontSize: ".72rem", color: "var(--text-4)" }}>{g.time}</span></div>}
        </div>
      </a>
    </div>
  );
}

function Guides() {
  const hRef = useReveal();
  const [showAll, setShowAll] = useState(false);
  const featured = guides[0];
  const rest = guides.slice(1);
  const visible = showAll ? rest : rest.slice(0, 8);

  return (
    <section id="guides" className="section" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="wrap">
        <div ref={hRef} className="reveal" style={{ marginBottom: "2.75rem" }}>
          <span className="eyebrow" style={{ marginBottom: "1rem", display: "inline-flex" }}>Guides</span>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)", letterSpacing: "-.025em", color: "var(--text-1)", lineHeight: 1.2 }}>
            Every question that comes up in every thread
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: ".6rem", flexWrap: "wrap" }}>
            <p style={{ color: "var(--text-2)", fontSize: ".9rem" }}>Each guide maps to a real cluster of beginner posts.</p>
            <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".35rem" }}><DiffDots level={1} /><span style={{ fontSize: ".7rem", color: "var(--text-4)" }}>Beginner</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: ".35rem" }}><DiffDots level={2} /><span style={{ fontSize: ".7rem", color: "var(--text-4)" }}>Moderate</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: ".35rem" }}><DiffDots level={3} /><span style={{ fontSize: ".7rem", color: "var(--text-4)" }}>Involved</span></div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: ".875rem" }}>
          <GuideCard g={featured} i={0} featured />
          {visible.map((g, i) => <GuideCard key={g.slug} g={g} i={i + 1} />)}
        </div>

        {!showAll && rest.length > 8 && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button onClick={() => setShowAll(true)} className="btn btn-ghost" style={{ fontSize: ".875rem" }}>
              Show {rest.length - 8} more guides <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Why() {
  const ref = useReveal();
  const items = [
    { icon: <DollarSign size={17} />, title: "You're paying for things you could run yourself", body: "Google Photos, Netflix, iCloud. A home server can replace most of them for the price of a used mini PC." },
    { icon: <Shield size={17} />, title: "Your data lives on someone else's machine", body: "Cloud services get hacked, change terms, or shut down. A server you own is a server you control." },
    { icon: <Wifi size={17} />, title: "Existing guides assume too much", body: "The official Proxmox docs are not written for someone who just got a machine from a garage sale. These are." },
  ];
  return (
    <section className="section" style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-2)" }}>
      <div className="wrap">
        <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: "var(--bg-2)", padding: "1.65rem" }}>
              <div style={{ width: "1.875rem", height: "1.875rem", background: "var(--bg-3)", border: "1px solid var(--border-2)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)", marginBottom: ".8rem" }}>{item.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: ".875rem", color: "var(--text-1)", marginBottom: ".4rem", lineHeight: 1.45 }}>{item.title}</h3>
              <p style={{ fontSize: ".83rem", color: "var(--text-3)", lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "How much does it cost to start?", a: "A used mini PC with an Intel N100 runs around $150. Add a hard drive and you're under $250 total. Running costs are roughly $3 to $5 a month in electricity, depending on where you live." },
  { q: "Do I need to know Linux?", a: "Not much. Unraid has a web interface that hides most of the Linux layer. If you can navigate a router admin page, you can use Unraid. More advanced setups ask for a bit more, but nothing a few hours of reading won't cover." },
  { q: "Is a home server reliable enough to trust with my photos?", a: "As reliable as you make it. With a proper backup strategy, a home server can be more resilient than relying on a single cloud service that can change its terms or shut down." },
  { q: "What can it actually replace?", a: "Google Photos (Immich), Netflix-style streaming (Jellyfin), iCloud Drive (Nextcloud or Syncthing), 1Password (Vaultwarden), network-wide ad blocking (Pi-hole), and dozens of other things." },
  { q: "My kid wants to set one up on free hardware. Where do they start?", a: "The First Server Checklist is the right starting point. Old or cheap hardware is fine for learning. The home server community is one of the more patient ones online." },
  { q: "What if something breaks?", a: "Things will break. The guides here cover the most common failure points. The r/homeserver community is also very helpful with beginners who've done some reading first." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const hRef = useReveal();
  return (
    <section id="faq" className="section" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="wrap" style={{ maxWidth: "50rem" }}>
        <div ref={hRef} className="reveal" style={{ marginBottom: "2.75rem" }}>
          <span className="eyebrow" style={{ marginBottom: "1rem", display: "inline-flex" }}>FAQ</span>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)", letterSpacing: "-.025em", color: "var(--text-1)", lineHeight: 1.2 }}>Before you go down the rabbit hole</h2>
        </div>
        <div itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((item, i) => (
            <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ borderBottom: "1px solid var(--border)" }}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}
                style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 0", textAlign: "left", gap: "1rem", minHeight: 44 }}>
                <span itemProp="name" style={{ fontWeight: 600, fontSize: ".9rem", color: "var(--text-1)", lineHeight: 1.45 }}>{item.q}</span>
                <ChevronRight size={16} color="var(--text-4)" style={{ flexShrink: 0, transition: "transform .3s var(--spring)", transform: open === i ? "rotate(90deg)" : "rotate(0)" }} />
              </button>
              {open === i && (
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" style={{ paddingBottom: "1.1rem" }}>
                  <p itemProp="text" style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.8 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const ref = useReveal();
  return (
    <section id="newsletter" style={{ padding: "5.5rem 1.5rem", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
      <div className="glow" style={{ width: "26rem", height: "13rem", background: "rgba(101,117,244,.07)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div className="wrap-sm" style={{ position: "relative", zIndex: 1 }}>
        <div ref={ref} className="reveal">
          <span className="eyebrow" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>Stay in the loop</span>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", letterSpacing: "-.025em", color: "var(--text-1)", marginBottom: ".7rem", lineHeight: 1.2 }}>New guides when they're ready.</h2>
          <p style={{ color: "var(--text-2)", marginBottom: "2rem", fontSize: ".875rem", lineHeight: 1.75 }}>One email per guide. No roundups, no affiliate links, no filler.</p>
          {done ? (
            <p style={{ color: "var(--green)", fontWeight: 600, fontSize: ".9rem" }}>You're in. We'll email when the next guide drops.</p>
          ) : (
            <div style={{ display: "flex", gap: ".5rem", maxWidth: "25rem", flexWrap: "wrap" }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && email && setDone(true)}
                placeholder="your@email.com" aria-label="Email address"
                style={{ flex: 1, minWidth: 155, background: "var(--surface)", border: "1px solid var(--border-2)", color: "var(--text-1)", borderRadius: "9999px", padding: ".6rem 1.1rem", fontSize: ".875rem", outline: "none", minHeight: 44 }} />
              <button onClick={() => email && setDone(true)} className="btn btn-primary" style={{ fontSize: ".875rem" }}>Subscribe</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { head: "Guides", links: [
      { l: "First Server Checklist", h: "/guides/first-server-checklist" },
      { l: "Proxmox vs Unraid vs TrueNAS", h: "/guides/proxmox-vs-unraid-vs-truenas" },
      { l: "Docker for Beginners", h: "/guides/docker-for-beginners" },
      { l: "Replace Google Photos", h: "/guides/immich-setup-guide" },
      { l: "Jellyfin vs Plex", h: "/guides/jellyfin-vs-plex" },
    ]},
    { head: "More Guides", links: [
      { l: "N100 Mini PC Guide", h: "/guides/n100-mini-pc-guide" },
      { l: "Access Server Remotely", h: "/guides/expose-server-safely" },
      { l: "RAID vs Backup", h: "/guides/raid-vs-backup" },
      { l: "Buying Used Hardware", h: "/guides/used-hardware-guide" },
      { l: "Silent Low-Power Server", h: "/guides/low-power-silent-server" },
    ]},
    { head: "Tools", links: [
      { l: "Build Recommender", h: "/tools/build-recommender" },
      { l: "Power Calculator", h: "/tools/power-calculator" },
      { l: "App Picker", h: "/tools/app-picker" },
      { l: "Storage Planner", h: "/tools/storage-planner" },
      { l: "Hardware Identifier", h: "/tools/hardware-identifier" },
      { l: "Noise Estimator", h: "/tools/noise-estimator" },
    ]},
    { head: "Site", links: [
      { l: "About", h: "/about" },
      { l: "Contact", h: "/contact" },
      { l: "Privacy", h: "/privacy" },
    ]},
  ];
  return (
    <footer style={{ padding: "3.5rem 1.5rem 2.5rem" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "2rem", marginBottom: "2.5rem" }}>
          <div>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: ".5rem", textDecoration: "none", marginBottom: ".875rem" }}>
              <div style={{ width: 24, height: 24, background: "var(--accent)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}><Server size={13} color="white" /></div>
              <span style={{ fontWeight: 700, fontSize: ".875rem", color: "var(--text-1)" }}>NASforBeginners</span>
            </a>
            <p style={{ fontSize: ".78rem", color: "var(--text-3)", lineHeight: 1.65, maxWidth: "14rem" }}>Home server guides for people who are actually new to this.</p>
          </div>
          {cols.map(col => (
            <div key={col.head}>
              <p style={{ fontSize: ".6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--text-4)", marginBottom: ".8rem" }}>{col.head}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".4rem" }}>
                {col.links.map(l => (
                  <li key={l.l}><a href={l.h} style={{ fontSize: ".78rem", color: "var(--text-3)", textDecoration: "none", lineHeight: 1.4, transition: "color .2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
                  >{l.l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".75rem" }}>
          <p style={{ fontSize: ".7rem", color: "var(--text-4)" }}>Not affiliated with Reddit, Proxmox, Unraid, or any hardware vendor.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <TrustBar />
        <Tools />
        <Why />
        <Guides />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
