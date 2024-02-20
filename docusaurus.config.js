// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "SAMZONG",
  tagline: "Samzong's Blog",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://samzong.me",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "samzong", // Usually your GitHub org/user name.
  projectName: "samzong.me", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: false,
          routeBasePath: "/",
          // editUrl: ({locale, blogDirPath, blogPath, permalink}) =>
          // `https://github.com/samzong/samzong.me/edit/main/${blogDirPath}/${blogPath}`,
          // readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          //   defaultReadingTime({ content, options: { wordsPerMinute: 200 } }),
          blogTitle: "Samzong",
          postsPerPage: 1,
          blogSidebarCount: 0, // or 'ALL'
          tagsBasePath: "tags",
          archiveBasePath: "history",
          sortPosts: "descending",
          truncateMarker: /<!--\s*(truncate)\s*-->/,
          include: ["**/*.{md,mdx}"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} Samzong, Inc.`,
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: '',
      navbar: {
        // title: "SAMZONG",
        // logo: {
        //   alt: "Samzong",
        //   src: "img/logo.png",
        //   // href: 'https://samzong.me',
        // },
        items: [
          // { label: "Github", href: "https://github.com/samzong/", position: "right", },
          // { to: "/tags", label: "Tags", position: "right" },
          // { type: 'search',position: 'left',}
          // { to: "/archives", label: "Archives", position: "right" },
        ],
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
        respectPrefersColorScheme: true,
      },
      // announcementBar: {
      //   content:
      //     '⭐️ If you find my articles beneficial, feel free to follow me on <a target="_blank" rel="noopener noreferrer" href="https://github.com/samzong">GitHub</a>! ⭐️',
      // },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash", "python", "json"],
      },
      markdown: {
        mermaid: true,
      },
    }),
};

module.exports = config;
