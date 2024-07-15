import * as vscode from "vscode";
import { getLibraryWebviewContent } from "../views/libraryView";
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
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, "dist")),
        ],
      }
    );

    if (libraryIns && ins != libraryIns) {
      libraryIns.dispose();
    }

    const indexPath = vscode.Uri.file(
      path.join(context.extensionPath, "dist", "index.html")
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

function getWebviewContent(
  webview: vscode.Webview,
  indexPath: vscode.Uri
): Promise<string> {
  const html = fs.readFileSync(indexPath.fsPath, "utf8");
  const baseUri = webview.asWebviewUri(
    vscode.Uri.file(path.join(indexPath.fsPath, ".."))
  );
  return Promise.resolve(
    html.replace(/<head>/, `<head><base href="${baseUri}/">`)
  );
}

export { registerGptView, registerLibraryCommandAndView };
