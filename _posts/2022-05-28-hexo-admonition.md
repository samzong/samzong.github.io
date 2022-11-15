---
layout: post
title: "Hexo 增加admonition样式支持"
toc: true
abbrlink: 37733
date: 2022-05-28 22:27:18
tags:
    - Hexo
categories:
---

## 背景

除了在 Hexo 维护个人博客之外，目前经常用到的 2 个文档工具： 语雀和 Mkdocs 都是支持 admonition样式，所以也在考虑如何给 Hexo 博客文章也增加这样的能力。

保证写作习惯的一致性，好在有人开发出对应的插件，感谢.

- https://github.com/lxl80/hexo-admonition

## 安装方式

简单通过 2 个步骤即可，

### 安装插件

采用 npm 安装，如下：

```bash
npm install hexo-admonition --save
```

### 样式配置

你的 hexo 可能会使用不同主题，所以需要自己增加样式，将如下样式放入 hexo 主题的自定义样式文件中（如：`ext.css`），并按自己喜好修改：

```css
.admonition {
  margin: 1.5625em 0;
  padding: .6rem;
  overflow: hidden;
  font-size: .64rem;
  page-break-inside: avoid;
  border-left: .3rem solid #42b983;
  border-radius: .3rem;
  box-shadow: 0 0.1rem 0.4rem rgba(0,0,0,.05), 0 0 0.05rem rgba(0,0,0,.1);
  background-color: #fafafa;
}
p.admonition-title {
  position: relative;
  margin: -.6rem -.6rem .8em -.6rem !important;
  padding: .4rem .6rem .4rem 2.5rem;
  font-weight: 700;
  background-color:rgba(66, 185, 131, .1);
}
.admonition-title::before {
  position: absolute;
  top: .9rem;
  left: 1rem;
  width: 12px;
  height: 12px;
  background-color: #42b983;
  border-radius: 50%;
  content: ' ';
}
.info>.admonition-title, .todo>.admonition-title {
  background-color: rgba(0,184,212,.1);
}
.warning>.admonition-title, .attention>.admonition-title, .caution>.admonition-title {
  background-color: rgba(255,145,0,.1);
}
.failure>.admonition-title, .missing>.admonition-title, .fail>.admonition-title, .error>.admonition-title {
  background-color: rgba(255,82,82,.1);
}
.admonition.info, .admonition.todo {
  border-color: #00b8d4;
}
.admonition.warning, .admonition.attention, .admonition.caution {
  border-color: #ff9100;
}
.admonition.failure, .admonition.missing, .admonition.fail, .admonition.error {
  border-color: #ff5252;
}
.info>.admonition-title::before, .todo>.admonition-title::before {
  background-color: #00b8d4;
  border-radius: 50%;
}
.success>.admonition-title::before{
  background-color: #00c853;
  border-radius: 50%;
}
.warning>.admonition-title::before, .attention>.admonition-title::before, .caution>.admonition-title::before {
  background-color: #ff9100;
  border-radius: 50%;
}
.failure>.admonition-title::before,.missing>.admonition-title::before,.fail>.admonition-title::before,.error>.admonition-title::before{
  background-color: #ff5252;;
  border-radius: 50%;
}
.admonition>:last-child {
  margin-bottom: 0 !important;
}
```

## 使用说明

Hexo-admonition 遵循一种简单的语法：每个块都以 `!!!` 开头，然后是代表提示类型的关键字（`type`）及标题（`title`）。例如:

```text
!!! note Hexo-admonition 插件使用示例
    这是基于 hexo-admonition 插件渲染的一条提示信息。类型为 note，并设置了自定义标题。
    提示内容开头留 4 个空格，可以有多行，最后用空行结束此标记。
```

在 Hexo 渲染前，将被转换成如下内容：

```html
<div class="admonition note ">
  <p class="admonition-title">Hexo-admonition 插件使用示例</p>
  <p>这是基于 hexo-admonition 插件渲染的一条提示信息。类型为 note，并设置了自定义标题。</p>
  <p>提示内容开头留 4 个空格，可以有多行，最后用空行结束此标记。</p>
</div>
```

最终呈现效果如下：

!!! note Hexo-admonition 插件使用示例
    这是基于 hexo-admonition 插件渲染的一条提示信息。类型为 note，并设置了自定义标题。
    提示内容开头留 4 个空格，可以有多行，最后用空行结束此标记。

### 支持的类型

提示类型 `type` 将用作 CSS 类名称，暂支持如下类型：

- `note`
- `info, todo`
- `warning, attention, caution`
- `error, failure, missing, fail`

### 设置/隐藏标题

标题 `title` 是可选的，当未设置时，将以 `type` 作为默认值:

```text
!!! warning
    这是一条采用默认标题的警告信息。
```

效果如下：

!!! warning
    这是一条采用默认标题的警告信息。

如果不想显示标题，可以将 `title` 设置为 `""`：

```text
!!! Warning ""
    这是一条不带标题的警告信息。
```

效果如下：

!!! Warning ""
    这是一条不带标题的警告信息。

## 卡片演示

> 主要四种类型：info, warning, error, note

!!! note Hexo-admonition 插件使用示例
    这是基于 hexo-admonition 插件渲染的一条提示信息。类型为 note，并设置了自定义标题。

    提示内容开头留 4 个空格，可以有多行，最后用空行结束此标记。

!!! warning Hexo-admonition 插件使用示例
    这是基于 hexo-admonition 插件渲染的一条提示信息。类型为 warning，并设置了自定义标题。

    提示内容开头留 4 个空格，可以有多行，最后用空行结束此标记。

!!! error Hexo-admonition 插件使用示例
    这是基于 hexo-admonition 插件渲染的一条提示信息。类型为 error，并设置了自定义标题。

    提示内容开头留 4 个空格，可以有多行，最后用空行结束此标记。

!!! info Hexo-admonition 插件使用示例
    这是基于 hexo-admonition 插件渲染的一条提示信息。类型为 info，并设置了自定义标题。

    提示内容开头留 4 个空格，可以有多行，最后用空行结束此标记。

!!! todo Hexo-admonition 插件使用示例
    这是基于 hexo-admonition 插件渲染的一条提示信息。类型为 todo，并设置了自定义标题。

    提示内容开头留 4 个空格，可以有多行，最后用空行结束此标记。

!!! attention Hexo-admonition 插件使用示例
    这是基于 hexo-admonition 插件渲染的一条提示信息。类型为 attention，并设置了自定义标题。

    提示内容开头留 4 个空格，可以有多行，最后用空行结束此标记。
