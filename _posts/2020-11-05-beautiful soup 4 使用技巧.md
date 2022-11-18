---
layout: post
title: beautiful soup 4 使用技巧
tags:
  - Python
category:
  - Python
url: https://www.yuque.com/samzong/code/acam8e
---

```python
# import module

from bs4 import BeautifulSoup

# with requests.request
soup = BeautifulSoup(res.content, 'lxml')
```


`select` 使用技巧


```python
# 查询某一个特定的 HTML Tag 的方法
soup.select("a")

# 查询某个特定的 class 的方法
soup.select(class="class_name")

# 查询某个特定的 id 的方法，查询条件前加上#
soup.select("#id_name")

# 通过使用类名来进行查找，查询条件前加上.
soup.select(".class_name")


--- 组合条件查询，用于缩小范围 ---

# 仅在Head内查询p标签
soup.select("head p")

# 仅在body中的h6标签中查找a标签
soup.select("body h6 a")
```


```html
<div class="top-nav">
    <ul>
        ...
        <li class="cur"><span>网页</span></li>
        href="http://zhihu.sogou.com/" uigs-id="nav_zhihu" id="zhihu">知乎</a></li>
        <li><a onclick="st(this,'40030500','pic')" href="http://pic.sogou.com" uigs-id="nav_pic" id="pic">图片</a></li>
        ...
    </ul>
</div>
```

```python
li = bs.select('.top-nav ul li')
print("result len is", len(li))
for tag in li:
    print(tag)
```


# `select` 返回的是一个 `list` 

通过过下标，可以获取到对应的内容

```python
for user in list:
	print(user)=<a title="郭大侠" user-id="1802863164" class="J_card" href="/member/1802863164">郭大侠</a>
```

- 比如要打印出上述的user-id，可以使用  `print(user['user-id'])` 
- 比如要打印出上述的title，可以使用  `print(user['title'])`


# 打印HTML Tag 内的文本

```python
# .string   在获取到的tag后面增加

for user in list:
	print(user)=<a title="郭大侠" user-id="1802863164" class="J_card" href="/member/1802863164">郭大侠</a>

    print(user.string)
```
