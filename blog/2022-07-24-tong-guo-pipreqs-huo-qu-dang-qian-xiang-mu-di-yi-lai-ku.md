---
title: 通过 pipreqs 获取当前项目的依赖库
tags: []
---

如果在开始开发一个项目时，未注意项目的依赖库隔离；可能会导致后续给项目打包时：

- 导致缺少依赖库，导致项目初始化麻烦
- 读取了全局依赖库，导致项目安装了大量的实际无用的库

这里推荐一个专门解决这个问题的 Python 库， `pipreqs`

### 使用注意事项

```bash
# linux & mac
pipreqs $python_project_dir

# Windows 需要增加 --encoding=utf-8 字母编码，否则会有出错，懂得都懂
pipreqs ./ --encoding=utf-8

# 会自动在当前目录生成一个 requirements.txt， 如果已存在会提示失败
# 也可以使用 --force 强制覆盖
pipreqs . --force
```

### 支持的其他功能

更多的功能，可以在安装后研究下，通过 -h 可以获取更多有价值的信息

```text
\--diff <file>         将 requirements.txt 中的模块与项目导入进行比较。  >> 仅追加
\--clean <file>     通过删除项目中没有导入的模块来清理 requirements.txt   >> 瘦身
```
