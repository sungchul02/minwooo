import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/minwooo/",  // ⭐ repo 이름 그대로 써야 함!
});
