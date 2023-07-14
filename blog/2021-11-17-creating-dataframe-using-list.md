---
title: Creating DataFrame using list
tags: []
---

```python
import pandas as pd
  
# list of strings
lst = ['Geeks', 'For', 'Geeks', 'is', 
            'portal', 'for', 'Geeks']
  
# Calling DataFrame constructor on list
df = pd.DataFrame(lst)
```

![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1639326317905-b923391a-6135-482f-8b43-9a67e1f6245f.png?x-oss-process=image/resize,w_960,m_lfit)

```python
# import pandas as pd
import pandas as pd

# list of strings
lst = ['Geeks', 'For', 'Geeks', 'is', 'portal', 'for', 'Geeks']

# Calling DataFrame constructor on list
# with indices and columns specified
df = pd.DataFrame(lst, index =['a', 'b', 'c', 'd', 'e', 'f', 'g'],
           columns =['Names'])
```

![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1639326330330-97380b9c-a674-479c-a4f4-074ef3128aa3.png?x-oss-process=image/resize,w_960,m_lfit)

```python
# Creating DataFrame using multi-dimensional list

import pandas as pd
 
# List1
lst = [['tom', 25], ['krish', 30],
 ['nick', 26], ['juli', 22]]
 
df = pd.DataFrame(lst, columns =['Name', 'Age'])
```

![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1639326375589-cd58c20f-3dde-4eeb-a097-19dd3bf3376a.png?x-oss-process=image/resize,w_960,m_lfit)

```python
# Using multi-dimensional list with column name and dtype specified.
import pandas as pd
 
# List1
lst = [['tom', 'reacher', 25], ['krish', 'pete', 30],
 ['nick', 'wilson', 26], ['juli', 'williams', 22]]
 
df = pd.DataFrame(lst, columns =['FName', 'LName', 'Age'], dtype = float)
```
