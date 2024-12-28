# Kubernetes Tools

一组用于简化 Kubernetes 日常运维工作的工具集，包含日志收集、监控报警、配置管理等功能。

## 工具列表

### 1. 日志管理
- 实时日志查看器
- 日志聚合分析
- 自定义日志过滤
- 日志导出工具

### 2. 监控报警
- 资源使用监控
- 性能指标采集
- 自定义告警规则
- 告警通知集成

### 3. 配置管理
- 配置文件版本控制
- 配置变更追踪
- 多环境配置管理
- 敏感信息加密

### 4. 集群运维
- 节点健康检查
- 资源清理工具
- 备份还原工具
- 集群诊断工具

## 安装使用

```bash
# 安装 CLI 工具
go install github.com/samzong/k8s-tools/cmd/kt@latest

# 或者使用 Docker
docker run -it --rm \
  -v ~/.kube:/root/.kube \
  samzong/k8s-tools:latest
```

## 常用命令

```bash
# 查看容器日志
kt logs -n namespace pod-name

# 监控资源使用
kt top nodes

# 配置管理
kt config diff -e prod,dev

# 健康检查
kt check cluster
```

## 架构设计

- 基于 Go 语言开发
- 插件化架构设计
- 支持自定义扩展
- 轻量级部署方案

## 开发指南

1. 环境准备：
```bash
go >= 1.20
make
kubectl
```

2. 构建项目：
```bash
make build
```

3. 运行测试：
```bash
make test
```

## 路线图

- [ ] 支持更多监控指标
- [ ] 添加 Web 控制台
- [ ] 支持多集群管理
- [ ] 国际化支持

## 贡献指南

欢迎提交 PR 和 Issue！

## 许可证

Apache License 2.0 