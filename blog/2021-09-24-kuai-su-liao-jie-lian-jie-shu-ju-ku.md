---
title: 01 快速了解连接数据库
tags: []
---

SQLAlchemy 是 ORM 框架，目前主流且比较通用，在程序中用来处理数据库相关的能力，本文是用于学习和理解 SQLAlchemy 的记录，主要使用的编程语言是 Python

> Python3 AND MySQL 5.6

## 安装

目前较为场景的关系型数据库是 MySQL，这里介绍 在 Python 中安装和 MySQL 的链接方式

```bash
pip3 install sqlalchemy pymysql
```

> 快速连接数据库

```python
# easy script.

from sqlalchemy import create_engine
from sqlalchemy impory text

engine = create_engine('mysql+pymysql://root:pass@localhost/dbName')

conn = engine.connect()

sql = text("select version();")

data = sql.fetchall()

for d in data:
    print(d)
```

## 简单的查询

```python
from sqlalchemy impory text

sql = text("select * from userTable where create_date>=:start_time AND login_cnt=:times")
# start_time 开始时间
# times 登录次数

# sql 执行时动态入参

start_time,times = '2021-06-01 00:00:00', 3

res = conn.execute(s, create_date = start_time.pydatetime(), loign_cnt=times)
```

## 对于查询结果的说明

获取所有的查询结果，返回的数据为 tuple 的列表 `data = res.fetachAll()`

> 使用 pandas 将查询结果保存到 csv 中

```python
import pandas as pd

df = pd.DataFrame(data, columns=['user_id',],)  # data 是要写入的数据，columns 是列头，List


df.to_csv('~/export_filepath.csv', index=False)
```
