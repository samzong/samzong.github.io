---
title: i18n 使用构建
tags: [Blog]
---



## 难题和调整

- 产品原型页面翻译，工作量双份，更新和维护困难
- 翻译质量不好校验，文档同学参与困难
- 操作方式比较原始

## 在终端完成翻译工作

- 基础使用
  - 创建项目
  - 创建部件（与 git 集成）
- 如何与 git 集成
  - 创建唯一身份 key
  - 使用独立分支
- 安装 weblate 终端应用

## 支持的功能

- 不同部件中 相同 key 的翻译不一致时提示
- 对于翻译内容的校验
- 项目挂件 和 新人引导页
  - [http://10.6.229.10:8080/widgets/skoala-ui-demo/](http://10.6.229.10:8080/widgets/skoala-ui-demo/)
- 利用 api 实现二次封装 [https://docs.weblate.org/en/latest/api.html](https://docs.weblate.org/en/latest/api.html)

## 通过 api 查询组件详情

[https://docs.weblate.org/en/latest/api.html#get--api-components-(string-project)-(string-component)-](https://docs.weblate.org/en/latest/api.html#get--api-components-(string-project)-(string-component)-)

```json
GET /api/components/(string:project)/(string:component)/
Returns information about translation component.

Parameters
project (string) – Project URL slug

component (string) – Component URL slug
```

## 通过 api 创建组件

[https://docs.weblate.org/en/latest/api.html#post--api-projects-(string-project)-components-](https://docs.weblate.org/en/latest/api.html#post--api-projects-(string-project)-components-)

```json
POST /api/projects/hello/components/ HTTP/1.1
Host: example.com
Accept: application/json
Content-Type: application/json
Authorization: Token TOKEN
Content-Length: 20

{
    "file_format": "po",
    "filemask": "po/*.po",
    "name": "Weblate",
    "slug": "weblate",
    "repo": "weblate://weblate/hello",
    "template": "",
    "new_base": "po/hello.pot",
    "vcs": "git"
}
```

```json
HTTP/1.0 200 OK
Date: Tue, 12 Apr 2016 09:32:50 GMT
Server: WSGIServer/0.1 Python/2.7.11+
Vary: Accept, Accept-Language, Cookie
X-Frame-Options: SAMEORIGIN
Content-Type: application/json
Content-Language: en
Allow: GET, POST, HEAD, OPTIONS

{
    "branch": "main",
    "file_format": "po",
    "filemask": "po/*.po",
    "git_export": "",
    "license": "",
    "license_url": "",
    "name": "Weblate",
    "slug": "weblate",
    "project": {
        "name": "Hello",
        "slug": "hello",
        "source_language": {
            "code": "en",
            "direction": "ltr",
             "population": 159034349015,
            "name": "English",
            "url": "http://example.com/api/languages/en/",
            "web_url": "http://example.com/languages/en/"
        },
        "url": "http://example.com/api/projects/hello/",
        "web": "https://weblate.org/",
        "web_url": "http://example.com/projects/hello/"
    },
    "repo": "file:///home/nijel/work/weblate-hello",
    "template": "",
    "new_base": "",
    "url": "http://example.com/api/components/hello/weblate/",
    "vcs": "git",
    "web_url": "http://example.com/projects/hello/weblate/"
}
```
