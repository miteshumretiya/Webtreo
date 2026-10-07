import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Webtreo — Web design & development studio",
    short_name: "Webtreo",
    description: "Fast, conversion-focused websites for startups and growing brands.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf8",
    theme_color: "#fbfaf8",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
