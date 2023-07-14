---
title: Django 初始化 project
tags: 
  - Python
categories:
  - Python
url: https://www.yuque.com/samzong/code/qyemh3
---

```bash
# 初始化 mysite 项目

django-admin startproject mysite


- manage.py
- mysite
  - settings.py
  - urls.py
  - wsgi.py
```

### 项目初始化

```bash
python3 manage.py --help # 用于管理项目以及服务
python3 manage.py runserver  # 启动服务
python3 manage.py startapp 'blog'  # 用于在项目下创建一个app


# 新项目初始化步骤

django-admin startproject mysite  # 创建项目
cd mysite
python3 manage.py migrate  # 初始化数据库
python3 manage.py createsuperuser  # 创建超级管理员账号
```

### 常见项目配置

> settings.py

```python
# 切换数据库为 MySQL , Default = sqlite

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mysite',
        'USER': 'root',
        'PASSWORD': 'luchuanjia',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

# ! 需要安装插件 pip install mysql

---

# 修改项目时区
TIME_ZONE = 'Asia/Shanghai'  # Default UTC

# 修改语言
LANGUAGE_CODE = 'zh-Hans'  # 简体中文
```

### 导出项目的依赖库

```python
pip freeze > requirements.txt   # 将目前虚拟环境的 依赖库，导出到文件中

pip install -r requirements.txt # 从 requirements.txt 中读取依赖库，并进行安装
```

### modules 变更后，需要同步变更数据库表

```python
# 修改 module.py 后，需要执行以下命令，将变更同步到数据库，否则不生效
python3 manage.py makemigrations
python3 manage.py migrate
```
