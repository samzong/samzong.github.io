---
title: 淘宝 Python SDK 优化支持 Python3
tags: []
---

淘宝开放平台的 SDK，Python 的 SDK 是在 2012 年，仅支持 Python2.7 及以上，但不支持 Python3；二现在是 2102 年了，像我这样的新手都是直接从 Python3 开始的，

#### 1. Python3 int 替代了 long

`P_TIMESTAMP: str(int(time.time() * 1000))`

#### 2. 用 items 替代 iteritems

`for key, value in application_parameter.items():`

#### 3. 查阅资料，发现有人说到 dict methods dict.keys(), dict.items() and dict.values() return“views”instead of lists.这样就显而易见知道怎么改了

`keys = sorted(keys)`

#### 4. 英文意思很明确，unicode 对象在哈希之前必须进行编码转换，想起之前又看到过中文字符在 python 中是以 unicode 存在的，所以

`sign = hashlib.md5(parameters.encode("utf-8")).hexdigest().upper()`

#### 5. 这是花费时间最长的一个错误。首先，直接看最后，错误在 soket.py 里，心凉了半截，难道这里的调用都不一样了，再网上看又是 python 3.X 的 http 模块，去百度了半天也没有发现类似的错误，只能自己硬着头皮去看模块，功夫不负有心人，其实也很简单，在类 HTTPConnection 的初始化函数是这样定义的

`connection = httplib.HTTPConnection(self.__domain, self.__port, timeout)`

> 比较下参数发现，python 2 比 3 多了一个参数，去掉即可，这个错误主要是是报错的地方和修改的地方不在一起，所以很难插出原因。

#### 6. 官方文档是这样解释的：urllib has been split up in Python 3. The urllib.urlencode() function is now urllib.parse.urlencode(), and the urllib.urlopen() function is now urllib.request.urlopen()

`url = N_REST + "?" + urllib.parse.urlencode(sys_parameters)`

#### 7. 这个错误是在 API 调用出异常的时候暴露出来的。原因前面已经提到了，稍微查了下替代的方法

`if "error_response" in jsonobj:`

`if P_CODE in jsonobj["error_response"]:`

#### 8. 在 if 需要使用反向时，应该是 != ，而不是使用  is not；这个也是 PyCharm 给的建议，所以在使用时，所以简单调整下就好了

`if response.status != 200:`

以上调整之后，基本就可以正常跑起来了，基本是可以支持 Python3 的使用，我试过了 Python3.6-3.9，都是 OK 的。
