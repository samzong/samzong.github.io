---
title: 计算国家法定节假日
tags: [Python]
---

## 介绍

在做工时处理时，有需要统计对应月份的工作日情况，并统计员工在上班时间的工作情况；

不同国家对应的法定工作时间不同，如何得知对应国家的法定工作时间呢？

## 分析

计算每个月的工作日天数可以通过使用一些代码库来实现。比如说，在 Python 中可以使用 workalendar 库，它提供了许多国家的工作日和非工作日的数据。

## 实现

### Python

```python
from workalendar.asia import China
from datetime import datetime

cal = China()

# 2021年10月的工作日天数
print(cal.get_working_days_delta(datetime(2021, 10, 1), datetime(2021, 10, 31)))
```
