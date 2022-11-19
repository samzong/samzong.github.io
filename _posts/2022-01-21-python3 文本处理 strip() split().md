---
layout: post
title: python3 文本处理 strip() split()
tags:
  - Python
category:
  - Python
url: https://www.yuque.com/samzong/code/zyil6u
---

- strip() 删除字符串中的内容，删除后仍旧是 str
- split() 分割字符串，根据特定的标识，分割后=list

> 两者处理过程中都不会修改原字符串的内容

```python
python3

str.strip(",") # 删除字符串末尾的","
str.rstrip(",") # 删除字符串末尾的","
str.lstrip(",") # 删除字符串开通的","
```
