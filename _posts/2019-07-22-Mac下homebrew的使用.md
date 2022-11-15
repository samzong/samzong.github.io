---
layout: post
title: Mac 下 Homebrew 的使用
tags: Mac
Categroies: Mac
abbrlink: 64321
---


mac系统也是基于unix的系统，所以也继承类很多unix的特性，包括软件的编译，安装等。ubuntu下有快捷命令`apt install`来快速安装软件。centos下有`yum install`来快速安装。所以，mac下也有一种方式，就是使用`brew`。

并且，在 Homebrew 和 Cask 的支持下，基本可以全面接待 MacOS 的所有软件安装和更新功能。

`brew`是Mac下的一个包管理工具，它从下载源码解压然后 `./configure && make install` ，同时会包含相关依存库。并自动配置好各种环境变量，而且非常易于卸载。 这个对程序员来说简直是福音，简单的指令，就能快速安装和升级本地的各种开发环境。

home brew 官网是 http://brew.sh/index_zh-cn.html

## 安装 brew

打开 itrem 。输入一条命令即可安装好 brew。

```sh
➜  ~ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

这样一个简单的命令，我们就安装好来brew 。来验证一下，输入brew命令：

```sh
➜  ~ brew
Example usage:
  brew search TEXT|/REGEX/
  brew info [FORMULA|CASK...]
  brew install FORMULA|CASK...
  brew update
  brew upgrade [FORMULA|CASK...]
  brew uninstall FORMULA|CASK...
  brew list [FORMULA|CASK...]

Troubleshooting:
  brew config
  brew doctor
  brew install --verbose --debug FORMULA|CASK

Contributing:
  brew create URL [--no-fetch]
  brew edit [FORMULA|CASK...]

Further help:
  brew commands
  brew help [COMMAND]
  man brew
  https://docs.brew.sh
