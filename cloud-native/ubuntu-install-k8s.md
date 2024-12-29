# Ubuntu 部署 K8s

## 基础环境依赖

添加 基础依赖包

```
sudo apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates
```

swap 关闭

```
sudo swapoff -a
sudo sed -i '/ swap / s/^(.*)$/#1/g' /etc/fstab
```

优化系统参数

```
sudo tee /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter
```

## 安装 containerd

````
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmour -o /etc/apt/trusted.gpg.d/docker.gpg

# amd 芯片
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# arm 芯片
```bash
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y containerd.io
````

````
## 初始化 containerd 的配置

```bash
containerd config default > /etc/containerd/config.toml

# 修改 Cgroup
sudo sed -i 's/SystemdCgroup \= false/SystemdCgroup \= true/g' /etc/containerd/config.toml

# 老的 pause 地址
sed -i 's/k8s.gcr.io\/pause/k8s-gcr.m.daocloud.io\/pause/g' /etc/containerd/config.toml
# 新的 pause 地址
sudo sed -i 's/registry.k8s.io/k8s-gcr.m.daocloud.io/g' /etc/containerd/config.toml
````

## 添加 k8s 软件安装源

```
curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add -

cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF

apt-get update
```

## 安装k8s 最新版本基础组件

```
apt-get install -y kubelet kubeadm kubectl

sudo systemctl enable --now kubelet
```

## 初始化 K8s 集群

```
# 提前拉取镜像，使用镜像代理地址 (aliyun 更快)
# daocloud 出品 k8s-gcr.m.daocloud.io
sudo kubeadm config images pull --image-repository registry.aliyuncs.com/google_containers --kubernetes-version=v1.27.1

# 执行初始化，注意这里配置的 cidr，等下， 初始化 CNI 会用到
sudo kubeadm init --kubernetes-version=v1.27.1 --image-repository=registry.aliyuncs.com/google_containers --pod-network-cidr=172.10.0.0/16
```

## 配置 kubeconfig

```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

## 安装 CNI 组件（Calico）

默认初始化完成后，core-dns 会处于 Pendding 的状态，这是因为 CNI 组件还没有安装。

这里推荐 Calico ， 注意下方需要使用 create ，使用 apply 会提示过长的 label

```
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.25.1/manifests/tigera-operator.yaml

# 下载配置文件，可以关注替换下 calico 的版本
curl -LO https://raw.githubusercontent.com/projectcalico/calico/v3.25.1/manifests/custom-resources.yaml

# 默认配置文件中使用了 192.168.0.0/16 的 cidr，这里要修改与 kubeadm 初始化时配置的一致
grep cidr custom-resources.yaml #可以看到配置的 cidr
```

请确认 calico 配置文件里的 CIDR 和之前 kubeadm init 时的 CIDR 是一致的！！！否则请修改!

## 配置默认存储 （local-path）

这里使用 Rancher 的 local-path-storage 作为K8s 的默认存储


```
wget https://raw.githubusercontent.com/rancher/local-path-provisioner/v0.0.22/deploy/local-path-storage.yaml

# 替换镜像源
sed -i "s/image: rancher/image: docker.m.daocloud.io\/rancher/g" local-path-storage.yaml # replace docker.io to mirror
sed -i "s/image: busybox/image: docker.m.daocloud.io\/busybox/g" local-path-storage.yaml

kubectl apply -f local-path-storage.yaml
```

为 local-path 添加下默认存储 sc 的 annotations，否则其他组件可能会读取默认 sc 失败

```
kubectl patch storageclass local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

异常情况，可能会出现 local-path 的 Pod 一致无法调度，原因是单节点的 K8s 导致

K8s 在单节点跑一个集群时，会自动增加一个 taint，所以只需要将对应的污点移除即可

```
kubectl edit node <nodename>
```

注意，在生产环境中，强烈不建议使用单节点。


以下内容来自另外一篇文档

参考文档： [https://developer.arm.com/documentation/102475/0100/Multi-architecture-images](https://developer.arm.com/documentation/102475/0100/Multi-architecture-images)

```
> docker buildx create --name mybuilder
> docker buildx use mybuilder
> docker buildx build --platform linux/amd64 -t alpine-amd64 --load .
> docker buildx build --platform linux/arm64 -t alpine-arm64 --load .
> docker buildx build --platform linux/arm/v7 -t alpine-arm32 --load .
```

# Ubuntu with Kind and K8s

- kind 创建 cluster 时，如果要开放外部访问，需要定义 apiseraddress
- ubuntu snap 会自带安装 docker ， 与 apt 安装的冲突，需要执行卸载动作
	- snap remove docker
- ubuntu 会有系统打开最大文件数的限制，增加一下到 /etc/sysctl.conf

```
fs.inotify.max_user_watches=655360
fs.inotify.max_user_instances=1280
```

- 为了保障不同集群后续东西网关打通的成本，需要做网段规划，在 kind 中可以操作为：
	- podsubnet:
	- servicesubnet:
- ubuntu 手工指定 IP 的做法变更一下配置文件 /etc/netplan
	- dhcp 改为 no ，增加如下参数
	- addresses:
	- gateway4:
	- nameservers:
		- addresses:

![](https://cdn.nlark.com/yuque/0/2024/png/343806/1704528039698-cf695fcd-9aca-49b9-b58c-316d6df4e3b8.png)

Mac 本地使用了 dnspmasq 作为本地 dns 服务器，保证了域名的一致性

## arm dce5-installer

curl -Lo ./dce5-installer https://proxy-qiniu-download-public.daocloud.io/DaoCloud_Enterprise/dce5/dce5-installer-v0.10.0-linux-arm64

![](https://cdn.nlark.com/yuque/0/2024/png/343806/1704528039664-e4c891c6-9e37-485c-8930-d287a6b75567.png)

[https://www.cnblogs.com/keithtt/p/13204497.html](https://www.cnblogs.com/keithtt/p/13204497.html)