---
layout: post
title: ClickHouse 常用函数使用
tags:
  - ClickHouse
  - SQL
category:
  - ClickHouse
url: https://www.yuque.com/samzong/code/qk7wca
---


## 1. 调整时区

用于调整时区为查询者的时区

```sql
-- clickhouse
toString(toDateTime(event_time), 'Asia/Shanghai') AS event_time

-- mysql howto
SELECT  CONVERT_TZ('2020-04-06 02:00:00','UTC','Asia/Hong_Kong') as event_time
```

## 2. 提前 Json 中的字符串

通过 `JSONExtractRaw`对多层 Json 结构的数据进行 `精准提取`

```sql
-- clickhouse
JSONExtractRaw(_data,'properties') as properties,
JSONExtractRaw(JSONExtractRaw(_data,'properties'),'app_env') as app_env

-- mysql howto
json_extract(_data,'$.properties') as properties,
json_extract(json_extract(_data,'$.properties'),'$.app_env') as app_env
```

> 提取字符串，然后剔除双引号 `""`

```sql
-- clickhouse
JSONExtractString(JSONExtractRaw(_data,'app_env')) as app_env

-- mysql
json_unquote(json_extract(_data,'$.app_env')) as app_env
```

## 3. 判断字段不为空

使用在 where 条件中，判断字段 为空或者不为空

```sql
where
 1=1
 and notEmpty(client_version)  --不为空
  and empty(app_version) --为空
```
