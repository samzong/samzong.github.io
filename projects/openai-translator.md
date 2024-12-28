# OpenAI Translator

基于 OpenAI API 开发的智能翻译工具，支持多语言互译、文本润色、语法纠正等功能。

## 主要功能

- 支持多语言互译
- 智能文本润色
- 语法纠正
- 专业术语翻译
- 上下文理解
- API 调用示例

## 技术实现

- 前端：React + TypeScript
- API：OpenAI GPT API
- 部署：Docker + Nginx
- CI/CD：GitHub Actions

## 快速开始

1. 配置环境变量：
```bash
OPENAI_API_KEY=your_api_key
```

2. 安装依赖：
```bash
pnpm install
```

3. 启动开发服务器：
```bash
pnpm dev
```

## API 使用示例

```typescript
const translate = async (text: string, from: string, to: string) => {
  const response = await fetch('/api/translate', {
    method: 'POST',
    body: JSON.stringify({ text, from, to }),
  });
  return response.json();
};
```

## 部署指南

项目提供了 Docker 部署方案：

```bash
docker-compose up -d
```

## 路线图

- [ ] 支持更多 AI 模型
- [ ] 添加语音翻译
- [ ] 批量翻译功能
- [ ] 翻译记录导出

## 贡献指南

欢迎提交 PR 和 Issue！

## 许可证

MIT License 