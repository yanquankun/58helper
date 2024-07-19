import * as vscode from "vscode";
const fs = require("fs");
const path = require("path");

/**
 * 2024-07-16 10:28:50
 * @author Mint.Yan
 * @description 获取indexPath路径下的html模板
 * @param {vscode.Webview } webview
 * @param {vscode.Uri } indexPath
 * @return string
 */
export function getWebviewContent(
  webview: vscode.Webview,
  indexPath: vscode.Uri
): Promise<string> {
  const html = fs.readFileSync(indexPath.fsPath, "utf8");
  const baseUri = webview.asWebviewUri(
    vscode.Uri.file(path.join(indexPath.fsPath, ".."))
  );
  return Promise.resolve(
    html
      .replace(/<head>/, `<head><base href="${baseUri}/">`)
      // 转换vscode安全协议 支持在vscode内部切换路由
      .replace(/\$\{webview.cspSource}/g, webview.cspSource)
  );
}