```

出现了很多帮助命令，说明我们已经安装成功了。

## 用 brew 安装程序

安装好了brew之后，我们就可以用这个命令安装各种源码了。比如安装一下`wget`工具。这个工具能在命令行中帮我们下载各种数据。

```sh
brew install git
```

这样一个简单的命令就可以了。它会帮我们下载好 git ，并且编译执行安装，还会下载各种依赖包，设置好各种配置和参数。

安装好的 `git` 会被安装到`/usr/local/Cellar/git/`下。并且将`wget`命令软链接至 `/usr/local/bin` 目录下。这样全局就都可以使用`git`命令了。

> Homebrew 在 MacOS 10.11 之后 修改了 安装的路径为 `/opt/Homebrew`，通过 `brew config` 可以看到

```sh
➜  ~ brew config
HOMEBREW_VERSION: 3.4.10-7-ga4545e5
ORIGIN: https://github.com/Homebrew/brew
HEAD: a4545e52315ceedf2deb97ac17d7234708d16e5b
HOMEBREW_PREFIX: /opt/homebrew
HOMEBREW_CASK_OPTS: []
CPU: 10-core 64-bit arm_firestorm_icestorm
Clang: 13.1.6 build 1316
Git: 2.36.0 => /opt/homebrew/bin/git
Curl: 7.79.1 => /usr/bin/curl
macOS: 12.3.1-arm64
CLT: 13.3.1.0.1.1648687083
Xcode: 13.3.1
Rosetta 2: false
```

## brew 的常用命令

常用的命令没几个：

```sh
➜  ~ brew install git 	# 安装
➜  ~ brew info git 		# 显示软件的各种信息
➜  ~ brew uninstall git # 卸载
➜  ~ brew search git # 模糊搜索 brew 支持的软件
➜  ~ brew list # 列出本机通过 brew 安装的所有软件
➜  ~ brew update # 更新 brew repo 信息，每次 Install 前也会自动更新
➜  ~ brew upgrade git # 更新软件 [如果不加软件名，就更新所有可以更新的软件]
➜  ~ brew cleanup # 清除下载的各种缓存
➜  ~ brew doctor # 诊断当前 brew 的配置是否有问题，并给出建议
```

## brew cask

![](https://camo.githubusercontent.com/f8b75a5e461338a90db6acf4db8f5bc9cf620bfba65a5a490ed10bd08f457b52/68747470733a2f2f692e696d6775722e636f6d2f464e4e4d36574c2e676966)

brew cask 是在 brew 的基础上一个增强的工具，用来安装Mac上的Gui程序应用包（.dmg/.pkg）, 比如 Chrome 、WeChat 等。它先下载解压到统一的目录中（`/opt/homebrew-cask/Caskroom`），省掉了自己去下载、解压、拖拽（安装）等蛋疼步骤，同样，卸载相当容易与干净。然后再软链到`~/Applications/`目录下, 一气呵成。非常方便，而且还包含很多在 AppStore 里没有的常用软件。

- brew cask的官网是：[http://caskroom.io](http://caskroom.io/)
- github地址是：https://github.com/caskroom/homebrew-cask

:::information_desk_person: Cask 目前已经内置到 brew 官方安装包内了，无需单独安装；并且官方集成的非常好，大部分情况下，不需要特殊标记就可以看到到对应的软件了

```sh
➜  ~ brew search git --cask   # 在 brew 后 --cask 可指定查询 GUI 类型
==> Casks
adobe-digital-editions                   gitscout
caldigit-docking-utility                 gitter ✔
caldigit-thunderbolt-charging            gitup
deepgit                                  gitx
digital                                  logitech-camera-settings
font-digital-numbers                     logitech-control-center
git-it                                   logitech-firmwareupdatetool
gitahead                                 logitech-g-hub
gitblade                                 logitech-gaming-software
gitdock                                  logitech-myharmony
gitee                                    logitech-options ✔
giteye                                   logitech-presentation
gitfiend                                 logitech-unifying
gitfinder                                plotdigitizer
gitfox                                   rowanj-gitx
github                                   smartgit
github-beta                              snagit
githubpulse                              snagit4
gitify                                   subgit
gitkraken                                webplotdigitizer
gitnote                                  xit
gitpigeon
```

举个简单的例子，iTerm 是我们经常使用的软件：

```sh
➜  ~ brew install iTerm --cask  # 大部分情况下 --cask 是可以省略的，除非在出现同名的情况下
```

> 使用小技巧

如果不清楚这个软件是否符合我们的要求，可以在安装前通过 `brew seach` 模糊查询下 具体的软件名称：

```sh
➜  ~ brew search iterm --cask
==> Casks
font-ia-writer-mono        iterm2-legacy              zterm
iterm2 ✔                   iterm2-nightly
iterm2-beta                therm
```

在确认了具体的软件名称后，可以通过 `brew info` 查看更为详细的软件信息，在这里会告诉软件的具体名称和介绍

```sh
➜  ~ brew info iterm2
iterm2: 3.4.15 (auto_updates)
https://www.iterm2.com/
/opt/homebrew/Caskroom/iterm2/3.4.15 (119B)
From: https://github.com/Homebrew/homebrew-cask/blob/HEAD/Casks/iterm2.rb
==> Name
iTerm2
==> Description
Terminal emulator as alternative to Apple's Terminal app
==> Artifacts
iTerm.app (App)
==> Analytics
install: 25,001 (30 days), 91,481 (90 days), 335,711 (365 days)
```

OK，以上确认后，就可以正常安装了

## brew cu

`cu` 是 Cask 软件下的另一个优质的辅助工具，全称 `brew-cask-upgrade` 可以帮您检测全部 `brew install --cask` 的软件的版本更新情况

### cu 的安装

- Github https://github.com/buo/homebrew-cask-upgrade

```sh
➜  ~ brew tap buo/cask-upgrade
```

### 使用说明

```sh
➜  ~ brew cu # 简单即可检测所有软件的更新情况
==> Options
Include auto-update (-a): false
Include latest (-f): false
==> Updating Homebrew
Already up-to-date.
==> Finding outdated apps
       Cask                           Current       Latest        A/U    Result
 1/62  another-redis-desktop-manager  1.5.2         1.5.5              [OUTDATED]
 2/62  anydesk                        6.3.3         6.5.0              [OUTDATED]
 3/62  authy                          1.9.0         2.1.0          Y   [  PASS  ]
 4/62  betterdummy                    1.0.13        1.1.12         Y   [  PASS  ]
 5/62  bob                            0.7.0         0.8.1          Y   [  PASS  ]
 6/62  cakebrew                       1.3           1.3            Y   [  PASS  ]
 7/62  clipy                          1.2.1         1.2.1              [   OK   ]
 8/62  dash                           6.2.0         6.2.3          Y   [  PASS  ]
 9/62  devtoys                        0.0.10        0.0.10             [   OK   ]
