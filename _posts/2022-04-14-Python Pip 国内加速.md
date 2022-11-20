---
layout: post
title: Python Pip 国内加速
tags:
  - Python
categories:
  - Python
url: https://www.yuque.com/samzong/code/python-pip-guo-nei-jia-su
---

目前国内还是有比较多的镜像站，截止目前使用下比较稳定的只有下面这个 清华的镜像站了

- <https://pypi.tuna.tsinghua.edu.cn/simple>

## 安装特定包时加速

```bash

pip install pandas -i http://pypi.douban.com/simple
```

## 修改默认的 pip 源

```bash

# mkdir ~/.pip

# cat ~/.pip/pip.conf  <<EOF
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = pypi.tuna.tsinghua.edu.cn
EOF
```

文件保存后，pip 的源就更新成功了，使用 `pip config list` 确认下是否切换成功
