#!/usr/bin/env python3

import os
import re
import hashlib
import requests
from urllib.parse import urlparse
from pathlib import Path

class ImageDownloader:
    def __init__(self, image_dir='blog/images'):
        self.image_dir = image_dir
        # 确保图片目录存在
        Path(image_dir).mkdir(parents=True, exist_ok=True)
        # 用于存储已下载的图片URL和对应的本地路径
        self.downloaded_images = {}

    def get_image_extension(self, url, content_type=None):
        """获取图片扩展名"""
        if content_type and '/' in content_type:
            ext = content_type.split('/')[-1]
            if ext in ['jpeg', 'png', 'gif', 'webp']:
                return ext
        
        # 从URL中获取扩展名
        path = urlparse(url).path
        ext = os.path.splitext(path)[1]
        if ext:
            return ext[1:].lower()
        return 'jpg'  # 默认扩展名

    def generate_unique_filename(self, url, content):
        """生成唯一的文件名"""
        # 使用URL和内容的哈希值来生成唯一文件名
        url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
        content_hash = hashlib.md5(content).hexdigest()[:8]
        return f"{url_hash}_{content_hash}"

    def download_image(self, url):
        """下载图片并返回本地路径"""
        # 如果已经下载过，直接返回本地路径
        if url in self.downloaded_images:
            return self.downloaded_images[url]

        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            # 获取图片内容和类型
            content = response.content
            content_type = response.headers.get('content-type', '')
            
            # 生成文件名和扩展名
            filename = self.generate_unique_filename(url, content)
            extension = self.get_image_extension(url, content_type)
            local_path = os.path.join(self.image_dir, f"{filename}.{extension}")
            
            # 保存图片
            with open(local_path, 'wb') as f:
                f.write(content)
            
            # 记录下载记录
            relative_path = os.path.relpath(local_path, 'blog')
            self.downloaded_images[url] = relative_path
            print(f"Downloaded: {url} -> {relative_path}")
            return relative_path
            
        except Exception as e:
            print(f"Error downloading {url}: {str(e)}")
            return None

    def process_markdown_file(self, md_file):
        """处理单个Markdown文件"""
        print(f"\nProcessing: {md_file}")
        
        # 读取文件内容
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 查找所有图片链接
        # 匹配 ![...](url) 和 ![...](@url) 格式
        pattern = r'!\[([^\]]*)\]\((@)?([^)\s]+)[^)]*\)'
        
        def replace_image(match):
            alt_text = match.group(1)
            url = match.group(3)
            
            # 如果已经是相对路径，跳过
            if url.startswith('./') or url.startswith('../') or url.startswith('/'):
                return match.group(0)
            
            # 下载图片
            local_path = self.download_image(url)
            if local_path:
                # 使用相对路径替换URL
                return f'![{alt_text}]({local_path})'
            return match.group(0)
        
        # 替换所有图片链接
        new_content = re.sub(pattern, replace_image, content)
        
        # 如果内容有变化，写回文件
        if new_content != content:
            with open(md_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {md_file}")

def main():
    # 创建下载器实例
    downloader = ImageDownloader()
    
    # 处理单个文件
    md_file = input("Enter the path to the Markdown file: ")
    if os.path.exists(md_file):
        downloader.process_markdown_file(md_file)
    else:
        print(f"File not found: {md_file}")

if __name__ == '__main__':
    main() 