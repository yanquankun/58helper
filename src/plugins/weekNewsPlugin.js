const vscode = require("vscode");
const dayjs = require("dayjs");

const openZhoubaoUrlTitle = { title: "打开周报填写地址" };

module.exports = exports = function () {
  // 每0.5分钟检查一次
  const interval = 3000;
  // 已提示flag
  let hasNoticed = false;

  // 定时任务
  return () => {
    vscode.window.showInformationMessage(
      "已打开周报提醒，相关配置可在设置-扩展tab-58helper中修改"
    );
    return setInterval(() => {
      const config = vscode.workspace.getConfiguration("58helperConfig");
      const weekday = config.get("weekday") || "4";
      const zbtime = config.get("zbtime") || "18:00";
      const zbpath = config.get("zbpath");

      const now = new Date().getTime();
      const month = dayjs().get("month") + 1;
      const day = dayjs().get("date");
      const curWeekday = dayjs().get("day") === 0 ? 7 : dayjs().get("day");
      const noticeTimestamp = `${dayjs().get(
        "year"
      )}-${month}-${day} ${zbtime}:00`;

      vscode.window
        .showWarningMessage(
          "周报填写提醒!不填请全组喝娃哈哈啦~",
          openZhoubaoUrlTitle
        )
        .then((selection) => {
          if (selection === openZhoubaoUrlTitle) {
            vscode.env.openExternal(vscode.Uri.parse(zbpath));
          }
        });

      // 间隔3分钟内都算成功
      if (
        curWeekday.toString() === weekday &&
        Math.abs(now - new Date(noticeTimestamp).getTime()) < 180 * 1000 &&
        !hasNoticed
      ) {
        hasNoticed = true;
        vscode.window
          .showWarningMessage(
            "周报填写提醒!不填请全组喝娃哈哈啦~",
            openZhoubaoUrlTitle
          )
          .then((selection) => {
            if (selection === openZhoubaoUrlTitle) {
              vscode.env.openExternal(vscode.Uri.parse(zbpath));
            }
          });
      }
      // 重置
      if (curWeekday.toString() !== weekday && hasNoticed) hasNoticed = false;
    }, interval);
  };
};
