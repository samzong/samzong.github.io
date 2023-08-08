---
title: MacOS 启用和关闭 SIP
tags: [MacOS, Parallels Desktop]
authors: [samzong]
---

## SIP 介绍

SIP 全称为「System Integrity Protection」即「系统完整性保护」，SIP 将一些文件目录和系统应用保护了起来。但这会影响我们一些使用或设置，在终端运行一些命令时提示 "Operation not permitted" 。

## 操作

### 查看 SIP 状态

终端输入 `csrutil status` 即可看到 SIP 的状态是 `disable` 还是 `enable`。

```shell
csrutil status
```

### 关闭 SIP

1. 重启 Mac，按住 `Command + R` 进入恢复模式。
2. 打开终端，输入 `csrutil disable`。
3. 重启 Mac，输入 `reboot`。

### 开启 SIP

1. 重启 Mac，按住 `Command + R` 进入恢复模式。
2. 打开终端，输入 `csrutil enable`。
3. 重启 Mac，输入 `reboot`。
