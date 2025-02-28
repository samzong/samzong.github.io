---
title: "仅使用 SSH 反向隧道打通内网服务"
date: 2025-02-27
---

# 仅使用 SSH 反向隧道打通内网服务

这个是一个基于 SSH 协议的原生能力方案，通过方向 SSH 隧道，将不具备公网直接访问能力的内网服务器映射到公网访问，同时结合 systemd 服务实现无人值守，开机自动启动的能力。

## 实现原理

1. 使用 SSH 的反向隧道能力
   内网服务器主动访问公网服务器，并通过 SSH 的 -R 参数创建一个反向隧道，将公网服务器的某个特定端口映射到内网服务器的 SSH 端口中。

2. 安全加密
   支持使用 SSH 密钥登录，全程无需支持密码访问。
   在公网服务器上配置访问控制，限制只允许特定用户登录。

3. 无人值守
   在内网服务器上启动 `systemd` 服务，实现开机自动启动，断开重连的功能。

## 实现步骤

### 1. 配置 SSH 反向隧道

1. 在内网服务器生成 SSH 密钥对，然后添加到公网服务器的授权用户的 `~/.ssh/authorized_keys` 文件中
2. 在内网服务器上编辑 SSH 配置文件 `~/.ssh/config` 添加如下内容:

```shell
Host public_host
HostName public_host_ip
User public_user
IdentityFile ~/.ssh/id_rsa
```

3. 测试反向隧道

现在内网服务器上执行如下命令，测试反向隧道是否正常建立：

```bash
ssh -N -R 2222:localhost:22 public_host
```

- 2222 是公网服务器的本地端口，注意不要与已有端口冲突
- `-N`：不执行远程命令，仅建立隧道。
- `-R` 2222:localhost:22：将内网服务器的 22 端口映射到公网服务器的 2222 端口; 支持多个 `-R` 参数，将多个端口映射到内网服务器的不同端口。

以下在远端服务器执行，通过反向隧道访问内网服务器：

```bash
ssh -p 2222 localhost
```

4. 公网服务器免密登录到内网服务器

- 为公网服务器上的用户生成密钥对，
- 然后将公钥同样保存在内网服务器中需要访问的用户的~/.ssh/authorized_keys
- 然后在公网服务器的账号的 ~/.ssh/config 同样添加内网服务器的 config

```shell
Host testsr
HostName 127.0.0.1
User root
Port 22222
IdentityFile ~/.ssh/id_rsa
ServerAliveInterval 60
ServerAliveCountMax 3
```

### 2. 创建 systemd 服务

自动重连实现 （systemd 服务）, 在内网服务器中执行以下命令，创建一个 systemd 服务：

```bash
cat << EOF > /etc/systemd/system/ssh-tunnel.service
[Unit]
Description=SSH Reverse Tunnel for Server
After=network.online.target

[Service]
ExecStart=/usr/bin/ssh -N -R 2222:localhost:22 -v -o ServerAliveInterval=60 -o ServerAliveCountMax=3 -o ExitOnForwardFailure=yes public_host # 依赖 root 配置 .ssh/config
Restart=always
RestartSec=10
User=root

[Install]
WantedBy=multi-user.target
EOF
```

::: tip 自动重连原理
当网络中断时，SSH 客户端无法与远程主机 `public_host` 通信。根据配置：

- `ServerAliveInterval=60` 表示 SSH 客户端每 60 秒发送一次 keepalive 消息。
- `ServerAliveCountMax=3` 表示如果连续 3 次（即 60 × 3 = 180 秒）没有收到响应，SSH 客户端会判定连接断开并退出。

如果网络中断持续超过 180 秒，SSH 客户端会在网络中断后的 约 180 秒 内退出。

SSH 进程退出后，`systemd` 会检测到服务停止。根据配置：

- `Restart=always`：`systemd` 会自动重启服务；
- `RestartSec=10`：重启前等待 10 秒。

因此，在 SSH 退出后（网络中断约 180 秒），`systemd` 会在 10 秒后 尝试重启服务。

重启后，SSH 客户端会再次尝试连接 `public_host` 并建立反向隧道。如果网络仍未恢复：

SSH 客户端无法建立连接，可能会立即退出（尤其是如果反向转发失败，`ExitOnForwardFailure=yes` 会强制退出）。
`systemd` 检测到退出后，会再次等待 10 秒并重启服务。

在网络恢复前，服务会陷入这样的循环：**尝试连接(180s) → 失败退出 → 等待 10 秒 → 重启**。
:::

### 3. 初始化设置为开机自启动

```bash
sudo systemctl daemon-load
sudo systemctl enable ssh-tunnel.service
sudo systemctl start ssh-tunnel.service
```

### 4. 通过脚本实现自动重连

在内网服务器中，增加一个自定义脚本，使用 ssh -O check 命令检查隧道是否正常，如果隧道断开，则重新建立隧道。

```bash
cat << EOF > /opt/ssh-tunnel/ssh-tunnel.sh
#!/bin/bash

while true; do
    if ! ssh -O check public_host > /dev/null 2>&1; then
        echo "SSH tunnel is down, restarting..."
        ssh -fN -R 2222:localhost:22 public_host
    fi
    sleep 60
done
```

注意，同样将 systemd 服务的 `ExecStart` 参数修改为：

```bash{6-10}
cat << EOF > /etc/systemd/system/ssh-tunnel.service
[Unit]
Description=SSH Reverse Tunnel for Server
After=network.online.target

[Service]
ExecStart=/usr/bin/ssh -N -R 2222:localhost:22 -v \
   -o ServerAliveInterval=60 \
   -o ServerAliveCountMax=3 \
   -o ExitOnForwardFailure=yes \
   public_host
Restart=always
RestartSec=10
User=root

[Install]
WantedBy=multi-user.target
EOF
```

## 总结

通过 SSH 反向隧道，将内网服务器映射到公网，并结合 `systemd` 服务实现开机自启动，可以实现无人值守，开机自动启动的功能。

## 常见问题

1. 为了避免网络中断，可以设置 `ServerAliveInterval` 和 `ServerAliveCountMax` 参数，实现自动重连。
2. 如果需要将映射到公网服务器的端口可以被外网访问，需要注意在 `/etc/ssh/sshd_config` 中配置 `GatewayPorts yes`。
3. 对于 `CentOS`、`Rocky Linux` 系统，SELinux 默认会阻止 SSH 连接，需要关闭 SELinux 或者配置 `semanage` 允许 SSH 连接。
