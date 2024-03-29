---
title: Mac 上安装软件的方式
tags: [Mac]
---


## 写在前面的话

如果你第一次看到这个文档，那么，欢迎加入 Mac 的大家庭！

接下来我会带领你来初始化的刚到手还热乎的 Mac，如果能对你有些帮助，那最好不过了。

## 简析 Mac 软件与 Windows 软件的区别

首先 软件名.exe 的软件是不能在 Mac 运行的，并且 Mac 软件与 Windows 的生态环境不同，所以你在安装软件的时候，注意下载对应 Mac 版本；好在由于苹果软件生态的优势，如果你安装了 Mac 版本，软件的 UI 体验和广告体验会比 Windows 好很多。

### 软件付费概念

如果同我们从 Android 手机转为 iPhone 时竟然发现软件还需要花钱买一样，苹果有着优质软件生态，是无数开发者和 Apple 共同运营的结果，所以尊重知识产权，合理付费，同时也可以体验到优质的产品和服务。

> 但是 Apple 目前有些收费策略的确让人搞不懂，如果你可以通过能 (tao) 力 (bao) 的方式省钱，欢迎告诉我。

## Mac 软件安装的三种方式

### 1. App Store

这是苹果的官方渠道，如同 iPhone 的 App Store，可以在这边方便下载和更新你的软件。但是由于 App Store 的软件审核和发布流程的繁琐，Mac 版相对 iPhone 版，软件少的可怜，不过一些主流应用还是都可以找到的，下面列出一些常用的软件。

