import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0c",
          color: "#f0b429",
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: -2,
          borderRadius: 14,
        }}
      >
        NF
      </div>
    ),
    size,
  );
}
