---
title: pprint beautiful json format
tags: 
  - Python
categories:
  - Python
url: https://www.yuque.com/samzong/code/sqoykk
---

```python
import pprint

pp = pprint.PrettyPrinter(indent=2)
pp.pprint(res.json())
```

```json
{   'data': [   {   '_serializer': 'v2.book',
                    'content_updated_at': '2020-10-21T05:17:01.890Z',
                    'created_at': '2020-10-20T15:37:45.000Z',
                    'creator_id': 343806,
                    'description': '附件和有趣的东西',
                    'id': 1906752,
                    'items_count': 1,
                    'likes_count': 0,
                    'name': '资源库',
                    'namespace': 'samzonglu/mgg8fc',
                    'public': 0,
                    'slug': 'mgg8fc',
                    'type': 'Resource',
                    'updated_at': '2020-10-21T05:17:01.000Z',
                    'user': {   '_serializer': 'v2.user',
                                'avatar_url': 'https://cdn.nlark.com/yuque/0/2020/png/343806/1603164657666-avatar/86b58a0e-7e5a-49ed-b28f-25a11b64c920.png',
                                'created_at': '2019-05-11T09:04:37.000Z',
                                'description': '读史以明志',
                                'followers_count': 0,
                                'following_count': 14,
                                'id': 343806,
                                'login': 'samzonglu',
                                'name': 'samzong.lu',
                                'type': 'User',
                                'updated_at': '2020-10-20T23:51:02.000Z'},
                    'user_id': 343806,
                    'watches_count': 1},
                {   '_serializer': 'v2.book',
                    'content_updated_at': '2020-10-20T06:31:42.400Z',
                    'created_at': '2020-10-14T02:11:09.000Z',
                    'creator_id': 343806,
                    'description': 'Python3',
                    'id': 1880166,
                    'items_count': 2,
                    'likes_count': 0,
                    'name': '学习笔记',
                    'namespace': 'samzonglu/nbasax',
                    'public': 0,
                    'slug': 'nbasax',
                    'type': 'Book',
                    'updated_at': '2020-10-21T07:05:07.000Z',
                    'user': {   '_serializer': 'v2.user',
                                'avatar_url': 'https://cdn.nlark.com/yuque/0/2020/png/343806/1603164657666-avatar/86b58a0e-7e5a-49ed-b28f-25a11b64c920.png',
                                'created_at': '2019-05-11T09:04:37.000Z',
                                'description': '读史以明志',
                                'followers_count': 0,
                                'following_count': 14,
                                'id': 343806,
                                'login': 'samzonglu',
                                'name': 'samzong.lu',
                                'type': 'User',
                                'updated_at': '2020-10-20T23:51:02.000Z'},
                    'user_id': 343806,
                    'watches_count': 1}]}
```
