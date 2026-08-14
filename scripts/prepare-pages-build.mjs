#!/usr/bin/env node
// GitHub Pages 部署准备：SPA 深链接回退。
// GitHub Pages 对未命中路径会返回 404.html；复制构建后的 index.html，
// 使 /student、/manager 等路由在直接访问时也能加载应用。
import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const index = path.join(root, "dist", "client", "index.html");

if (!existsSync(index)) {
  throw new Error("dist/client/index.html not found — run vite build first");
}

copyFileSync(index, path.join(root, "dist", "client", "404.html"));
console.log("Prepared GitHub Pages fallback: dist/client/404.html");
