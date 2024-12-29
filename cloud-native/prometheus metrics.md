# Prometheus 监控指标

在 PromQL 中，by 子句用于指定在进行聚合操作时应保留的标签。当您对某个指标执行聚合查询（如 sum、avg、min、max 等）时，如果不指定 by 子句，所有的标签都会在聚合过程中被丢弃，结果只会保留聚合的值。使用 by 子句可以保留您关心的维度，例如服务名称。

```sql
# 查看来源 destination_service 有多少请求来源，根据 source_app 分类计算占比
sum by (source_app) (rate(istio_requests_total{destination_service="kpanda-apiserver.kpanda-system.svc.cluster.local"}[5m]))

# 针对请求量进行排序
sort_desc(
  sum by (source_app) (
    rate(istio_requests_total{destination_service="kpanda-apiserver.kpanda-system.svc.cluster.local"}[5m])
  )
)
```

这个查询的含义如下：

- istio_requests_total: 这是您要查询的指标，代表 Istio 处理的总请求数。
- rate(istio_requests_total[5m]): rate 函数计算指定时间窗口（在这里是 5 分钟）内指标的变化速率，这对计数器类型的指标（如 istio_requests_total）非常有用。
- sum(...) by (service): sum 函数将 rate 计算出来的速率值按照 service 标签进行聚合。这意味着如果您有多个实例（如多个Pod）为同一个服务提供服务，此查询将把它们的请求速率加在一起，以得到每个服务的总请求速率。
- [5m]: 这是一个时间范围选择器，表示查询过去 5 分钟的数据。

此查询结果将为您提供图表上每个服务的请求速率，其中每个服务的数据将合并为单个数据点。这可以帮助您理解不同服务的流量模式。

![](https://cdn.nlark.com/yuque/0/2023/png/343806/1703475565195-caea7e99-1201-4d66-a736-c1a99b37cb6c.png)