10/62  feishu                         5.1.5         5.11.5         Y   [  PASS  ]
11/62  figma                          112.2.0       114.3.0        Y   [  PASS  ]
12/62  firefox                        94.0.2        99.0.1         Y   [  PASS  ]
13/62  folx                           5.25          5.26           Y   [  PASS  ]
14/62  font-fira-code                 6.2           6.2                [   OK   ]
15/62  forticlient-vpn                7.0           7.0                [   OK   ]
16/62  gitter                         1.177         1.177              [   OK   ]
17/62  iina                           1.2.0         1.2.0          Y   [  PASS  ]
18/62  iina-plus                      0.6.5         0.6.6              [OUTDATED]
19/62  imazing                        2.14.6        2.14.8         Y   [  PASS  ]
20/62  iterm2                         3.4.15        3.4.15         Y   [  PASS  ]
21/62  jellybeansoup-netflix          1.0.5         1.0.5              [   OK   ]
22/62  jetbrains-toolbox              1.22          1.23           Y   [  PASS  ]
23/62  kap                            3.4.2         3.5.4          Y   [  PASS  ]
24/62  keyboardholder                 1.5.5         1.6.1              [OUTDATED]
25/62  kite                           0.20210610.0  0.20210610.0   Y   [  PASS  ]
26/62  logitech-options               9.40.75       9.50.122       Y   [  PASS  ]
27/62  maccy                          0.22.0        0.22.2         Y   [  PASS  ]
28/62  microsoft-remote-desktop       10.7.0        10.7.6         Y   [  PASS  ]
29/62  netnewswire                    6.1           6.1            Y   [  PASS  ]
30/62  notable                        1.8.4         1.8.4          Y   [  PASS  ]
31/62  notion                         2.0.18        2.0.20         Y   [  PASS  ]
32/62  obsidian                       0.14.6        0.14.6         Y   [  PASS  ]
33/62  one-switch                     1.23          1.25               [OUTDATED]
34/62  openconnect-gui                1.5.3         1.5.3              [   OK   ]
35/62  openvpn-connect                3.3.2         3.3.5              [OUTDATED]
36/62  oss-browser                    1.16.0        1.16.0             [   OK   ]
37/62  picgo                          2.3.0         2.3.0              [   OK   ]
38/62  playcover                      0.9.2         1.0.0              [OUTDATED]
39/62  postman                        9.1.3         9.16.0         Y   [  PASS  ]
40/62  proxyman                       3.3.0         3.4.0          Y   [  PASS  ]
41/62  resilio-sync                   2.7.3         2.7.3          Y   [  PASS  ]
42/62  sensei                         1.5.1         1.5.2          Y   [  PASS  ]
43/62  shimo                          5.0.4         5.0.4          Y   [  PASS  ]
44/62  shuttle                        1.2.9         1.2.9              [   OK   ]
45/62  skype                          8.79.0.92     8.83.0.408     Y   [  PASS  ]
46/62  slack-beta                     4.23.0        4.26.0         Y   [  PASS  ]
47/62  sourcetree                     4.1.7         4.1.8          Y   [  PASS  ]
48/62  spotify                        1.1.73.517    1.1.84.716     Y   [  PASS  ]
49/62  steam                          4.0           4.0            Y   [  PASS  ]
50/62  sunloginclient                 11.0.1.39931  12.5.0.45236       [OUTDATED]
51/62  switchkey                      1.1.3         1.1.3              [   OK   ]
52/62  telegram                       8.3           8.7            Y   [  PASS  ]
53/62  tencent-lemon                  5.0.7         5.0.7          Y   [  PASS  ]
54/62  tencent-meeting                2.20.2.413    3.7.7.457      Y   [  PASS  ]
55/62  typora                         1.0.2         1.2.4          Y   [  PASS  ]
56/62  upic                           0.21.1        0.21.1             [   OK   ]
57/62  utm-beta                       3.1.5         3.2.0              [OUTDATED]
58/62  visual-studio-code-insiders    1.63.0        latest             [   OK   ]
59/62  whatsapp                       2.2204.13     2.2214.12      Y   [  PASS  ]
60/62  wireshark                      3.4.9         3.6.3          Y   [  PASS  ]
61/62  yesplaymusic                   0.4.3         0.4.3              [   OK   ]
62/62  zoom                           5.8.4.2421    5.10.4.6592    Y   [  PASS  ]

==> Found outdated apps
     Cask                           Current       Latest        A/U    Result
