# 完全卸载 Calico 并安装 Flannel

## 安装 Flannel

默认安装 flannel，如果你的 pod-cidr 配置是 10.244.0.0/16

```
kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
```

如果 是自定义的 pod-cidr

```
# Needs manual creation of namespace to avoid helm error
kubectl create ns kube-flannel
kubectl label --overwrite ns kube-flannel pod-security.kubernetes.io/enforce=privileged

helm repo add flannel https://flannel-io.github.io/flannel/
helm install flannel --set podCidr="10.244.0.0/16" --namespace kube-flannel flannel/flannel
```

## 卸载 Calico

正常情况下，安装 Calico 会使用 2 个文件

安装过程

安装官方的 calico-operator ，然后再部署对应的模块

```
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.25.1/manifests/tigera-operator.yaml
```

```
# 下载配置文件模板
curl -LO https://raw.githubusercontent.com/projectcalico/calico/v3.25.1/manifests/custom-resources.yaml
grep cidr custom-resources.yaml #打印出默认的CIDR

# 确保 calico 配置的 cidr 与 kubernetes 安装 pod-cidr 保持一致
vim custom-resources.yaml
kubectl apply -f custom-resources.yaml
```

卸载过程

通常情况下，如果只是使用 kubectl delete 删除原先的 2 个文件，K8s 的 pod 还是不能成功起来，错误如下：

```
Failed to create pod sandbox: rpc error: code = Unknown desc = failed to setup network for sandbox "58b5b7e0b64bf3fa6ca289be783d1ba663b0f9873b4a3b8f00e00a7aabbe96a2": plugin type="calico" failed (add): error getting ClusterInformation: connection is unauthorized: Unauthorized
```

这是应为系统存在 cni 的配置文件残留导致 ，需要删除如下文件

```
sudo rm -rf /etc/cni/net.d/*calico*
sudo rm -f /opt/cni/bin/calico*
sudo rm -f /usr/local/bin/calico*
sudo rm -rf /var/lib/cni/networks/calico/
```
