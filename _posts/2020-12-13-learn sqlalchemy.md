---
layout: post
title: learn sqlalchemy
tags:
  - Python
categories:
  - Python
url: https://www.yuque.com/samzong/code/qdw35g
---

```bash
# python3 on Mac

pip3 install sqlalchemy mysqclient

# CentOS
yum install MySQL-python
```

```python
import sqlalchemy
import MySQLdb

from sqlalchemy import create_engine, MetaData

def connect_db ():
 # connect db:
 engine = create_engine("mysql://user:pass@localhost/db", echo = True)

    meta = MetaData()
    conn = engine.connect()
```
