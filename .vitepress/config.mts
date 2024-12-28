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
  lang: "en-US",
  // lastUpdated: true,
  ignoreDeadLinks: true,
  appearance: "dark",

  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    [
      "style",
      {},
      `
      :root {
        --vp-home-hero-name-color: transparent;
        --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #47caff);
        --vp-c-brand: #646cff;
        --vp-c-brand-light: #747bff;
      }

      .VPImage.image-src {
        border-radius: 50% !important;
        width: 200px !important;
        height: 200px !important;
        border: 4px solid transparent;
        transition: border-color 0.3s ease;
      }

      .VPImage.image-src:hover {
        border-color: var(--vp-c-brand);
      }

      .VPHero .name {
        background: var(--vp-home-hero-name-background);
        -webkit-background-clip: text;
        background-clip: text;
        font-weight: bold;
      }

      .VPHero .text {
        font-size: 48px !important;
        font-weight: 600;
        background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .VPFeature {
        transition: transform 0.3s ease;
      }

      .VPFeature:hover {
        transform: translateY(-5px);
      }

      .VPFeature .title {
        font-size: 20px;
        font-weight: 600;
        background: linear-gradient(120deg, #3498db, #2ecc71);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .custom-block.tip {
        border-color: var(--vp-c-brand);
      }
    `,
    ],
  ],

  markdown: {
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
      detailsLabel: "Details",
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "LLM", link: "/llm/" },
      { text: "Cloud Native", link: "/cloud-native/" },
      { text: "Blog", link: "/blog/" },
      { text: "About", link: "/about" },
    ],

    sidebar: {
      "/llm/": loadSidebar("llm"),
      "/cloud-native/": loadSidebar("cloud-native"),
      "/blog/": blogSidebar,
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
