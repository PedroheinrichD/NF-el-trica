import { ImageResponse } from "next/og";
import { business } from "@/content/site";

export const alt = `${business.name}, instalações elétricas em Arujá`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Prévia que aparece quando o link é enviado no WhatsApp. */
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
          padding: 72,
          background: "#0b0b0c",
          color: "#f1efe9",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#f0b429" }}>
          {business.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            Sua obra com a
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: "#f0b429",
            }}
          >
            elétrica resolvida.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a6a39b" }}>
          Orçamento pelo WhatsApp {business.whatsapp.display}
        </div>
      </div>
    ),
    size,
  );
}
