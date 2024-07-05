const vscode = require("vscode");
const zhoubao = require("./plugins/zhoubao");
const zbtimer = zhoubao();
let zbtimerId = null;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("58-helper插件打开");

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
