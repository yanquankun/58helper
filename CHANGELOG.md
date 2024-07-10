# Change Log

All notable changes to the "58-helper" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- Initial release

### 0.0.1

- 增加 58 周报提醒弹框
  - 支持周一[1]到周日[0]设置，以及当天几点，如 11:00
  - 默认每周五 11:00
  - 修改可打开 setting，在扩展选项卡中的 58helper 中进行设置
- 增加 58 周报提醒弹框关闭
  - 使用 shift+commond+P 打开输入框，输入 58，会出现关闭提示

### 0.0.2

- 优化周报时间触发计算，相对 3min 内都会触发
- 增加 js 环境触发
- 周报默认触发时间更改为每周四 18:00
- 触发时机为启动 vscode 后
- 增加刷新 vscode
  - 使用 shift+commond+P 打开输入框，输入 58，会出现刷新 vscode 选项
- 增加检测安装后重启 vscode 功能

### 0.0.3

- fix 一些问题
- 更新 58 周报提醒弹框开启机制
  - 使用 shift+commond+P 打开输入框，输入 58，会出现打开周报提示，选中后将开启周报提醒
- 删除 js 环境触发机制
- 删除 vscode 启动触发机制
- 删除检测安装后重启 vscode 功能