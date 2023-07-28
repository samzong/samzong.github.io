'''
# 脚本需求说明

- 生成新的 blog 文件
- 根据输入的标题，生成文件名，如果有中文，将中文替换为拼音
- 文件名格式为：`YYYY-MM-DD-biaoti.md`
- 增加对应的 formater 信息
'''

import os
import sys
import re
from time import gmtime, strftime
from pypinyin import lazy_pinyin

BLOG_DIR = "blog/"


def formatter(title, tag, author):
    """
    Return a string of formatter information.

    Args:
        title (str): The title of the blog post.

    Returns:
        str: The formatter information.
    """

    formatter_str = f"""---
title: {title}
tag: {tag}
author: {author}
---

"""

    return formatter_str


def keep_alphanumeric_chinese(text):
    """
    Clean text, remove all not alphanumeric and chinese characters.

    Args:
        text (str): The text to be cleaned.

    Returns:
        str: The cleaned text.
    """
    cleaned_text = re.sub(r'[^\u4e00-\u9fa5a-zA-Z0-9]', '', text)
    return cleaned_text


def creaate_post(post_title: str, tag: list, author: str = "samzong"):
    """
    Create a new blog post with the given title.

    Args:
        post_title (str): The title of the new blog post.
        tag (str): The tag of the new blog post.
        author (str): The author of the new blog post.

    Returns:
        create a new blog post file.
    """
    date = strftime("%Y-%m-%d", gmtime())
    post_name = '-'.join(lazy_pinyin(keep_alphanumeric_chinese(post_title)))

    filename = date + "-" + post_name

    if os.path.exists(filename + '.md'):
        return print("File already exists!")

    formatter_str = formatter(post_title, tag, author)

    with open(BLOG_DIR + filename + '.md', 'w', encoding='utf-8') as f:
        f.write(formatter_str, encoding='utf-8')


if __name__ == "__main__":
    creaate_post(sys.argv[1], sys.argv[2])
