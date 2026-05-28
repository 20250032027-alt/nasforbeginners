import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nasforbeginners.com"),
  title: {
    template: "%s | NASforBeginners",
    default: "NASforBeginners — Build Your First Home Server",
  },
  description: "Plain-English guides for building your first home server. No sysadmin experience needed. Covers Proxmox, Jellyfin, Immich, Docker, and more.",
  keywords: "home server beginner, NAS guide, Proxmox tutorial, Jellyfin setup, Immich Google Photos, self-hosting, N100 mini PC, Docker beginners",
  openGraph: {
    siteName: "NASforBeginners",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NASforBeginners",
  url: "https://nasforbeginners.com",
  description: "Plain-English home server guides for beginners.",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NASforBeginners",
  url: "https://nasforbeginners.com",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,900&family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
