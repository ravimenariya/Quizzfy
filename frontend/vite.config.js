import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "a22c1a71-1185-4cd8-8c42-fcbd8860ad1b-00-3i5bf3mpfkyu.sisko.replit.dev", // Add the host here
    ],
  },
});
