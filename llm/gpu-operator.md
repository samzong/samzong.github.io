# GPU Operator

查看当前操作系统的硬件 及 显卡信息

```bash
root@worker-node-2:~# lshw 
# 会输出很多的结果，这里重点查询  *-display 的信息
```

查看当前系统的显卡信息:

```bash
lspci  | grep -i vga
root@worker-node-2:~# lspci | grep -i vga
00:0f.0 VGA compatible controller: VMware SVGA II Adapter
```

查看 NVIDIA 显卡信息，使用命令 nvidia-smi

```bash
root@worker-node-2:~# nvidia-smi
Mon Aug 14 17:31:06 2023
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 535.86.05              Driver Version: 535.86.05    CUDA Version: 12.2     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  NVIDIA A800 80GB PCIe          Off | 00000000:23:00.0 Off |                    0 |
| N/A   39C    P0              48W / 300W |      4MiB / 81920MiB |      0%      Default |
|                                         |                      |             Disabled |
+-----------------------------------------+----------------------+----------------------+

+---------------------------------------------------------------------------------------+
| Processes:                                                                            |
|  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
|        ID   ID                                                             Usage      |
|=======================================================================================|
|  No running processes found                                                           |
+---------------------------------------------------------------------------------------+
```

## 安装 gpu-operator 的方式：

gpu-operator 对 Linux 的 kernel 版本有非常高的要求，不同的内核办法有着不同的驱动，具体查询nvidia官网的驱动首页 https://catalog.ngc.nvidia.com/orgs/nvidia/containers/driver/tags

```bash
# 如果不存在，需要升级到 nvidia 支持的 kernel 版本，然后进行下一步
# nvidia driver 镜像 tag 命名规则为: <driver-branch>-<linux-kernel-version>-<os-tag>
```

```bash
helm repo add nvidia https://helm.ngc.nvidia.com/nvidia
helm repo update
```

```bash
# 当前节点的卡不支持 mig，因此我禁用了 mig 功能
helm install --wait --generate-name \
    -n gpu-operator --create-namespace \
    nvidia/gpu-operator \
    --set driver.version=525-5.15.0-69-generic # 驱动一定要匹配
    --set migManager.enabled=false
```

待全部 pod 启动成功后，gpu-operator 就安装好了

## 查看 gpu 利用情况

可以实时查看的方式

```bash
root@controller-node-1:~# nvidia-smi pmon
# gpu         pid  type    sm    mem    enc    dec    command
# Idx           #   C/G     %      %      %      %    name
    0    2883969     C      -      -      -      -    ray::ServeRepli
    1    2885559     C      -      -      -      -    ray::ServeRepli
    0    2883969     C      -      -      -      -    ray::ServeRepli
    1    2885559     C      -      -      -      -    ray::ServeRepli
    0    2883969     C      -      -      -      -    ray::ServeRepli
    1    2885559     C      -      -      -      -    ray::ServeRepli
    0    2883969     C      -      -      -      -    ray::ServeRepli
    1    2885559     C      -      -      -      -    ray::ServeRepli
```