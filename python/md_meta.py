import os
import markdown

md = markdown.Markdown(extensions=['meta'])

# 读取 data 目录下的每一个 markdown 文件，并获取其中的文本赋值给 text

for root, dirs, files in os.walk('data'):
    for file in files:
        if file.endswith('.md'):
            path = os.path.join(root, file)
            with open(path, encoding='utf-8') as f:
                text = f.read()

        md.convert(text)
        print(md.Meta)
