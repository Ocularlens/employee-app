import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 9090,
    strictPort: true,
  },
  server: {
    port: 9090,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:9090",
  },
});