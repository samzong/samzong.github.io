# MacMusicPlayer

MacMusicPlayer 是一个简洁、轻量级的 macOS 音乐播放器，设计为菜单栏应用程序，让您可以轻松控制音乐播放而不打断工作流程。

![image](https://github.com/samzong/MacMusicPlayer/blob/main/image.png?raw=true)

## 功能特点

- 🎵 从指定文件夹加载和播放 MP3 文件 <v0.1.0+>
- 🔄 记住上次选择的音乐文件夹，无需重复配置 <v0.1.0+>
- 🖱️ 通过菜单栏图标快速访问播放控制 <v0.1.0+>
- ⏯️ 播放、暂停、上一曲、下一曲功能 <v0.1.0+>
- 📂 随时重新配置音乐文件夹 <v0.1.0+>
- 🎨 简洁的用户界面，最小化干扰 <v0.1.0+>
- 😴 支持防止 Mac 休眠（一键开启） <v0.1.0+>
- 🌐 支持多语言，并自动适配系统语言 <v0.1.5+>
- 🎵 支持播放模式（顺序、随机、单曲循环） <v0.1.5+>
- 📝 支持展示版本信息 <v0.1.7+>
- 📦 支持安装流程优化，支持 HomeBrew 安装 <v0.1.7+>

## 安装

### HomeBrew 安装最新版本

```bash
# install latest version
brew tap samzong/tap
brew install samzong/tap/mac-music-player

# upgrade to latest version
brew update
brew upgrade samzong/tap/mac-music-player
```

### 低于 v0.1.5 版本

```text
1. 下载最新的 MacMusicPlayer.dmg 文件。
2. 打开 DMG 文件并将 MacMusicPlayer 应用程序拖到应用程序文件夹。
3. 首次运行时，macOS 可能会显示安全警告。请在"系统偏好设置">"安全性与隐私"中允许应用运行。
4. 如果仍然报错，请执行 `sudo xattr -r -d com.apple.quarantine /Applications/MacMusicPlayer.app`
```

## 使用方法

1. 启动 MacMusicPlayer。首次运行时，它会要求您选择音乐文件夹。
2. 选择包含 MP3 文件的文件夹。
3. 应用程序图标将出现在菜单栏中。
4. 点击菜单栏图标访问播放控制和其他选项：
   - 播放/暂停当前曲目
   - 切换到上一曲或下一曲
   - 查看当前播放的曲目信息
   - 重新配置音乐文件夹
   - 退出应用程序

## 注意事项

- MacMusicPlayer 目前仅支持 MP3 格式的音频文件。
- 确保给予应用程序访问您选择的音乐文件夹的权限。

## 反馈与支持

如果您遇到任何问题或有改进建议，请于我联系，创建 issue 或提交 PR。
