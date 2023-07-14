---
title: kubernetes 学习之路
tags: [Kubernetes]
---



## 基础环境

- MacOS M1
- Paralles Desktop 17
- Ubuntu 20.04.4

### ubuntu 安装替换系统源

```shell
# 默认注释了源码仓库，如有需要可自行取消注释
deb https://mirrors.aliyun.com/ubuntu-ports/ xenial main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu-ports/ xenial main main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu-ports/ xenial-updates main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu-ports/ xenial-updates main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu-ports/ xenial-backports main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu-ports/ xenial-backports main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu-ports/ xenial-security main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu-ports/ xenial-security main restricted universe multiverse
```

### ubuntu 基础系统优化

> 时区问题处理

```shell
# 调整为为北京时区
sudo cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# 增加时间自动同步
sudo crontab -e
*/15 * * * * /usr/sbin/ntpdate 1.cn.pool.ntp.org  >/dev/null 2>&1
```

### Kubernetes 镜像源替换

```shell
apt-get update && apt-get install -y apt-transport-https
curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add - 
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF
apt-get update
apt-get install -y kubelet kubeadm kubectl
```

### docker 安装及源替换

```shell
# step 1: 安装必要的一些系统工具
sudo apt-get update
sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common

# step 2: 安装GPG证书
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

# Step 3: 写入软件源信息
sudo add-apt-repository "deb http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"

# Step 4: 更新并安装 Docker-CE
sudo apt-get -y update
sudo apt-get -y install docker-ce docker-ce-cli containerd.io
```

docker 的安装源配置

```shell
cat <<EOF > /etc/docker/daemon.json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ],
  "exec-opts": ["native.cgroupdriver=systemd"]
}
EOF

systemctl daemon-reload
systemctl restart docker
```

> docker cgroupdriver 在多个 node 和 master 之间不一致，会导致 node join 失败

## Kubernetes 部署机器

- 4 核 4G 3 台
  - 10.211.55.7 **master1**
  - 10.211.55.9 node1
  - 10.211.55.10 node2

```yaml
# This is the network config written by 'subiquity'
network:
  ethernets:
    enp0s5:
      addresses: [10.211.55.10/24]
      dhcp4: no
      gateway4: 10.211.55.1
      nameservers:
      addresses: [114.114.114.114]
  version: 2
```

> 为了防止多台机器之间的 DHCP IP 冲突，全部限定静态 IP
> < 采用的是 Parallels Desktop Clone pvm 的方式 产生的多台机器

### Kubernetes 从 k8s.gcr.io 仓库拉取镜像失败

这是因为 k8s 部署是在 google 自家的所以... ，好在国内基本都有对应的镜像仓库，这里以 阿里云为例：

```shell
root@master1:~# kubeadm config images list
k8s.gcr.io/kube-apiserver:v1.23.5
k8s.gcr.io/kube-controller-manager:v1.23.5
k8s.gcr.io/kube-scheduler:v1.23.5
k8s.gcr.io/kube-proxy:v1.23.5
k8s.gcr.io/pause:3.6
k8s.gcr.io/etcd:3.5.1-0
k8s.gcr.io/coredns/coredns:v1.8.6
```

使用 docker pull 分布拉取这些 image，将 `k8s.gcr.io` 替换为 `registry.aliyuncs.com/google_containers/`

```shell
# 原为
docker pull k8s.gcr.io/kube-apiserver:v1.23.5
# 改为
docker pull registry.aliyuncs.com/google_containers/kube-apiserver:v1.23.5
```

然后，依次将所有需要的 image 都拉取下来，使用 docker image list 查看拉取的镜像

```shell
root@master1:~# docker image ls
REPOSITORY                                                        TAG       IMAGE ID       CREATED        SIZE
registry.aliyuncs.com/google_containers/kube-apiserver            v1.23.5   dc83c48dbe3b   5 weeks ago    132MB
registry.aliyuncs.com/google_containers/kube-controller-manager   v1.23.5   de8edc9077c1   5 weeks ago    122MB
registry.aliyuncs.com/google_containers/kube-scheduler            v1.23.5   48609f8bab08   5 weeks ago    53MB
registry.aliyuncs.com/google_containers/kube-proxy                v1.23.5   48d3a9e595bc   5 weeks ago    109MB
registry.aliyuncs.com/google_containers/etcd                      3.5.1-0   1040f7790951   5 months ago   132MB
registry.aliyuncs.com/google_containers/coredns                   v1.8.6    edaa71f2aee8   6 months ago   46.8MB
registry.aliyuncs.com/google_containers/pause                     3.6       7d46a07936af   7 months ago   484kB

```

由于 kubeadm 认的是 `k8s.gcr.io`，所以还需改回去 Tag，修改方式采用 docker tag 的方式处理

### kubeadm 初始化 k8s 环境

```shell
root@master1:~# kubeadm init --kubernetes-version=v1.23.5 --pod-network-cidr=10.244.0.0/16
[init] Using Kubernetes version: v1.23.5
[preflight] Running pre-flight checks
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local master1] and IPs [10.96.0.1 10.211.55.7]
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Generating "front-proxy-ca" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Generating "etcd/ca" certificate and key
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [localhost master1] and IPs [10.211.55.7 127.0.0.1 ::1]
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [localhost master1] and IPs [10.211.55.7 127.0.0.1 ::1]
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "sa" key and public key
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
[kubeconfig] Writing "admin.conf" kubeconfig file
[kubeconfig] Writing "kubelet.conf" kubeconfig file
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
[kubeconfig] Writing "scheduler.conf" kubeconfig file
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Starting the kubelet
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
[control-plane] Creating static Pod manifest for "kube-scheduler"
[etcd] Creating static Pod manifest for local etcd in "/etc/kubernetes/manifests"
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests". This can take up to 4m0s
[apiclient] All control plane components are healthy after 4.511137 seconds
[upload-config] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[kubelet] Creating a ConfigMap "kubelet-config-1.23" in namespace kube-system with the configuration for the kubelets in the cluster
NOTE: The "kubelet-config-1.23" naming of the kubelet ConfigMap is deprecated. Once the UnversionedKubeletConfigMap feature gate graduates to Beta the default name will become just "kubelet-config". Kubeadm upgrade will handle this transition transparently.
[upload-certs] Skipping phase. Please see --upload-certs
[mark-control-plane] Marking the node master1 as control-plane by adding the labels: [node-role.kubernetes.io/master(deprecated) node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
[mark-control-plane] Marking the node master1 as control-plane by adding the taints [node-role.kubernetes.io/master:NoSchedule]
[bootstrap-token] Using token: k2qw1l.lpnjzo138zfynmb1
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to get nodes
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstrap-token] configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstrap-token] configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstrap-token] Creating the "cluster-info" ConfigMap in the "kube-public" namespace
[kubelet-finalize] Updating "/etc/kubernetes/kubelet.conf" to point to a rotatable kubelet client certificate and key
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 10.211.55.7:6443 --token k2qw1l.lpnjzo138zfynmb1 \
 --discovery-token-ca-cert-hash sha256:974a7569ca2d243dc907ca121adbdba9407ae462ea72791342ccf2048ee46b31
```

## k8s 系统优化

```shell
# 增加到文件最后，进行系统层级优化

net.ipv4.ip_forward = 1
vm.swappiness = 1
net.bridge.bridge-nf-call-arptables = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_local_reserved_ports = 30000-32767
vm.max_map_count = 262144
fs.inotify.max_user_instances = 524288
kernel.pid_max = 65535
```

Kubesphere registry 仓库：

registry.cn-beijing.aliyuncs.com/kubesphereio/
