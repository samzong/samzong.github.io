---
title: SSH LINUX Security Settings
tags: [Linux]
date: 2016-10-29 06:23:59
---


## **SSH 配置安全控制限制登录**

### 1. 只允许某个 IP 登录，拒绝其他所有 IP

在 /etc/hosts.allow 增加：

```bash
sshd: 1.2.3.4
```

在 /etc/hosts.deny 增肌：

```bash
sshd: ALL
```

用 iptables 也行：

```bash
iptables -A INPUT -p tcp --dport 22 -j DROP
iptables -A INPUT -p tcp --dport 22 -s 1.2.3.4 -j ACCEPT
```

## 2. 禁止某个用户通过 ssh 登录

在/etc/ssh/sshd_conf添加

```bash
AllowUsers 用户名
或者
AllowGroups 组名
或者
DenyUsers 用户名
```

## 3. 设定登录黑名单

```bash
[root@6 ~]# vim /etc/pam.d/sshd
auth required /lib/security/pam_listfile.so item=user sense=deny file=/etc/sshd_user_deny_list onerr=succeed
# 所有/etc/sshd_user_deny_list里面的用户被拒绝ssh登录
```

## 4. sshd_config 配置

```bash
# 关于 SSH Server 的整体设定，包含使用的 port 啦，以及使用的密码演算方式
Port 22　　　　　　　　　　# SSH 预设使用 22 这个 port，您也可以使用多的 port ！
　　　　　　　　　　　　　 # 亦即重复使用 port 这个设定项目即可！
Protocol 2,1　　　　　　　 # 选择的 SSH 协议版本，可以是 1 也可以是 2 ，
　　　　　　　　　　　　　 # 如果要同时支持两者，就必须要使用 2,1 这个分隔了！
#ListenAddress 0.0.0.0　　 # 监听的主机适配卡！举个例子来说，如果您有两个 IP，
　　　　　　　　　　　　　 # 分别是 192.168.0.100 及 192.168.2.20 ，那么只想要
　　　　　　　　　　　　　 # 开放 192.168.0.100 时，就可以写如同下面的样式：
ListenAddress 192.168.0.100          # 只监听来自 192.168.0.100 这个 IP 的SSH联机。
　　　　　　　　　　　　　　　　　　 # 如果不使用设定的话，则预设所有接口均接受 SSH
PidFile /var/run/sshd.pid　　　　　　# 可以放置 SSHD 这个 PID 的档案！左列为默认值
LoginGraceTime 600　　　　 # 当使用者连上 SSH server 之后，会出现输入密码的画面，
　　　　　　　　　　　　　 # 在该画面中，在多久时间内没有成功连上 SSH server ，
　　　　　　　　　　　　　 # 就断线！时间为秒！
Compression yes　　　　　　# 是否可以使用压缩指令？当然可以啰！

# 说明主机的 Private Key 放置的档案，预设使用下面的档案即可！
HostKey /etc/ssh/ssh_host_key　　　　# SSH version 1 使用的私钥
HostKey /etc/ssh/ssh_host_rsa_key　　# SSH version 2 使用的 RSA 私钥
HostKey /etc/ssh/ssh_host_dsa_key　　# SSH version 2 使用的 DSA 私钥
# 关于 version 1 的一些设定！
KeyRegenerationInterval 3600　 　　　# 由前面联机的说明可以知道， version 1 会使用
　　　　　　　　　　　　　　　　　　 # server 的 Public Key ，那么如果这个 Public
　　　　　　　　　　　　　　　　　　 # Key 被偷的话，岂不完蛋？所以需要每隔一段时间
　　　　　　　　　　　　　　　　　　 # 来重新建立一次！这里的时间为秒！
ServerKeyBits 768 　　　　　　　　　 # 没错！这个就是 Server key 的长度！

# 关于登录文件的讯息数据放置与 daemon 的名称！
SyslogFacility AUTH　　　　　　　　　# 当有人使用 SSH 登入系统的时候，SSH会记录资
　　　　　　　　　　　　　　　　　　 # 讯，这个信息要记录在什么 daemon name 底下？
　　　　　　　　　　　　　　　　　　 # 预设是以 AUTH 来设定的，即是 /var/log/secure
　　　　　　　　　　　　　　　　　　 # 里面！什么？忘记了！回到 Linux 基础去翻一下
　　　　　　　　　　　　　　　　　　 # 其它可用的 daemon name 为：DAEMON,USER,AUTH,
　　　　　　　　　　　　　　　　　　 # LOCAL0,LOCAL1,LOCAL2,LOCAL3,LOCAL4,LOCAL5,
LogLevel INFO　　　　　　　　　　　　# 登录记录的等级！嘿嘿！任何讯息！
　　　　　　　　　　　　　　　　　　 # 同样的，忘记了就回去参考！

# 登入设定部分
PermitRootLogin no　　 　　# 是否允许 root 登入！预设是允许的，但是建议设定成 no！
UserLogin no　　　　　　　 # 在 SSH 底下本来就不接受 login 这个程序的登入！
StrictModes yes　　　　　　# 当使用者的 host key 改变之后，Server 就不接受联机，
　　　　　　　　　　　　　 # 可以抵挡部分的木马程序！
#RSAAuthentication yes　　 # 是否使用纯的 RSA 认证！？仅针对 version 1 ！
PubkeyAuthentication yes　 # 是否允许 Public Key ？当然允许啦！只有 version 2
AuthorizedKeysFile      .ssh/authorized_keys
　　　　　　　　　　　　　 # 上面这个在设定若要使用不需要密码登入的账号时，那么那个
　　　　　　　　　　　　　 # 账号的存放档案所在档名！
Allowusers root@222.XX.XX.XX. #设置允许root帐号只能以222.XX.XX.XX这个IP进行ssh连接

# 认证部分
RhostsAuthentication no　　# 本机系统不止使用 .rhosts ，因为仅使用 .rhosts 太
　　　　　　　　　　　　　 # 不安全了，所以这里一定要设定为 no ！
IgnoreRhosts yes　　　　　 # 是否取消使用 ~/.ssh/.rhosts 来做为认证！当然是！
RhostsRSAAuthentication no # 这个选项是专门给 version 1 用的，使用 rhosts 档案在
　　　　　　　　　　　　　 # /etc/hosts.equiv配合 RSA 演算方式来进行认证！不要使用
HostbasedAuthentication no # 这个项目与上面的项目类似，不过是给 version 2 使用的！
IgnoreUserKnownHosts no　　# 是否忽略家目录内的 ~/.ssh/known_hosts 这个档案所记录
　　　　　　　　　　　　　 # 的主机内容？当然不要忽略，所以这里就是 no 啦！
PasswordAuthentication yes # 密码验证当然是需要的！所以这里写 yes 啰！
PermitEmptyPasswords no　　# 若上面那一项如果设定为 yes 的话，这一项就最好设定
　　　　　　　　　　　　　 # 为 no ，这个项目在是否允许以空的密码登入！当然不许！
ChallengeResponseAuthentication yes  # 挑战任何的密码认证！所以，任何 login.conf
　　　　　　　　　　　　　　　　　　 # 规定的认证方式，均可适用！
#PAMAuthenticationViaKbdInt yes      # 是否启用其它的 PAM 模块！启用这个模块将会
　　　　　　　　　　　　　　　　　　 # 导致 PasswordAuthentication 设定失效！

# 与 Kerberos 有关的参数设定！因为我们没有 Kerberos 主机，所以底下不用设定！
#KerberosAuthentication no
#KerberosOrLocalPasswd yes
#KerberosTicketCleanup yes
#KerberosTgtPassing no
　
# 底下是有关在 X-Window 底下使用的相关设定！
X11Forwarding yes
#X11DisplayOffset 10
#X11UseLocalhost yes
# 登入后的项目：
PrintMotd no              # 登入后是否显示出一些信息呢？例如上次登入的时间、地点等
　　　　　　　　　　　　　# 等，预设是 yes ，但是，如果为了安全，可以考虑改为 no ！
PrintLastLog yes　　　　　# 显示上次登入的信息！可以啊！预设也是 yes ！
KeepAlive yes　　　　　　 # 一般而言，如果设定这项目的话，那么 SSH Server 会传送
　　　　　　　　　　　　　# KeepAlive 的讯息给 Client 端，以确保两者的联机正常！
　　　　　　　　　　　　　# 在这个情况下，任何一端死掉后， SSH 可以立刻知道！而不会
　　　　　　　　　　　　　# 有僵尸程序的发生！
UsePrivilegeSeparation yes # 使用者的权限设定项目！就设定为 yes 吧！
MaxStartups 10　　　　　　# 同时允许几个尚未登入的联机画面？当我们连上 SSH ，
　　　　　　　　　　　　　# 但是尚未输入密码时，这个时候就是我们所谓的联机画面啦！
　　　　　　　　　　　　　# 在这个联机画面中，为了保护主机，所以需要设定最大值，
　　　　　　　　　　　　　# 预设最多十个联机画面，而已经建立联机的不计算在这十个当中

# 关于使用者抵挡的设定项目：
DenyUsers *　　　　　　　 # 设定受抵挡的使用者名称，如果是全部的使用者，那就是全部
　　　　　　　　　　　　　# 挡吧！若是部分使用者，可以将该账号填入！例如下列！
DenyUsers test
DenyGroups test　　　　　 # 与 DenyUsers 相同！仅抵挡几个群组而已！

# 关于 SFTP 服务的设定项目！
Subsystem       sftp    /usr/lib/ssh/sftp-server
如果不愿意开放 SFTP 的话，将这一行批注掉即可！
```
