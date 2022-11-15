---
layout: post
title: youtube-dl 下载 YouTube 视频
toc: true
tags:
  - Mac
categories:
  - Tools
abbrlink: 4921
date: 2022-05-03 13:57:28
---


> 截止 2022.5 `youtube-dl` 已经较长时间未更新了，建议采用 [`yt-dlp`](https://github.com/yt-dlp/yt-dlp), 将命令进行替换即可

## 安装新版本的 `yt-dlp` 

```sh
brew install yt-dlp/taps/yt-dlp
```

`yt-dlp` 是从 `youtube-dl` 分支出来的版本，提供持续更新和向前兼容，在友好型上做了优化；仅需要将所有安装命令中 `youtube-dl` 替换为 `yt-dlp` 

如果你还是喜欢使用 youtube-dl，可以使用以下命令将程序默认替换，同时不影响你的使用:

```sh
➜  ~ alias youtube-dl=yt-dlp
➜  ~ echo "alias youtube-dl=yt-dlp"  >> ~/.zshrc  # or ~/.bashrc
```

<img src="http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/JwWiwh.png?x-oss-process=image/resize,w_960,m_lfit" />

---

## youtube-dl 下载 YouTube 视频


视频下载命令行工具里，网友推荐通常都是『国外视频用 youtube-dl』，有这两个工具国内外主流视频网站的视频基本就横扫了，适合想收藏或者喜欢下载后用本地播放器的 Geek 群体。

- [youtube-dl](http://rg3.github.io/youtube-dl/download.html)

命令行工具本身其实不复杂，理解了它们的语法就能开始使用了，结合 Alfred 还可以把常用的命令设置成触发的动作，提升交互体验和效率。然而很多人一看网站的介绍估计和我最初的感受差不多，还要部署一堆使用环境啊。

## Xcode 的命令行工具

Homebrew 环境安装前先检查一下 Xcode 的命令行工具是否已经安装，如果 macOS 系统更新过可能也需要重新安装一次，「终端」（应用程序 - 实用工具 - 终端）中输入 `xcode-select --install`。

```sh
➜  ~ xcode-select --install
xcode-select: error: command line tools are already installed, use "Software Update" to install updates
➜  ~
```

*先前配置时已经安装过 Xcode 命令行工具，所以会出现上面的提示信息。*

## Homebrew 依赖

[Homebrew](https://brew.sh/index_zh-cn.html) 是一个macOS 上的软件包管理工具，通过命令行的方式安装和卸载软件，大部分的流行软件都提供了 Homebrew 的安装方式，也是开源世界里安装和更新软件的主流方式；

### [Homebrew](https://brew.sh/index_zh-cn.html)

只需要在联网的情况下运行一行命令：

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

> 更多关于 Homebrew 的使用相关，可以查看我的另一篇文章  [Mac 下 Homebrew 的使用](https://samzong.me/2022/05/03/Mac%E4%B8%8Bhomebrew%E7%9A%84%E4%BD%BF%E7%94%A8/)


## 安装 youtube-dl

上面刚学习到的命令可以先用起来，先看看 youtube-dl 的软件信息，在终端里输入 `brew info youtube-dl`，了解一下 youtube-dl 的依存环境和需要搭档的其他应用。

<img src="http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/S4sQmN.png?x-oss-process=image/resize,w_960,m_lfit" />

从终端运行的反馈能看到，youtube-dl 的使用环境是 Python3，合并视频片断还会用到 `ffmpeg`  这个组件，也就是说安装完 youtube-dl，还要再运行一次 `brew install ffmpeg` 

```sh
brew install youtube-dl
brew install ffmpeg
```

## youtube-dl 的基本用法

前 3 步结束已经可以用命令行下载视频了，这里介绍几个常用的命令，更多的命令用法在官网都有介绍 ，查看 Github 更全的操作指引 [Document](https://github.com/ytdl-org/youtube-dl/blob/master/README.md#description)

```sh
➜  ~ youtube-dl -h | grep Options
Options:
  General Options:
  Network Options:
  Download Options:
  Filesystem Options:
  Thumbnail Options:
  Verbosity / Simulation Options:
  Video Format Options:
  Subtitle Options:
  Authentication Options:
  Adobe Pass Options:
  Post-processing Options:
```

### 导出视频指定文件名称

```sh
youtube-dl https://www.youtube.com/watch?v=Ga4UCK627nU -o "~/Downloads/aaa.mp4"
```

`youtube-dl` 还提供了 一些变量的方式，可以作用在文件名上，比较常用的如下：

```sh
# %(title)s.%(ext)s 则是指定了文件名的格式，%(title)s 是视频的标题，%(ext)s 则是视频的文件扩展名
youtube-dl https://www.youtube.com/watch?v=Ga4UCK627nU -o "~/Downloads/%(title)s.%(ext)s"
```

通过 `视频名.扩展名` 这样可以规范化导出文档的名称；还有其他非常丰富的变量支持，可以去这里找到你想要的 [Output Template](https://github.com/ytdl-org/youtube-dl/blob/master/README.md#output-template)

### 查询视频支持的版本

导出的画质不如意，希望自定义导出画质，可以采用这个方式，使用 `-F` 查看视频资源支持的类型，通过 `-f` 指定对应的版本进行下载

<img src="http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/eUUy9N.png?x-oss-process=image/resize,w_960,m_lfit" />

```sh
➜  ~ youtube-dl -F https://www.youtube.com/watch\?v\=BYkHLlKFEsM
[youtube] BYkHLlKFEsM: Downloading webpage
[info] Available formats for BYkHLlKFEsM:
format code  extension  resolution note
249          webm       audio only tiny   53k , webm_dash container, opus @ 53k (48000Hz), 2.44MiB
250          webm       audio only tiny   70k , webm_dash container, opus @ 70k (48000Hz), 3.22MiB
140          m4a        audio only tiny  129k , m4a_dash container, mp4a.40.2@129k (44100Hz), 5.93MiB
251          webm       audio only tiny  136k , webm_dash container, opus @136k (48000Hz), 6.27MiB
160          mp4        256x144    144p   32k , mp4_dash container, avc1.4d400c@  32k, 30fps, video only, 1.48MiB
278          webm       256x144    144p   75k , webm_dash container, vp9@  75k, 30fps, video only, 3.45MiB
133          mp4        426x240    240p   48k , mp4_dash container, avc1.4d4015@  48k, 30fps, video only, 2.21MiB
242          webm       426x240    240p   76k , webm_dash container, vp9@  76k, 30fps, video only, 3.51MiB
134          mp4        638x360    360p   80k , mp4_dash container, avc1.4d401e@  80k, 30fps, video only, 3.70MiB
243          webm       638x360    360p  115k , webm_dash container, vp9@ 115k, 30fps, video only, 5.28MiB
135          mp4        852x480    480p  120k , mp4_dash container, avc1.4d401f@ 120k, 30fps, video only, 5.50MiB
244          webm       852x480    480p  161k , webm_dash container, vp9@ 161k, 30fps, video only, 7.41MiB
136          mp4        1278x720   720p  217k , mp4_dash container, avc1.4d401f@ 217k, 30fps, video only, 9.97MiB
247          webm       1278x720   720p  273k , webm_dash container, vp9@ 273k, 30fps, video only, 12.52MiB
248          webm       1916x1080  1080p  896k , webm_dash container, vp9@ 896k, 30fps, video only, 41.01MiB
137          mp4        1916x1080  1080p  923k , mp4_dash container, avc1.640028@ 923k, 30fps, video only, 42.24MiB
18           mp4        638x360    360p  350k , avc1.42001E, 30fps, mp4a.40.2 (44100Hz), 16.07MiB (best)

➜  ~ youtube-dl -f 137 https://www.youtube.com/watch\?v\=BYkHLlKFEsM  # 下载对应的 format code
➜  ~ youtube-dl -f best https://www.youtube.com/watch\?v\=BYkHLlKFEsM  # 下载最佳的版本
```

### 仅导出音频文件

:::information_source: 经常拿过来做个人的歌曲库导出，`youtube-dl -x` 提供了 -x 参数来进行指定 仅导出音频，`--extract-audio` 这里需要使用到 `ffmpeg` 。 

```sh
youtube-dl -x https://www.youtube.com/watch?v=Ga4UCK627nU -o "~/Downloads/%(title)s.%(ext)s"
```

默认下载的音频文件类型，可能无法满足你，这个时候，可以使用 `--audio-format` 参数，来指定对应的音频格式（使用 ffmpeg 自动转码），目前支持个格式类型有： 

```sh
Specify audio format: "best", "aac","flac", "mp3", "m4a", "opus", "vorbis",or "wav"; "best" by default
```

```sh
youtube-dl -x https://www.youtube.com/watch?v=Ga4UCK627nU -o "~/Downloads/%(title)s.%(ext)s" --audio-format mp3
```