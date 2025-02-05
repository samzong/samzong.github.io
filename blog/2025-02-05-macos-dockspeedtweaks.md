---
title: "macOS Dock 速度优化"
date: 2025-02-05
---

# 优化 macOS Dock 的显示/隐藏速度

在日常使用中，我发现 macOS Dock 的自动隐藏动画稍显迟缓。
如果你也想加快 Dock 显示和隐藏的速度，可以通过以下命令来调整。

## 去除自动隐藏延迟

默认情况下，当鼠标移到屏幕边缘时，Dock 会有大约 0.5 秒的延迟。可以通过下面的命令将延迟设置为 0：

```bash
defaults write com.apple.dock autohide-delay -float 0; killall Dock
```

## 缩短动画时长

同时，可以调整动画的时长，例如将动画时间设置为 0.5 秒甚至更低：

```bash
defaults write com.apple.dock autohide-time-modifier -float 0.5; killall Dock
```

> **小贴士**：在不同 macOS 版本中默认值可能略有差异，不过普遍认为延迟和动画时长默认都是大约 0.5 秒。

## 恢复默认设置

如果你想恢复到系统默认状态，可以执行以下命令：

```bash
defaults delete com.apple.dock autohide-delay; killall Dock
defaults delete com.apple.dock autohide-time-modifier; killall Dock
```
