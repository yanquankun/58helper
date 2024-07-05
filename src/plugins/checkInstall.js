const vscode = require("vscode");
let isInsall58Helper = false;

module.exports = exports = async function (cb) {
  // 获取已安装插件的标识符列表
  const installedExtensions = await vscode.extensions.all;

  // 打印已安装插件的标识符
  for (let i = 0; i < installedExtensions.length; i++) {
    const extension = installedExtensions[i];
    if (extension.id.indexOf("58-helper") > -1 && cb) {
      !isInsall58Helper &&
        vscode.window
          .showWarningMessage(
            "安装58helper插件成功，请点击重启按钮重启vscode",
            "reload"
          )
          .then((selection) => {
            if (selection === "reload") {
              isInsall58Helper = true;
              cb();
            }
          });
    }
  }
};
