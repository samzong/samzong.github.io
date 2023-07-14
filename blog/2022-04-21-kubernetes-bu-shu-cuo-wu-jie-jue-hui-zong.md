---
title: Kubernetes 部署错误解决汇总
tags: [Kubernetes]
---



### 1. `kubeadm init`失败，提示 kubelet 启动失败或 不健康

解决思路：

- systemctl status kubelet 查看当前状态
- 通过 journalctl -xeu kubelet 查看 启动时的错误原因，得到错误原因如下

```shell
root@master1:~# journalctl -xeu kubelet
-- Subject: A stop job for unit kubelet.service has finished
-- Defined-By: systemd
-- Support: http://www.ubuntu.com/support
--
-- A stop job for unit kubelet.service has finished.
--
-- The job identifier is 33099 and the job result is done.
Apr 21 00:55:30 master1 systemd[1]: Started kubelet: The Kubernetes Node Agent.
-- Subject: A start job for unit kubelet.service has finished successfully
-- Defined-By: systemd
-- Support: http://www.ubuntu.com/support
--
-- A start job for unit kubelet.service has finished successfully.
--
-- The job identifier is 33099.
Apr 21 00:55:30 master1 kubelet[13732]: Flag --network-plugin has been deprecated, will be removed along with dockershim.
Apr 21 00:55:30 master1 kubelet[13732]: Flag --network-plugin has been deprecated, will be removed along with dockershim.
Apr 21 00:55:30 master1 kubelet[13732]: I0421 00:55:30.937042   13732 server.go:446] "Kubelet version" kubeletVersion="v1.23.5"
Apr 21 00:55:30 master1 kubelet[13732]: I0421 00:55:30.937252   13732 server.go:874] "Client rotation is on, will bootstrap in background"
Apr 21 00:55:30 master1 kubelet[13732]: I0421 00:55:30.938245   13732 certificate_store.go:130] Loading cert/key pair from "/var/lib/kubelet/pki/kubelet-client-curr>
Apr 21 00:55:30 master1 kubelet[13732]: I0421 00:55:30.938707   13732 dynamic_cafile_content.go:156] "Starting controller" name="client-ca-bundle::/etc/kubernetes/p>
Apr 21 00:55:30 master1 kubelet[13732]: W0421 00:55:30.971257   13732 machine.go:65] Cannot read vendor id correctly, set empty.
Apr 21 00:55:30 master1 kubelet[13732]: I0421 00:55:30.971823   13732 server.go:693] "--cgroups-per-qos enabled, but --cgroup-root was not specified.  defaulting to>
Apr 21 00:55:30 master1 kubelet[13732]: E0421 00:55:30.971921   13732 server.go:302] "Failed to run kubelet" err="failed to run Kubelet: running with swap on is not>
Apr 21 00:55:30 master1 systemd[1]: kubelet.service: Main process exited, code=exited, status=1/FAILURE
-- Subject: Unit process exited
-- Defined-By: systemd
-- Support: http://www.ubuntu.com/support
--
-- An ExecStart= process belonging to unit kubelet.service has exited.
--
-- The process' exit code is 'exited' and its exit status is 1.
```

> 问题原因：注意看 `**"Failed to run kubelet"** 后面的 err原因 : err=**"failed to run Kubelet: running with swap on is not>**`

这里是因为 主机上的 swap 还是打开的，所以导致 kubelet 启动失败；原因是：在 Kubernetes 1.22 之前，节点不支持使用虚拟内存，如果在节点上检测到虚拟内存，kubelet 将默认无法启动。

> 知识扩展

1. 什么是 swap memory？一般称为虚拟内存，虚拟内存的作用是

### 1. 多次使用 `kubeadm init`时报错，提示文件已存在，端口被占用

错误原因：

```bash
root@master1:~# kubeadm init
[init] Using Kubernetes version: v1.23.5
[preflight] Running pre-flight checks
error execution phase preflight: [preflight] Some fatal errors occurred:
 [ERROR Port-6443]: Port 6443 is in use
 [ERROR Port-10259]: Port 10259 is in use
 [ERROR Port-10257]: Port 10257 is in use
 [ERROR FileAvailable--etc-kubernetes-manifests-kube-apiserver.yaml]: /etc/kubernetes/manifests/kube-apiserver.yaml already exists
 [ERROR FileAvailable--etc-kubernetes-manifests-kube-controller-manager.yaml]: /etc/kubernetes/manifests/kube-controller-manager.yaml already exists
 [ERROR FileAvailable--etc-kubernetes-manifests-kube-scheduler.yaml]: /etc/kubernetes/manifests/kube-scheduler.yaml already exists
 [ERROR FileAvailable--etc-kubernetes-manifests-etcd.yaml]: /etc/kubernetes/manifests/etcd.yaml already exists
 [ERROR Port-10250]: Port 10250 is in use
 [ERROR Port-2379]: Port 2379 is in use
 [ERROR Port-2380]: Port 2380 is in use
 [ERROR DirAvailable--var-lib-etcd]: /var/lib/etcd is not empty
[preflight] If you know what you are doing, you can make a check non-fatal with `--ignore-preflight-errors=...`
To see the stack trace of this error execute with --v=5 or higher
```

#### 解决方法

- 需要将之前产生的文件进行清楚，一个简单的命令

```shell
kubeadm reset
```
