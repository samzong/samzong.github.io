---
title: 使用 Parallels Desktop 无界面启动虚拟机
tags: [MacOS, Parallels Desktop]
authors: [samzong]
---

## 背景

Parallels Desktop 是一款 Mac 上的虚拟机软件，可以在 Mac 上运行 Windows、Linux 等系统，同时支持在虚拟机中运行 Docker 等容器。

Parallels Desktop 有一个很大的问题，就是在启动虚拟机时，会弹出一个界面，这个界面会一直存在，直到虚拟机关闭。这个界面会遮挡其他窗口，非常影响使用体验。

![](https://img.samzong.me/202307281022067.png?imageView2/3/w/400/interlace/1/q/50)

此时，如果不小心关闭了窗口，虚拟机也会被关闭，非常不方便。

## 解决方案

Parallels Desktop 提供了一个终端命令 `prlctl`，可以通过命令来管理你的虚拟机。

### 操作示例

[![asciicast](https://asciinema.org/a/oNe0YLoevAn8JQsN4Wbozs7Lr.svg)](https://asciinema.org/a/oNe0YLoevAn8JQsN4Wbozs7Lr)

### 常用命令介绍

!!! note

    查看当前 virtual machine 的列表

    ```bash
    prlctl list -a
    ```

!!! note

    查看当前 virtual machine 的状态

    ```bash
    prlctl status <vm_name>
    ```

!!! note

    启动 virtual machine

    ```bash
    prlctl start <vm_name>
    ```

!!! note

    关闭 virtual machine

    ```bash
    prlctl stop <vm_name>
    ```

## 更多指令

更多指令可以通过 `prlctl --help` 查看。

```bash