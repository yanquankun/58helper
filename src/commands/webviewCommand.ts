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

let libraryIns: vscode.WebviewPanel | null = null;
const registerLibraryCommandAndView = (context: vscode.ExtensionContext) => {
  return vscode.commands.registerCommand("58-open-library", async () => {
    const ins = vscode.window.createWebviewPanel(
      // 相当于webview的id
      "library-view",
      "58基建手册",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(__dirname, "../web"))],
      }
    );

    if (libraryIns && ins != libraryIns) {
      libraryIns.dispose();
    }

    const indexPath = vscode.Uri.file(
      path.join(__dirname, "../web", "index.html")
    );
    ins.webview.html = await getWebviewContent(ins.webview, indexPath);
    libraryIns = ins;

    ins.onDidDispose(
      () => {
        console.log("library view close");
      },
      null,
      context.subscriptions
    );
  });
};

export { registerGptView, registerLibraryCommandAndView };
