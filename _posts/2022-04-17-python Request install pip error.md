---
layout: post
title: python Request install pip error
tags:
  - Python
categories:
  - Python
url: https://www.yuque.com/samzong/code/python-request-install-pip-error
---

```log
…
socket.timeout: The read operation timed out
…
ReadTimeoutError: HTTPSConnectionPool(host=‘files.pythonhosted.org’, port=443): Read timed out.
```

解决办法：

`pip --default-timeout=200 install -U xxx_package_name`
