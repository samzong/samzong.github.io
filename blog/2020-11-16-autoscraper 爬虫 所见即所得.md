---
title: autoscraper 爬虫 所见即所得
tags: 
  - Python
categories:
  - Python
url: https://www.yuque.com/samzong/code/hx1txz
---

```bash
# Install

$ pip3 install autoscraper
```

## 一分钟上手

```python
from autoscraper import AutoScraper

url = 'https://stackoverflow.com/questions/2081586/web-scraping-with-python'

# We can add one or multiple candidates here.
# You can also put urls here to retrieve urls.
wanted_list = ["How to call an external command?"]

scraper = AutoScraper()
result = scraper.build(url, wanted_list)
print(result)
```

- url 是你需要爬取的网页
- wanted\_list 是一个 list，其中有你需要的元素目标，注意会爬取相同 tag 和范围的数据

![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1605241399644-c035e6f7-8096-438b-806d-7a9da7bee65f.png?x-oss-process=image/resize,w_960,m_lfit)

## 更多使用技巧

> 请关注 Github 仓库： <https://github.com/alirezamika/autoscraper>
