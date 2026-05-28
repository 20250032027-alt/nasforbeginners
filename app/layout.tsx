import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nasforbeginners.com"),
  title: {
    template: "%s | NASforBeginners",
    default: "NASforBeginners — Build Your First Home Server",
  },
  description: "Plain-English guides for building your first home server. Covers Proxmox, Jellyfin, Immich, Docker, and more. No sysadmin experience needed.",
  openGraph: {
    siteName: "NASforBeginners",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const jsonLd = [
  { "@context": "https://schema.org", "@type": "WebSite", name: "NASforBeginners", url: "https://nasforbeginners.com" },
  { "@context": "https://schema.org", "@type": "Organization", name: "NASforBeginners", url: "https://nasforbeginners.com" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
