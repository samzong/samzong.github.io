import os
import re

# Specify the folder path where the markdown file is located
folder_path = 'blog'

# Traverse all markdown files in the folder.
for filename in os.listdir(folder_path):
    if filename.endswith('.md'):
        file_path = os.path.join(folder_path, filename)

        # Read the content of the markdown file.
        with open(file_path, 'r', encoding='utf-8') as file:
            markdown_text = file.read()

        # Use regular expressions to match links in markdown text and replace them.
        updated_markdown_text = re.sub(
            r'<(https?://.*?)>', r'[\1](\1)', markdown_text)

        # Write the replaced content back to the markdown file.
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_markdown_text)

print("The batch replacement of links in the Markdown file is completed.")
