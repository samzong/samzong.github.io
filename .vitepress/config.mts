import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "samzong",
  description: "Samzong records the place where he studies and lives.",
  lang: 'en-US',
  lastUpdated: true,
  ignoreDeadLinks: true,
  
  head: [
    ['style', {}, `
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
    `]
  ],

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    container: {
      tipLabel: 'TIP',
      warningLabel: 'WARNING',
      dangerLabel: 'DANGER',
      infoLabel: 'INFO',
      detailsLabel: 'Details'
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'LLM', link: '/llm/' },
      { 
        text: 'Categories',
        items: [
          { text: 'Tags', link: '/pages/tags' },
          { text: 'Categories', link: '/pages/categories' },
          { text: 'Archives', link: '/pages/archives' }
        ]
      },
      { text: 'About', link: '/about' }
    ],

    sidebar: {
      '/llm/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/llm/' },
            { text: 'Quick Start', link: '/llm/quickstart' }
          ]
        },
        {
          text: 'Deployment',
          collapsed: false,
          items: [
            { text: 'Deploying LLMs on Kubernetes', link: '/llm/Deploying-LLMs-on-Kubernetes' }
          ]
        },
        {
          text: 'Tutorials',
          collapsed: false,
          items: []
        }
      ],
      '/blog/': {
        base: '/blog/',
        items: []
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/samzong/samzong.github.io' }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search'
          },
          modal: {
            noResultsText: 'No results found',
            resetButtonTitle: 'Reset search',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate'
            }
          }
        }
      }
    }
  }
})