1/9  another-redis-desktop-manager  1.5.2         1.5.5              [OUTDATED]
2/9  anydesk                        6.3.3         6.5.0              [OUTDATED]
3/9  iina-plus                      0.6.5         0.6.6              [OUTDATED]
4/9  keyboardholder                 1.5.5         1.6.1              [OUTDATED]
5/9  one-switch                     1.23          1.25               [OUTDATED]
6/9  openvpn-connect                3.3.2         3.3.5              [OUTDATED]
7/9  playcover                      0.9.2         1.0.0              [OUTDATED]
8/9  sunloginclient                 11.0.1.39931  12.5.0.45236       [OUTDATED]
9/9  utm-beta                       3.1.5         3.2.0              [OUTDATED]

Do you want to upgrade 9 apps or enter [i]nteractive mode [y/i/N]?
```

可以根据提示输入然后选择是否更新：

- y 全部更新，后续不再确认
- i 依次咨询是否要更新
- N 全部不更新，退出

## brew mas

mas 是一个帮助在命令行下完成 Mac App Store 软件安装和查询的工具，使用起来也是非常的简单，但相对于 cask 低了很多，可以作为了解， 安装方式如下：

```sh
➜  ~ brew install mas
```

支持的命令也基本覆盖了常用需求

```sh
➜  ~ mas list
➜  ~ mas search xcode
➜  ~ mas install 407963104
➜  ~ mas outdated
➜  ~ mas upgrade
```

当然，mas 也支持了 appstore 的账号登录；不过目前看到 mas 的社区更新不怎么积极，目前仍旧未适配 最新的系统，谨慎选择。

## brew 软件的备份和恢复

 随着对系统使用的不断加深，我们已经在一台电脑上建立一套对自己来说的软件生态，所以在更换电脑时，需要安装那些软件是非常头疼的一个事情； 如果都是 GUI 软件还好，但研发同学的电脑其实会有大量的 forumal 软件，重装起来还是非常麻烦的。

所以，这里给大家推荐 `homebrew-bundle` 来帮助迁移电脑时，快速备份和恢复你的软件环境；整个使用的过程也是非常的便捷。

```sh
# 执行 bundle dump 备份软件清单到 Brewfile
brew bundle dump --describe --force --file="~/Desktop/Brewfile"

# --describe：为列表中的命令行工具加上说明性文字，可以参照 brew info package
```

根据你电脑的软件多少，这大概会花费几十秒的时间，然后你会得到一份你的电脑软件清单，这里也分享下我的清单

```sh
➜  ~ cat Desktop/Brewfile
tap "bigwig-club/brew"
tap "buo/cask-upgrade"
tap "heroku/brew"
...
# Mozilla CA certificate store
brew "ca-certificates"
# GNU database manager
brew "gdbm"
# Automate deployment, configuration, and upgrading
brew "ansible"
# Library and utilities for processing GIFs
brew "giflib"
...
# Redis desktop manager
cask "another-redis-desktop-manager"
# Allows connection to a computer remotely
cask "anydesk"
# Two-factor authentication software
cask "authy"
# Dummy Display for Apple Silicon Macs to achieve custom resolutions
cask "betterdummy"
...
mas "AngryBirdsReloaded", id: 1539172625
mas "Asphalt 8+", id: 1563005359
mas "BombSquad", id: 416482767
mas "Bridge Constructor+", id: 1587908263
...
```

整个备份的内容包含  4 个部分，也正好包含了，我上面讲到的所有 brew 命令

- brew tap 中的软件库
- brew 安装的命令行工具
- brew cask 安装的 App
- Mac App Store 安装的 App  `这里也就是用上面的 mas` 

### 快速恢复软件

以下是你的新 Mac 上要做的事情，你需要把自己的 `Brewfile` 转移到新的 Mac 上，软件需要安装基础的工具:

```sh
# 安装 Homebrew
➜  ~ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# 安装 mas
➜  ~ brew install mas
```

基础环境安装好了，之后，就可以进行软件恢复啦

```sh
# 批量安装软件 
➜  ~ brew bundle --file="~/Desktop/Brewfile"
```

软件实际恢复的速度取决于你的网络状态，不过 brew bundle 可以重复执行，你是可以中断恢复的。

## 结语

好了，以上就是我关于 Mac 下软件安装神器 `brew`  的使用分享啦，这里大概涵盖了你 95% 的使用需求，如果你发现仍有疑问，欢迎与我取得联系，或者使用 Google 解决剩下的问题。

文档内容，可能会随着时间推移有不适用的情况，若遇到冲突以官方说明为准。
