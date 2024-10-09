import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // port 3000
  server: {
    host: true,
    port: 3000,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3001",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""), // Optional rewrite if your backend routes don't include /api
    //   },
    // },
  },
});
