---
title: python 完成抖店 API 授权
tags: []
---

```python
import hashlib
import requests
import time
from datetime import datetime

# 替换 app_key, app_secret
app_key = "1122233333444555"
app_secret = "beddee55a0-reerw2452ff4-5deeweec2d7faf1"

current_time = lambda: int(round(time.time()))
timestamp = str(datetime.fromtimestamp(current_time()))
param_json = "{\"page\":\"0\",\"size\":\"10\"}"
method = "product.list"
v = "2"


def access_token(app_key, app_secret):
    url = "https://openapi-fxg.jinritemai.com/oauth2/access_token?app_id=" + app_key + "&app_secret=" + app_secret + "&grant_type=authorization_self"
    req = requests.get(url)

    return req.json()['data']['access_token']


def sign(app_key, app_secret, timestamp):
    # 请按照顺序拼装 app_secret,app_key,method,param_json,timestamp,v,app_secret
    str = app_secret + "app_key" + app_key + "method" + method + "param_json" + param_json + "timestamp" + timestamp + "v" + v + app_secret

    # sha256
    code = hashlib.sha256(str.encode()).hexdigest()

    # md5
    # code = hashlib.md5(str.encode()).hexdigest()

    return code


def testItem(app_key, app_secret):
    url = "https://openapi-fxg.jinritemai.com/product/list"
    token = access_token(app_key, app_secret)
    sign_code = sign(app_key, app_secret, timestamp)

    params = {
        "method": method,
        "app_key": app_key,
        "access_token": token,
        "param_json": param_json,
        "timestamp": timestamp,
        "v": v,
        "sign": sign_code,
        "sign_method": "hmac-sha256"  # 如果 sign 算法类型是 md5, 这里需要输入 md5
    }

    req = requests.get(url=url, params=params)

    return req.status_code


if __name__ == '__main__':
    print("access_token: '{}'".format(access_token(app_key, app_secret)))
    print("sign: '{}'".format(sign(app_key, app_secret, timestamp)))
    print("sign test status: '{}'".format(testItem(app_key, app_secret)))

```
