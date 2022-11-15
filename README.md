# 前言

> 大大的感谢：

博客主题的作者： [einverne](https://github.com/einverne)

## 使用说明

1. 新建Post，Title可为中文，自动转变成拼音

- rake post title="A Title" [date="2012-02-09"] [tags=[tag1,tag2]] [category="category"]
- 也可以按照格式创建文章，以标题前缀为日期，title,tag,categroy 写在文章内即可，比如搭配 Typora 之类

2. 新建页面

- rake page name="about.html"

3. 运行Jekyll

- 目录下运行`bundle exec jekyll serve -w`，
- 本地浏览地址：http://localhost:4000