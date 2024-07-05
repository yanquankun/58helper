const vscode = require("vscode");

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
      const weekday = config.get("weekday") || "5";
      const zbtime = config.get("zbtime") || "11:00";
      const zbHour = zbtime.split(":")[0];
      const zbMinute = zbtime.split(":")[1];

      const now = new Date();
      const day = now.getDay().toString();
      const hour = now.getHours().toString();
      const minute = now.getMinutes();
      // 间隔1分钟内都算成功

      if (
        day === weekday &&
        hour === zbHour &&
        Math.abs(zbMinute - minute) < 1
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
