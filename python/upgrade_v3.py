import os
import re

# 指定 markdown 文件所在的文件夹路径
folder_path = 'blog'

# 遍历文件夹中的所有 markdown 文件
for filename in os.listdir(folder_path):
    if filename.endswith('.md'):
        file_path = os.path.join(folder_path, filename)

        # 读取 markdown 文件内容
        with open(file_path, 'r', encoding='utf-8') as file:
            markdown_text = file.read()

        # 使用正则表达式匹配 markdown 文本中的链接，并进行替换
        updated_markdown_text = re.sub(
            r'<(https?://.*?)>', r'[\1](\1)', markdown_text)

        # 将替换后的内容写回 markdown 文件
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_markdown_text)

print("Markdown 文件中的链接批量替换完成。")
