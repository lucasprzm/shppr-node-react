import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 80,
    strictPort: true,
  },
  server: {
    port: 80,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:80",
  },
});
