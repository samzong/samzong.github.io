---
title: python flask form
tags: []
---

```python
form_data = request.form  # 获取表单中的提交的数据，这个是定义了一个 post 接口，入参会放在 form_data 这里接口可以在 Google Chrome DevTools 中的 Doc
args_data = request.args # 获取的是 url 中的参数 tips: ?method=12312&token=123121 > 这里获取到的是一个 List
json_data = request.get_json() # 获取的是从 `POST` 收到的对应 json，这里的接口文档会放在 Google Chrome DevTools 中的 XHR


def func(method int):   # 这里是定义一个函数的入参时，指定了对应的类型


app.api_add('/api/intface/<name>/<json>', method=['GET', 'POST'])

- <name> 指这里的动态内容会当做动态值传给 name, json同理
- method 定义的是接口支持的请求方式


# python flask request 注意管理 参数的生效时机，其中有个 `g` 可以关注下，具体可以多了解点介绍
```
