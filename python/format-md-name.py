import os
import re
from pypinyin import lazy_pinyin

# 获取当前目录
os.chdir('../blog')
current_dir = os.getcwd()

# 遍历当前目录下的所有文件
for file_name in os.listdir(current_dir):
    if file_name.endswith(".md"):
        # 提取文件名和扩展名
        name, ext = os.path.splitext(file_name)
        print(name, ext)

        name = name.replace(' ', '-').replace('_', '-')
        print(lazy_pinyin(name))
        print(name)

        new_name = '-'.join(lazy_pinyin(name))
        new_name = re.sub(r'-{2,}', '-', new_name)

        print(new_name)

        # 将中文转换为拼音
        # new_name = ''.join(pinyin(name, style=Style.NORMAL))

        # 构建新的文件路径和文件名
        new_path = os.path.join(current_dir, new_name + ext)

        # 重命名文件
        os.rename(os.path.join(current_dir, file_name), new_path)
