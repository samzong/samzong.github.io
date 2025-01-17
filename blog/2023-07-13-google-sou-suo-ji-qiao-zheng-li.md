---
title: Google 搜索技巧整理
tags: [Google]
---

## 笔记说明

:::info
支持 google、部分 baidu 网页检索和图片检索等
:::

![20230711172625](images/50_4ae7aae9.png)

- intitle: 仅在名称中查询
    - allintitle: 多个关键词查询
- intext: 仅在正文中查询
    - allintext: 多个关键词查询
- inurl: 仅在 url 中查询关键词
    - allinurl: 多个关键词
- site: 在对应的网站内查询
- filetype: 查询对应的文件类型
- 支持 `.` 和 `*` 作为正则匹配查询
- 支持 `""` 作关键词精准查询
- Index of 浏览网页的目录，就像浏览本地的普通目录
- location: 指定查询的地区，返回对应地区的内容

## 命令参照表

| Keyworld   | 作用                                                           | 示例                                                                     |
| ---------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| intitle    | 限定从网页标题中查询关键词                                     | intitle:insight                                                          |
| allintitle | 限定从网页标题中查询关键词，支持多个关键词                     | allintitle:insight kpanda                                                |
| intext     | 限定从网页内容中查询关键词                                     | intext:insight                                                           |
| allintext  | 限定从网页内容中查询关键词，支持多个关键词                     | allintext:insight kpanda                                                 |
| inurl      | 限定从网页 url 中查询关键词                                    | inurl:insight                                                            |
| allinurl   | 限定从网页 url 中查询关键词，支持多个关键词                    | allinurl:insight                                                         |
| site       | 限定查询指定网址的内容                                         | site:daocloud.io                                                         |
| "", 《》   | 使得查询字符不分开                                             | intitle:"insight"                                                        |
| .          | 匹配任意单个字符                                               | intitle:"i.sight"                                                        |
| *          | 匹配任意长度字符                                               | inurl:"**insight*"                                                       |
| -          | 在查询结果中，剔除关键词                                       | intitle:insight -daocloud<br />intitle:insight  site:"daocloud.io" -docs |
| +          | 在查询结果中，保留关键词                                       | intitle:insight +daocloud                                                |
| "", 《》   | 使得查询字符不分开                                             | intitle:《insight》                                                      |
| filetype   | 指定查询的文件类型，常用查询 ppt、PDF、等，结果可以直接下载    | site:daocloud.io filetype:pdf intitle:insight                            |
| location   | 调整当前所在位置，用于解决浏览器基于不同地址反馈的数据权重问题 |                                                                          |
| link       | 查看每一个引用了这个网址的网页                                 |                                                                          |
