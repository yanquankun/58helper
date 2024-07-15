import zhoubao from "../plugins/weekNewsPlugin";
import * as vscode from "vscode";

let zbtimerId: NodeJS.Timeout | null = null;
const zbtimer = zhoubao();

// 周报关闭提醒注册
const closeZbNotice = () =>
  vscode.commands.registerCommand("58-close-zb-notice", () => {
    try {
      console.log("58helper 周报提醒关闭");
      zbtimerId && clearInterval(zbtimerId);
      vscode.window.showInformationMessage(
        "已关闭周报提醒，重新打开可通过command+shift+p选中[58helper打开周报提醒]进行打开"
      );
    } catch (error) {
      console.log(`58helper 周报提醒关闭错误：${error}`);
    }
  });

// 打开周报提醒注册
const openZbNotice = () =>
  vscode.commands.registerCommand("58-open-zb-notice", () => {
    try {
      console.log("58helper 周报提醒打开");
      // 周报注册
      zbtimerId = zbtimer();
    } catch (error) {
      console.log(`58helper 周报提醒打开错误：${error}`);
    }
  });

export { zbtimerId, closeZbNotice, openZbNotice };
