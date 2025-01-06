export interface Project {
  name: string;
  description: string;
  github: string;
  website?: string;
  logo?: string;
  tags: string[];
  stars?: number; // GitHub stars 数量
  createdAt: string; // ISO 格式的日期字符串，如：'2024-01-01'
  docPath: string; // 项目文档路径，如：'/projects/samzong-blog'
}

export const projects: Project[] = [
  {
    name: "SD Chat",
    description:
      "基于 Stable Diffusion 的聊天机器人，支持文本到图像、视频生成等功能。",
    github: "https://github.com/samzong/sd-chat",
    logo: "/logo.png",
    tags: ["Stable Diffusion", "Python"],
    createdAt: "2024-12-25",
    docPath: "/projects/sd-chat",
  },
  {
    name: "Chrome tabboost",
    description:
      "基于 Arc 浏览器的标签增强工具，支持快捷键、标签管理、自定义快捷键等功能。",
    github: "https://github.com/samzong/chrome-tabboost",
    tags: ["Chrome", "Arc", "Typescript"],
    createdAt: "2024-12-18",
    docPath: "/projects/chrome-tabboost",
  },
  {
    name: "MacMusicPlayer",
    description:
      "一个简洁、轻量级的 macOS 音乐播放器，设计为菜单栏应用程序，让您可以轻松控制音乐播放而不打断工作流程。",
    github: "https://github.com/samzong/MacMusicPlayer",
    tags: ["macOS", "SwiftUI", "Music"],
    createdAt: "2024-09-18",
    docPath: "/projects/macmusicplayer",
  },
  {
    name: "Blogs",
    description: "一个简洁、轻量级的博客，收集了我的一些技术文章和项目文档。",
    github: "https://github.com/samzong/samzong.github.io",
    website: "https://samzong.me",
    tags: ["VitePress", "Typescript"],
    createdAt: "2024-12-28",
    docPath: "/",
  },
  {
    name: "iMusicPlayer",
    description: "一个简洁、轻量级的音乐播放器，支持 macOS 和 iOS 平台。",
    github: "https://github.com/samzong/iMusicPlayer",
    tags: ["macOS", "iOS", "SwiftUI"],
    createdAt: "2024-12-28",
    docPath: "/projects/imusicplayer",
  },
  {
    name: "ai-icon-generator",
    description: "一个基于 AI 的图标生成器，支持多种风格和尺寸。",
    github: "https://github.com/samzong/ai-icon-generator",
    website: "https://ai-icon-generator-fawn.vercel.app",
    tags: ["AI", "Icon", "Generator"],
    createdAt: "2025-01-02",
    docPath: "/projects/ai-icon-generator",
  }
];
