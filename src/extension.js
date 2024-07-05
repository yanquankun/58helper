const vscode = require("vscode");
const zhoubao = require("./plugins/zhoubao");
const zbtimer = zhoubao();
const checkInstall = require("./plugins/checkInstall");
let zbtimerId = null;

function refreshVSCode() {
  // 重新加载VSCode
  vscode.commands.executeCommand("workbench.action.reloadWindow");
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("58-helper插件打开");

  // 安装后检测本插件
  checkInstall(refreshVSCode);

  // 周报注册
  zbtimerId = zbtimer();

  // 周报关闭提醒注册
  const closeZbNotice = vscode.commands.registerCommand(
    "58-close-zb-notice",
    () => {
      try {
        console.log("58helper 周报提醒关闭");
        zbtimerId && clearInterval(zbtimerId);
      } catch (error) {
        console.log(`58helper 周报提醒关闭错误：${error}`);
      }
    }
  );

  // reload vscodce plugin
  vscode.commands.registerCommand("58-vscode-restart", () => {
    refreshVSCode();
  });

  context.subscriptions.push(closeZbNotice);
}

function deactivate() {
  console.log("58helper插件关闭");
  zbtimerId && clearInterval(zbtimerId);
  console.log("58helper 周报提醒关闭");
}

module.exports = {
  activate,
  deactivate,
};
