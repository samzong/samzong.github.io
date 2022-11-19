---
layout: post
title: HowTo use TortoiseGit for Windows
tags: 
    - Git
categories: 
    - Git
    - TortoiseGit
---

Git 是目前最先进的版本控制系统，越来越多的业务场景都在使用 Git，风靡全球的 Github 更是让 Git 版本控制系统名声大震，但是 GitHub 旨在建立一个开源的生态环境，所以不适合企业内部的管理系统，在之前的文章中，我也讲到了如何搭建 GitLab，可以在企业内部自建一套功能完善的 Git 版本控制系统。

GitLab 是一个非常成熟的服务端应用，但是作为一名开发人员，我们在使用 GitLab 与其他人员协同版本时，需要有一个工作对我们的每次修改更新以及推送，这也是版本控制工具的真正精髓；在不同的平台有着很多丰富的应用软件，所以挑选一款适合自己的 Git GUI 工具很重要。

目前在众多 Git Client 之中做的比较好的是 SourceTree，并且同时支持 Mac 和 Windows 双平台，但是有一个问题，当我们在初次安装时需要验证 Atlassian 账号，但是 Atlassian 的注册页面用了 requirejs，而且是用了 Google 的 CDN 服务，所以必须翻墙，这对很多中国用户的使用造成了不变；所以，今天我在这里推荐一个在 Windows 平台下同样可以作为 Git 图形化客户端工具的：[TortoiseGit][1]

TortoiseGit 是 TortoiseSVN 的 Git 版本，TortoiseGit 用于迁移 TortoiseSVN 到 TortoiseGit，解决了在 Windows 平台之上没有合适 Git 图形化客户端的问题，TortoiseGit 不仅免费，而且同样支持丰富的语言包，但是需要独立下载语言包安装，默认只有英文，注意语言包与程序版本一定要匹配。

#### 下载

TortoiseGit 的官方下载地址是这里：<https://tortoisegit.org/download/> ，下载时请注意与你系统的兼容性。

> 注意 TortoiseGit 1.8.16 之后的版本不在支持 Windows XP 和 Server 2003

因为 TortoiseGit 官网不在国内，所以在访问下载时速度非常的慢，我将目前的稳定版本 2.4 上传到我的百度云盘，但是以后我可能不能及时更新，所以如果你对版本要求不是很高，可以点击下面链接下载。

链接：<https://pan.baidu.com/s/1eScNjA6> 密码：31hu

> 如链接失效，您可以通过本页面右下角展开通过邮箱，与我取得联系。

#### 安装

##### Git for Windows

首先，我们需要安装 Git 在你的电脑上，这保证你的 TortoiseGit 运行时所需要的依赖环境。

下载地址：<https://git-for-windows.github.io/>

同样，因为某些网络的原因，导致我们在下载时也会很慢，所以我也将目前最新 2.13 版本上传到了我的百度云盘：

链接：<https://pan.baidu.com/s/1c12ZvRq> 密码：43yt

安装过程，这里不在展示，通常情况下，你只需要一路点击 Next 即可，但是如果你想要修改一些设置，例如默认的安装位置，那么你需要注意下，在 TortoiseGit 初次启动时，你需要手动设置 Git.exe 的位置。

##### TortoiseGit

我的测试系统是 Windows 7 旗舰版 64 位，并且支持 TortoiseGit 最新的版本。

![image][image-1]

请依次安装上图中两个软件，注意 LanguagePack 应该在主程序之后安装，同样，你也只需要一路点击 Next 即可。

在你安装完成之后，在该目录的空白区域，单击鼠标右键，你应该会看到新增了 TortoiseGit 的选项，我们选择"TortoiseGit"\>"Settings"来初始化我们设置。

![image][image-2]

##### 修改程序语言为中文

如果英文你的使用不会有影响，你可以略过这一步骤，同样你也不需要下载上面的 LanguagePack 包。

![image][image-3]

好了，按照如上图中操作，你应该已经修改了程序语言为中文，再次到空白区域单击测试就可以看到了。

#### 使用 TortoiseGit 克隆你的项目

在我们安装了好 TortoiseGit 和 Git 的基本基础环境之后，我们需要使用 TortoiseGit 克隆项目，这里我们是在 GitHub 创建了一个测试项目，你可以直接使用你的项目地址即可。

