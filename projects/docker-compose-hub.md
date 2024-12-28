# Docker Compose Hub

收集和维护常用服务的 Docker Compose 配置，包含数据库、缓存、消息队列等基础服务。

## 包含的服务

### 数据库
- MySQL
- PostgreSQL
- MongoDB
- Redis
- Elasticsearch

### 消息队列
- RabbitMQ
- Kafka
- Redis Pub/Sub

### 监控和日志
- Prometheus
- Grafana
- ELK Stack

### 其他服务
- Nginx
- Jenkins
- GitLab
- MinIO

## 使用方法

1. 克隆仓库：
```bash
git clone https://github.com/samzong/docker-compose-hub.git
```

2. 选择需要的服务目录：
```bash
cd docker-compose-hub/services/mysql
```

3. 修改配置文件：
```bash
cp .env.example .env
vim .env
```

4. 启动服务：
```bash
docker-compose up -d
```

## 目录结构

```
services/
├── databases/
│   ├── mysql/
│   ├── postgresql/
│   └── mongodb/
├── cache/
│   ├── redis/
│   └── memcached/
├── queue/
│   ├── rabbitmq/
│   └── kafka/
└── monitoring/
    ├── prometheus/
    └── grafana/
```

## 配置说明

每个服务目录下都包含：
- `docker-compose.yml`：服务编排配置
- `.env.example`：环境变量示例
- `README.md`：使用说明
- `config/`：配置文件目录

## 最佳实践

- 生产环境部署建议
- 数据持久化配置
- 安全性建议
- 性能优化指南

## 贡献指南

欢迎提交新的服务配置或优化现有配置！

## 许可证

MIT License 