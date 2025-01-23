---
title: 使用 Homebrew 发布自己的项目
tags:
  - Homebrew
date: 2025-01-22 23:00:20
toc: "true"
---

# 使用 Homebrew 发布自己的项目

Homebrew 是 macOS 和 Linux 上的包管理器，可以方便地安装、卸载、更新和列出软件包。

在 Mac 中，几乎我所有的软件都是使用 Homebrew 管理，前段时间我开发了一个 Mac 上的音乐播放器 [MacMusicPlayer](https://github.com/samzong/MacMusicPlayer)，
在分发软件安装以及更新时，比较麻烦，我就想着提交到 Homebrew 中，方便使用。

[https://github.com/Homebrew/homebrew-core/pull/191346](https://github.com/Homebrew/homebrew-core/pull/191346)

此时发现，想要发布到 Homebrew 的官方库中，需要满足 Github Repo Star 数量大于 50 的条件，我这个项目才刚发布，所以暂时不满足条件。

官方维护者推荐，可以创建自己的 Tap， 先自己维护，等项目成熟了，再提交到官方库中。

## 创建自己的 Tap

然后我就创建了 [https://github.com/samzong/homebrew-tap](https://github.com/samzong/homebrew-tap) 这个仓库，
并将我自己开发的几个软件聚合到了这里，方便使用。

这篇文章记录了，如何创建自己的 Tap，以及如何管理和发布项目，如果你有兴趣可以参考。

### 项目结构介绍

```bash
❯ tree -L 3 -a -I .git
.
├── .github
│   └── workflows
│       └── pr-review.yml
├── .gitignore
├── Casks
│   ├── hf-model-downloader.rb
│   └── mac-music-player.rb
├── DEVELOPMENT.md
├── Formula
│   └── mdctl.rb
├── README.md
└── README_zh.md
```

- Casks 目录下是存放 GUI 软件，比如 MacMusicPlayer
- Formula 目录下是存放 CLI 软件，比如 mdctl
- x.rb 文件是软件的描述文件，比如 mac-music-player.rb
- .github/workflows/pr-review.yml 是 PR 的审核流程，目前支持校验 SHASUM 和 测试安装

### 应用描述文件示例

```ruby
cask "mac-music-player" do
  version "0.1.7"

  url "https://github.com/samzong/MacMusicPlayer/releases/download/v#{version}/MacMusicPlayer-v#{version}.dmg"
  sha256 "510569bf8833c329652ceaea12035a773ba08a7e8181af3a392d0d68b8010d4b"

  name "MacMusicPlayer"
  desc "A simple and elegant music player for macOS"
  homepage "https://github.com/samzong/MacMusicPlayer"

  auto_updates true

  app "MacMusicPlayer.app"

  zap trash: [
    "~/Library/Application Support/MacMusicPlayer",
    "~/Library/Preferences/com.samzong.macmusicplayer.plist",
    "~/Library/Saved Application State/com.samzong.macmusicplayer.savedState",
    "~/Library/Caches/com.samzong.macmusicplayer",
  ]
end
```

- `url` 是软件的下载地址
- `sha256` 是软件的 SHA256 校验码
- `name` 是软件的名称
- `desc` 是软件的描述
- `homepage` 是软件的主页
- `auto_updates` 是软件是否自动更新
- `app` 是软件的安装路径
- `zap trash` 是软件的卸载路径

### 添加和更新应用

根据软件是 GUI 还是 CLI 软件，选择对应的目录，然后添加对应的描述文件， 建议通过 PR 的方式提交，方便审核。

## 使用 Tap 安装应用

Homebrew 提供了专门的三方库管理的能力，你可以方便添加在自己的 Mac 中。

```bash
brew tap samzong/tap
```

然后就可以使用 `brew install` 安装自己维护的软件了。

```bash
brew install --cask samzong/tap/mac-music-player
brew install --formula samzong/tap/mdctl
```

### 更新应用

Homebrew 会在更新是同步更新三方 Tap，所以你只需要定期执行 `brew update` 即可。

如果你希望查看更新信息，可以使用如下命令

```bash
brew update --verbose
```

## 应用发布新版本时自动更新 Tap

如果每次应用发布新版本时，都需要手动更新 Tap，那将是一件非常麻烦的事情，
所以你可以在自己的应用中，添加一个自动更新 Tap 的 Workflow.

我在 MacMusicPlayer 项目中，添加了一个自动更新 Tap 的 Workflow，
当应用发布新版本时，会自动更新 Tap，并提交到 Github，方便审核。

```yaml
# ...
    # 触发 Homebrew 更新
    - name: Trigger Homebrew Update
      if: success()  # 只在前面的步骤都成功时才触发
      uses: peter-evans/repository-dispatch@v2
      with:
        token: ${{ secrets.GH_PAT }}
        event-type: trigger-homebrew-update
        client-payload: '{"version": "${{ env.VERSION }}"}'
# ...
```

- 具体实现可以参考 [MacMusicPlayer Update Homebrew](https://github.com/samzong/MacMusicPlayer/blob/main/.github/workflows/update-homebrew.yml)
- 也可以维护在 [Makefile](https://github.com/samzong/mdctl/blob/main/Makefile)  中，通过 `make update-homebrew` 命令触发
- 需要自己创建一个 `GH_PAT` 的 secret，默认的 GH_TOKEN 无法跨仓库

## 后续

- 可以在 homebrew-tap 中增加 PR 自动 Merge 的能力，这样就可以让应用发版本后，全自动更新
- 增强 PR Review 的能力，目前基本是在 `macos-latest` 中运行，Homebrew 有更多和更严格的检查流程，可以参考
