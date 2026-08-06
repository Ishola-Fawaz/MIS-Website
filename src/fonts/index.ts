import localFont from "next/font/local";

export const clashDisplay = localFont({
  src: [
    { path: "./ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const satoshi = localFont({
  src: [
    { path: "./Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});
