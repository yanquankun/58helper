import { defineConfig } from "vitepress";
import path from "path";

const docsRoot = process.cwd();
console.log(docsRoot);
const buildPath = path.relative(docsRoot, "../../out/docs");
// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: "./",
    outDir: buildPath,
    titleTemplate: false,
    title: "",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
    },
});
