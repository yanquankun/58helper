const vscode = require("vscode");
const zhoubao = require("./plugins/zhoubao");
const zbtimer = zhoubao();
let zbtimerId = null;
let pluginInstalled = false;

function refreshVSCode() {
  // 重新加载VSCode
  vscode.commands.executeCommand("workbench.action.reloadWindow");
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("58-helper插件打开");

  // 检查插件是否已安装
  if (!pluginInstalled) {
    // 如果未安装，显示提示并记录已安装
    const message = "检测到安装了58-helper插件，请点击刷新按钮重置vscode";
    const commandId = "58-vscode-restart";
    vscode.window
      .showInformationMessage(message, "reload")
      .then((selection) => {
        pluginInstalled = true;
        if (selection === "reload") {
          setTimeout(() => {
            refreshVSCode();
          }, 3000);
          context.subscriptions.push(
            vscode.commands.registerCommand(commandId, () => {
              refreshVSCode();
            })
          );
        }
      });
  }

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
