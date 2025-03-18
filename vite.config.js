import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/allchartdata": {
        // /search, /stockdata 등 다른 API 경로도 추가 가능
        target: "http://localhost:5000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/allchartdata/, ''), // 필요하다면 경로 재작성
      },
    },
  },
});
