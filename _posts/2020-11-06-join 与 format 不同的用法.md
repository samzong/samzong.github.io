---
layout: post
title: join 与 format 不同的用法
tags:
  - Python
categories:
  - Python
url: https://www.yuque.com/samzong/code/wbt7rr
---

```python
# Join
print("and".join(["Jack", "Tom"]))
> Jack and Tom

print("and".join(["Jack", "Tom", "Jessica"]))
> Jack and Tom and Jessica

# Format
print("你和{}".Format("我"))
> 你和我

print("{}你和".Format("我"))
>我你和
```

> 当然还有 `%s` ，但更推荐使用 format，任何在设计到字符替换的都可使用到

```python
with open("{}_name.txt".format(api), "a+") as f:
    f.write("{}, {}\n".format(uid["user-id"], uid.string))
    f.close()
    
string_to_sign = '{}\n{}'.format(timestamp, app_secret)

msg = "You get a new version. {}\nThe download link : {}\n".format(get_version, get_url)
```
