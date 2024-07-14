import { ChatViewProvider } from "./views/gptView";
import * as vscode from "vscode";
const weekNewsHook = require("./commands/weekNewsCommand");
const restartHook = require("./commands/restartCommand");

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {
  console.log("58-helper插件打开");

  vscode.window.showWarningMessage("58-helper插件打开", "reload");

  // context.subscriptions.push(
  //   vscode.window.registerWebviewViewProvider(
  //     "GPT.GPTV",
  //     new ChatViewProvider(context)
  //   )
  // );

  // 周报关闭提醒注册
  const closeZbNotice = weekNewsHook.closeZbNotice();

  // 打开周报提醒注册
  const openZbNotice = weekNewsHook.openZbNotice();

  // 重启注册
  const registerRestart = restartHook.registerRestart();

  context.subscriptions.push(closeZbNotice, openZbNotice, registerRestart);
}

export function deactivate() {
  console.log("58helper插件关闭");
  weekNewsHook.zbtimerId && clearInterval(weekNewsHook.zbtimerId);
  console.log("58helper 周报提醒关闭");
}
