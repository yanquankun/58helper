import * as vscode from "vscode";
import { getLibraryWebviewContent } from "../views/libraryView";
import { ChatViewProvider } from "../views/gptView";

const registerGptView = (context) => {
  return vscode.window.registerWebviewViewProvider(
    "GPT.GPTV",
    new ChatViewProvider(context)
  );
};

const registerLibraryCommandAndView = () => {
  return vscode.commands.registerCommand("58-open-library", () => {
    const panel = vscode.window.createWebviewPanel(
      "catCoding",
      "Cat Coding",
      vscode.ViewColumn.One,
      {}
    );

    // And set its HTML content
    panel.webview.html = getLibraryWebviewContent();
  });
};

export { registerGptView, registerLibraryCommandAndView };
