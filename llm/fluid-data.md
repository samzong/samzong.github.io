---
title: Fluid 介绍
---
# Fluid 介绍

Fluid, elastic data abstraction and acceleration for BigData/AI applications in cloud

- Code: [https://github.com/fluid-cloudnative/fluid](https://github.com/fluid-cloudnative/fluid)
- Docs: [https://fluid-cloudnative.github.io/zh/doc/guide.html](https://fluid-cloudnative.github.io/zh/doc/guide.html)
- [https://mp.weixin.qq.com/s?src=11&timestamp=1700648575&ver=4912&signature=tyHhJZIZPe7KxNg*DNW5Vni4l9nnP53ruv1obkPU78kKNzGH2U2ssaIcW0O8zhfXoYImQ1I0YUjZ-vf6oTqTl4XQ7zkXO2rsfNbFE-Cy7jMvDdai7-KMpg1MGGbitFlx&new=1](https://mp.weixin.qq.com/s?src=11&timestamp=1700648575&ver=4912&signature=tyHhJZIZPe7KxNg*DNW5Vni4l9nnP53ruv1obkPU78kKNzGH2U2ssaIcW0O8zhfXoYImQ1I0YUjZ-vf6oTqTl4XQ7zkXO2rsfNbFE-Cy7jMvDdai7-KMpg1MGGbitFlx&new=1)

## 架构介绍

- Fluid

![](https://cdn.nlark.com/yuque/0/2024/png/343806/1704601639899-7b4c1063-2483-4fda-8bb9-f64b6195ff0d.png)

![](https://cdn.nlark.com/yuque/0/2024/png/343806/1704601639918-fd99ca4f-073f-4fc4-a41b-4f9428dfb35c.png)

- Alluxio

![](https://cdn.nlark.com/yuque/0/2024/png/343806/1704601640073-440f44b0-9942-4414-a745-6fe2d0a7df6a.png)

数据源是 minio ， 需要配置 minio-url and ak/sk

```yaml
apiVersion: data.fluid.io/v1alpha1
kind: Dataset
metadata:
  name: minio-demo
spec:
  mounts:
  - mountPoint: minio://my-first-bucket   # minio://<bucket name>
    name: minio
    options:
      minio-url: http://minio:9000  # minio service <url>:<port>
    encryptOptions:
      - name: minio-access-key
        valueFrom:
          secretKeyRef:
            name: minio-secret
            key: minio-access-key
      - name: minio-access-secret
        valueFrom:
          secretKeyRef:
            name: minio-secret
            key: minio-access-secret
```