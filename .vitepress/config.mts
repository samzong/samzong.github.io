import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";
import { generateArchives } from './utils/archives'

const archives = generateArchives()
const years = Object.keys(archives)
  .map(Number)
  .sort((a, b) => b - a)
  .map(String)

const blogSidebar = years.map(year => ({
  text: year,
  items: archives[year].map(post => ({
    text: post.title,
    link: post.url
  }))
}))

// load sidebar.json for each nav
function loadSidebar(navPath: string): any {
  const sidebarPath = path.resolve(__dirname, `../${navPath}/sidebar.json`);
  if (fs.existsSync(sidebarPath)) {
    const sidebarContent = fs.readFileSync(sidebarPath, "utf-8");
    return JSON.parse(sidebarContent);
  }
  return [];
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "samzong",
  description: "Samzong records the place where he studies and lives.",
  lang: "zh-CN",
  ignoreDeadLinks: true,
  appearance: "dark",
  srcExclude: ['**/test-font/**'],

  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  ],
  sitemap: {
    hostname: "https://samzong.me",
    lastmodDateOnly: true,
  },

  markdown: {
    image: {
      lazyLoading: true,
    },
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
    lineNumbers: true,
    container: {
      tipLabel: "TIP",
      warningLabel: "WARNING",
      dangerLabel: "DANGER",
      infoLabel: "INFO",
      detailsLabel: "DETAILS",
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "LLMs", link: "/llm/" },
      { text: "Cloud-Native", link: "/cloud-native/" },
      { text: "Blogs", link: "/blog/" },
      { text: "Projects", link: "/pages/projects" },
      { text: "About", link: "/about" },
    ],

    sidebar: {
      "/llm/": loadSidebar("llm"),
      "/cloud-native/": loadSidebar("cloud-native"),
      "/blog/": blogSidebar,
      "/projects/": loadSidebar("projects")
    },

    socialLinks: [{ icon: "github", link: "https://github.com/samzong" }],

    footer: {
      message: "Powered by VitePress",
    },

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "Search",
            buttonAriaLabel: "Search",
          },
          modal: {
            noResultsText: "No results found",
            resetButtonTitle: "Reset search",
            footer: {
              selectText: "to select",
              navigateText: "to navigate",
            },
          },
        },
      },
    },
  },
});
