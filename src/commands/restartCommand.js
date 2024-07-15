import * as vscode from "vscode";

function refreshVSCode() {
  // 重新加载VSCode
  vscode.commands.executeCommand("workbench.action.reloadWindow");
}

// reload vscodce plugin
const registerRestart = () =>
  vscode.commands.registerCommand("58-vscode-restart", () => {
    refreshVSCode();
  });

export { registerRestart };
