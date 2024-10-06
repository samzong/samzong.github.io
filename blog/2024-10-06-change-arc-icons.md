---
title: 修改 Arc Browser 的图标
tags: [MacOS, Arc Browser]
---

要在 macOS 上解锁 Arc 浏览器的全部图标，可以通过终端命令来实现。以下是具体步骤和可用图标的列表：

## 解锁步骤

1. **打开终端**：在你的 Mac 上找到并打开终端应用程序。
2. **输入命令**：根据你想要解锁的图标，输入相应的命令。以下是可用图标及其对应的命令：

   - **Candy Arc**：

     ```bash
     defaults write company.thebrowser.Browser currentAppIconName -string candy
     ```

   - **Hologram**：

     ```bash
     defaults write company.thebrowser.Browser currentAppIconName -string hologram
     ```

   - **Neon**：

     ```bash
     defaults write company.thebrowser.Browser currentAppIconName -string neon
     ```

   - **Fluted Glass**：

     ```bash
     defaults write company.thebrowser.Browser currentAppIconName -string flutedGlass
     ```

   - **Schoolbook**：

     ```bash
     defaults write company.thebrowser.Browser currentAppIconName -string schoolbook
     ```

   - **Colorful**：
     ```bash
     defaults write company.thebrowser.Browser currentAppIconName -string colorful
     ```

3. **重启 Arc 浏览器**：输入命令后，关闭并重新启动 Arc 浏览器，以应用新的图标。

## 注意事项

- 某些图标需要通过推荐朋友来解锁，例如 Neon 需要推荐 1 位朋友，Fluted Glass 需要推荐 5 位朋友等。
- 如果你想使用自定义图标，可以通过修改 Arc 应用程序包中的资源文件，但这涉及更复杂的操作，需谨慎进行。

Citations:

- [1] https://www.anuzpandey.com/snippets/unlock-arc-browser-app-icons-for-free
- [2] https://www.johnsypin.com/2024/03/04/arc-browser-unlock-new-icons-with-terminal/
- [3] https://gist.github.com/gabe565/9654eea08a9f6c7c1f593049e5bed243?permalink_comment_id=5157931
- [4] https://resources.arc.net/hc/en-us/articles/20498293324823-Arc-for-macOS-2024-Release-Notes
- [5] https://resources.arc.net/hc/en-us/articles/22352326167703-Change-Arc-for-Desktop-App-Icon
