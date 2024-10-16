import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // port 3000
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
  preview: {
    port: 3000,
    host: true,
  },
});
