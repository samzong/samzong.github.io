---
title: Python 抓出来随机下载记录
tags: [Python]
---

```python
for n in range(500):
    url = 'https://appest-public.s3.amazonaws.com/download/mac/TickTick_3.9.00_{}.dmg'.format(n)
    resp = requests.get(url)
    try:
        print(resp.status_code)
        if resp.status_code == 200:
            print(n)
            break
    except Exception as e:
        print(e)
```

:::info
背景
:::
