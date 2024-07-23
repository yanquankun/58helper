import * as vscode from "vscode";
import { getWebviewContent } from "../utils/util";
import { ChatViewProvider } from "../views/gptView";
const fs = require("fs");
const path = require("path");

const registerGptView = (context: vscode.ExtensionContext) => {
    return vscode.window.registerWebviewViewProvider(
        "GPT.GPTV",
        new ChatViewProvider(context)
    );
};

let webIns: vscode.WebviewPanel | null = null;
const registerWebCommandAndView = (context: vscode.ExtensionContext) => {
    return vscode.commands.registerCommand("58-open-web", async () => {
        const ins = vscode.window.createWebviewPanel(
            // 相当于webview的id
            "web-view",
            "webview",
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(__dirname, "../web")),
                ],
            }
        );

        if (webIns && ins != webIns) {
            webIns.dispose();
        }

        const indexPath = vscode.Uri.file(
            path.join(__dirname, "../web", "index-prod.html")
        );
        ins.webview.html = await getWebviewContent(ins.webview, indexPath);
        webIns = ins;

        ins.onDidDispose(
            () => {
                console.log("library view close");
            },
            null,
            context.subscriptions
        );
    });
};

let docsIns: vscode.WebviewPanel | null = null;
const registerDocsCommandAndView = (context: vscode.ExtensionContext) => {
    return vscode.commands.registerCommand("58-open-docs", async () => {
        const ins = vscode.window.createWebviewPanel(
            // 相当于webview的id
            "docs-view",
            "webview",
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(__dirname, "../docs")),
                ],
            }
        );

        if (docsIns && ins != docsIns) {
          docsIns.dispose();
        }

        const indexPath = vscode.Uri.file(
            path.join(__dirname, "../docs", "index.html")
        );
        ins.webview.html = await getWebviewContent(ins.webview, indexPath);
        docsIns = ins;

        ins.onDidDispose(
            () => {
                console.log("docs view close");
            },
            null,
            context.subscriptions
        );
    });
};

export {
    registerGptView,
    registerWebCommandAndView,
    registerDocsCommandAndView,
};
