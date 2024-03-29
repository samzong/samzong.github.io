---
title: Python 项目的目录结构设计
tags: [Python]
---


## 参考的目录结构设计

> thanks [https://www.justdopython.com/2020/01/18/python-web-flask-project-125/](https://www.justdopython.com/2020/01/18/python-web-flask-project-125/)

```python
project/
  forms/
    myform.py
    ...
  models/
    __init__.py
    profile.py
    user.py
    ...
  routes/
    __init__.py
    home.py
    profile.py
    ...
  static/
    ...
  services/
    __init__.py
    ...
  templates/
    createprofile.html
    profile.html
    ...
  __init__.py
  config.py
  *utils/*
    __init__.py
    jwt_decode.py
    ...

```

- forms（表单）：存放表单对象
- models（模型）：存放数据模型，即库表在程序中的映射对象，以及对象之间的关系
  - 不同的表，分开存储
- routes（路由）：存放请求路由以及处理逻辑
- static（静态文件）：Flask 约定存放静态文件的目录
- templates（模板）：Flask 约定存放页面模板的目录
- services（服务）：存放业务逻辑或者其他服务类功能
- **init**.py：Flask app 初始化方法
  - 在每个目录下都增加对应的 **init**.py 将目录变成 package 方便调用
  - 并在 **init**.py 完成一些程序的初始化
- config.py：项目配置文件
  - 区分配置类型
- **增加 utils/**将工具类的放在 utils 内实现，方便使用

:::danger
需要后续考虑的问题，一个项目较为复杂时，如果分解多应用的问题，留在后面考虑
:::
