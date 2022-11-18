---
layout: post
title: 使用Python3格式化大型json文件
tags:
  - Python
category:
  - Python
url: https://www.yuque.com/samzong/code/zoedwm
---

当单个甚至单行Json文件大小超过100M时，无论是哪个文本编辑器在处理时都会显得吃力，接下来介绍一种非常方便的方式，快速格式化大型Json文件。

:::info
Python 自带json-tool 在转换是会导致中文乱码，以下在原有基础上进行了优化，并增加中文支持
:::


### No BB, Show Code

```python
"""
Command-line tool to validate and pretty-print JSON

Usage::

    $ python3 json-tool.json import.json  output.json

    Need Python 3.

"""
import argparse
import collections
import json
import sys


def main():
    prog = 'python -m json.tool'
    description = ('A simple command line interface for json module '
                   'to validate and pretty-print JSON objects.')
    parser = argparse.ArgumentParser(prog=prog, description=description)
    parser.add_argument('infile', nargs='?', type=argparse.FileType(),
                        help='a JSON file to be validated or pretty-printed')
    parser.add_argument('outfile', nargs='?', type=argparse.FileType('w'),
                        help='write the output of infile to outfile')
    parser.add_argument('--sort-keys', action='store_true', default=False,
                        help='sort the output of dictionaries alphabetically by key')
    options = parser.parse_args()

    infile = options.infile or sys.stdin
    outfile = options.outfile or sys.stdout
    sort_keys = options.sort_keys
    with infile:
        try:
            if sort_keys:
                obj = json.load(infile)
            else:
                obj = json.load(infile,
                                object_pairs_hook=collections.OrderedDict)
        except ValueError as e:
            raise SystemExit(e)
    with outfile:
        json.dump(obj, outfile, sort_keys=sort_keys, ensure_ascii=False, indent=2)
        outfile.write('\n')


if __name__ == '__main__':
    main()
```


### RUNNING

将以上代码文件保存为 json-tool.json，然后使用 Python3 运行即可

```shell
python3 json-tool.json 190720_190730.json 06.json
```
