const vscode = require("vscode");
const dayjs = require("dayjs");

const openZhoubaoUrlTitle = { title: "打开周报填写地址" };

module.exports = exports = function () {
  // 每0.5分钟检查一次
  const interval = 30000;
  // 已提示flag
  let hasNoticed = false;

  // 定时任务
  return () =>
    setInterval(() => {
      const config = vscode.workspace.getConfiguration("58helperConfig");
      const weekday = config.get("weekday") || "4";
      const zbtime = config.get("zbtime") || "18:00";

      const now = new Date().getTime();
      const day = dayjs().get("date");
      const hour = dayjs().get("month") + 1;
      const noticeTimestamp = `${dayjs().get(
        "year"
      )}-${hour}-${day} ${zbtime}:00`;
      // 间隔0.5分钟内都算成功
      if (
        day.toString() === weekday &&
        Math.abs(now - new Date(noticeTimestamp).getTime()) < 30 * 1000
      ) {
        !hasNoticed &&
          vscode.window
            .showWarningMessage(
              "周报填写提醒!不填请全组喝娃娃哈啦~",
              openZhoubaoUrlTitle
            )
            .then((selection) => {
              hasNoticed = true;
              if (selection === openZhoubaoUrlTitle) {
                vscode.env.openExternal(
                  vscode.Uri.parse(
                    "https://docs.58corp.com/#/space/1542752213913358336"
                  )
                );
              }
            });
      }
    }, interval);
};
