import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const isReplit =
  process.env.REPL_ID !== undefined &&
  process.env.NODE_ENV !== "production";

export default defineConfig({
  root: path.resolve(__dirname, "client"),

  plugins: [
    react(),
    runtimeErrorOverlay(),

    ...(isReplit
      ? [
          require("@replit/vite-plugin-cartographer").cartographer(),
          require("@replit/vite-plugin-dev-banner").devBanner(),
        ]
      : []),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true
  },

  server: {
    fs: {
      strict: true
    }
  }
});
