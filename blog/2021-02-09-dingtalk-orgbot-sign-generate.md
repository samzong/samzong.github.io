---
title: dingtalk orgBot sign generate
tags: [Python]
---

需要使用到 hmac 以及 time 库

```python
#/usr/bin/env python3
# -*- coding: UTF-8 -*-


import hmac
import hashlib
import base64
import time

timestamp = lambda: int(round(time.time() * 1000))

timestamp = ''

app_secret = 'BvuHQ-bTB2PiChlyCD3rgdNgHfMSYb0m4iQ_T1mEmG8ImBPQ1DSN3qwRU2-GblxR'
app_secret_enc = app_secret.encode('utf-8')
string_to_sign = '{}\n{}'.format(timestamp, app_secret)
string_to_sign_enc = string_to_sign.encode('utf-8')
hmac_code = hmac.new(app_secret_enc, string_to_sign_enc, digestmod=hashlib.sha256).digest()
sign = base64.b64encode(hmac_code).decode('utf-8')

print(sign)

```
