---
title: 代码格式相关
tags: [Python]
---

```java
/** Java 单行 **/

/** one line comment in Avro IDL */

/**

Java 多行

multiple lines
comment in Avro IDL

**/
```

```python
# 单行
# one line comment in Avro IDL


"""

多行

multiple lines
comment in Avro IDL

"""
```

```java
## 时间命名

时间字段名称请以 in_TIMEUNIT 结尾, 如:

  time_in_ms
  time_in_s
  time_in_min
  time_in_hour

 
 一些字段的统一命名请保持一致, 如:
 
  store_id  // 店铺 ID
  seller_nick // 店铺主账号
  store_name // 店铺名称
  assistant_nick // 客服账号
  buyer_nick // 买家账号
```
