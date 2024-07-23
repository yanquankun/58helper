import * as vscode from "vscode";
import * as weekNewsHook from "./commands/weekNewsCommand";
import * as restartHook from "./commands/restartCommand";
import * as webviewHook from "./commands/webviewCommand";

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {
  console.log("58-helper插件打开");

  vscode.window.showWarningMessage("58-helper插件打开", "reload");

  // gptview注册
  const gptView = webviewHook.registerGptView(context);

  // web容器注册
  const webView = webviewHook.registerWebCommandAndView(context);

  // docs容器注册
  const docsView = webviewHook.registerDocsCommandAndView(context);

  // 周报关闭提醒注册
  const closeZbNotice = weekNewsHook.closeZbNotice();

  // 打开周报提醒注册
  const openZbNotice = weekNewsHook.openZbNotice();

  // 重启注册
  const registerRestart = restartHook.registerRestart();

  context.subscriptions.push(
    gptView,
    webView,
    docsView,
    closeZbNotice,
    openZbNotice,
    registerRestart
  );
}

export function deactivate() {
  console.log("58helper插件关闭");
  weekNewsHook.zbtimerId &&
    clearInterval(weekNewsHook.zbtimerId as NodeJS.Timeout);
  console.log("58helper 周报提醒关闭");
}
