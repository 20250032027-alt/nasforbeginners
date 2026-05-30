"use client";
import { useState } from "react";
import { ArrowLeft, Search, ChevronRight } from "lucide-react";
import { PageHeader } from "@/app/_guide-nav";

type Result = { verdict: string; rating: "great" | "good" | "limited" | "skip"; uses: string[]; avoid: string[]; note: string };

function assess(cpu: string, ram: number, year: number, formFactor: string): Result {
  const cpuL = cpu.toLowerCase();
  const isXeon = cpuL.includes("xeon");
  const isAtom = cpuL.includes("atom") || cpuL.includes("celeron n");
  const isCore = cpuL.includes("core i") || cpuL.includes("ryzen");
  const isN100 = cpuL.includes("n100") || cpuL.includes("n305") || cpuL.includes("n200");
  const isTower = formFactor === "tower";
  const isMini = formFactor === "mini" || formFactor === "nuc";

  if (isAtom || (year < 2015 && !isXeon)) return {
    verdict: "Probably not worth it for a 24/7 server.",
    rating: "skip",
    uses: ["Light Pi-hole DNS server if power draw is under 10W", "Learning testbed — fine to experiment on"],
    avoid: ["Jellyfin transcoding", "Running more than 2-3 Docker containers", "Anything that needs to be reliable"],
    note: `Older Atom and Celeron chips from before 2015 often idle at 20-40W without doing much useful work. Check the actual power draw with a kill-a-watt meter before committing to running it 24/7.`,
  };

  if (isXeon && ram >= 32) return {
    verdict: "Solid workhorse. Loud and power-hungry, but capable.",
    rating: "good",
    uses: ["Proxmox with multiple VMs", "Jellyfin with transcoding", "Full self-hosted stack", "Learning environment"],
    avoid: ["Anything requiring silence", "Rooms where you sleep"],
    note: `Xeon machines from enterprise e-waste are some of the best value in home servers, but they run hot and loud. Budget $5-12/month in electricity. Put it in a closet or spare room.`,
  };

  if (isN100 || isMini) return {
    verdict: "Near-perfect for most home server workloads.",
    rating: "great",
    uses: ["Jellyfin with hardware transcoding (Intel Quick Sync)", "Immich photo backup", "Full Docker stack", "Pi-hole, Vaultwarden, Nextcloud", "24/7 operation without guilt"],
    avoid: ["Running more than 2-3 Jellyfin 4K streams simultaneously", "Heavy AI/ML workloads"],
    note: `N100 and similar mini PCs are the community's current favorite for good reason. 6-15W idle, near-silent, handles everything most people need. If you have one of these, you're in good shape.`,
  };

  if (isCore && ram >= 16) return {
    verdict: "Capable. More than enough for everything a beginner needs.",
    rating: "great",
    uses: ["Full self-hosted stack", "Multiple Jellyfin streams", "Immich with face recognition", "Development server"],
    avoid: ["Nothing significant — this hardware is genuinely good"],
    note: `Modern Core i3/i5/i7 and Ryzen machines have more than enough CPU for home server work. The main question is power draw. A T-series or laptop chip makes this much cheaper to run than a desktop chip.`,
  };

  return {
    verdict: "Workable, depending on your goals.",
    rating: "good",
    uses: ["Basic NAS and file sharing", "Pi-hole", "Light Docker containers"],
    avoid: ["Jellyfin transcoding", "Immich face recognition at scale"],
    note: `Without more specific information, it's hard to say exactly what this hardware can handle. Try it and watch CPU usage — if it's consistently over 80% at idle, it's probably not the right fit.`,
  };
}

const ratingColor = { great: "var(--green)", good: "var(--accent)", limited: "var(--amber)", skip: "var(--red)" } as const;
const ratingLabel = { great: "Great fit", good: "Good fit", limited: "Limited", skip: "Skip it" } as const;

