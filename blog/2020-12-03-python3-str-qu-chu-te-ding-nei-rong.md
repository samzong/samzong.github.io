---
title: python3 str 去除特定内容
tags: [Python]
---

```python
import string

whitespace – 包含所有空白的字符串
ascii_lowercase – 包含所有小写字母的字符串
ascii_uppercase – 一个包含所有ASCII大写字母的字符串
ascii_letters – 包含所有ASCII字母的字符串
digits – 包含所有十进制位数的字符串
hexdigits – 包含所有 十六进制数字的字符串
octdigits – 包含所有八进制数字的字符串
punctuation – 包含所有标点字符的字符串
printable – 包含所有可打印的字符的字符串


print(string.digits)  # 输出包含数字 0~9 的字符串
print(string.ascii_letters)  # 包含所有字母 (大写或小写) 的字符串
print(string.ascii_lowercase)  # 包含所有小写字母的字符串
print(string.ascii_uppercase)  # 包含所有大写字母的字符串
##############
0123456789
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ


print([chr(i) for i in range(65, 91)])  # 所有大写字母
print([chr(i) for i in range(97, 123)])  # 所有小写字母
print([chr(i) for i in range(48, 58)])   # 所有数字


import random
def get_code():
    source = list('0123456789')
    for i in range(97, 123):
        source.append(chr(i))
    print(''.join(random.sample(source, 4)))
```

### 组合使用提出大写字母

```python
import string

a = 'XQX 大家好'
 
print(a.strip(string.ascii_uppercase)) # 利用 string.uppercase 代表大写字母
```