##### 测试项目

![image][image-4]

GitHub 和 GitLab 都提供了通过使用 HTTPS 和 SSH 的方式，这两种方式有些不同，我会在下面分开讲述如何使用。

##### SSH 验证方式

如果采用 SSH 验证方式，那么你需要生成一对公钥和私钥，并且将公钥上传到你的 GitLab 或 GitHub 上，然后在克隆你的项目时，使用匹配的私钥即可。

那在 Windows 如何上生成私钥呢？其实我们在安装 TortoiseGit 时已经默认安装 PuTTYgen 工具，我们可以利用它来创建秘钥。

![image][image-5]

打开 PuTTYgen，点击 generate 即可创建密钥，PuTTYgen 其实是按照鼠标运行的轨迹来计算的，所以在点击后，我们不停的使用鼠标移动，等待进度条完成就可以了。

![image][image-6]

当创建完成之后，你可以看到以下以下内容，注意不要关闭，我们要点击`Save public key`和`Save private key`，并将上 public key 传到你的 GitHub 或 GitLab 账户之中。

![image][image-7]

> 注意，我在图中隐去了其他 SSH keys 信息，我建议你在做类似分享时也注意隐去你的重要信息

好了，接下来，我们就要开克隆我们的项目了，在你想要存放项目的目录内，鼠标右键选择”Git 克隆“，然后输入你的项目 URL，并且加载我们刚刚生产私钥文件。

![image][image-8]

注意，在你确认都没问题的情况下，点击确认，然后你就会看到如下页面，如果这个过程中出现问题，请注意检查项目 URL 和私钥文件是否正确。

![image][image-9]

到这里，我们 SSH 验证仓库的方式就全好，接下来我们就可以使用开始进行我们的工作，但在首次提交我们的项目时，需要设置用户名和密码，这是为了方便验证我们的身份。

![image][image-10]

点击”是“，在弹出的窗口中设定用户名和邮箱，保存即可。

![image][image-11]

##### HTTPS or HTTP

在使用 GitLab 为公司内部仓库时，可以不开通 HTTPS 验证，HTTP 也不会影响我们的验证方式，但是从安全的角度上来说，强烈建议启用 HTTPS，HTTPS 加密传输可以给我们的代码和用户信息的安全提供更好的保护。

如果使用 HTTPS or HTTP 的方式，我们不需要增加任何密钥文件或怎样，只需要使用我们现有的 GitHub 或 GitLab 账号即可；在你想要存放项目的目录内，鼠标右键选择”Git 克隆“，在弹出的窗口中，注意项目 URL 要是用 HTTPS，并且去掉勾选加载密钥选项。

![image][image-12]

**如果你的项目在 GitLab 上**，并且这个项目是一个私有项目，那么这里就会要求你输入你的 GitLab 用户名和密码，输入正确的用户和密码就可以成功克隆了。

但是，由于我的测试项目在 GitHub 上，GitHub 上的项目默认都是公开项目，所以在这一步骤不会询问我的用户名和密码，只有在我需要将本地更新推送到 GitHub 时才会验证；所以接下来我在项目目录下新增文件 newfile2.txt，

> 注意，Git 不同 SVN，Git 的提交不会将更新推送到远端服务器，所以我们在提交成功之后，再去手动推送

右键选择 Git 提交，会弹出提交页面，我们需要这里，输入提交说明信息，和需要提交的文件。

![image][image-13]

点击”提交之后“，我们会看成功提交的窗口，然后在窗口选择点击推送；

![image][image-14]

当我们点击推送之后，会要求输入对应的 GitHub 用户名和密码：

[1]: https://tortoisegit.org/

[image-1]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/q39b4.jpg
[image-2]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/educ5.jpg
[image-3]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/afmvd.jpg
[image-4]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/ot84j.jpg
[image-5]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/dh1fb.jpg
[image-6]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/2uyf3.jpg
[image-7]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/stgw9.jpg
[image-8]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/y7dsh.jpg
[image-9]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/bltrs.jpg
[image-10]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/07sxd.jpg
[image-11]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/wid9v.jpg
[image-12]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/givvr.jpg
[image-13]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/ata4r.jpg
[image-14]: https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/q4cq7.jpg
