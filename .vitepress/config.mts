import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "samzong",
  description: "Samzong records the place where he studies and lives.",
  lang: 'en-US',
  lastUpdated: true,
  
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
      '/blog/': {
        base: '/blog/',
        items: [
  {
    "text": "2024年",
    "collapsed": false,
    "items": [
      {
        "text": "安装 Docker 看这篇就够了",
        "link": "2024-10-24-install-docker"
      },
      {
        "text": "修改 Arc Browser 的图标",
        "link": "2024-10-06-change-arc-icons"
      },
      {
        "text": "Python 常见的高阶用法",
        "link": "2024-07-27-python-advanced-usage"
      }
    ]
  },
  {
    "text": "2023年",
    "collapsed": true,
    "items": [
      {
        "text": "计算国家法定节假日",
        "link": "2023-10-08-ji-suan-guo-jia-fa-ding-jie-jia-ri"
      },
      {
        "text": "MacOS 启用和关闭 SIP",
        "link": "2023-08-08-MacOS-qi-yong-he-bi-SIP"
      },
      {
        "text": "使用 Parallels Desktop 无界面启动虚拟机",
        "link": "2023-07-28-use-paralles-desktop-without-ui"
      },
      {
        "text": "Google 搜索技巧整理",
        "link": "2023-07-13-google-sou-suo-ji-qiao-zheng-li"
      },
      {
        "text": "在线服务器激活 Ketbrains",
        "link": "2023-02-21-ketbrains-ji-huo-fu-wu-qi"
      }
    ]
  },
  {
    "text": "2022年",
    "collapsed": true,
    "items": [
      {
        "text": "Raycast 你的年度报告已到达",
        "link": "2022-12-16-raycast"
      },
      {
        "text": "DCE5-Skoala 安装教程",
        "link": "2022-12-15-Skoala-Install-Dce5"
      },
      {
        "text": "保姆式安装 DCE5.0",
        "link": "2022-12-06-dce5"
      },
      {
        "text": "春松客服",
        "link": "2022-11-28-cskefu-opensource-project"
      },
      {
        "text": "What is Hukou",
        "link": "2022-11-23-what-is-hukou"
      },
      {
        "text": "Copy to Markdown",
        "link": "2022-11-20-Copy-To-Markdwon"
      },
      {
        "text": "Dubbo 基础知识梳理",
        "link": "2022-11-16-dubbo-ji-chu-zhi-shi"
      },
      {
        "text": "Panads fill NaN value to Zero",
        "link": "2022-11-10-panads-fill-nan-value-to-zero"
      },
      {
        "text": "Redash for Docker 部署",
        "link": "2022-10-22-redash-for-docker-bu-shu"
      },
      {
        "text": "JWT 内置的方式",
        "link": "2022-10-18-jwt-nei-zhi-de-fang-shi"
      },
      {
        "text": "唧唧复唧唧",
        "link": "2022-10-06-ji-ji-fu-ji-ji"
      },
      {
        "text": "自卑与超越",
        "link": "2022-10-04-zi-bei-yu-chao-yue"
      },
      {
        "text": "GitLab Forked 如何跟随 upstream 主库",
        "link": "2022-09-28-gitlab-forked-ru-he-gen-sui-upstream-zhu-ku"
      },
      {
        "text": "Kafka 调研及功能设计",
        "link": "2022-09-27-kafka-jing-pin-diao-yan-ji-gong-neng-she-ji"
      },
      {
        "text": "Poetry 使用笔记",
        "link": "2022-09-22-poetry-shi-yong-bi-ji"
      },
      {
        "text": "Skoala 部署教程",
        "link": "2022-09-20-skoala-bu-shu-jiao-cheng"
      },
      {
        "text": "使用 canal 进行数据库增量同步",
        "link": "2022-09-18-shi-yong-canal-jin-xing-shu-ju-ku-zeng-liang-tong-bu"
      },
      {
        "text": "K8s 系列 南北流量和东西流量",
        "link": "2022-09-12-k8s-xi-lie-nan-bei-liu-liang-he-dong-xi-liu-liang"
      },
      {
        "text": "Docker for Mac 网络技巧",
        "link": "2022-08-17-docker-for-mac-wang-luo-ji-qiao"
      },
      {
        "text": "瓦尔登湖",
        "link": "2022-08-15-wa-er-deng-hu"
      },
      {
        "text": "Contour 学习笔记",
        "link": "2022-08-10-contour-xue-xi-bi-ji"
      },
      {
        "text": "通过 pipreqs 获取当前项目的依赖库",
        "link": "2022-07-24-tong-guo-pipreqs-huo-qu-dang-qian-xiang-mu-di-yi-lai-ku"
      },
      {
        "text": "Contour和Envoy指标介绍",
        "link": "2022-07-22-contour-envoy-zhi-biao"
      },
      {
        "text": "jq 命令行 Json 处理神器",
        "link": "2022-07-22-jq-ming-ling-xing-json-chu-li-shen-qi"
      },
      {
        "text": "微服务引擎网关能力介绍",
        "link": "2022-07-21-wei-fu-wu-yin-qing-wang-guan-neng-li-jie-shao"
      },
      {
        "text": "闭关备战 11 月",
        "link": "2022-07-18-bi-guan-bei-zhan-11-yue"
      },
      {
        "text": "i18n 使用构建",
        "link": "2022-07-18-i18n-shi-yong-gou-jian"
      },
      {
        "text": "Mac 上安装软件的方式",
        "link": "2022-06-29-mac-shang-an-zhuang-ruan-jian-de-fang-shi"
      },
      {
        "text": "HTTPProxy API 创建",
        "link": "2022-06-18-httpproxy-api-chuang-jian"
      },
      {
        "text": "Hexo 增加 admonition 样式支持",
        "link": "2022-05-28-hexo-admonition"
      },
      {
        "text": "Gitlab 发送企微机器人消息",
        "link": "2022-05-18-gitlab-fa-song-qi-wei-ji-qi-ren-xiao-xi"
      },
      {
        "text": "国内环境搭建 MacOS K8s 开发环境",
        "link": "2022-05-17-guo-nei-huan-jing-da-jian-macos-k8s-kai-fa-huan-jing"
      },
      {
        "text": "Kubernetes Operator",
        "link": "2022-05-17-kubernetes-operator"
      },
      {
        "text": "Contour 设计理念",
        "link": "2022-05-11-contour-she-ji-li-nian"
      },
      {
        "text": "MacOS 隐藏 Dock 中特定应用",
        "link": "2022-05-07-macos-yin-cang-dock-lan-zhong-te-ding-ying-yong"
      },
      {
        "text": "阿里云云原生网关",
        "link": "2022-05-06-a-li-yun-yun-yuan-sheng-wang-guan"
      },
      {
        "text": "满足预期的文档站 Mkdocs",
        "link": "2022-05-06-man-zu-yu-qi-de-wen-dang-zhan-mkdocs"
      },
      {
        "text": "腾讯云微服务网关",
        "link": "2022-05-06-teng-xun-yun-wei-fu-wu-wang-guan"
      },
      {
        "text": "Alfred Workflow 推荐",
        "link": "2022-05-03-alfred-workflow-tui-jian"
      },
      {
        "text": "淘宝 Python SDK 优化支持 Python3",
        "link": "2022-05-03-tao-bao-python-sdk-you-hua-zhi-chi-python3"
      },
      {
        "text": "youtube-dl 下载 YouTube 视频",
        "link": "2022-05-03-youtube-dl-xia-zai-youtube-shi-pin"
      },
      {
        "text": "kubernetes 学习之路",
        "link": "2022-04-24-kubernetes-xue-xi-zhi-lu"
      },
      {
        "text": "GitHub Pages 的妙用",
        "link": "2022-04-22-github-pages-de-miao-yong"
      },
      {
        "text": "Kubernetes 部署错误解决汇总",
        "link": "2022-04-21-kubernetes-bu-shu-cuo-wu-jie-jue-hui-zong"
      },
      {
        "text": "需要了解的 K8s 发行版本",
        "link": "2022-04-19-xu-yao-liao-jie-de-jing-pin"
      },
      {
        "text": "CKA 考试准备",
        "link": "2022-04-18-cka-kao-shi-zhun-bei"
      },
      {
        "text": "Dockerfile Run at M1 processor build failed",
        "link": "2022-04-17-Docker-Run-at-Apple-Silicon-M1"
      },
      {
        "text": "python Request install pip error",
        "link": "2022-04-17-python-request-install-pip-error"
      },
      {
        "text": "Metabase 上手 - 使用 Jar 运行",
        "link": "2022-04-16-metabase-shang-shou-shi-yong-jar"
      },
      {
        "text": "SQL 对时间整点的处理",
        "link": "2022-04-15-sql-dui-shi-jian-zheng-dian-de-chu-li"
      },
      {
        "text": "Python Pip 国内加速",
        "link": "2022-04-14-python-pip-guo-nei-jia-su"
      },
      {
        "text": "淘宝 Python SDK 优化支持 Python3",
        "link": "2022-04-14-tao-bao-python-sdk-you-hua-zhi-chi-python3"
      },
      {
        "text": "Git 修复历史错误的 Author 信息",
        "link": "2022-04-11-git-xiu-fu-li-shi-cuo-wu-de-author-xin-xi"
      },
      {
        "text": "Awsome Telegram Bot",
        "link": "2022-04-10-awsome-telegram-bot"
      },
      {
        "text": "Javascript Tips",
        "link": "2022-03-28-Javascript-Tips"
      },
      {
        "text": "Awesome Hexo Plugin",
        "link": "2022-03-27-awesome-hexo-plugins"
      },
      {
        "text": "Poetry 使用笔记",
        "link": "2022-03-27-poetry-shi-yong-bi-ji"
      },
      {
        "text": "Pyenv Python 版本管理",
        "link": "2022-03-27-python-duo-ban-ben-guan-li-gong-ju"
      },
      {
        "text": "2022 新的目标",
        "link": "2022-03-11-xin-de-mu-biao"
      },
      {
        "text": "FastAPI 使用文档",
        "link": "2022-02-24-fastapi-shi-yong-wen-dang"
      },
      {
        "text": "Python 项目的目录结构设计",
        "link": "2022-02-11-yi-ge-python-xiang-mu-di-mu-lu-jie-gou-she-ji"
      },
      {
        "text": "Python3 文本处理",
        "link": "2022-01-21-python3-wen-ben-chu-li-strip-split"
      },
      {
        "text": "ClickHouse 常用函数使用",
        "link": "2022-01-20-clickhouse-chang-yong-han-shu-shi-yong"
      },
      {
        "text": "MySQL Case WHEN",
        "link": "2022-01-04-mysql-case-when"
      },
      {
        "text": "Apollo 如何实现配置热发布",
        "link": "2022-01-03-apollo-ru-he-shi-xian-pei-zhi-re-fa-bu"
      },
      {
        "text": "get current timestamp",
        "link": "2022-01-03-get-current-timestamp"
      },
      {
        "text": "python flask form",
        "link": "2022-01-03-python-flask-form"
      }
    ]
  },
  {
    "text": "2021年",
    "collapsed": true,
    "items": [
      {
        "text": "Github 使用 SSH 拉取代码加速",
        "link": "2021-11-29-git-zhong-duan-clone-jia-su"
      },
      {
        "text": "钉钉内网穿透工具",
        "link": "2021-11-19-ding-ding-nei-wang-chuan-tou-gong-ju"
      },
      {
        "text": "Creating DataFrame using list",
        "link": "2021-11-17-creating-dataframe-using-list"
      },
      {
        "text": "使用钉钉三方授权登录",
        "link": "2021-11-17-shi-yong-ding-ding-san-fang-shou-quan-deng-lu"
      },
      {
        "text": "Metabase 踩坑：跳转链接的浏览器缓存",
        "link": "2021-11-03-metabase-cai-keng-tiao-zhuan-lian-jie-de-liu-lan-qi-huan-cun"
      },
      {
        "text": "Python Version Manage `pyenv`",
        "link": "2021-10-19-python-version-manage-pyenv"
      },
      {
        "text": "快速了解连接数据库",
        "link": "2021-09-24-kuai-su-liao-jie-lian-jie-shu-ju-ku"
      },
      {
        "text": "node nvm",
        "link": "2021-09-24-node-nvm"
      },
      {
        "text": "dataframe - Pandas",
        "link": "2021-09-05-dataframe-pandas"
      },
      {
        "text": "使用 Python3 格式化大型 json 文件",
        "link": "2021-09-05-shi-yong-python3-ge-shi-hua-da-xing-json-wen-jian"
      },
      {
        "text": "Python 抓出来随机下载记录",
        "link": "2021-08-25-python-zhua-chu-lai-sui-ji-xia-zai-ji-lu"
      },
      {
        "text": "MySQL REGEXP 活学活用",
        "link": "2021-08-09-mysql-regexp-huo-xue-huo-yong"
      },
      {
        "text": "常用 SQL-拼接日期",
        "link": "2021-08-08-chang-yong-sql"
      },
      {
        "text": "在谷歌浏览器中安装.crx 插件",
        "link": "2021-07-22-zai-gu-ge-liu-lan-qi-zhong-an-zhuang-.crx-cha-jian"
      },
      {
        "text": "知乎周刊・单身会上瘾",
        "link": "2021-07-22-zhi-hu-zhou-kan-dan-shen-hui-shang-yin"
      },
      {
        "text": "iPhone/iPad 不越狱安装旧版程序",
        "link": "2021-06-25-iphone-ipad-bu-yue-yu-an-zhuang-jiu-ban-cheng-xu"
      },
      {
        "text": "Mac 如何快速录制 GiF 小视频",
        "link": "2021-06-12-mac-ru-he-kuai-su-lu-zhi-gif-xiao-shi-pin"
      },
      {
        "text": "快速了解 MySQL 时间范围参数",
        "link": "2021-04-18-kuai-su-liao-jie-mysql-shi-jian-fan-wei-can-shu"
      },
      {
        "text": "HQL/SQL时间处理",
        "link": "2021-04-16-hql-sql-shi-jian-chu-li"
      },
      {
        "text": "知乎周刊·乔布斯往事",
        "link": "2021-03-27-zhi-hu-zhou-kan-·-qiao-bu-si-wang-shi"
      },
      {
        "text": "how to set container auto-restarting with docker",
        "link": "2021-03-12-how-to-set-container-auto-restarting-with-docker"
      },
      {
        "text": "爱你就像爱生命",
        "link": "2021-03-10-ai-ni-jiu-xiang-ai-sheng-ming"
      },
      {
        "text": "巨婴国",
        "link": "2021-03-10-ju-ying-guo"
      },
      {
        "text": "macOS 10.15 开启 HiDPI",
        "link": "2021-03-10-macos-10.15-kai-qi-hidpi"
      },
      {
        "text": "其实，你所知道的世界很陌生",
        "link": "2021-03-10-qi-shi-ni-suo-zhi-dao-de-shi-jie-hen-mo-sheng"
      },
      {
        "text": "人间失格",
        "link": "2021-03-10-ren-jian-shi-ge"
      },
      {
        "text": "人生的枷锁",
        "link": "2021-03-10-ren-sheng-de-jia-suo"
      },
      {
        "text": "三生三世十里桃花",
        "link": "2021-03-10-san-sheng-san-shi-shi-li-tao-hua"
      },
      {
        "text": "未穿的红嫁衣·沉浮",
        "link": "2021-03-10-wei-chuan-de-hong-jia-yi-chen-fu"
      },
      {
        "text": "我们生活在巨大的差距里",
        "link": "2021-03-10-wo-men-sheng-huo-zai-ju-da-de-cha-ju-li"
      },
      {
        "text": "我所理解的生活",
        "link": "2021-03-10-wo-suo-li-jie-de-sheng-huo"
      },
      {
        "text": "愿有人陪你颠沛流离",
        "link": "2021-03-10-yuan-you-ren-pei-ni-dian-pei-liu-li"
      },
      {
        "text": "最后的耍猴人",
        "link": "2021-03-10-zui-hou-de-shua-hou-ren"
      },
      {
        "text": "macOs Terminal 三剑客",
        "link": "2021-02-15-macos-terminal-san-jian-ke"
      },
      {
        "text": "pprint beautiful json format",
        "link": "2021-02-15-pprint-beautiful-json-format"
      },
      {
        "text": "python3 traceback",
        "link": "2021-02-15-python3-traceback"
      },
      {
        "text": "requests post data 时对 json 需要特殊处理",
        "link": "2021-02-15-requests-post-data-shi-dui-json-xu-yao-te-shu-zhu-yi"
      },
      {
        "text": "dingtalk orgBot sign generate",
        "link": "2021-02-09-dingtalk-orgbot-sign-generate"
      },
      {
        "text": "python django 编写公共模块在 app 中引用",
        "link": "2021-02-07-python-django-bian-xie-gong-gong-mo-kuai-zai-app-zhong-yin-yong"
      },
      {
        "text": "python xlsxwriter 写入 excel",
        "link": "2021-01-20-python-xlsxwriter-xie-ru-excel"
      },
      {
        "text": "2021 年 - 全新出发",
        "link": "2021-01-01-year-the-new-start"
      }
    ]
  },
  {
    "text": "2020年",
    "collapsed": true,
    "items": [
      {
        "text": "检查您的 App 是否已支持 AppleSilicon",
        "link": "2020-12-25-jian-cha-nin-de-app-shi-fou-yi-zhi-chi-applesilicon"
      },
      {
        "text": "Mac 调整 Launchpad 图标大小",
        "link": "2020-12-25-mac-tiao-zheng-launchpad-tu-biao-da-xiao"
      },
      {
        "text": "learn sqlalchemy",
        "link": "2020-12-13-learn-sqlalchemy"
      },
      {
        "text": "covert timestamp2datetime",
        "link": "2020-12-09-covert-timestamp2datetime"
      },
      {
        "text": "python 完成抖店 API 授权",
        "link": "2020-12-08-python-wan-cheng-dou-dian-api-shou-quan"
      },
      {
        "text": "python3 str 去除特定内容",
        "link": "2020-12-03-python3-str-qu-chu-te-ding-nei-rong"
      },
      {
        "text": "Check You App readyOnAppleSilicon",
        "link": "2020-11-24-Check-You-Favorites-App-Is-Ready-Apple-Silicon"
      },
      {
        "text": "如何重置 Mac 的 SMC",
        "link": "2020-11-23-ru-he-zhong-zhi-mac-de-smc"
      },
      {
        "text": "代码格式相关",
        "link": "2020-11-18-dai-ma-ge-shi-xiang-guan"
      },
      {
        "text": "Django 练手项目",
        "link": "2020-11-18-django-lian-shou-xiang-mu"
      },
      {
        "text": "python re 正则表达式",
        "link": "2020-11-17-python-re-zheng-ze-biao-da-shi"
      },
      {
        "text": "autoscraper 爬虫 所见即所得",
        "link": "2020-11-16-autoscraper-pa-chong-suo-jian-ji-suo-de"
      },
      {
        "text": "Django 初始化 project",
        "link": "2020-11-09-django-chu-shi-hua-project"
      },
      {
        "text": "Django 修改 modules 时出错",
        "link": "2020-11-06-django-xiu-gai-modules-shi-chu-cuo"
      },
      {
        "text": "join 与 format 不同的用法",
        "link": "2020-11-06-join-yu-format-bu-tong-de-yong-fa"
      },
      {
        "text": "beautiful soup 4 使用技巧",
        "link": "2020-11-05-beautiful-soup-4-shi-yong-ji-qiao"
      },
      {
        "text": "python3 setup.py --help-commands",
        "link": "2020-11-04-python3-setup.py-help-commands"
      },
      {
        "text": "Use devtools encodeurl & decodeurl",
        "link": "2020-10-23-use-devtools-encodeurl-&-decodeurl"
      },
      {
        "text": "使用命令关闭和启动 AirPort",
        "link": "2020-10-17-mac-shi-yong-ming-ling-guan-bi-he-qi-dong-airport"
      }
    ]
  },
  {
    "text": "2019年",
    "collapsed": true,
    "items": [
      {
        "text": "Mac 下解决 oh-my-zsh 在终端下打开缓慢",
        "link": "2019-11-17-mac-jie-jue-oh-my-zsh-zai-zhong-duan-xia-da-kai-huan-man"
      },
      {
        "text": "Mac 下 Homebrew 的使用",
        "link": "2019-07-22-mac-xia-homebrew-de-shi-yong"
      },
      {
        "text": "MySQL 命令行辅助 mycli",
        "link": "2019-07-03-mysql-ming-ling-xing-fu-zhu-mycli"
      },
      {
        "text": "MacTips 如何快速录制 GiF 小视频",
        "link": "2019-01-22-mac-ru-he-kuai-su-lu-zhi-gif-xiao-shi-pin"
      }
    ]
  },
  {
    "text": "2018年",
    "collapsed": true,
    "items": [
      {
        "text": "MacTips 单独设置程序语言",
        "link": "2018-11-17-mactips-dan-du-she-zhi-cheng-xu-yu-yan"
      },
      {
        "text": "HowTo Skip Atlassian Auth for SourceTree",
        "link": "2018-08-04-HowTo-Skip-Atlassian-Auth-for-SourceTree"
      },
      {
        "text": "使用国内 pypi 源加速 pip 安装",
        "link": "2018-02-28-shi-yong-guo-nei-pypi-yuan-jia-su-pip-an-zhuang"
      },
      {
        "text": "Git 使用规范流程",
        "link": "2018-01-09-git-shi-yong-gui-fan-liu-cheng"
      }
    ]
  },
  {
    "text": "2017年",
    "collapsed": true,
    "items": [
      {
        "text": "Howto Install Redmine on Ubuntu 16.04",
        "link": "2017-12-02-Howto-Install-Redmine-on-Ubuntu-16.04"
      },
      {
        "text": "HowTo Use SSR Service on Mac",
        "link": "2017-11-15-zhun-ji-shou-fa-ju-jue-ke-xue-shang-wang-cong-wo-kai-shi"
      },
      {
        "text": "iPhone/iPad 不越狱安装旧版程序",
        "link": "2017-10-22-iphone:ipad-bu-yue-yu-an-zhuang-jiu-ban-cheng-xu"
      },
      {
        "text": "Jmeter 使用 BlazeMeter 为 Jmeter 录制脚本",
        "link": "2017-08-12-blazemeter-recoding-jmx"
      },
      {
        "text": "东平国家森林公园",
        "link": "2017-08-04-dong-ping-guo-jia-sen-lin-gong-yuan"
      },
      {
        "text": "bypy 百度网盘 Python 客户端",
        "link": "2017-06-02-bai-du-wang-pan-python-ke-hu-duan"
      },
      {
        "text": "我来到这世上",
        "link": "2017-05-20-wo-lai-dao-zhe-shi-shang"
      },
      {
        "text": "Wannacry 蠕虫病毒事件及修复方案",
        "link": "2017-05-15-wannacry-ru-chong-bing-du-shi-jian-ji-xiu-fu-fang-an"
      },
      {
        "text": "CentOS 增加新硬盘给根文件系统扩容",
        "link": "2017-04-18-centos-zeng-jia-xin-ying-pan-gei-gen-wen-jian-xi-tong-kuo-rong"
      },
      {
        "text": "HowTo Install GitLab",
        "link": "2017-04-13-HowTo-Install-GitLab"
      },
      {
        "text": "关于考试",
        "link": "2017-04-11-guan-yu-kao-shi"
      },
      {
        "text": "HowTo set Tomcat 7 automatic startup with CentOS 7",
        "link": "2017-04-05-HowTo-set-Tomcat-7-automatic-startup-with-CentOS-7"
      },
      {
        "text": "在 Linux 终使用 SSR 服务实现科上网",
        "link": "2017-03-23-zhun-ji-shou-fa-ju-jue-ke-xue-shang-wang-cong-wo-kai-shi"
      },
      {
        "text": "HowTo install Zoomdata",
        "link": "2017-03-06-HowTo-install-Zoomdata"
      },
      {
        "text": "四阶魔方特殊情况之处理",
        "link": "2017-03-04-si-jie-mo-fang-te-shu-qing-kuang-zhi-chu-li"
      },
      {
        "text": "HowTo Install NextCloud",
        "link": "2017-02-27-HowTo-Install-NextCloud"
      },
      {
        "text": "MacTips 使用命令关闭和启动 AirPort",
        "link": "2017-02-27-mactips-shi-yong-ming-ling-guan-bi-he-qi-dong-airport"
      },
      {
        "text": "HowTo Install Redmine",
        "link": "2017-02-22-HowTo-Install-Redmine"
      },
      {
        "text": "HowTo Upgrade Your Ghost Version",
        "link": "2017-02-20-HowTo-Upgrade-Your-Ghost-Version"
      },
      {
        "text": "HowTo Automatic Updates CENTOS/RHEL Using YUM",
        "link": "2017-02-19-HowTo-Automatic-Updates-CENTOS-RHEL-Using-YUM"
      },
      {
        "text": "MySQL 索引创建、删除和查看",
        "link": "2017-02-09-mysql-8-suo-yin-chuang-jian-shan-chu-he-cha-kan"
      },
      {
        "text": "HowTo Monitor Tomcat HeadMemory for Zabbix",
        "link": "2017-01-18-HowTo-Monitor-Tomcat-Head-Memory-for-Zabbix"
      },
      {
        "text": "每日备份 MySQL 单表数据",
        "link": "2017-01-15-mei-ri-bei-fen-mysql-dan-biao-shu-ju"
      },
      {
        "text": "生活在别处",
        "link": "2017-01-10-sheng-huo-zai-bie-chu"
      },
      {
        "text": "Docker Hub 国内加速",
        "link": "2017-01-07-docker-hub-guo-nei-jia-su"
      },
      {
        "text": "我的 2017",
        "link": "2017-01-01-wo-de-2017"
      }
    ]
  },
  {
    "text": "2016年",
    "collapsed": true,
    "items": [
      {
        "text": "HowTo Mount OSS Bucket On ECS",
        "link": "2016-12-20-HowTo-Mount-OSS-Bucket-On-ECS"
      },
      {
        "text": "告别",
        "link": "2016-12-17-gao-bie"
      },
      {
        "text": "上海天冷了",
        "link": "2016-12-17-shang-hai-tian-leng-le"
      },
      {
        "text": "血战钢锯岭",
        "link": "2016-12-11-xue-zhan-gang-ju-ling"
      },
      {
        "text": "HowTo Install Python3 on CentOS 6.x",
        "link": "2016-12-08-HowTo-Install-Python3-on-CentOS-6-x"
      },
      {
        "text": "HowTo Reset MySQL Root Password",
        "link": "2016-12-04-HowTo-Reset-MySQL-Root-Password"
      },
      {
        "text": "Tomcat 利用 JDK 自身 keytool 实现 HTTPS",
        "link": "2016-12-03-tomcat-2-li-yong-jdk-zi-shen-keytool-shi-xian-https"
      },
      {
        "text": "AWS Use s3cmd 命令行管理 S3 存储",
        "link": "2016-11-30-aws-use-s3cmd-ming-ling-xing-guan-li-s3-cun-chu"
      },
      {
        "text": "Tomcat java.lang.OutOfMemoryError",
        "link": "2016-11-29-Tomcat-1-java-lang-OutOfMemoryError"
      },
      {
        "text": "HowTo Install LNMP on CentOS 6.x",
        "link": "2016-11-28-HowTo-Install-LNMP-on-CentOS-6-x"
      },
      {
        "text": "世界上最没用的东西",
        "link": "2016-11-27-shi-jie-shang-zui-mei-yong-de-dong-xi"
      },
      {
        "text": "Denyhosts 增加服务器 SSH 黑名单机制",
        "link": "2016-11-23-denyhosts-zeng-jia-fu-wu-qi-ssh-hei-ming-dan-ji-zhi"
      },
      {
        "text": "MySQL 清空表命令之：truncate 与 delete 区别",
        "link": "2016-11-10-mysql-5-qing-kong-biao-ming-ling-zhi-truncate-yu-delete-qu-bie"
      },
      {
        "text": "SSH LINUX Security Settings",
        "link": "2016-10-29-SSH-LINUX-Security-Settings"
      },
      {
        "text": "HowTo Install PostgreSQL 9.5 on CentOS 6.x",
        "link": "2016-10-20-HowTo-Install-PostgreSQL-9-5-on-CentOS-6-x"
      },
      {
        "text": "微博随笔",
        "link": "2016-10-14-xie-de-wei-bo"
      },
      {
        "text": "写的微博",
        "link": "2016-10-14-xie-de-weibo"
      },
      {
        "text": "HowTo Use pt-query-digest",
        "link": "2016-09-22-HowTo-Use-pt-query-digest"
      },
      {
        "text": "生者孤独",
        "link": "2016-09-20-sheng-zhe-gu-du"
      },
      {
        "text": "HowTo Install a Tomcat Server 7",
        "link": "2016-09-19-HowTo-Install-a-Tomcat-Server-7"
      },
      {
        "text": "二十四岁",
        "link": "2016-08-19-er-shi-si-sui"
      },
      {
        "text": "Use Script Install LNMP",
        "link": "2016-08-13-Script-Install-LNMP"
      },
      {
        "text": "HowTo Setup MariaDB Galera Cluster 10 On CentOS 6.x",
        "link": "2016-08-04-HowTo-Setup-MariaDB-Galera-Cluster-10-On-CentOS-6-x"
      },
      {
        "text": "HowTo Install Openfire  on CentOS",
        "link": "2016-08-02-HowTo-Install-Openfire-on-CentOS"
      },
      {
        "text": "HowTo Use Docker create a Tomcat Project",
        "link": "2016-08-02-HowTo-Use-Docker-create-a-Tomcat-Project"
      },
      {
        "text": "你好，八月",
        "link": "2016-08-01-ni-hao-ba-yue"
      },
      {
        "text": "HowTo Trun Off IPv6 in CentOS 6.x",
        "link": "2016-07-29-HowTo-Trun-Off-IPv6-in-CentOS-6-x"
      },
      {
        "text": "HowTo Install KVM Manage Server webvirtmgr",
        "link": "2016-07-27-HowTo-Install-KVM-Manage-Server-webvirtmgr"
      },
      {
        "text": "Manage Tomcat Service Use Shell Script",
        "link": "2016-07-27-Manage-Tomcat-Service-Use-Shell-Script"
      },
      {
        "text": "Yum 中$releasever 和$basearch 的取值",
        "link": "2016-07-27-yum-zhong-releasever-he-basearch-de-qu-zhi"
      },
      {
        "text": "HowTo Play Pokemon GO in China",
        "link": "2016-07-24-HowTo-Play-Pokemon-GO-in-China"
      },
      {
        "text": "HowTo Reset Azure VM Linux Password",
        "link": "2016-07-10-HowTo-Reset-Azure-VM-Linux-Password"
      },
      {
        "text": "HowTo Install Docker on CentOS 6.x",
        "link": "2016-07-07-HowTo-Install-Docker-on-CentOS-6-x"
      },
      {
        "text": "HowTo Install MySQL 5.5/6/7 on RHEL/CentOS 5/6/7",
        "link": "2016-07-07-HowTo-Install-MySQL-5-5-6-7-on-RHEL-CentOS-5-6-7"
      },
      {
        "text": "HowTo Use Remi Install Redis",
        "link": "2016-07-07-HowTo-Use-Remi-Install-Redis"
      },
      {
        "text": "HowTo Use Fuse-sshfs to Mount Remote Filesystems",
        "link": "2016-07-05-HowTo-Use-Fuse-sshfs-to-Mount-Remote-Filesystems"
      },
      {
        "text": "MySQL 常用配置优化",
        "link": "2016-06-16-mysql-1-chang-yong-you-hua"
      },
      {
        "text": "使用 mosh 代替 ssh 连接服务器",
        "link": "2016-06-16-shi-yong-mosh-dai-ti-ssh-lian-jie-fu-wu-qi"
      },
      {
        "text": "Azure CLI Import AcountInfo",
        "link": "2016-05-24-Azure-3-HowTo-Use-Azure-CLI-on-Mac"
      },
      {
        "text": "HowTo Use Azure CLI on Mac",
        "link": "2016-05-24-Azure-HowTo-Use-Azure-CLI-on-Mac"
      },
      {
        "text": "HowTo Monitoring MySQL server for Zabbix",
        "link": "2016-05-20-HowTo-Monitoring-MySQL-server-for-Zabbix"
      },
      {
        "text": "HowTo Install CloudStack 4.8 on CentOS 6.x",
        "link": "2016-05-18-HowTo-Install-CloudStack-4-8-on-CentOS-6-x"
      },
      {
        "text": "OpenStak 介绍",
        "link": "2016-05-15-openstak-jie-shao"
      },
      {
        "text": "创建和使用 Azure Redis Cache",
        "link": "2016-05-12-azure-4-chuang-jian-he-shi-yong-azure-redis-cache"
      },
      {
        "text": "HowTo Install Fabric on CentOS 7.x",
        "link": "2016-05-05-HowTo-Install-Fabric-on-CentOS-7-x"
      },
      {
        "text": "CentOS 修改系统主机名",
        "link": "2016-05-05-centos-7-1-xiu-gai-xi-tong-zhu-ji-ming"
      },
      {
        "text": "CentOS 系统服务管理方式",
        "link": "2016-05-05-centos-7-2-xi-tong-fu-wu-guan-li-fang-shi"
      },
      {
        "text": "mysqldump 常用参数",
        "link": "2016-05-05-mysql-3-mysqldump-chang-yong-can-shu"
      },
      {
        "text": "HowTo Install Python 2.7.8 on CentOS 6.x",
        "link": "2016-05-04-HowTo-Install-Python-2-7-8-on-CentOS-6-x"
      },
      {
        "text": "HowTo Add Piwik Tracking to Ghost",
        "link": "2016-04-27-HowTo-Add-Piwik-Tracking-to-Ghost"
      },
      {
        "text": "HowTo Install piwik with nginx on centos 6.x",
        "link": "2016-04-27-HowTo-Install-piwik-with-nginx-on-centos-6-x"
      },
      {
        "text": "使用 SoureceTree 管理你的 git 项目",
        "link": "2016-04-20-shi-yong-sourecetree-guan-li-ni-de-git-xiang-mu"
      },
      {
        "text": "MacTips 调整 Launchpad 图标大小",
        "link": "2016-04-09-mac-1-tiao-zheng-launchpad-tu-biao-da-xiao"
      },
      {
        "text": "MacTips 解决 oh-my-zsh 在 Terminal 下打开缓慢",
        "link": "2016-04-08-mac-2-jie-jue-oh-my-zsh-zai-zhong-duan-xia-da-kai-huan-man"
      },
      {
        "text": "如何在 CentOS 6 安装更高版本的 PHP",
        "link": "2016-04-01-ru-he-zai-centos-6-an-zhuang-geng-gao-ban-ben-de-php"
      },
      {
        "text": "CentOS 使用 createrepo 搭建本地源",
        "link": "2016-03-29-centos-6-1-shi-yong-createrepo-da-jian-ben-di-yuan"
      },
      {
        "text": "Linux 中的三个特殊权限",
        "link": "2016-03-29-linux-zhong-de-san-ge-te-shu-quan-xian"
      },
      {
        "text": "MySQL 数据库使用基础",
        "link": "2016-03-29-mysql-4-mysql-shu-ju-ku-ji-chu"
      },
      {
        "text": "HowTo Install MongoDB  on CentOS 6.x",
        "link": "2016-03-27-HowTo-Install-MongoDB-on-CentOS-6-x"
      },
      {
        "text": "利用 Linux 计划任务定时同步 MySQL",
        "link": "2016-03-24-mysql-6-li-yong-linux-ji-hua-ren-wu-ding-shi-tong-bu-mysql"
      },
      {
        "text": "在 CentOS 中配置 SFTP 环境",
        "link": "2016-03-24-zai-centos-zhong-pei-zhi-sftp-huan-jing"
      },
      {
        "text": "Linux 笔试试题",
        "link": "2016-03-23-linux-bi-shi-shi-ti"
      },
      {
        "text": "MySQL 开启慢日志优化",
        "link": "2016-03-22-mysql-2-kai-qi-man-ri-zhi-you-hua"
      },
      {
        "text": "CentOS 初始安装基本优化操作",
        "link": "2016-03-19-centos-6-2-chu-shi-an-zhuang-ji-ben-you-hua-cao-zuo"
      },
      {
        "text": "理解 Linux 的硬链接与软链接",
        "link": "2016-03-18-li-jie-linux-de-ying-lian-jie-yu-ruan-lian-jie"
      },
      {
        "text": "龙族路明非",
        "link": "2016-03-07-long-zu-lu-ming-fei"
      },
      {
        "text": "2016 春节读书笔记",
        "link": "2016-03-04-2016-chun-jie-du-shu-bi-ji"
      },
      {
        "text": "HowTo use TortoiseGit for Windows",
        "link": "2016-02-12-HowTo-use-TortoiseGit-for-Windows"
      },
      {
        "text": "How to install MariaDB 10.1 on CentOS 7.x",
        "link": "2016-01-22-install-mariadb10-centos7"
      },
      {
        "text": "何余生说要感谢身边所有美好的人",
        "link": "2016-01-15-ru-he-zuo-yi-ge-cheng-shu-de-zi-ji"
      }
    ]
  },
  {
    "text": "2015年",
    "collapsed": true,
    "items": [
      {
        "text": "Hello 2016",
        "link": "2015-12-31-Hello-2016"
      },
      {
        "text": "极简主义",
        "link": "2015-11-17-ji-jian-zhu-yi"
      },
      {
        "text": "CentOS 修改系统主机名",
        "link": "2015-08-12-HowTo-Automatic-EasyBackup-MysqlDB"
      },
      {
        "text": "无题",
        "link": "2015-07-18-wu-ti"
      },
      {
        "text": "民谣是生",
        "link": "2015-06-04-min-yao-shi-sheng"
      },
      {
        "text": "这是一道鬼门关",
        "link": "2015-04-12-zhe-shi-yi-dao-gui-men-guan"
      },
      {
        "text": "路途上",
        "link": "2015-04-03-lu-tu-shang"
      },
      {
        "text": "写的第一个前端页面",
        "link": "2015-02-23-xie-de-di-yi-ge-qian-duan-ye-mian"
      }
    ]
  },
  {
    "text": "2014年",
    "collapsed": true,
    "items": [
      {
        "text": "CentOS 7 Configure DNS Server",
        "link": "2014-07-22-centos7-configure-bind-dns-server"
      },
      {
        "text": "我是一个最不会写标题的人",
        "link": "2014-03-27-wo-shi-yi-ge-zui-bu-hui-xie-biao-ti-de-ren"
      }
    ]
  },
  {
    "text": "2012年",
    "collapsed": true,
    "items": [
      {
        "text": "爱与痛的边缘",
        "link": "2012-07-30-ai-yu-tong-de-bian-yuan"
      }
    ]
  }
]
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/samzong/samzong.github.io' }
    ],

    // Search
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
