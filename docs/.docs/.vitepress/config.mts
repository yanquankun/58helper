import { defineConfig } from "vitepress";
import path from "path";
import { fileURLToPath, URL } from "node:url";

const docsRoot = process.cwd();
const buildPath = path.relative(docsRoot, "../../out/docs");
// https://vitepress.dev/reference/site-config
export default defineConfig({
    vite: {
        resolve: {
            alias: [
                {
                    find: /^.*\/VPNavBar\.vue$/,
                    replacement: fileURLToPath(
                        new URL(
                            "./components/CustomNavBar.vue",
                            import.meta.url
                        )
                    ),
                },
            ],
        },
    },
    base: "./",
    outDir: buildPath,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
    },
    async transformHead(context) {
        const head = context.head;
        //
        head.unshift([
            "meta",
            {
                "http-equiv": "Content-Security-Policy",
                content:
                    "script-src ${webview.cspSource}; style-src ${webview.cspSource};",
            },
        ]);
    },
});
