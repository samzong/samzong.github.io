---
title: 安装 Docker 看这篇就够了
tags: [Docker]
---

# 安装 Docker，看这篇就够了

本文将详细介绍在 Ubuntu 22.04 系统上安装和配置 Docker 的完整步骤，适用于国内和国外的网络环境。无论您是新手还是资深开发者，都可以通过本教程顺利完成 Docker 的安装。

## 前言

- **适用系统**：Ubuntu 22.04 LTS
- **权限要求**：需要具备 `sudo` 权限
- **预计耗时**：15-30 分钟
- **网络要求**：可访问互联网（如在国内，建议使用国内镜像源）

## 目录

1. [基础知识](#基础知识)
2. [安装前准备](#安装前准备)
3. [选择安装方式](#选择安装方式)
4. [使用国内源安装 Docker（推荐）](#使用国内源安装-docker推荐)
5. [使用官方源安装 Docker](#使用官方源安装-docker)
6. [安装后配置](#安装后配置)
7. [验证安装](#验证安装)
8. [常见问题与解决](#常见问题与解决)
9. [安全性和最佳实践](#安全性和最佳实践)
10. [附录：离线安装 Docker](#附录离线安装-docker)

---

## 基础知识

在开始之前，了解以下概念有助于顺利完成安装：

- **Docker**：一个开源的容器化平台，用于开发、交付和运行应用程序。
- **容器（Container）**：一种标准的软件单元，将应用程序代码及其所有依赖项打包，使应用能够快速可靠地在不同的计算环境中运行。
- **镜像（Image）**：一个只读的模板，用于创建 Docker 容器。
- **Docker Hub**：官方的 Docker 镜像仓库，存储和分发 Docker 镜像。
- **APT 源**：Ubuntu 的软件包管理系统、软件的下载地址。

## 安装前准备

### 1.1 更新系统软件包

```bash
sudo apt-get update
```

### 1.2 卸载旧版本（如果存在）

旧版本的 Docker 被称为 `docker` 或 `docker-engine`。如果已安装，先卸载旧版本：

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

**注意**：您的镜像、容器、数据卷和网络不会被自动删除。

### 1.3 安装必要的依赖包

```bash
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

## 选择安装方式

根据您的网络环境，选择合适的安装方式：

- **国内环境**：由于访问速度和稳定性，推荐使用国内镜像源安装。
- **国外环境**：可以直接使用官方源安装。

## 使用国内源安装 Docker（推荐）

### 3.1 添加 Docker 的官方 GPG 密钥

```bash
sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

### 3.2 设置稳定的仓库

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

**说明**：这里使用了阿里云的 Docker 镜像源，速度更快。如果需要，也可以选择其他国内镜像源，如网易云、清华大学等。

### 3.3 更新 APT 软件源缓存

```bash
sudo apt-get update
```

如果遇到权限不足的错误，请赋予密钥文件读取权限：

```bash
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

### 3.4 安装 Docker Engine

```bash
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## 使用官方源安装 Docker

如果您在国外或可以顺畅访问国外网络，可以按照以下步骤使用官方源安装：

### 4.1 添加 Docker 的官方 GPG 密钥

```bash
sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

### 4.2 设置稳定的仓库

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 4.3 更新 APT 软件源缓存

```bash
sudo apt-get update
```

### 4.4 安装 Docker Engine

```bash
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## 安装后配置

### 5.1 加速器配置（国内用户必需）

为了加速从 Docker Hub 拉取镜像的速度，建议配置国内镜像加速器。

创建或修改 Docker 配置文件 `/etc/docker/daemon.json`：

```bash
sudo mkdir -p /etc/docker

sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://registry.docker-cn.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF
```

### 5.2 重启 Docker 服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 5.3 设置 Docker 开机自启动

```bash
sudo systemctl enable docker
```

### 5.4 非 root 用户运行 Docker（可选）

为了免去每次使用 Docker 都需 `sudo` 的麻烦，可以将当前用户加入 `docker` 用户组：

```bash
sudo usermod -aG docker $USER
```

**注意**：执行此操作后，需退出当前终端并重新登录，用户组变更才会生效。

## 验证安装

### 6.1 检查 Docker 版本

```bash
docker version
```

### 6.2 运行测试容器

```bash
docker run hello-world
```

**成功输出应类似于**：

```
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

### 6.3 检查镜像加速器是否生效

查看 Docker 信息，确认 `Registry Mirrors` 配置是否生效：

```bash
docker info
```

## 常见问题与解决

### 7.1 GPG 密钥错误

**问题**：`GPG error: ... The following signatures couldn't be verified...`

**解决方案**：

```bash
sudo chmod a+r /etc/apt/keyrings/docker.gpg
sudo apt-get update
```

### 7.2 Docker 服务启动失败

**问题**：执行 `sudo systemctl start docker` 时失败。

**解决方案**：

- 检查 `/etc/docker/daemon.json` 配置文件的 JSON 格式是否正确。
- 使用 `sudo journalctl -u docker.service` 查看详细错误日志。

### 7.3 普通用户无法运行 Docker

**问题**：非 root 用户执行 Docker 命令时报权限错误。

**解决方案**：

- 确认当前用户已加入 `docker` 组：`groups $USER`。
- 如果没有，按照前文步骤将用户加入 `docker` 组，并重新登录终端。

### 7.4 镜像拉取速度慢

**解决方案**：

- 确认已配置国内镜像加速器，并已重启 Docker 服务。
- 检查网络连接状况。

## 安全性和最佳实践

### 8.1 定期更新 Docker

保持 Docker 及其组件的最新版本，以获得最新的功能和安全补丁。

### 8.2 使用官方镜像

从官方或可信任的镜像仓库拉取镜像，避免使用不明来源的镜像。

### 8.3 最小化权限

运行容器时，尽量使用非 root 用户，限制容器的权限。

### 8.4 配置防火墙

根据需求，配置防火墙规则，限制不必要的端口暴露。

### 8.5 数据备份

对于重要的数据卷，定期备份，防止数据丢失。

## 附录：离线安装 Docker

在不能联网的环境下，可以通过以下方式离线安装 Docker：

1. 从官方获取 Debian 包：

   - [docker-ce](https://download.docker.com/linux/ubuntu/dists/)、[containerd.io](https://download.docker.com/linux/ubuntu/dists/)

2. 将下载的 `.deb` 文件拷贝到目标机器。

3. 使用 `dpkg` 命令安装：

   ```bash
   sudo dpkg -i containerd.io_<version>_<arch>.deb
   sudo dpkg -i docker-ce-cli_<version>_<arch>.deb
   sudo dpkg -i docker-ce_<version>_<arch>.deb
   ```

**注意**：离线安装需要解决依赖关系，可能需要额外的包。

---

**恭喜！** 您已成功在 Ubuntu 22.04 上安装并配置了 Docker。现在，您可以开始探索 Docker 带来的强大功能了。

## 参考资料

- Docker 官方文档：[https://docs.docker.com/](https://docs.docker.com/)
- 阿里云开源镜像站：[https://developer.aliyun.com/mirror/](https://developer.aliyun.com/mirror/)
- Docker 从入门到实践：[https://yeasy.gitbooks.io/docker_practice/](https://yeasy.gitbooks.io/docker_practice/)

如有任何问题或建议，欢迎反馈。
