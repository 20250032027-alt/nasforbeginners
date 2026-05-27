"use client";
import { ArrowLeft } from "lucide-react";
export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "42rem", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
          <ArrowLeft size={14} /> Back to guides
        </a>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>Guide coming soon</h1>
        <p style={{ color: "var(--text-secondary)" }}>This guide is being written. Subscribe on the homepage to get notified.</p>
        <a href="/" style={{ display: "inline-flex", marginTop: "2rem", color: "#60a5fa", textDecoration: "none", fontSize: "0.875rem" }}>Back to homepage</a>
      </div>
    </div>
  );
}