- 微信 [https://apps.apple.com/cn/app/wechat/id836500024?l=en&mt=12](https://apps.apple.com/cn/app/wechat/id836500024?l=en&mt=12)
- 钉钉 [https://apps.apple.com/cn/app/dingtalk/id1435447041?l=en&mt=12](https://apps.apple.com/cn/app/dingtalk/id1435447041?l=en&mt=12)
- Maipo [https://apps.apple.com/cn/app/maipo-for-weibo/id789066512?l=en&mt=12](https://apps.apple.com/cn/app/maipo-for-weibo/id789066512?l=en&mt=12)
- QQ  [https://apps.apple.com/cn/app/qq/id451108668?l=en&mt=12](https://apps.apple.com/cn/app/qq/id451108668?l=en&mt=12)
- WPS [https://apps.apple.com/cn/app/wps-office/id1443749478?l=en&mt=12](https://apps.apple.com/cn/app/wps-office/id1443749478?l=en&mt=12)

### 2. 软件官方网站

注意，在 Mac 上目前还没成熟的第三方软件仓库管理工具，例如某安全卫士和某管家都集成 Windows 软件管理仓库。所以到你需要用到的软件官网下载是一个非常保险的方式。

- [https://bearychat.com/downloads](https://bearychat.com/downloads)  倍洽 - 内部沟通 IM
- [https://support.logi.com/hc/zh-cn/articles/360025297893](https://support.logi.com/hc/zh-cn/articles/360025297893)  logitech Mouse - 公司给的 M336 的鼠标
- [https://www.iterm2.com/](https://www.iterm2.com/)  iTerm 2 - 提到 Mac 自带终端的 Terminal 工具
- [https://filezilla-project.org/](https://filezilla-project.org/)  Filezilla - 免费的 SFTP 工具

> Mac 版本的软件后缀名一般为.dmg 或 .pkg，注意安装过程中可能需要输入密码

### 3. 第三方 Mac 软件收集网站导航

不要相信一些华军软件园等，或者 CSDN 上下载，这里推荐一些专门做 Mac Apps 收集梳理的网站，注意这里会用到百度网盘或 CT 网盘，下载速度会有些慢，氪金可以解决问题。

下面分享一下 Mac 应用网站：

- [https://xclient.info/](https://xclient.info/)  精品 MAC 应用分享
- [https://www.macw.cn](https://www.macw.cn)  麦克坞
- [https://sspai.com/mall](https://sspai.com/mall)  少数派 - 正版软件商店 - 要钱的
- [https://www.waitsun.com/](https://www.waitsun.com/) 麦氪派 - 良心网站
- [https://www.ifunmac.com/](https://www.ifunmac.com/)  玩转苹果
- [https://macwk.com/](https://macwk.com/) MacWK

> 注意，以上网站下载软件后解压时需要输入密码，对应网站会有提示或者 Google Search

### 4. Github 软件收集仓库

我竟然关注了一堆非开发相关的东西，真是奇特的知识。（GayHub 还有非常丰富的东西），这里就直接把 Github 上的仓库分享出来了，喜欢的老铁请自行 Star、Watch、打赏 (刚出的功能)。

- [https://github.com/serhii-londar/open-source-mac-os-apps](https://github.com/serhii-londar/open-source-mac-os-apps)  open-source-mac-os-apps
- [https://github.com/hzlzh/Best-App](https://github.com/hzlzh/Best-App)  Best-App
- [https://github.com/catofmrlu/MacApps](https://github.com/catofmrlu/MacApps)  MacApps

### 5. Homebrew & Cask

到了重点部分了，Mac 很大的一个特色是 MacOS 底层的 Unix 衍生版本，和当前主流服务器操作系统如 Redhat、Debian 等一样，有这个强大的命令行模式，所以 Mac 在拥有非常好的软件生态的同时，也支持方便使用一些命令的指令，对开发者来讲，上手是十分友好的。

#### 5.1 安装 brew

直接将下面的命令放到终端中运行，稍等片刻即可安装完成

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

安装完成后，你可以非常方便的使用`brew` 进行软件的安装和管理

下面是一些安装软件的演示以及一些常用指令

```bash
# 安装wget
→ brew install wget

# 查找mysql
→ brew search mysql
==> Formulae
automysqlbackup             mysql-client                mysql-connector-c++         mysql-utilities             mysql@5.7
mysql ✔                     mysql-cluster               mysql-sandbox               mysql@5.5 ✔                 mysqltuner
mysql++                     mysql-connector-c           mysql-search-replace        mysql@5.6 ✔

# 安装mysql 5.7，使用@ 来指定版本，如果无多版本直接使用软件名称即可
→ brew install mysql@5.7

# 更新一个软件
→ brew upgrade wget
```

#### 5.2 安装 Cask 用于安装 Mac 图形化软件

有 Homebrew 出现之后，丰富了 Mac 进行命令行工具和服务端应用的安装，但一直缺少图形化软件这一块，所以有其他开发者开发了附件的 Brew-Cask 插件，使得 Homebrew 拥有了安装图形化的能力，而作为使用者，我们只需要运行以下命令加载对应 Caskroom 的源即可。

```bash
brew tap caskroom/cask
```

成功加载源之后，我们就可以方便的安装软件啦，因为 Cask 都是通过去官方的软件仓库下载和安装，所以大家在使用时大可放心，下面直接用命令展示下，经常会用到的命令。

```bash
# 安装google-chrome
→ brew cask install google-chrome   # 我们只需在安装时加上 cask就行

# 查找eclipse
→ brew search eclipse
==> Casks
eclipse-cpp                 eclipse-installer           eclipse-jee                 eclipse-platform            eclipse-scout
eclipse-dsl                 eclipse-java                eclipse-modeling            eclipse-ptp                 eclipse-testing
eclipse-ide                 eclipse-javascript          eclipse-php                 eclipse-rcp                 nodeclipse

# 查找mysql 
→ brew search mysql
==> Formulae  （CLI）
automysqlbackup             mysql-client                mysql-connector-c++         mysql-utilities             mysql@5.7
mysql ✔                     mysql-cluster               mysql-sandbox               mysql@5.5 ✔                 mysqltuner
mysql++                     mysql-connector-c           mysql-search-replace        mysql@5.6 ✔

==> Casks        （图形化）
mysql-connector-python                         mysql-utilities                                navicat-for-mysql
mysql-shell                                    mysqlworkbench                                 sqlpro-for-mysql

# 更新软件 
→ brew cask upgrade google-chrome
```

## 结束语

好了，以上简单进行了 Mac 上安装软件的几个方法介绍，希望可以帮助到大家，也是为了自己做笔记。
