---
title: "SuperClaude 用户操作手册"
date: 2025-06-30
---

## 目录

- [SuperClaude 用户操作手册](#superclaude-用户操作手册)
  - [目录](#目录)
  - [简介](#简介)
  - [安装与配置](#安装与配置)
    - [系统要求](#系统要求)
    - [安装步骤](#安装步骤)
    - [更新与卸载](#更新与卸载)
  - [快速入门](#快速入门)
  - [命令列表](#命令列表)
  - [通用标志 (Universal Flags)](#通用标志-universal-flags)
    - [思维深度控制](#思维深度控制)
    - [令牌优化](#令牌优化)
    - [MCP 服务控制](#mcp-服务控制)
    - [计划与执行](#计划与执行)
    - [质量与验证](#质量与验证)
  - [角色即标志 (Personas as Flags)](#角色即标志-personas-as-flags)
  - [MCP 集成 (MCP Integration)](#mcp-集成-mcp-integration)
  - [命令详解](#命令详解)
    - [开发命令](#开发命令)
      - [`/build`](#build-通用项目构建器)
      - [`/dev-setup`](#dev-setup-开发环境配置)
      - [`/test`](#test-综合测试框架)
    - [分析与改进命令](#分析与改进命令)
      - [`/review`](#review-ai-代码审查)
      - [`/analyze`](#analyze-多维度分析)
      - [`/troubleshoot`](#troubleshoot-专业调试)
      - [`/improve`](#improve-增强与优化)
      - [`/explain`](#explain-技术文档生成)
    - [操作命令](#操作命令)
      - [`/deploy`](#deploy-应用部署)
      - [`/migrate`](#migrate-数据库与代码迁移)
      - [`/scan`](#scan-安全与验证)
      - [`/estimate`](#estimate-项目估算)
      - [`/cleanup`](#cleanup-项目维护)
      - [`/git`](#git-git-工作流管理)
    - [设计与架构命令](#设计与架构命令)
      - [`/design`](#design-系统架构)
    - [工作流命令](#工作流命令)
      - [`/spawn`](#spawn-专用代理)
      - [`/document`](#document-文档创建)
      - [`/load`](#load-项目上下文加载)
      - [`/task`](#task-通用任务处理)
  - [实用场景与最佳实践](#实用场景与最佳实践)
    - [专业工作流示例](#专业工作流示例)
      - [全栈开发流程](#全栈开发流程)
      - [安全优先开发流程](#安全优先开发流程)
      - [性能优化流程](#性能优化流程)
      - [质量保障流程](#质量保障流程)
    - [最佳实践](#最佳实践)
    - [我的用例](#我的用例)

## 简介

[SuperClaude](https://github.com/NomenAK/SuperClaude) 是增强 [Claude Code](https://github.com/anthropics/claude-code) 的强大助力，如果你已经在使用 Claude Code，那么 SuperClaude 将是你最好的选择。

SuperClaude 是一个强大的命令行辅助工具，旨在通过一套高度集成和智能化的命令，提升开发、分析、运维和团队协作的效率。它将复杂的工程任务封装成简单、易用的命令，并借助大型语言模型（LLM）的能力，提供代码审查、架构分析、安全扫描、项目构建等专业功能。

## 安装与配置

### 安装步骤

1.  **下载脚本**:
    从项目仓库获取 `install.sh` 脚本。

2.  **授予执行权限**:

    ```bash
    chmod +x install.sh
    ```

3.  **运行安装脚本**:

    ```bash
    ./install.sh
    ```

    默认情况下，SuperClaude 的配置文件和相关模块将被安装在您的用户主目录下的 `.claude` 文件夹 (`$HOME/.claude`)。

4.  **自定义安装目录** (可选):
    如果您希望安装到其他位置，请使用 `--dir` 标志：
    ```bash
    ./install.sh --dir /path/to/your/custom/directory
    ```

### 更新与卸载

- **更新**:
  要更新现有安装，请运行带有 `--update` 标志的脚本。这将保留您的自定义配置。
  ```bash
  ./install.sh --update
  ```
- **检查更新**:
  在不安装的情况下检查新版本。
  ```bash
  ./install.sh --check-update
  ```
- **卸载**:
  要完全移除 SuperClaude，请使用 `--uninstall` 标志。
  ```bash
  ./install.sh --uninstall
  ```

## 快速入门

SuperClaude 的所有功能都通过命令调用。基本语法如下：

```bash
/command [flags] [arguments]
```

**一些实用示例**:

```bash
# 对 src 目录下的代码进行全面的、带证据的审查
/review --files src/ --quality --evidence

# 以架构师的视角分析代码
/analyze --code --persona-architect

# 使用 TDD 模式和 AI 魔法组件构建一个新的 React 应用
/build --react --magic --tdd

# 使用 "五个为什么" 方法和序列化思考来排查生产环境问题
/troubleshoot --prod --five-whys --seq

# 安全地部署到生产环境，并进行预验证
/deploy --env prod --plan --validate
```

## 命令列表

| 分类                              | 命令                                        | 描述             |
| :-------------------------------- | :------------------------------------------ | :--------------- |
| [开发命令](#开发命令)             | [`/build`](#build---通用项目构建器)         | 通用项目构建器   |
|                                   | [`/dev-setup`](#dev-setup---开发环境配置)   | 开发环境配置     |
| [分析与改进命令](#分析与改进命令) | [`/analyze`](#analyze---多维度分析)         | 多维度分析       |
|                                   | [`/troubleshoot`](#troubleshoot---专业调试) | 专业调试         |
|                                   | [`/improve`](#improve---增强与优化)         | 增强与优化       |
|                                   | [`/explain`](#explain---技术文档生成)       | 技术文档生成     |
| [操作命令](#操作命令)             | [`/scan`](#scan---安全与验证)               | 安全与验证       |
|                                   | [`/estimate`](#estimate---项目估算)         | 项目估算         |
|                                   | [`/migrate`](#migrate---数据库与代码迁移)   | 数据库与代码迁移 |
|                                   | [`/cleanup`](#cleanup---项目维护)           | 项目维护         |
|                                   | [`/git`](#git---git-工作流管理)             | Git 工作流管理   |
| [设计与架构命令](#设计与架构命令) | [`/design`](#design---系统架构)             | 设计与架构       |
| [工作流命令](#工作流命令)         | [`/spawn`](#spawn---专用代理)               | 专用代理         |
|                                   | [`/document`](#document---文档创建)         | 文档创建         |
|                                   | [`/load`](#load---项目上下文加载)           | 项目上下文加载   |
|                                   | [`/task`](#task---通用任务处理)             | 通用任务处理     |

## 通用标志 (Universal Flags)

这些标志可以附加到任何 SuperClaude 命令上，以增强或修改其行为。

### 思维深度控制

| 标志           | 描述                         | 大约 Token 用量 |
| :------------- | :--------------------------- | :-------------- |
| `--think`      | 使用扩展上下文进行多文件分析 | ~4K tokens      |
| `--think-hard` | 进行架构级别的深度分析       | ~10K tokens     |
| `--ultrathink` | 以最大深度进行关键系统分析   | ~32K tokens     |

### 令牌优化

| 标志   | 别名                | 描述                                        |
| :----- | :------------------ | :------------------------------------------ |
| `--uc` | `--ultracompressed` | 激活 UltraCompressed 模式以大幅减少令牌消耗 |

### MCP 服务控制

MCP (Master Control Program) 是一系列后端增强服务。

| 标志         | 描述                               |
| :----------- | :--------------------------------- |
| `--c7`       | 启用 Context7 进行文档查找         |
| `--seq`      | 启用序列化思考进行分析             |
| `--magic`    | 启用 Magic UI 组件生成             |
| `--pup`      | 启用 Puppeteer 浏览器自动化        |
| `--all-mcp`  | 启用所有 MCP 服务以获得最大能力    |
| `--no-mcp`   | 禁用所有 MCP 服务 (仅使用原生工具) |
| `--no-c7`    | 禁用 Context7                      |
| `--no-seq`   | 禁用序列化思考                     |
| `--no-magic` | 禁用 Magic UI 构建器               |
| `--no-pup`   | 禁用 Puppeteer                     |

### 计划与执行

| 标志            | 描述                       |
| :-------------- | :------------------------- |
| `--plan`        | 在运行前显示详细的执行计划 |
| `--dry-run`     | 预览变更而不实际执行       |
| `--watch`       | 持续监控并提供实时反馈     |
| `--interactive` | 进入分步指导的交互模式     |
| `--force`       | 覆盖安全检查 (请谨慎使用)  |

### 质量与验证

| 标志         | 描述                         |
| :----------- | :--------------------------- |
| `--validate` | 增强的执行前安全检查         |
| `--security` | 进行以安全为中心的分析和验证 |
| `--coverage` | 生成全面的覆盖率分析         |
| `--strict`   | 启用零容忍模式和增强验证     |

## 角色即标志 (Personas as Flags)

为命令注入特定的专业视角和思维模式。

| 角色标志                | 专业领域                     | 最适用场景           |
| :---------------------- | :--------------------------- | :------------------- |
| `--persona-architect`   | 系统思维、可扩展性、设计模式 | 架构决策、系统设计   |
| `--persona-frontend`    | 痴迷 UI/UX、可访问性优先     | 用户界面、组件设计   |
| `--persona-backend`     | API、数据库、可靠性          | 服务器架构、数据建模 |
| `--persona-analyzer`    | 根本原因分析、基于证据       | 复杂调试、问题调查   |
| `--persona-security`    | 威胁建模、零信任、OWASP      | 安全审计、漏洞评估   |
| `--persona-mentor`      | 教学、引导式学习、清晰表达   | 文档、知识传递       |
| `--persona-refactorer`  | 代码质量、可维护性           | 代码清理、技术债务   |
| `--persona-performance` | 优化、性能分析、效率         | 性能调优、瓶颈分析   |
| `--persona-qa`          | 测试、边缘案例、验证         | 质量保证、测试覆盖   |

## MCP 集成 (MCP Integration)

MCP (Master Control Program) 是 SuperClaude 的大脑，提供了一系列强大的后端服务来增强命令的能力。通过[通用标志](#43--mcp-服务控制)可以精细地控制这些服务的启用与禁用。

- **Context7 (`--c7`)**: 在执行任务时，能够实时查询最新的外部文档和知识库，确保生成的代码或建议基于当前最佳实践。
- **Sequential Thinking (`--seq`)**: 模拟人类专家的思考过程，将复杂问题分解为一系列逻辑步骤，并展示其推理过程。非常适合用于架构设计、根本原因分析等场景。
- **Magic UI (`--magic`)**: 在构建前端项目时，可以根据需求自动生成高质量的 UI 组件代码。
- **Puppeteer (`--pup`) | Playwright**: 提供浏览器自动化能力，可用于端到端测试、性能分析、网页抓取等任务。

组合使用这些服务可以发挥出 SuperClaude 的最大潜力。例如，在构建一个需要调用外部库 API 的前端功能时，可以同时启用 `--react`、`--magic` 和 `--c7`。

## 命令详解

### 开发命令

#### `/build` - 通用项目构建器


`/build` 命令是一个通用的项目构建器，能够使用现代化的技术栈模板快速初始化新项目、实现新功能或构建独立的组件。它内置了最佳实践，如测试驱动开发（TDD）、自动化依赖管理和构建前清理。

##### 适用场景

当您需要从零开始一个新项目（如 React 前端、Express API 或全栈应用），或者要在现有项目中添加一个遵循当前代码风格和模式的新功能时，`/build` 是最理想的选择。它通过标准化的模板确保了一致性和高质量。

##### 命令特定标志

| 标志          | 描述                                                                                            |
| :------------ | :---------------------------------------------------------------------------------------------- |
| `--init`      | 初始化一个新项目，并完成技术栈的基本配置。                                                      |
| `--feature`   | 在现有项目中，根据已识别的代码模式实现一个新功能。                                              |
| `--tdd`       | 采用测试驱动开发（TDD）的工作流。先编写失败的测试，然后编写最少的代码让测试通过，最后进行重构。 |
| `--react`     | 使用 **React** 模板：Vite, TypeScript, React Router, 状态管理和测试。                           |
| `--api`       | 使用 **Node.js API** 模板：Express.js, TypeScript, 认证, 输入验证和 OpenAPI 规范。              |
| `--fullstack` | 使用 **全栈** 模板：一个完整的 React + Node.js + Docker 项目。                                  |
| `--mobile`    | 使用 **移动端** 模板：React Native 和 Expo。                                                    |
| `--cli`       | 使用 **命令行工具** 模板：Commander.js, 配置文件和测试。                                        |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-architect` | 为新项目制定最佳的技术栈选择和整体架构设计 |
| `--persona-frontend` | 优化前端项目的用户体验、可访问性和组件设计 |
| `--persona-backend` | 确保API设计的可靠性、数据库建模和服务器架构 |

##### 使用示例

```bash
# 示例 1: 初始化一个带 TDD 和 AI 生成组件的 React 新应用
/build --init --react --tdd --magic

# 示例 2: 在现有项目中，以 TDD 模式开发一个 "用户认证系统" 功能
/build --feature "user authentication system" --tdd

# 示例 3: 构建一个 API，并使用 Context7 查询相关文档来生成 OpenAPI 规范
/build --api --openapi --seq --c7

# 示例 4: 构建并交互式测试 UI
/build --react --magic --pup --interactive
```

#### `/dev-setup` - 开发环境配置


`/dev-setup` 命令用于自动化配置专业的开发环境，包括代码质量工具、版本控制、持续集成（CI/CD）和监控。它旨在确保团队成员拥有一致、高效且可复现的开发设置。

##### 适用场景

当您启动一个新项目并希望快速建立起符合行业标准的开发基础设施时，或者当您希望将现有项目标准化时，此命令非常有用。它可以一键配置包括 Linter、Formatter、Git Hooks、CI/CD 流水线在内的全套工具。

##### 命令特定标志

| 标志          | 描述                                                       |
| :------------ | :--------------------------------------------------------- |
| `--install`   | 安装和配置项目依赖。                                       |
| `--ci`        | 配置 CI/CD 流水线 (例如，使用 GitHub Actions, GitLab CI)。 |
| `--monitor`   | 设置监控和可观察性工具。                                   |
| `--docker`    | 配置项目的容器化环境。                                     |
| `--testing`   | 设置测试基础设施 (如 Jest, Pytest)。                       |
| `--team`      | 配置团队协作工具和规范。                                   |
| `--standards` | 强制执行代码质量标准 (如 ESLint, Prettier)。               |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-architect` | 从系统整体角度设计最佳的开发环境架构和工具链 |
| `--persona-qa` | 确保测试基础设施和质量保障工具的完善配置 |

_注意：`dev-setup.md` 提到了更具体的标志，如 `--type` 和 `--tools`，这里根据 `COMMANDS.md` 的版本进行泛化。_

##### 使用示例

```bash
# 示例 1: 为新项目安装依赖、配置 CI 和设置监控
/dev-setup --install --ci --monitor

# 示例 2: 为团队配置协作工具、代码规范和文档生成
/dev-setup --team --standards --docs

# 示例 3: 以架构师的身份，为 monorepo 项目进行思考和设计，并配置 GitLab CI
/dev-setup --persona-architect --think-hard --ci gitlab
```

#### `/test` - 综合测试框架


`/test` 命令提供了一个综合性的测试框架，用于创建、运行和维护贯穿整个技术栈的测试策略。它支持从单元测试到端到端（E2E）测试的多种类型，并集成了覆盖率分析、并发执行和持续测试等高级功能。

##### 适用场景

此命令适用于任何需要确保代码质量的场景。您可以用它来为新功能编写单元测试，验证多个组件集成的正确性，或通过模拟真实用户操作来执行端到端测试。它也是实现测试驱动开发（TDD）和持续集成（CI）的关键工具。

##### 命令特定标志

| 标志              | 描述                                                 |
| :---------------- | :--------------------------------------------------- |
| `--e2e`           | 运行端到端（End-to-End）测试，通常使用浏览器自动化。 |
| `--integration`   | 运行集成测试，验证多个组件或服务之间的交互。         |
| `--unit`          | 仅运行单元测试（默认行为）。                         |
| `--visual`        | 运行视觉回归测试，捕捉 UI 界面上的像素级变化。       |
| `--mutation`      | 运行突变测试，通过修改源码来检验测试用例的健壮性。   |
| `--performance`   | 运行性能测试，评估代码的响应时间和资源消耗。         |
| `--accessibility` | 运行可访问性测试，确保应用对所有用户都可用。         |
| `--parallel`      | 在多个工作进程中并行执行测试，以缩短总测试时间。     |
| `--coverage`      | 生成详细的测试覆盖率报告。                           |
| `--watch`         | 启动持续测试模式，在文件发生变更时自动重新运行测试。 |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-qa` | 设计全面的测试策略和质量保障流程 |
| `--persona-performance` | 专注于性能测试和优化策略 |
| `--persona-frontend` | 关注UI/UX测试和可访问性验证 |

##### 使用示例

```bash
# 示例 1: 运行整个测试套件，生成覆盖率报告，并使用浏览器自动化进行 E2E 测试
/test --coverage --e2e --pup

# 示例 2: 运行突变测试，并启用严格模式以验证测试质量
/test --mutation --strict

# 示例 3: 以 QA 专家的身份，并行运行所有测试
/test --parallel --persona-qa
```

### 分析与改进命令

#### `/review` - AI 代码审查


`/review` 命令利用 AI 提供全面、深入且基于证据的代码审查。它能够分析文件、commit 或 Pull Request，并从代码质量、安全性、性能和架构等多个维度提供可行的改进建议。

##### 适用场景

在提交代码前、进行 Pull Request 审查或对现有代码进行质量评估时，此命令是您的得力助手。它能够模拟不同专家（如安全专家、性能专家）的视角进行审查，并为所有建议提供文档链接或最佳实践来源作为佐证。

##### 命令特定标志

| 标志                    | 描述                                                                |
| :---------------------- | :------------------------------------------------------------------ |
| `--files <paths...>`    | 审查一个或多个指定的文件或目录。                                    |
| `--commit <hash/range>` | 审查指定 commit 中的变更 (如 HEAD, a1b2c3d, HEAD~3..HEAD)。         |
| `--pr <number/url>`     | 审查指定 Pull Request 中的变更。                                    |
| `--quality`             | 重点关注代码质量问题，如重复代码（DRY）、SOLID 原则、代码复杂度等。 |
| `--evidence`            | 为所有发现的问题和改进建议附上权威来源（文档、博客、标准）的链接。  |
| `--fix`                 | 不仅识别问题，还直接建议具体的修复代码。                            |
| `--summary`             | 生成一份审查结果的执行摘要，适合快速了解总体情况。                  |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-security` | 专业的安全审查和漏洞识别 |
| `--persona-refactorer` | 重点关注代码质量和可维护性改进 |
| `--persona-performance` | 发现性能瓶颈和优化机会 |

##### 使用示例

```bash
# 示例 1: 对 src/auth.ts 文件进行一次以安全为核心的审查
/review --files src/auth.ts --persona-security

# 示例 2: 审查最新的 commit，重点关注代码质量，并要求提供所有建议的依据
/review --commit HEAD --quality --evidence

# 示例 3: 对 123 号 Pull Request 进行一次全面的交互式审查
/review --pr 123 --all-mcp --interactive

# 示例 4: 对整个 src 目录进行性能分析，并启用深度思考模式
/review --files src/ --persona-performance --think
```

#### `/analyze` - 多维度分析


`/analyze` 命令对代码、架构、性能、安全和依赖进行全面的、多维度的分析。它旨在揭示系统中的潜在问题、瓶颈和改进机会，并提供深入的洞察。

##### 适用场景

当您需要对项目进行一次"全面体检"时，此命令是最佳选择。例如，在项目重构前评估其整体架构，或在发布前进行深入的性能和安全分析。它能够从宏观（架构）和微观（代码质量）两个层面提供报告。

##### 命令特定标志

| 标志             | 描述                                                     |
| :--------------- | :------------------------------------------------------- |
| `--code`         | 进行代码质量分析，检查命名、结构、复杂度、潜在错误等。   |
| `--architecture` | 进行系统架构评估，分析分层、耦合度、可扩展性和设计模式。 |
| `--profile`      | 进行性能画像分析，识别 CPU、内存、网络或数据库查询瓶颈。 |
| `--deps`         | 进行依赖项分析，检查过时、不兼容或有漏洞的依赖。         |
| `--surface`      | 进行一次快速的表面分析，以获取总体概览。                 |
| `--deep`         | 进行一次深入的、详细的分析。                             |
| `--forensic`     | 进行法医级别的详细调查，通常用于复杂的根本原因分析。     |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-analyzer` | 基于证据的深度分析和根本原因调查 |
| `--persona-architect` | 系统架构评估和设计模式分析 |
| `--persona-performance` | 性能瓶颈识别和优化建议 |

##### 使用示例

```bash
# 示例 1: 对代码和架构进行一次完整的序列化分析
/analyze --code --architecture --seq

# 示例 2: 以性能专家的身份，对系统进行一次深入的性能画像分析
/analyze --profile --deep --persona-performance

# 示例 3: 以安全专家的身份，进行一次法医级别的安全审计，并启用最高级别的思考深度
/analyze --security --forensic --ultrathink
```

#### `/troubleshoot` - 专业调试


`/troubleshoot` 命令提供了一套系统化的调试和问题解决工作流。它旨在帮助开发者快速定位问题的根本原因，并提供从调查、修复到回滚的完整解决方案。

##### 适用场景

当您遇到棘手的 bug，尤其是在生产环境中，此命令能发挥巨大作用。它可以使用"五个为什么"（Five Whys）等根本原因分析方法来系统性地调查问题，也可以针对性能瓶颈进行专门的分析，并能在紧急情况下执行修复或回滚操作。

##### 命令特定标志

| 标志            | 描述                                             |
| :-------------- | :----------------------------------------------- |
| `--investigate` | 对问题进行系统性的调查。                         |
| `--five-whys`   | 采用"五个为什么"方法进行根本原因分析。           |
| `--prod`        | 针对生产环境进行调试，会更加谨慎并注重日志收集。 |
| `--perf`        | 专门针对性能问题进行调查。                       |
| `--fix`         | 在找到根本原因后，尝试提供一个完整的修复方案。   |
| `--hotfix`      | 针对紧急问题，生成一个快速修复（Hotfix）。       |
| `--rollback`    | 安全地回滚到上一个稳定状态。                     |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-analyzer` | 擅长根本原因分析和系统性问题调查 |
| `--persona-performance` | 专业的性能问题诊断和调优 |
| `--persona-security` | 安全相关问题的专业调试 |

##### 使用示例

```bash
# 示例 1: 在生产环境，使用 "五个为什么" 方法和序列化思考，对问题进行根本原因分析
/troubleshoot --prod --five-whys --seq

# 示例 2: 针对性能问题进行调查，并尝试直接修复
/troubleshoot --perf --fix --pup

# 示例 3: 以分析师的身份，对 "登录失败" 问题进行交互式、分步指导的调试
/troubleshoot "login fails" --interactive --persona-analyzer
```

#### `/improve` - 增强与优化


`/improve` 命令专注于对现有代码进行基于证据的、可衡量的改进和优化。它能够系统性地提升代码质量、性能、可访问性，或对技术栈进行现代化升级。

##### 适用场景

当您的目标是提升代码库的某个特定方面时，此命令非常有用。例如，您可以使用它来系统性地重构一个复杂的模块以提高其可维护性，或者优化一个性能关键的路径，并设定一个具体的质量改进阈值（如，代码覆盖率达到 95%）。

##### 命令特定标志

| 标志                  | 描述                                                   |
| :-------------------- | :----------------------------------------------------- |
| `--quality`           | 专注于代码结构和质量的改进，如可读性、可维护性。       |
| `--performance`       | 专注于性能优化，如改进算法、添加缓存。                 |
| `--accessibility`     | 专注于可访问性（a11y）的改进。                         |
| `--iterate`           | 进行迭代式改进，直到满足某个条件或阈值。               |
| `--threshold <value>` | 设置一个质量目标阈值，例如 `95%` 的测试覆盖率。        |
| `--refactor`          | 进行安全的、系统性的代码重构，同时保持其原有功能不变。 |
| `--modernize`         | 对技术栈或库进行现代化更新。                           |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-refactorer` | 专精代码重构和质量改进策略 |
| `--persona-performance` | 系统性能优化和瓶颈分析 |
| `--persona-architect` | 技术栈现代化和架构升级决策 |

##### 使用示例

```bash
# 示例 1: 对代码质量进行迭代式改进，直到达到 95% 的某个内部质量分数
/improve --quality --iterate --threshold 95%

# 示例 2: 提升系统性能，例如通过优化缓存策略，并使用浏览器自动化验证效果
/improve --performance --cache --pup

# 示例 3: 以重构专家的身份，对项目进行一次彻底的、安全的重构
/improve --refactor --strict --persona-refactorer
```

#### `/explain` - 技术文档生成


`/explain` 命令能够针对一个概念、一段代码或一个复杂的系统，生成全面且易于理解的技术解释和文档。它可以根据受众的技术水平调整解释的深度，并能生成图表等可视化辅助材料。

##### 适用场景

当您需要为他人（或未来的自己）解释某段代码的工作原理、一个架构决策背后的原因，或者快速为新成员编写一篇入门教程时，此命令非常有用。它也能够自动为您的 API 或系统架构生成专业的参考文档。

##### 命令特定标志

| 标志              | 描述                                                                                          |
| :---------------- | :-------------------------------------------------------------------------------------------- |
| `--depth <level>` | 设置解释的复杂度，可选值为 `ELI5` (像对 5 岁小孩解释)、`beginner`、`intermediate`、`expert`。 |
| `--visual`        | 在解释中包含图表（如流程图、架构图）等可视化元素。                                            |
| `--examples`      | 在解释中包含具体的代码示例。                                                                  |
| `--api`           | 专门为 API 生成文档。                                                                         |
| `--architecture`  | 专门为系统架构生成文档。                                                                      |
| `--tutorial`      | 以教程的形式生成解释，适合用于学习和引导。                                                    |
| `--reference`     | 以参考手册的形式生成文档，适合快速查阅。                                                      |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-mentor` | 清晰的教学表达和引导式学习方法 |
| `--persona-architect` | 系统架构和技术决策的专业解释 |
| `--persona-frontend` | 用户界面和交互设计的详细说明 |

##### 使用示例

```bash
# 示例 1: 以专家深度，结合图表和序列化思考，解释一个复杂概念
/explain "B-tree indexes" --depth expert --visual --seq

# 示例 2: 为项目中的 API 生成包含代码示例的文档，并利用 Context7 查找相关资料
/explain --api --examples --c7

# 示例 3: 以导师的身份，为初学者编写一篇关于 "React Hooks" 的教程
/explain "React Hooks" --depth beginner --tutorial --persona-mentor
```

### 操作命令

#### `/deploy` - 应用部署


`/deploy` 命令用于执行安全、可靠的应用程序部署。它内置了多种部署策略（如蓝绿部署、金丝雀部署），并集成了部署前检查、部署后监控和一键回滚等关键功能，以确保上线过程的平稳。

##### 适用场景

当您需要将应用发布到开发、预发或生产环境时，此命令是您的标准操作工具。您可以用它执行一次增量的滚动更新，或者对一个重要的新功能进行小范围的金丝雀发布，同时监控关键指标。如果出现问题，可以快速回滚到上一个稳定版本。

##### 命令特定标志

| 标志           | 描述                                                           |
| :------------- | :------------------------------------------------------------- |
| `--env <name>` | 指定目标环境，如 `dev`, `staging`, `prod`。                    |
| `--canary`     | 采用金丝雀部署策略，将新版本逐步推送给一小部分用户。           |
| `--blue-green` | 采用蓝绿部署策略，在两个并行的生产环境中切换流量，实现零停机。 |
| `--rolling`    | 采用滚动部署策略，逐个更新服务实例。                           |
| `--checkpoint` | 在部署前创建一个可回滚的检查点。                               |
| `--rollback`   | 回滚到上一个部署检查点。                                       |
| `--monitor`    | 在部署完成后，持续监控应用的关键健康指标。                     |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-architect` | 部署策略选择和基础设施架构设计 |
| `--persona-security` | 生产环境安全保障和风险控制 |

##### 使用示例

```bash
# 示例 1: 对生产环境进行一次金丝雀部署，并持续监控部署后的应用状态
/deploy --env prod --canary --monitor

# 示例 2: 在生产环境部署失败后，执行紧急回滚
/deploy --rollback --env prod

# 示例 3: 在部署到预发环境前，先生成详细的计划并进行严格的验证
/deploy --env staging --plan --validate --strict
```

#### `/migrate` - 数据库与代码迁移


`/migrate` 命令用于管理和执行安全的数据库、代码、配置或数据迁移。它提供了一个结构化的工作流，包括迁移前备份、事务性执行、数据校验和失败回滚，旨在最大限度地降低迁移风险。

##### 适用场景

当您需要进行数据库表结构变更、大规模代码重构、API 版本升级或数据格式转换时，此命令是不可或缺的工具。它能确保这些高风险操作在可控、可验证和可回滚的状态下进行。

##### 命令特定标志

| 标志             | 描述                               |
| :--------------- | :--------------------------------- |
| `--database`     | 执行数据库 schema 迁移。           |
| `--code`         | 执行代码迁移或大规模重构。         |
| `--config`       | 执行配置文件或环境变量的迁移。     |
| `--dependencies` | 执行依赖库的版本更新和迁移。       |
| `--backup`       | 在执行迁移前，强制创建一个备份。   |
| `--rollback`     | 回滚上一次失败或不符合预期的迁移。 |
| `--validate`     | 在迁移后运行数据完整性校验。       |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-architect` | 大规模系统迁移的架构规划和风险评估 |
| `--persona-backend` | 数据库迁移和数据完整性保障 |

##### 使用示例

```bash
# 示例 1: 执行一次安全的数据库迁移，包含自动备份和迁移后校验
/migrate --database --backup --validate

# 示例 2: 预览一次代码迁移将带来的变更，而不实际执行
/migrate --code --dry-run

# 示例 3: 以架构师的身份，为一次完整的系统迁移进行超深度思考和规划
/migrate --all-mcp --plan --ultrathink --persona-architect
```

#### `/scan` - 安全与验证


`/scan` 命令是一个综合性的安全审计和合规性检查工具。它能够深度扫描代码、依赖和配置，以发现安全漏洞、不合规的实践和潜在的质量问题。

##### 适用场景

此命令是保障项目安全和质量的重要环节。您可以在 CI/CD 流水线中集成它，以自动检测每次提交中的安全漏洞；也可以在发布前运行它，以确保项目符合 OWASP Top 10 或特定的法规要求（如 GDPR）。

##### 命令特定标志

| 标志                      | 描述                                             |
| :------------------------ | :----------------------------------------------- |
| `--owasp`                 | 专门针对 OWASP Top 10 漏洞进行合规性扫描。       |
| `--secrets`               | 扫描代码库中硬编码的密钥、密码和 API Token。     |
| `--compliance <standard>` | 针对特定的法规或标准进行合规性检查，如 `gdpr`。  |
| `--quality`               | 扫描代码中的质量问题和反模式。                   |
| `--automated`             | 启用自动化模式，通常用于 CI 环境中，可持续监控。 |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-security` | 专业的安全威胁识别和风险评估 |
| `--persona-qa` | 代码质量问题和最佳实践验证 |

##### 使用示例

```bash
# 示例 1: 对整个项目进行一次深入的安全审计，包括 OWASP Top 10 和依赖项漏洞
/scan --security --owasp --deps

# 示例 2: 针对 GDPR 合规性进行一次严格的检查
/scan --compliance gdpr --strict

# 示例 3: 以安全专家的身份，启用所有 MCP 服务，进行一次全面的、自动化的扫描
/scan --all-mcp --automated --persona-security
```

#### `/estimate` - 项目估算


`/estimate` 命令提供专业的项目估算，能够对任务的复杂度、所需资源、时间线和潜在风险进行全面的评估。

##### 适用场景

在项目规划阶段，当您需要为新功能、史诗故事（Epic）或整个项目进行工作量评估时，此命令非常有用。它能够提供从快速粗略估算到包含风险评估的详细分解报告，也支持敏捷开发中的故事点估算。

##### 命令特定标志

| 标志           | 描述                                       |
| :------------- | :----------------------------------------- |
| `--detailed`   | 提供一份详尽的、分解到子任务的估算报告。   |
| `--rough`      | 提供一份快速的、粗略的估算。               |
| `--worst-case` | 提供一份基于最坏情况的悲观估算。           |
| `--agile`      | 使用敏捷方法论进行估算，通常输出为故事点。 |
| `--complexity` | 专门对任务的技术复杂度进行评估。           |
| `--resources`  | 对所需的人力、时间和资源进行规划。         |
| `--timeline`   | 规划一个现实可行的时间线。                 |
| `--risk`       | 对项目或任务中潜在的风险进行识别和评估。   |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-architect` | 架构级别的项目规划和复杂度评估 |
| `--persona-analyzer` | 精准的风险识别和问题分解 |

##### 使用示例

```bash
# 示例 1: 对一个新功能进行一次完整的估算，包括详细分解、复杂度评估和风险分析
/estimate "Implement new payment gateway" --detailed --complexity --risk

# 示例 2: 使用敏捷方法对一个用户故事进行故事点估算
/estimate "As a user, I want to reset my password" --agile

# 示例 3: 以架构师的身份，对整个项目进行一次包含资源和时间线规划的深度估算
/estimate --project "New e-commerce platform" --resources --timeline --think-hard --persona-architect
```

#### `/cleanup` - 项目维护


`/cleanup` 命令用于执行专业的项目维护和清理任务。它能够安全地移除无用代码、文件、依赖项和 Git 历史，以保持代码库的整洁和高效。

##### 适用场景

随着项目的迭代，代码库中会积累大量无用的"垃圾"。此命令可以帮助您定期进行"大扫除"，例如，移除已经合并的 Git 分支、清理未被引用的依赖包、删除构建产物或识别并移除项目中从未被调用的"死代码"。

##### 命令特定标志

| 标志             | 描述                                                         |
| :--------------- | :----------------------------------------------------------- |
| `--code`         | 清理代码，如移除未使用的导入、死代码、被注释的代码块等。     |
| `--files`        | 清理文件，如构建产物、临时文件、日志和缓存。                 |
| `--deps`         | 清理依赖项，如移除未使用的依赖、更新有漏洞的依赖。           |
| `--git`          | 清理 Git 仓库，如移除已合并的本地分支、清理 untracked 文件。 |
| `--all`          | 进行一次全面的、覆盖以上所有方面的清理。                     |
| `--aggressive`   | 采用更激进的策略进行深度清理。                               |
| `--conservative` | 采用更保守的、安全的策略进行清理。                           |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-refactorer` | 代码质量清理和可维护性改进 |
| `--persona-security` | 安全的依赖库和文件管理 |

##### 使用示例

```bash
# 示例 1: 预览一次全面的清理将会执行哪些操作
/cleanup --all --dry-run

# 示例 2: 清理代码和依赖项，并进行安全验证
/cleanup --code --deps --validate

# 示例 3: 以保守的模式，清理 Git 仓库
/cleanup --git --conservative
```

#### `/git` - Git 工作流管理


`/git` 命令提供了一套专业的、带安全功能的 Git 操作工作流。它将常规的 Git 操作（如 commit, merge, branch）封装起来，并加入了验证、测试和检查点等安全措施。

##### 适用场景

此命令旨在替代您日常的手动 Git 操作，以提供更安全、更规范的版本控制体验。您可以用它来创建一个安全的提交（在 commit 前自动运行测试），或者在执行一次有风险的重构前创建一个可以快速回滚的"检查点"。

##### 命令特定标志

| 标志                  | 描述                                                                              |
| :-------------------- | :-------------------------------------------------------------------------------- |
| `--status`            | 显示当前仓库的状态。                                                              |
| `--commit`            | 执行一次专业的提交，可自动生成 commit message，并遵循 Conventional Commits 规范。 |
| `--branch`            | 进行分支管理操作。                                                                |
| `--sync`              | 与远程仓库进行同步。                                                              |
| `--checkpoint <name>` | 创建一个名为 `<name>` 的安全检查点，以便在操作失败后可以快速恢复。                |
| `--merge`             | 执行一次智能合并，能够处理常见的合并冲突。                                        |
| `--history`           | 对 Git 历史进行分析。                                                             |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-mentor` | 规范化的代码提交和团队协作指导 |
| `--persona-analyzer` | Git 历史分析和项目发展趋势洞察 |

##### 使用示例

```bash
# 示例 1: 在进行一次大规模重构前，创建一个名为 "before refactor" 的安全检查点
/git --checkpoint "before refactor"

# 示例 2: 执行一次安全的提交，在 commit 前会自动运行关联的测试和验证流程
/git --commit --validate --test

# 示例 3: 以导师的身份，分析项目的 Git 历史，并提供改进建议
/git --history --persona-mentor
```

### 设计与架构命令

#### `/design` - 系统架构


`/design` 命令用于进行专业的系统设计和架构规划。它能够帮助您应用领域驱动设计（DDD）、设计微服务架构、规划事件驱动模式，或生成 REST/GraphQL API 的技术规范。

##### 适用场景

当您需要从零开始设计一个新的系统，或者为一个现有系统规划一次大的架构演进时，此命令是您的架构师助手。您可以用它来设计一个符合 DDD 原则的 API，规划微服务之间的界限上下文（Bounded Context），或为事件驱动系统设计集成模式。

##### 命令特定标志

| 标志                | 描述                                                         |
| :------------------ | :----------------------------------------------------------- |
| `--api`             | 设计 REST 或 GraphQL API。                                   |
| `--ddd`             | 应用领域驱动设计（Domain-Driven Design）原则。               |
| `--microservices`   | 设计微服务架构。                                             |
| `--event-driven`    | 设计事件驱动的架构模式。                                     |
| `--openapi`         | 生成 OpenAPI 3.0 规范。                                      |
| `--graphql`         | 创建 GraphQL schema 和解析器（resolvers）。                  |
| `--bounded-context` | 辅助定义 DDD 中的界限上下文和上下文映射（Context Mapping）。 |
| `--integration`     | 设计系统间的集成模式。                                       |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-architect` | 系统架构设计和技术选型的专业指导 |
| `--persona-backend` | API 设计和微服务架构的最佳实践 |

##### 使用示例

```bash
# 示例 1: 设计一个遵循 DDD 原则的 API，并生成 OpenAPI 规范
/design --api --ddd --openapi --seq

# 示例 2: 设计一个微服务架构，并重点规划其事件驱动模式
/design --microservices --event-driven --think-hard

# 示例 3: 以架构师的身份，为系统设计集成模式
/design --integration --persona-architect
```

### 工作流命令

#### `/spawn` - 专用代理


`/spawn` 命令能够生成一个或多个专用的、并行的子代理来执行特定任务。您可以将复杂问题分解，让多个代理协同工作，或者并行处理多个独立的子任务。

##### 适用场景

此命令适用于处理大型或复杂任务。例如，您可以生成一个"研究员"代理来调研最佳实践，一个"构建者"代理来编写代码，一个"审查员"代理来审查代码，并让它们以串行模式协同工作。或者，您可以并行生成三个"构建者"代理，让它们同时开发三个不同的功能。

##### 命令特定标志

| 标志                   | 描述                                                           |
| :--------------------- | :------------------------------------------------------------- |
| `--task <description>` | 定义一个清晰、具体要执行的任务。                               |
| `--parallel`           | 启用并行执行模式，让多个代理同时处理多个任务。                 |
| `--specialized <type>` | 指定要生成的代理类型，如 `researcher`, `builder`, `reviewer`。 |
| `--collaborative`      | 启用协作模式，让多个代理共同解决一个复杂问题。                 |
| `--sync`               | 在并行或协作任务完成后，同步所有代理的结果。                   |
| `--merge`              | 将多个代理的输出合并成一个统一的结果。                         |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-architect` | 系统性的任务分解和项目管理 |
| `--persona-mentor` | 团队协作和任务指导的最佳实践 |

##### 使用示例

```bash
# 示例 1: 并行执行两个独立的测试任务
/spawn --task "frontend tests" --task "backend tests" --parallel

# 示例 2: 模拟一个团队协作，共同完成一个任务，最后同步并合并结果
/spawn --task "Design and implement the new API" --collaborative --sync --merge

# 示例 3: 创建一个序列工作流：先研究，再构建，最后审查
/spawn --task "Research OAuth 2.0" --specialized researcher --then --task "Build OAuth 2.0 flow" --specialized builder --then --task "Review security" --specialized reviewer
```

#### `/document` - 文档创建


`/document` 命令用于创建专业的、多格式的技术文档和用户指南。它能够根据指定的类型和风格，自动生成结构清晰、内容丰富的文档。

##### 适用场景

当您需要为项目编写 README、为 API 生成参考手册、为最终用户撰写操作指南，或者为开发者提供技术文档时，此命令可以大大提高效率。它支持多种输出格式，并能够创建包含图表和示例的交互式文档。

##### 命令特定标志

| 标志             | 描述                               |
| :--------------- | :--------------------------------- |
| `--user`         | 生成面向最终用户的指南。           |
| `--technical`    | 生成面向开发者的技术文档。         |
| `--markdown`     | 以 Markdown 格式输出文档（默认）。 |
| `--interactive`  | 创建包含交互式元素的文档。         |
| `--multilingual` | 生成多语言版本的文档。             |
| `--maintain`     | 生成一份文档的维护计划。           |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-mentor` | 清晰易懂的教学表达和用户引导 |
| `--persona-frontend` | 用户交互和体验设计的专业视角 |

##### 使用示例

```bash
# 示例 1: 为项目的 API 创建包含代码示例的交互式文档
/document --api --interactive --examples

# 示例 2: 为最终用户创建包含图表的多语言指南
/document --user --visual --multilingual

# 示例 3: 以导师的身份，为项目创建一个详细的技术文档和维护计划
/document --technical --maintain --persona-mentor
```

#### `/load` - 项目上下文加载


`/load` 命令用于加载和分析项目的上下文。它能够扫描整个代码库，以理解其结构、架构、依赖关系和编码模式，并对项目的健康状况和标准符合度进行评估。

##### 适用场景

在开始一个新任务或接手一个不熟悉的项目时，此命令是您的"引路人"。它可以帮助您快速建立起对整个项目的宏观理解，例如，通过分析代码库识别出项目遵循了哪些设计模式，或者通过映射依赖关系来理解模块间的调用关系。

##### 命令特定标志

| 标志              | 描述                                                                        |
| :---------------- | :-------------------------------------------------------------------------- |
| `--depth <level>` | 设置分析的深度，可选值为 `shallow` (浅层)、`normal` (正常)、`deep` (深层)。 |
| `--context`       | 专注于上下文的保持和传递。                                                  |
| `--patterns`      | 专注于识别项目中使用的设计模式和编码规范。                                  |
| `--relationships` | 专注于映射代码间的依赖关系和调用关系。                                      |
| `--structure`     | 专注于分析项目的文件和目录结构。                                            |
| `--health`        | 对项目的整体健康状况进行评估。                                              |
| `--standards`     | 检查项目对预设的编码标准的符合度。                                          |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-architect` | 系统架构分析和设计模式识别 |
| `--persona-analyzer` | 深入的项目健康评估和依赖关系分析 |

##### 使用示例

```bash
# 示例 1: 对项目进行一次深度的、包含模式识别的序列化分析
/load --depth deep --patterns --seq

# 示例 2: 评估项目的结构、健康状况和标准符合度
/load --structure --health --standards

# 示例 3: 以架构师的身份，加载项目上下文，重点分析其架构和依赖关系
/load --depth deep --architecture --relationships --persona-architect
```

#### `/task` - 通用任务处理


`/task` 命令是一个用于管理复杂、跨会话任务的强大工具。它能够将一个大的功能需求自动分解为子任务和里程碑，并在多个工作会话之间保持上下文，还能从中断处恢复工作。它使用 `task:<operation>` 的语法。

##### 适用场景

当您需要处理一个无法在单次会话中完成的大型功能时（例如"实现一个完整的 OAuth 2.0 认证系统"），此命令是您的"项目经理"。您可以用 `:create` 创建任务，用 `:status` 查看进度，用 `:update` 更新发现，用 `:resume` 在中断后恢复工作，最后用 `:complete` 来完成并归档任务。

##### 命令特定操作

| 操作                    | 描述                                                     |
| :---------------------- | :------------------------------------------------------- |
| `:create <description>` | 创建一个新任务，并自动将其分解为子任务和里程碑。         |
| `:update <id> <update>` | 更新指定 ID 任务的进度、需求或发现。                     |
| `:status <id>`          | 显示指定 ID 任务的当前进度、已完成的子任务和障碍。       |
| `:resume <id>`          | 加载指定 ID 任务的上下文，从上次中断的地方继续工作。     |
| `:complete <id>`        | 将指定 ID 的任务标记为完成，并生成总结报告、归档产出物。 |

##### 建议角色

| 角色 | 优势|
|:---|:---|
| `--persona-architect` | 复杂任务的系统性分解和项目管理 |
| `--persona-mentor` | 跨会话任务的指导和进度跟踪 |

##### 使用示例

```bash
# 示例 1: 创建一个复杂的特性任务
/task:create "Implement a complete OAuth 2.0 authentication system"

# 示例 2: 查看任务 "oauth-task-id" 的当前状态
/task:status oauth-task-id

# 示例 3: 在中断后，恢复任务 "oauth-task-id" 的工作
/task:resume oauth-task-id

# 示例 4: 更新任务 "oauth-task-id"，记录一个新的发现
/task:update oauth-task-id "Found a library conflict, need to switch to a different library."

# 示例 5: 完成任务 "oauth-task-id"，并生成总结报告
/task:complete oauth-task-id
```

## 实用场景与最佳实践

本节将展示如何组合使用 SuperClaude 的命令和标志来完成复杂的专业工作流，并提供一些通用的最佳实践。

### 专业工作流示例

#### 全栈开发流程

一个典型的全栈功能开发流程可能如下：

1.  **架构设计**:
    ```bash
    /design --api --ddd --persona-architect
    ```
2.  **构建全栈应用**:
    ```bash
    /build --fullstack --tdd --magic
    ```
3.  **全面测试**:
    ```bash
    /test --coverage --e2e --pup
    ```
4.  **部署到预发环境**:
    ```bash
    /deploy --env staging --validate
    ```

#### 安全优先开发流程

将安全融入开发生命周期的流程：

1.  **初期安全扫描**:
    ```bash
    /scan --security --owasp --deps --persona-security
    ```
2.  **法医级分析**:
    ```bash
    /analyze --security --forensic --seq
    ```
3.  **安全加固**:
    ```bash
    /improve --security --validate --strict
    ```
4.  **安全专项测试**:
    ```bash
    /test --security --coverage
    ```

#### 性能优化流程

一个完整的性能瓶颈定位和优化流程：

1.  **性能画像分析**:
    ```bash
    /analyze --profile --deep --persona-performance
    ```
2.  **问题调查与定位**:
    ```bash
    /troubleshoot --perf --investigate --pup
    ```
3.  **迭代式优化**:
    ```bash
    /improve --performance --iterate --threshold 90%
    ```
4.  **负载测试**:
    ```bash
    /test --performance --load
    ```

#### 质量保障流程

确保最高代码质量的流程：

1.  **基于证据的审查**:
    ```bash
    /review --quality --evidence --persona-qa
    ```
2.  **严格重构**:
    ```bash
    /improve --quality --refactor --strict
    ```
3.  **质量验证扫描**:
    ```bash
    /scan --validate --quality
    ```
4.  **突变测试**:
    ```bash
    /test --coverage --mutation
    ```

### 最佳实践

1.  **对高风险操作始终进行验证**
    在执行生产部署或数据库迁移等高风险操作时，总是先使用 `--plan` 或 `--dry-run` 进行预览，并加上 `--validate` 进行安全检查。

    ```bash
    /deploy --env prod --validate --plan
    /migrate --database --dry-run --backup
    ```

2.  **使用角色（Personas）获取专业视角**
    当任务需要特定领域的专业知识时，不要忘记使用 `--persona-*` 标志。

    ```bash
    /analyze --architecture --persona-architect
    /scan --security --persona-security
    ```

3.  **组合 MCP 服务以获得最大能力**
    对于复杂的任务，组合使用多个 MCP 服务通常能得到更好的结果。

    ```bash
    /build --react --magic --seq --c7
    /test --e2e --pup --coverage
    ```

4.  **对复杂任务使用渐进式思考**
    面对非常复杂的问题，从 `--think` 开始，逐步升级到 `--think-hard` 或 `--ultrathink`，以控制成本和深度。
    ```bash
    /troubleshoot --investigate --think
    /design --microservices --think-hard
    /analyze --architecture --ultrathink
    ```

### 我的用例

```bash
# Review a Commit
/review --quality --commit ff7157487a --summary --persona-performance --thinkhard --all-mcp Carefully analyze whether this code modification is necessary and point out the implementation problems.
```