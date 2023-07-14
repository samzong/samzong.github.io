---
title: requests post data 时对 json 需要特殊注意
tags: 
  - Python
categories:
  - Python
url: https://www.yuque.com/samzong/code/pfiuwx
---

```python
import requests

url = url
data = data
headers = headers

# 通过以下方式录入的 type(data) = dict

data = {}
data["username"] = username
data["password"] = password


req = requests.post(url=url, headers=headers, json=data)

# 以上处理方式会自动把数据转为 json format
```

> 注意在方便插入数据的同时，也要关注数据类型转化的问题，研发初学者容易出的错误
