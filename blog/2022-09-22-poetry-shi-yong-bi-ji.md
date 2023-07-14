---
title: Poetry 使用笔记
tags: []
---

poetry 是目前比较流行的 Python 环境管理工具 和 包管理工具，对多项目开发时的环境隔离有非常大的帮助，同时集成了包管理能力。

> 官方网站  <https://python-poetry.org/>   集成了所有 Poetry 最新的使用文档，以下仅在我的环境上经过验证

### 安装方式

```python
# In Pip
- 安装 pip install poetry # pip3
- 更新 poetry self update

# In my Mac
- 安装 brew install poetry
- 更新 brew upgrade poetry

# In my CentOS
- 安装 curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
- 更新 poetry self update
```

### 配置技巧相关

在开始使用前，建议先对 poetry 的配置有些了解，并调整为适合你的方式，主要是调整一下虚拟环境的安装位置
:::info
`poetry config` poetry 相关的查看和编辑的命令
:::

```python
~ poetry config --list  # 获取当前 poetry 的配置情况

cache-dir = "/Users/$username/Library/Caches/pypoetry"
experimental.new-installer = true
installer.parallel = true
virtualenvs.create = true
virtualenvs.in-project = true
virtualenvs.path = "{cache-dir}/virtualenvs"  # /Users/$username/Library/Caches/pypoetry/virtualenvs

```

| **配置项目** | **配置内容** | **配置项说明** | **建议配置** |
| --- | --- | --- | --- |
| cache-dir | String | 缓存目录配置，使用 poetry 安装的包源文件都会缓存到这个目录。 | 不建议更改 |
| installer.parallel | boolean | 此配置会被忽略 |  |
| virtualenvs.create | boolean | 默认为 true，如果当前工程的虚拟环境不存在，就创建一个 | 不建议更改 |
| virtualenvs.in-project | boolean | None：poetry 会在系统特定目录创建一个.venv 目录，由下面的 path 参数指定
true：poetry 会在项目根目录创建一个.venv 目录
false：poetry 将会忽略已存在的.venv 目录 | **《建议修改》**

推荐这种方式，在项目根目录创建虚拟环境，这样就算移动目录位置也不影响虚拟环境的使用 |
| virtualenvs.path | string | 默认是{cache-dir}/virtualenvs，虚拟环境创建的目录，如果上面的 in-project 为 true，此配置就无效 | 不建议更改 |

:::danger
建议 在使用前 启用 virtualenvs.in-project，这样会在每个项目下有一个.venv 方便隔离管理
:::

```python
# poetry 配置说明
poetry config virtualenvs.in-project true
```

### poetry 常用指令说明

| **Poetry Command** | **解释** |
| --- | --- |
| $ poetry --version | 显示您的 Poetry 安装版本。 |
| $ poetry new | 创建一个新的 Poetry 项目。 |
| $ poetry init | 将 Poetry 添加到现有项目中。 |
| $ poetry run | 使用 Poetry 执行给定的命令。 |
| $ poetry add | 添加一个包 pyproject.toml 并安装它。 |
| $ poetry update | 更新项目的依赖项。 |
| $ poetry install | 安装依赖项。 |
| $ poetry show | 列出已安装的软件包。 |
| $ poetry lock | 将最新版本的依赖项固定到 poetry.lock. |
| $ poetry lock --no-update | 刷新 poetry.lock 文件而不更新任何依赖版本。 |
| $ poetry check | 验证 pyproject.toml。 |
| $ poetry config --list | 显示 Poetry 配置。 |
| $ poetry env list | 列出项目的虚拟环境。 |
| $ poetry export | 导出 poetry.lock 为其他格式。 |

### 新项目初始化流程

> 这里以 初始化一个  FastAPI 项目作为 实例

```bash
➜  fastapi poetry new fastapi-demo
Created package fastapi_demo in fastapi-demo
➜  fastapi ls -lh fastapi-demo
total 8
-rw-r--r--  1 samzonglu  staff     0B  2 15 14:28 README.rst
drwxr-xr-x  3 samzonglu  staff    96B  2 15 14:28 fastapi_demo
-rw-r--r--  1 samzonglu  staff   304B  2 15 14:28 pyproject.toml
drwxr-xr-x  4 samzonglu  staff   128B  2 15 14:28 tests

➜  fastapi cd fastapi-demo
➜  fastapi-demo poetry env use 3.10.2  # 配置项目的虚拟环境

```

### requirements.txt 已存在项目使用 poetry

这里会遇到一个问题，已存在的项目基本都已经有了 requirements.txt，所以 poetry 最好可以直接读取它

```bash
poetry add `cat requirements.txt`
```

将项目依赖导出为  requirements.txt

```bash
poetry export --output requirements.txt
```

## 更新内容

如何把项目移交给一个 not use Poetry 的人运行，对于 Python 的 环境包 依赖，上述的 ouput/input 的方式，会存在一些问题，这里进行纠正。

### 问题 pip freeze 不能用了

:::warning
pip freeze > requirements.txt
:::

