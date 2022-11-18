---
layout: post
title: Django 修改modules时出错
tags:
  - Python
category:
  - Python
url: https://www.yuque.com/samzong/code/emzcai
---


# django.db.utils.IntegrityError: NOT NULL constraint failed

```python
> python3 manage.py migrate 
错误：django.db.utils.IntegrityError: NOT NULL constraint failed

# 在执行 migrate 遇到了以上错误，但实际上已经把错误添加的字段给移除后重新 makemigrations

# 解决办法

删除 migrations 中对应生成的 `0006` 文件

然后，再次运行2个命令

python3 manage.py makemigrations
python3 manage.py migrate
```
