const vscode = require("vscode");

function refreshVSCode() {
  // 重新加载VSCode
  vscode.commands.executeCommand("workbench.action.reloadWindow");
}

module.exports = exports = {
  // reload vscodce plugin
  registerRestart: () =>
    vscode.commands.registerCommand("58-vscode-restart", () => {
      refreshVSCode();
    }),
};
