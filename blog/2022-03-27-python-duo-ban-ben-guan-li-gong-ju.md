---
title: Pyenv Python 版本管理
toc: true
tags: [Python]
date: 2022-03-27 21:18:00
---

> to_url : [http://pyenv.run/](http://pyenv.run/)
github offical site [https://github.com/pyenv/pyenv](https://github.com/pyenv/pyenv)

在 MacOS 的使用方式：

```sh
brew install pyenv
```

---

使用 pyenv 还是挺方便的，但是在 Linux 云服务器上配置网络的话就比较麻烦了，比如我在用的阿里云 ECS，中间有些曲折，所以编写下文档记录下来，以防后续使用遇到问题

## 安装 `pyenv`

```bash
# 官方推荐
curl https://pyenv.run | bash
```

上面一个简单的命令就好了，安装后 pyenv 文件 会在你的 `$HOME/.pyenv` ，可以尝试看下脚本文件的内容，这里简单贴出来了；可以看到实际执行的脚本文件是下面这个

```bash
# 建议看下脚本
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash

# 下载脚本文件
wget https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer -O ~/pyenv-installer
```

如果你的服务器环境比较悲催，访问 GitHub 也是比较麻烦，那么可以看下这个网站  [https://gitclone.com/](https://gitclone.com/) ；只需要对 `pyenv-installer` 进行简单的修改就可以实现加速下载了

```bash
# ......
if [ -n "${USE_GIT_URI}" ]; then
  GITHUB="git://github.com"
else
  GITHUB="https://gitclone.com/github.com"
fi

# .....
```

> 先通过，`wget` 下载脚本文件，然后对脚本中的 `github.com` 的域名进行下修改，我试了下修改`https`就行了，然后就可以飞快的下载了

最后，将 `pyenv` 的初始化增加到系统的环境变量中

```bash
echo 'export PATH="$HOME/.pyenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
echo 'eval "$(pyenv virtualenv-init -)"'  >> ~/.bashrc
```

---

## 使用 `pyenv` 安装特定版本的 python

在网络好的情况下，可以直接通过 `pyenv install 3.9.6` 安装对应的版本了，但是因为网络的问题，你会发现一直在下载 Python 包这一步，问题就是 www.python.org/ftp 网络的访问问题

![image](images/resize,w_960,m_lfit_d63611fc.jpg)

遇到这个问题，可以尝试 先下载对应版本的安装包；可以使用国内的镜像站进行下载，或者在网络访问正常的地方进行下载包，然后上传到服务器中，这里推荐使用 淘宝的镜像站，把域名中 [https://www.python.org/ftp](https://www.python.org/ftp) 替换为 [https://npm.taobao.org/mirrors/](https://npm.taobao.org/mirrors/) ，下载到指定的目录

```bash
# v = 你想要安装的python版本，比如 3.8.6
export v=3.8.6;  mkdir -p ~/.pyenv/sources/$v; wget https://npm.taobao.org/mirrors/python/$v/Python-$v.tar.xz -P ~/.pyenv/sources/$v; pyenv install $v -k
```

![image](images/resize,w_960,m_lfit_1a2e55bb.jpg)

> 在 pyenv 命令的最后增加一个 -k  会在安装时，优先检测本地的文件
