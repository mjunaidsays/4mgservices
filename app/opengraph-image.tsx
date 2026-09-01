import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card. Generated at build time, so link previews stay on brand
 * without anyone maintaining an image file.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #050d21 0%, #12305f 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              border: "3px solid rgba(255,255,255,0.85)",
              borderRadius: 8,
            }}
          />
          <div
            style={{
              color: "#ffffff",
              fontSize: 30,
              letterSpacing: "0.04em",
              fontWeight: 600,
            }}
          >
            4M GLOBAL SERVICES
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ff6b1a",
              fontSize: 26,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Logistics · Technology · Design
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 48,
              lineHeight: 1.15,
              marginTop: 20,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {siteConfig.tagline}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 30,
              marginTop: 24,
            }}
          >
            UAE &amp; Pakistan · Worldwide network
          </div>
        </div>
      </div>
    ),
    size,
  );
}