```bash
anyio @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/cd/3f/ae/baff749ce6cb4d7985e4142650605d2d30cb92eb418e2d121868e4413d/anyio-3.6.1-py3-none-any.whl
certifi @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/b1/9b/6f/cd63ce97294ee9a1fb57e5cebf02f251fbb8f9ac48353a27ceeddc410b/certifi-2022.6.15-py3-none-any.whl
charset-normalizer @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/86/c8/3e/d878881698fbd2b72f484e4fca340588d633102920a002b66a293f9480/charset_normalizer-2.1.0-py3-none-any.whl
click @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/63/f3/4c/2270b95f4d37b9ea73cd401abe68b6e9ede30380533cd4e7118a8e3aa3/click-8.1.3-py3-none-any.whl
fastapi @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/f9/37/53/c998e9ffd7ace66218174711f5c3ef1026a0bd3cd72f5fe2908e9b949b/fastapi-0.78.0-py3-none-any.whl
h11 @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/ef/5c/a2/a6d556bc5e3493616e52726df9c880b2da2fbf9c3be5e8351c84fbfafd/h11-0.13.0-py3-none-any.whl
idna @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/90/36/8c/81eabf6ac88608721ab27f439c9a6b9a8e6a21cc58c59ebb1a42720199/idna-3.3-py3-none-any.whl
pydantic @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/c2/13/d4/b9f7dbf75702d85504b4a5f36545ff903c7e2264d4889e94ce02637276/pydantic-1.9.1-cp310-cp310-macosx_11_0_arm64.whl
requests @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/14/1f/4d/1b93db6513b8ab38db841e4ce62691288ba549a5c1b6f3ca7274a1c9fd/requests-2.28.1-py3-none-any.whl
sniffio @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/2b/1b/93/9c34d727e29f7bb11ce5b2ca7f43e77cb4e96a81ee5e07a92763951416/sniffio-1.2.0-py3-none-any.whl
starlette @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/3d/fc/74/569a1206737284325f5bb2e4f34689632c159dafbe8b7ff30bf2893c2d/starlette-0.19.1-py3-none-any.whl
typing_extensions @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/4a/aa/fe/e4680f3423fbdb5ac89a6fb2f83d9e7ff7fb48173b0fa1604786182558/typing_extensions-4.3.0-py3-none-any.whl
urllib3 @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/8a/87/ce/4a44bf6bb59a745f4af7082c6977ab23a478fca039ad4d631dfdc0185b/urllib3-1.26.10-py2.py3-none-any.whl
uvicorn @ file:///Users/samzonglu/Library/Caches/pypoetry/artifacts/62/76/ec/dcafe6bae872839618dbf982c87eb314eee97784f7df74895e07bd198a/uvicorn-0.18.2-py3-none-any.whl
```

可以看到，默认情况下`pip freeze`在输出时，携带里对应的安装路径；如果这个时候，我们把项目移交给其他人运行时，会遇到以下问题

> ERROR: Could not install packages due to an EnvironmentError: \[Errno 2] No such

这是 pip 安装软件包的一种特殊语法（自 19.1 开始受支持）[PEP404](https://www.python.org/dev/peps/pep-0440/#direct-references)，
但是该此种路径取决于环境，file:///URL 仅在本地文件系统上可用，你不能将生成的 requirements.txt 文件提供给其他人使用

### 先说解决方法 01 \[poetry style]

```bash
poetry export --without-hashes --format=requirements.txt > requirements.txt
```

通过 poetry 自带的导出能力，会携带更多的一些信息：对于环境中 python 版本的依赖，虽然更加友好一些。

```bash
anyio==3.6.1; python_full_version >= "3.6.2"
certifi==2022.6.15; python_version >= "3.6"
charset-normalizer==2.1.0; python_full_version >= "3.6.0"
click==8.1.3; python_version >= "3.7"
colorama==0.4.5; python_version >= "3.7" and python_full_version < "3.0.0" and platform_system == "Windows" or platform_system == "Windows" and python_version >= "3.7" and python_full_version >= "3.5.0"
fastapi==0.78.0; python_full_version >= "3.6.1"
h11==0.13.0; python_version >= "3.6"
idna==3.3; python_version >= "3.5"
pydantic==1.9.1; python_full_version >= "3.6.1"
requests==2.28.1; python_version >= "3.7" and python_version < "4"
sniffio==1.2.0; python_version >= "3.5"
starlette==0.19.1; python_version >= "3.6"
typing-extensions==4.3.0; python_version >= "3.7"
urllib3==1.26.10; (python_version >= "2.7" and python_full_version < "3.0.0") or (python_full_version >= "3.6.0" and python_version < "4")
uvicorn==0.18.2; python_version >= "3.7"
```

### 再说解决方法 02

在新版的 python 中，推荐采用另外一个命令方式，`pip list --format=freeze` 这样会输出一份干净的依赖清单，我们可以通过这个方式，快速导出一份 `原汁原味` 的 requirements.txt

```bash
poetry run pip list --format=freeze
anyio==3.6.1
certifi==2022.6.15
charset-normalizer==2.1.0
click==8.1.3
fastapi==0.78.0
h11==0.13.0
idna==3.3
pip==22.2
pydantic==1.9.1
requests==2.28.1
setuptools==62.6.0
sniffio==1.2.0
starlette==0.19.1
typing_extensions==4.3.0
urllib3==1.26.10
uvicorn==0.18.2
wheel==0.37.1
```

### 补充安装来自于 requirements.txt 的方式

> with poetry

```bash
cat requirements.txt | xargs poetry add
```

> without poetry

```bash
pip install -r requirements.txt
```
