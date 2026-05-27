import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docker Explained for Normal People",
  description: "Every home server guide assumes you already know Docker. This one explains it from scratch, in plain English, without jargon.",
};

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", fontFamily: "'Lora', Georgia, serif" }}>
      <header style={{ borderBottom: "1px solid var(--border)", padding: "0 1.5rem", position: "sticky", top: 0, background: "rgba(247,245,240,0.92)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", height: "3.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <div style={{ width: "26px", height: "26px", background: "var(--ink)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "var(--ink)", letterSpacing: "-0.02em" }}>NASforBeginners</span>
          </a>
          <a href="/#guides" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "var(--ink-3)", textDecoration: "none" }}>All guides</a>
        </div>
      </header>
      <main id="main" style={{ padding: "3.5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "var(--ink-4)" }}>
              <a href="/" style={{ color: "var(--ink-4)", textDecoration: "none" }}>Home</a>{" / "}
              <a href="/#guides" style={{ color: "var(--ink-4)", textDecoration: "none" }}>Guides</a>{" / "}
              <span style={{ color: "var(--ink-3)" }}>Docker for Beginners</span>
            </p>
          </nav>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0891b2", marginBottom: "0.875rem" }}>Docker</p>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: "0.875rem" }}>
            Docker Explained for Normal People
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--ink-2)", marginBottom: "0.875rem", lineHeight: 1.7 }}>
            Every home server guide assumes you already know this. This one does not.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "var(--ink-4)" }}>8 min read</span>
            <span style={{ color: "var(--border-dark)" }}>|</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "var(--ink-4)" }}>Last updated May 2026</span>
          </div>

          <div style={{ background: "var(--bg-warm)", border: "1px solid var(--border)", borderLeft: "3px solid #0891b2", borderRadius: "0 6px 6px 0", padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0891b2", marginBottom: "0.5rem" }}>The one-sentence version</p>
            <p style={{ fontSize: "0.975rem", color: "var(--ink-2)", lineHeight: 1.7, margin: 0 }}>
              Docker runs apps in isolated boxes so they cannot interfere with each other, and you can start,
              stop, update, or delete any one of them without touching the rest of your system.
            </p>
          </div>

          <div className="prose">
            <h2>Why Docker exists</h2>
            <p>
              Before Docker, installing an app on a server meant installing its dependencies directly onto
              your operating system. App A needs Python 3.8. App B needs Python 3.11. They conflict.
              One of them breaks. You spend an afternoon figuring out why.
            </p>
            <p>
              Docker solves this by packaging each app with everything it needs: the right version of Python,
              its libraries, its config files. Everything. The package is called a container.
              Containers run in isolation. App A never even sees App B's Python.
            </p>

            <h2>Containers vs virtual machines</h2>
            <p>
              A virtual machine is a full copy of an operating system running inside your operating system.
              It is isolated, but it is heavy: each VM might use 2GB of RAM just for overhead.
            </p>
            <p>
              A Docker container shares your OS kernel. It is much lighter. You can run 10 containers
              on a machine that would struggle with 3 virtual machines. For running apps like Jellyfin
              or Immich, containers are almost always the right choice.
            </p>

            <h2>The vocabulary you will see everywhere</h2>
            <p>
              <strong>Image:</strong> A blueprint for a container. The Jellyfin image contains everything needed
              to run Jellyfin. You download it once; it sits on disk.
            </p>
            <p>
              <strong>Container:</strong> A running instance of an image. You can run the same image as
              multiple containers, though for home servers you usually run one of each.
            </p>
            <p>
              <strong>Volume:</strong> A folder on your actual hard drive that the container can read and write.
              This is where your data lives. When you delete a container, the volume survives.
              When you update a container, the data is still there.
            </p>
            <p>
              <strong>Port:</strong> Containers are isolated, so they cannot just accept web traffic from your browser
              without permission. You map a port on your machine to a port inside the container.
              Jellyfin runs on port 8096 inside the container; you might map your machine's port 8096 to it.
              Then you go to <code>http://yourserverip:8096</code> and Jellyfin loads.
            </p>
            <p>
              <strong>Docker Compose:</strong> Instead of typing a long command to start a container every time,
              you write a <code>docker-compose.yml</code> file that describes what the container needs.
              One command (<code>docker compose up -d</code>) starts everything.
            </p>

            <h2>A real example</h2>
            <p>Here is a minimal Docker Compose file for Jellyfin:</p>
          </div>

          <div style={{ background: "var(--ink)", borderRadius: "8px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", overflowX: "auto" }}>
            <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", color: "#e5e7eb", lineHeight: 1.7, margin: 0 }}>{`services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    ports:
      - "8096:8096"
    volumes:
      - /opt/jellyfin/config:/config
      - /mnt/media:/media
    restart: unless-stopped`}</pre>
          </div>

          <div className="prose">
            <p>
              Line by line: use the official Jellyfin image, call the container "jellyfin",
              expose port 8096, store config in <code>/opt/jellyfin/config</code> on your drive,
              point it at your media folder, and restart automatically if the server reboots.
            </p>
            <p>
              Save that as <code>docker-compose.yml</code>, run <code>docker compose up -d</code>
              from the same folder, and Jellyfin is running. No installer, no wizard, no package conflicts.
            </p>

            <h2>What "restart: unless-stopped" means</h2>
            <p>
              It means the container will restart automatically when your server reboots, unless
              you explicitly stopped it yourself. This is what you want for services you run permanently.
              Without it, you would have to manually start every container after a reboot.
            </p>

            <h2>Updating a container</h2>
            <p>
              Pull the new image, then recreate the container:
            </p>
          </div>

          <div style={{ background: "var(--ink)", borderRadius: "8px", padding: "1rem 1.5rem", marginBottom: "1.5rem" }}>
            <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", color: "#e5e7eb", margin: 0 }}>{`docker compose pull
docker compose up -d`}</pre>
          </div>

          <div className="prose">
            <p>
              Your data (in volumes) is untouched. The container gets the new version.
              That is the whole update process for most apps.
            </p>

            <h2>Where does Unraid fit in?</h2>
            <p>
              Unraid has a GUI for Docker. You fill in a form, it generates the compose-equivalent config for you.
              You never write a compose file by hand. That is most of what you are paying for with Unraid:
              a web interface that makes Docker approachable without a command line.
            </p>
            <p>
              If you use plain Debian or Ubuntu, you manage Docker yourself via the command line or
              a tool like Portainer (which gives you a web UI for free).
            </p>
          </div>

          <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--bg-warm)", border: "1px solid var(--border)", borderRadius: "8px" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-3)", marginBottom: "0.5rem" }}>Read next</p>
            <a href="/guides/immich-setup-guide" style={{ textDecoration: "none" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "var(--ink)", marginBottom: "0.3rem" }}>Replace Google Photos with Immich</p>
              <p style={{ fontSize: "0.875rem", color: "var(--ink-3)" }}>Your first real Docker container. This one is worth it.</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
