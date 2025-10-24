import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgLoader from "vite-svg-loader";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgLoader()],
  server: {
    port: 5000, // Customize dev server port
    host: true,
    open: true,
  },
});
