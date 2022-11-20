---
layout: post
title: 使用 SoureceTree 管理你的 git 项目
tags: 
    - SourceTree
categories: 
    - Tools
date: 2016-04-20 21:31:49
---

## Update

* update: Windows 用户在初始化 Souretree 工具时，需要用到 Atlassian ID，新建用户时需要加载 google 验证码，这一步需要 VPN 的支持，请注意。
* 找到一个版本的 SourceTree 工具可以不需要以上验证也能使用，下载链接：[SourceTreeSetup_1.6.14.exe](http://pan.baidu.com/s/1eRDMgEY) 密码：c5l4

### 补充 1：Git 学习网站

1. [猴子都能学会的 git 教程](http://backlogtool.com/git-guide/cn/)
2. [常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
3. [廖雪峰的 git 教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
4. [Why Git is Better than X](http://zoomq.qiniudn.com/ZQScrapBook/ZqFLOSS/data/20081210180347/)

### 补充 2：利用 Git 协同开发

1. [团队中的 Git 实践](https://ourai.ws/posts/working-with-git-in-team/)
2. [Git 使用规范流程](http://www.ruanyifeng.com/blog/2015/08/git-use-process.html)
3. [Git 分支管理模型](http://nvie.com/files/Git-branching-model.pdf)
4. [图解 Git](http://marklodato.github.io/visual-git-guide/index-zh-cn.html)

## 关于 SourceTree

SourceTree 是一款免费且同时支持 Windows 和 Mac 的 git 项目管理软件，本文旨在给大家介绍这款应用的基础使用，并用它来管理你的项目

>官网： <https://www.sourcetreeapp.com/>

## git 帐号建立

### 新员工入职之后，你的公司邮箱内会收到一封来自 Gitlab 的邮件，如下图

![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsourcetree02.jpg)

### 点击邮件中的“Click here to set your password”，设置 gitlab 登陆密码

![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsouretree03.jpg)

### 登陆 gitlab 帐号，将会出现这个界面

![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsourcetree05.jpg)

### 设定个人信息

![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsouretree06.jpg)

### sshKey

#### 在 Linux 和 Mac 上生成 sshkey

```bash
➜  ~ ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/Alex/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/Alex/.ssh/id_rsa.
Your public key has been saved in /Users/Alex/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:98jE3jhBhFT5nQlZRj34a3WOk1t6XF+Dbf/hliXl4WQ Alex@Alex-Mac
The key's randomart image is:
+---[RSA 2048]----+
|       ..oo. +=. |
|        ... oo ..|
|          .. o.o.|
|         o  . +E+|
|        S =   **=|
|         = * .=BB|
|          * o oOO|
|           .  +o*|
|              .oo|
+----[SHA256]-----+
➜  ~ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCvuQAq65b+nLZPqqc3b3Mj9e7Pt8oWKasJFa2QH1VIEkDvxKLFGcHsT7Ur4zXwEi9YiW2tVRrBSjcMALxuBjVm2IxYV6Lk8SLuGadyYy5telWGJmHsQ3VIPRuKwpzTkLN643kjqc6JFSlnZG/XoP9SPtCOsp2ql4u0s7Auc2bZay4RaTDXbcpJVU9OA0xM8Zy4oTTNYdZ4tvGittVmn+wLrhN255J7clORF5126dmDYxV3E8ZboaDdQpdLGIWmDNcBJQvl0CLwpKUCi7EUDqDVtm4bNgwIX9fEIkTxGdaWjBW1iXBk8TGXWkgB+Qp8B1IwaJ4GHUwUhQrefWvw9XeJ Alex@Alex-Mac
➜  ~
```

#### 5.2 在 Windows 上生成 sshkey

#### 因为 windows 没有自带 openssl 模块，所以在 Windows 环境中使用第三方工具 puttygen.exe 生成 sshkey [下载地址](http://the.earth.li/~sgtatham/putty/0.67/x86/puttygen.exe)

#### 步骤如下

![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsourcetree13.jpg)
![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsourcetree14.jpg)
![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsourcetree15.jpg)

#### 当 sourcetree 首次启动时，会弹出加载 sshkey 的提示，按提示操作，找到之前保存的 private.ppk 文件

![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsourcetree12.jpg)

#### 5.3 上传 sshkey

![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsourcetree07.jpg)

### 6. 回到 dashboard，点击项目名称进入详情

![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsourcetree08.jpg)

### 7. 使用 souretree 将项目从 git 服务器 clone 到本地

#### 7.1 安装 souretree 软件 ［略］

#### 7.2 clone 项目到本地

![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsourcetree09.jpg)
![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsourcetree10.jpg)

### 8. 进入项目工作台

![image](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2Fsourcetree11.jpg)

#### 9. 关于 sourcetree 工具的使用，下面是一些 git 操作的释疑

* 检出仓库：将在本地创建一个 git 仓库的克隆版本
* 工作流：本地仓库由 git 维护的三棵“树”组成。第一个是 工作目录，它持有实际文件；第二个是 缓存区（Index），它像个缓存区域，临时保存改动；最后是 HEAD，指向最近一次提交后的结果。
* 提交：可以计划改动（把它们添加到缓存区),将改动提交到了 HEAD，但是还没到提交到远端仓库。
* 拉取：从远端仓库拉取最新版本状态，特别是在其他人员有所改动之后。
* 推送：改动现在已经在本地仓库的 HEAD 中了。这时可以使用它将这些改动提交到远端仓库。
* 分支：分支是用来将特性开发分离出来的。在创建仓库的时候，master 是“默认的”。创建分支将可以从主线开发上分离开来，然后在不影响主线的同时继续工作，完成后再将它们合并到主分支上。
* 合并：将分支功能并入主分支。
