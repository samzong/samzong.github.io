---
title: Skoala 部署教程
tags: [DaoCloud]
---

## 使用之前的话

Skoala 的微服务治理和微服务是强依赖的 Ghippo、Insight 和 Kpanda 作为基石；同时 Skoala 也支持了 Mesh 服务治理能力，所以也需要 Mspider。
为了保证良好的使用体验，以及减少不可预知的部署问题，请确认以上组件均可正常工作。

### 检测方式一

访问 UI 界面环境，可以在左侧导航栏能够正确看到所有模块，并且可以正常使用。
![CleanShot 2022-09-07 at 18.07.42@2x.jpg](images/resize,w_960,m_lfit_65ad95c9.jpg)

### 检测方式二

通过终端查看集群内的 apiserver 是否正常，检查服务 Pod 是否正常运行

```shell
# 检测 ghippo
~ kubectl -n ghippo-system get pods | egrep "apiserver|ui"
ghippo-apiserver-589c4ddcf6-cmct7              3/3     Running     0          17h
ghippo-apiserver-589c4ddcf6-sts8t              3/3     Running     0          17h
ghippo-ui-7ddddc548c-nsbkj                     2/2     Running     0          94m


# 检查 kpanda
~ kubectl -n kpanda-system get pods | egrep "apiserver|ui"
kpanda-apiserver-695b76f476-kdb8l                                 2/2     Running     0          5m56s
kpanda-apiserver-695b76f476-mvllg                                 2/2     Running     0          7m51s
kpanda-clusterpedia-apiserver-574d49c4c-hptm7                     2/2     Running     0          74m
kpanda-clusterpedia-apiserver-574d49c4c-mjm84                     2/2     Running     0          74m
kpanda-ui-5f9586d49b-f4mn2                                        2/2     Running     0          66m
kpanda-ui-5f9586d49b-qpgwd                                        2/2     Running     0          66m


# 检查 Insight
~ kubectl -n insight-system get pods | egrep "server|ui"
insight-server-5bbc96bb94-n2wc7                                1/1     Running   0          174m
insight-ui-66b6795c44-zm6qj                                    1/1     Running   0          3h38m


# 检查 mspider
~ kubectl -n mspider-system get pods | egrep "api|ui"
mspider-api-service-7d96c6798-mljst       2/2     Running   0          3h20m
mspider-ui-6f5d58cdc6-59hbn               2/2     Running   0          170m
mspider-work-api-684b75dccb-4659g         2/2     Running   0          3h20m
```

## 配置 skoala helm repo

配置好 skoala 仓库，即可查看和获取到 skoala 的应用 chart

```shell
helm repo add skoala-release https://release.daocloud.io/chartrepo/skoala
helm repo update
```

> 需要实现安装 Helm

## 安装依赖 mysql

在安装 skoala 的组件时，hive 和 sesame 需要用到 mysql 组件，所以这里需要预先安装一下 mysql，执行下方 yaml。

```yaml
# 使用如下命令
kubectl -n skoala-system apply -f skoala-mysql.yml
```

```yaml
# 保存到 skoala-mysql.yml 文件

~ cat skoala-mysql.yml
apiVersion: v1
kind: Service
metadata:
  name: skoala-mysql
  namespace: skoala-system
spec:
  ports:
  - port: 3306
  selector:
    app: mysql
  clusterIP: None
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: skoala-mysql
  namespace: skoala-system
spec:
  selector:
    matchLabels:
      app: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - image: release.daocloud.io/skoala/mysql:5.7.32
        name: mysql
        env:
          # Use secret in real usage
        - name: MYSQL_ROOT_PASSWORD
          value: password
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: mysql-persistent-storage
          mountPath: /var/lib/mysql
      volumes:
      - name: mysql-persistent-storage
        persistentVolumeClaim:
          claimName: mysql-pv-claim
```

- 注意修改以上，mysql 的密码。

### 初始化 mysql

登录到 pod 内，并成功登录到 mysql 内

