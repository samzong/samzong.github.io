# jq k8s 终端自定义输出

https://jqlang.github.io/jq/download/ download jq

https://github.com/jqlang/jq/releases/download/jq-1.7/jq-linux-amd64

1. 使用 jq and label 内是否包含启用 sidecar 注入来判断 pod 是否启用边车

```
kubectl get pods -A -o json | jq -r '.items[] | select(.metadata.labels["sidecar.istio.io/inject"] == "true") | .metadata.namespace + "," + .metadata.name'
```

1. 使用 jq and spec 内是否定义了 istio-proxy 的 container 来判断 pod 情况

```
kubectl get pods --all-namespaces -o json | jq -r '.items[] | select(.spec.containers[].name == "istio-proxy") | .metadata.namespace + "," + .metadata.name'
```

1. 获取特定资源类型的全部资源

```
kubectl api-resources | grep istio.io | awk '{print $1}' | xargs -I {} kubectl get {} --all-namespaces
```