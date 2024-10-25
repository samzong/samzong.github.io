---
title: 安装 Docker 看这篇就够了
tags: [Docker]
---

## 前置说明

- 适用系统：Ubuntu 22.04 LTS
- 所需权限：sudo 权限
- 预计耗时：10-15 分钟
- 网络要求：能访问国内或国外网络

## 一、基础知识

### 1.1 相关概念

- Docker：一个开源的应用容器引擎
- APT 源：软件包下载地址，类似应用商店
- GPG 密钥：确保下载软件包的安全性
- Registry：镜像仓库，存储 Docker 镜像的地方

### 1.2 安装前检查

```bash
# 检查系统版本
lsb_release -a

# 检查是否已安装 Docker
docker --version
```

## 二、安装方式选择

### 2.1 如何选择安装方式

- 国内网络：选择【安装方式 A】使用国内源
- 国外网络：选择【安装方式 B】使用官方源
- 离线环境：选择【安装方式 C】离线安装（文末说明）

## 三、【安装方式 A】使用国内源安装

### 3.1 清理旧版本（可选）

```bash
# 如果是全新系统可以跳过此步
sudo apt-get remove docker docker-engine docker.io containerd runc
```

### 3.2 安装必要工具

```bash
sudo apt-get update
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

### 3.3 添加阿里云源

```bash
# 创建密钥文件目录
sudo mkdir -p /usr/share/keyrings

# 添加密钥
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加软件源
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 3.4 安装 Docker

```bash
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## 四、【安装方式 B】使用官方源安装

[详细步骤略，与方式 A 类似，仅源地址不同]

## 五、安装后配置

### 5.1 配置镜像加速（国内必做）

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://mirror.baidubce.com",
    "https://hub-mirror.c.163.com"
  ],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "3"
  }
}
EOF
```

### 5.2 启动服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
sudo systemctl enable docker
```

### 5.3 配置用户权限（可选）

```bash
# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER

# 立即生效（或重新登录）
newgrp docker
```

## 六、验证安装

```bash
# 1. 检查版本
docker --version

# 2. 检查服务状态
sudo systemctl status docker

# 3. 运行测试容器
docker run hello-world
```

## 七、常见问题与解决

### 7.1 GPG 密钥错误

```bash
sudo chmod a+r /usr/share/keyrings/docker-archive-keyring.gpg
```

### 7.2 镜像下载慢

- 检查 daemon.json 配置是否正确
- 尝试更换其他镜像源
- 验证网络连接

### 7.3 权限问题

```bash
# 如果出现 "permission denied"
sudo chmod 666 /var/run/docker.sock
```

## 八、安全建议

1. 生产环境建议：

   - 定期更新 Docker 版本
   - 限制容器资源使用
   - 配置审计日志
   - 使用私有镜像仓库

2. 开发环境建议：
   - 配置合适的日志策略
   - 定期清理未使用的镜像和容器

## 九、快速参考

### 9.1 常用命令

```bash
# 查看 Docker 信息
docker info

# 停止 Docker 服务
sudo systemctl stop docker

# 启动 Docker 服务
sudo systemctl start docker

# 查看镜像列表
docker images

# 查看运行容器
docker ps
```

### 9.2 卸载方法

```bash
# 完全卸载
sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

## 十、故障排查指南

每个操作步骤可能的错误都有对应的解决方案，参考以下判断流程：

1. 安装失败：

   - 检查网络连接
   - 验证源地址可用性
   - 检查系统架构匹配

2. 服务启动失败：

   - 检查端口占用
   - 查看系统日志
   - 验证配置文件语法

3. 容器运行失败：
   - 检查存储空间
   - 验证镜像完整性
   - 查看容器日志

## 备注

- 文档更新日期：2024 年 10 月
- 官方文档：https://docs.docker.com/