```yaml
kubectl -n skoala-system exec pods/`kubectl -n skoala-system get pods | grep skoala-mysql | awk '{print $1}'` -it bash
```

![CleanShot 2022-09-07 at 18.54.47@2x.jpg](images/resize,w_960,m_lfit_26781c02.jpg)

初始化数据库表

- 获取到 mysql 的初始化脚本文件，[https://gitlab.daocloud.cn/ndx/skoala/-/tree/main/app/hive/db](https://gitlab.daocloud.cn/ndx/skoala/-/tree/main/app/hive/db)
- 依次查看对应的文件，并放在 mysql 中执行

注意把对应的版本，建议使用最新的版本，这里建议  v0.6.1

```shell
helm upgrade --install skoala --create-namespace -n skoala-system --cleanup-on-fail \
--set image.tag=v0.6.1 \
skoala/skoala-agent \
--version 0.6.1
```

这里会将资源部署到 skoala-system 命名空间内，可以通过查看该命名空间内的资源来查看是否部署成功。

```shell
~ kubectl -n skoala-system get pods
NAME                           READY   STATUS    RESTARTS         AGE
hive-96b58785c-shhnh           0/1     Running   0                23h
sesame-cdd894f74-l55hw         0/1     Running   0                23h
ui-7df9754f85-v2gg5            1/1     Running   0                23h
```

## 安装 Skoala

### 查看 skaola 当前最新版本

```shell
helm search repo skoala-release/skoala --versions
NAME                CHART VERSION APP VERSION DESCRIPTION
skoala-release/skoala       0.6.1         0.6.1       The helm chart for Skoala
skoala-release/skoala       0.6.0         0.6.0       The helm chart for Skoala
skoala-release/skoala       0.5.1         0.5.1       The helm chart for Skoala
```

### 执行部署

这里注意各个组件的版本，建议安装如下版本，直接执行命令即可，【在 demo 部署时】

```yaml
helm upgrade --install skoala --create-namespace -n skoala-system --cleanup-on-fail \
--set ui.image.tag=v0.5.3 \
--set hive.image.tag=v0.6.1 \
--set sesame.image.tag=v0.6.1 \
daocloud-registry/skoala \
--version 0.6.1
```

查看部署的 pod 是否启动成功

```yaml
~ kubectl -n skoala-system get pods
NAME                           READY   STATUS             RESTARTS          AGE
hive-96b58785c-shhnh           1/1     Running            0                 25h
sesame-cdd894f74-l55hw         1/1     Running            0                 25h
skoala-mysql-75dc5cfc7-99tbs   1/1     Running            0                 25h
ui-7df9754f85-v2gg5            1/1     Running            0                 23h
```

### 卸载

```yaml
helm uninstall skoala -n skoala-system
```

### 更多参数的配置

| **Key** | **Type** | **Default** | **Description** |
| --- | --- | --- | --- |
| global.image.pullPolicy | string | `"IfNotPresent"` |  |
| global.image.repository | string | `"release.daocloud.io"` |  |
| global.imageCredentials.email | string | `""` |  |
| global.imageCredentials.password | string | `""` |  |
| global.imageCredentials.username | string | `""` |  |
| global.imagePullSecrets | list | `[]` |  |
| global.istioInjection.enable | bool | `true` |  |
| global.namespace | string | `"skoala-system"` |  |
| hive.configMap.chart-repos.skoala.name | string | `"skoala"` |  |
| hive.configMap.chart-repos.skoala.password | string | `""` |  |
| hive.configMap.chart-repos.skoala.url | string | `"https://release.daocloud.io/chartrepo/skoala"` |  |
| hive.configMap.chart-repos.skoala.user | string | `""` |  |
| hive.configMap.client.ghippo.kubeconfig | string | `""` |  |
| hive.configMap.client.ghippo.timeout | int | `30` |  |
| hive.configMap.client.insight | string | `"insight-server.insight-system:80"` |  |
| hive.configMap.client.kpanda | string | `"kpanda-apiserver.kpanda-system:80"` |  |
| hive.configMap.client.mspider | string | `"mspider-api-service.mspider-system:8081"` |  |
| hive.configMap.client.mspider\_mcpc | string | `"mspider-work-api.mspider-system:8081"` |  |
| hive.configMap.data.database.database | string | `"hive"` |  |
| hive.configMap.data.database.driver | string | `"mysql"` |  |
| hive.configMap.data.database.host | string | `"skoala-mysql"` |  |
| hive.configMap.data.database.max-connection-lifetime | int | `20` |  |
| hive.configMap.data.database.max-idle-connections | int | `150` |  |
| hive.configMap.data.database.max-open-connections | int | `150` |  |
| hive.configMap.data.database.password | string | `"dangerous"` |  |
| hive.configMap.data.database.port | int | `3306` |  |
| hive.configMap.data.database.user | string | `"root"` |  |
| hive.configMap.data.server.grpc.addr | string | `"0.0.0.0:9091"` |  |
| hive.configMap.data.server.grpc.timeout | string | `"1s"` |  |
| hive.configMap.data.server.http.addr | string | `"0.0.0.0:8081"` |  |
| hive.configMap.data.server.http.timeout | string | `"1s"` |  |
| hive.enable | bool | `true` |  |
| hive.image.name | string | `"skoala/hive"` |  |
| hive.image.pullPolicy | string | `"IfNotPresent"` |  |
| hive.image.tag | string | `"v0.6.0"` |  |
| hive.nameOverride | string | `"hive"` |  |
| hive.replicaCount | int | `1` |  |
| hive.resources | object | `{}` |  |
| hive.service.grpc.nodePort | int | `30091` |  |
| hive.service.grpc.port | int | `9091` |  |
| hive.service.http.nodePort | int | `30081` |  |
| hive.service.http.port | int | `8081` |  |
| hive.service.type | string | `"NodePort"` |  |
| sesame.configMap.chart-repos.skoala.name | string | `"skoala"` |  |
| sesame.configMap.chart-repos.skoala.password | string | `""` |  |
| sesame.configMap.chart-repos.skoala.url | string | `"https://release.daocloud.io/chartrepo/skoala"` |  |
| sesame.configMap.chart-repos.skoala.user | string | `""` |  |
| sesame.configMap.client.ghippo.kubeconfig | string | `""` |  |
| sesame.configMap.client.ghippo.timeout | int | `30` |  |
| sesame.configMap.client.insight | string | `"insight-server.insight-system:80"` |  |
| sesame.configMap.client.kpanda | string | `"kpanda-apiserver.kpanda-system:80"` |  |
| sesame.configMap.data.server.grpc.addr | string | `"0.0.0.0:9092"` |  |
| sesame.configMap.data.server.grpc.timeout | string | `"1s"` |  |
| sesame.configMap.data.server.http.addr | string | `"0.0.0.0:8082"` |  |
| sesame.configMap.data.server.http.timeout | string | `"1s"` |  |
| sesame.configMap.log.development | bool | `true` |  |
| sesame.configMap.log.disable-color | bool | `false` |  |
| sesame.configMap.log.disable-stacktrace | bool | `false` |  |
| sesame.configMap.log.enable-caller | bool | `true` |  |
| sesame.configMap.log.error-output-paths | string | `"dist/log/skoala-sesame.error.log"` |  |
| sesame.configMap.log.format | string | `"console"` |  |
| sesame.configMap.log.level | string | `"debug"` |  |
| sesame.configMap.log.name | string | `"skoala-sesame"` |  |
| sesame.configMap.log.output-paths | string | `"dist/log/skoala-sesame.log,stdout"` |  |
| sesame.enable | bool | `true` |  |
| sesame.image.name | string | `"skoala/sesame"` |  |
| sesame.image.pullPolicy | string | `"IfNotPresent"` |  |
| sesame.image.tag | string | `"v0.6.0"` |  |
| sesame.nameOverride | string | `"sesame"` |  |
| sesame.replicaCount | int | `1` |  |
| sesame.resources | object | `{}` |  |
| sesame.service.grpc.nodePort | int | `30092` |  |
| sesame.service.grpc.port | int | `9092` |  |
| sesame.service.http.nodePort | int | `30082` |  |
| sesame.service.http.port | int | `8082` |  |
| sesame.service.type | string | `"NodePort"` |  |
| ui.enable | bool | `true` |  |
| ui.image.name | string | `"skoala/skoala-ui"` |  |
| ui.image.pullPolicy | string | `"IfNotPresent"` |  |
| ui.image.tag | string | `"v0.4.0"` |  |
| ui.nameOverride | string | `"ui"` |  |
| ui.replicaCount | int | `1` |  |
| ui.resources | object | `{}` |  |
| ui.service.nodePort | int | `30090` |  |
| ui.service.port | int | `80` |  |
| ui.service.type | string | `"NodePort"` |  |
| create | bool | `true` |  |
| ui.serviceAccount.name | string | `""` |  |
| ui.tolerations | list | `[]` |  |

## 安装 skoala-agent

安装步骤说明

### 查看当前最新版本

```yaml
~ helm search repo skoala-release/skoala-agent --versions
NAME                CHART VERSION APP VERSION DESCRIPTION
skoala/skoala-agent 0.6.1         0.6.1       A Helm chart for Skoala Agent
skoala/skoala-agent 0.6.0         0.6.0       A Helm chart for Kubernetes
skoala/skoala-agent 0.5.1         0.5.1       A Helm chart for Kubernetes
skoala/skoala-agent 0.5.0         0.5.0       A Helm chart for Kubernetes
```

### 部署

```yaml
helm upgrade --install skoala-agent --create-namespace -n skoala-agent --cleanup-on-fail \
--set image.tag=v0.6.1 \
skoala/skoala-agent \
--version 0.6.1
```

查看部署的 pod 是否启动成功

```yaml
~ kubectl -n skoala-agent get pods
NAME                            READY   STATUS    RESTARTS   AGE
skoala-agent-679c6d64b4-tb7k4   1/1     Running   0          26h
```

### 卸载命令

```yaml
helm uninstall skoala-agent -n skoala-agent
```

### 更多参数设置

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| affinity | object | `{}` |  |
| autoscaling.enabled | bool | `false` |  |
| autoscaling.maxReplicas | int | `100` |  |
| autoscaling.minReplicas | int | `1` |  |
| autoscaling.targetCPUUtilizationPercentage | int | `80` |  |
| fullnameOverride | string | `""` |  |
| image.pullPolicy | string | `"IfNotPresent"` |  |
| image.repository | string | `"release-ci.daocloud.io/skoala/skoala-agent"` |  |
| image.tag | string | `"v0.6.0"` |  |
| imagePullSecrets | list | `[]` |  |
| ingress.annotations | object | `{}` |  |
| ingress.className | string | `""` |  |
| ingress.enabled | bool | `false` |  |
| ingress.hosts\[0].host | string | `"chart-example.local"` |  |
| ingress.hosts\[0].paths\[0].path | string | `"/"` |  |
| ingress.hosts\[0].paths\[0].pathType | string | `"ImplementationSpecific"` |  |
| ingress.tls | list | `[]` |  |
| istioInjection.enable | bool | `true` |  |
| nameOverride | string | `""` |  |
| nodeSelector | object | `{}` |  |
| podAnnotations | object | `{}` |  |
| podSecurityContext | object | `{}` |  |
| replicaCount | int | `1` |  |
| resources | object | `{}` |  |
| securityContext | object | `{}` |  |
| service.port | int | `443` |  |
| service.type | string | `"NodePort"` |  |
| serviceAccount.annotations | object | `{}` |  |
| serviceAccount.create | bool | `false` |  |
| serviceAccount.name | string | `""` |  |
| tolerations | list | `[]` |  |
