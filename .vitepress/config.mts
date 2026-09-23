import { defineConfig } from "vitepress";
import path from "path";
import { generateArchives } from "./utils/archives";
import { walkFiles } from "./utils/fileWalker";

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

function sectionSidebar(folder: string, label: string) {
  const contentDir = path.resolve(__dirname, `../${folder}`);
  const pages = walkFiles<{ text: string; link: string; index: boolean }>({
    contentDir,
    processFile: (filePath, content, { data }) => {
      const slug = path.basename(filePath, ".md");
      const index = slug === "index";
      const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
      return {
        text: String(data.title || heading || slug),
        link: index ? `/${folder}/` : `/${folder}/${slug}`,
        index,
      };
    },
  });
  pages.sort(
    (a, b) =>
      Number(b.index) - Number(a.index) || a.text.localeCompare(b.text, "zh")
  );
  return [{ text: label, items: pages.map(({ text, link }) => ({ text, link })) }];
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "samzong",
  description: "Engineer for AI-native systems. Building Dify, and the tools I use.",
  lang: "zh-CN",
  ignoreDeadLinks: false,
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
      { text: "Notes", link: "/blog/" },
      { text: "About", link: "/about" },
    ],

    sidebar: {
      "/llm/": sectionSidebar("llm", "LLMs"),
      "/cloud-native/": sectionSidebar("cloud-native", "Cloud Native"),
      "/blog/": blogSidebar,
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/samzong" },
      { icon: "x", link: "https://x.com/samzong" },
    ],
    outline: {
      level: [2,4]
    },

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