export default function HardwareIdentifier() {
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState(8);
  const [year, setYear] = useState(2018);
  const [form, setForm] = useState("mini");
  const [result, setResult] = useState<Result | null>(null);

  const forms = [
    { v: "mini", l: "Mini PC / NUC" },
    { v: "tower", l: "Desktop Tower" },
    { v: "laptop", l: "Old Laptop" },
    { v: "server", l: "Server / Rack" },
  ];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-1)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <PageHeader section="Hardware Identifier" />
      <main id="main" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div className="wrap-sm">
                    <div style={{ marginBottom: "2rem" }}>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", color: "var(--text-3)", textDecoration: "none", fontSize: ".78rem", fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
            >
              <ArrowLeft size={13} /> Back to home
            </a>
          </div>
          <span className="eyebrow" style={{ marginBottom: "1rem", display: "inline-flex" }}>Hardware Identifier</span>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 5vw, 2.25rem)", letterSpacing: "-.025em", color: "var(--text-1)", marginBottom: ".65rem", lineHeight: 1.2 }}>
            Got random hardware. What can I do with it?
          </h1>
          <p style={{ color: "var(--text-2)", marginBottom: "2.5rem", lineHeight: 1.75, fontSize: ".9rem" }}>
            Found something in a garage sale, pulled it from an office skip, or got handed an old machine. Tell us what you have and we'll tell you what it's actually useful for.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem", marginBottom: "2rem" }}>
            <div>
              <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>CPU model</label>
              <input type="text" value={cpu} onChange={e => setCpu(e.target.value)} placeholder="e.g. Intel Core i5-8500, Xeon E5-2678 v3, N100..."
                style={{ width: "100%", padding: ".65rem 1rem", background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: "var(--radius)", fontSize: ".875rem", color: "var(--text-1)", outline: "none", minHeight: 44 }} />
            </div>
            <div>
              <label style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>
                <span>RAM</span><span style={{ color: "var(--text-1)" }}>{ram}GB</span>
              </label>
              <input type="range" min={2} max={128} step={2} value={ram} onChange={e => setRam(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
            </div>
            <div>
              <label style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>
                <span>Approximate year</span><span style={{ color: "var(--text-1)" }}>{year}</span>
              </label>
              <input type="range" min={2008} max={2025} step={1} value={year} onChange={e => setYear(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".5rem" }}>Form factor</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".4rem" }}>
                {forms.map(f => (
                  <button key={f.v} onClick={() => setForm(f.v)}
                    style={{ padding: ".6rem .875rem", borderRadius: "var(--radius)", fontSize: ".82rem", fontWeight: 500, cursor: "pointer", textAlign: "left", transition: "all .2s", minHeight: 44, background: form === f.v ? "var(--accent-dim)" : "var(--surface)", border: `1px solid ${form === f.v ? "var(--accent-border)" : "var(--border)"}`, color: form === f.v ? "var(--accent)" : "var(--text-2)" }}>
                    {f.l}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => cpu && setResult(assess(cpu, ram, year, form))}
              className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
              <Search size={15} /> Assess this hardware
            </button>
          </div>

          {result && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
              <div style={{ padding: "1.35rem 1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                <p style={{ fontWeight: 700, fontSize: ".975rem", color: "var(--text-1)", lineHeight: 1.5, maxWidth: "34rem" }}>{result.verdict}</p>
                <span style={{ fontWeight: 700, fontSize: ".72rem", padding: ".25rem .65rem", borderRadius: "9999px", background: `${ratingColor[result.rating]}18`, color: ratingColor[result.rating], border: `1px solid ${ratingColor[result.rating]}33`, flexShrink: 0 }}>
                  {ratingLabel[result.rating]}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0 }}>
                <div style={{ padding: "1.25rem 1.5rem", borderRight: "1px solid var(--border)" }}>
                  <p style={{ fontSize: ".68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--green)", marginBottom: ".65rem" }}>Good for</p>
                  {result.uses.map((u, i) => <p key={i} style={{ fontSize: ".83rem", color: "var(--text-2)", marginBottom: ".35rem", lineHeight: 1.55, display: "flex", gap: ".4rem" }}><span style={{ color: "var(--green)", flexShrink: 0 }}>+</span>{u}</p>)}
                </div>
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <p style={{ fontSize: ".68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--red)", marginBottom: ".65rem" }}>Not great for</p>
                  {result.avoid.map((u, i) => <p key={i} style={{ fontSize: ".83rem", color: "var(--text-2)", marginBottom: ".35rem", lineHeight: 1.55, display: "flex", gap: ".4rem" }}><span style={{ color: "var(--red)", flexShrink: 0 }}>-</span>{u}</p>)}
                </div>
              </div>
              <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border)", background: "var(--bg-3)" }}>
                <p style={{ fontSize: ".82rem", color: "var(--text-3)", lineHeight: 1.65 }}>{result.note}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
