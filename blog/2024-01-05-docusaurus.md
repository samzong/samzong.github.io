---
toc: Docusaurus 常用语法
date: 2024-01-05 15:13
tags:
  - Blog
---
# Docusaurus 常用语法

👉 更多使用技巧，可以参考： [https://docusaurus.io/docs/markdown-features](https://docusaurus.io/docs/markdown-features)

## 代码折叠

[Markdown Features | Docusaurus](https://docusaurus.io/docs/markdown-features#details)

```
### Details element example

<details>
  <summary>Toggle me!</summary>
  <div>
    <div>This is the detailed content</div>
    <br/>
    <details>
      <summary>
        Nested toggle! Some surprise inside...
      </summary>
      <div>😲😲😲😲😲</div>
    </details>
  </div>
</details>
```

## 启动指定语言

```
# 启动时，指定对应语言版本构建
npm run start -- --locale zh
```