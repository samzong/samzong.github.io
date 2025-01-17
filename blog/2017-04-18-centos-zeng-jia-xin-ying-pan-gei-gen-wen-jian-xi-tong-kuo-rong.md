---
title: CentOS 增加新硬盘给根文件系统扩容
tags: [CentOS]
date: 2017-04-18 17:48:57
---

由于刚开始做磁盘空间规划时，失误给根分区分配磁盘较小，导致后续实验环境无法进行，所以在经过研究后，决定尝试增加根分区的磁盘空间，注意这仅适用于创建在 LVM 上的文件系统。

## 实验环境

* Parallels Desktop 12
* CentOS 6.9
* 根分区空间 6.5GB
* 已使用 5.8GB
* 预计 增加 12G 磁盘空间

<!-- more -->

## 增加一块物理磁盘

Parallels Desktop 不能在线增加磁盘，所以要先将 VM 关闭，然后添加：
![image](images/50_edb5a646.jpg)
增加 12G 的磁盘
![image](images/50_2e6b7aae.jpg)

然后启动 VM，这时可以通过`fdisk -l`查看当前已经增加了一块 12G 的磁盘

![image](images/50_4d14a4ba.jpg)

## 格式化磁盘并加入到 VGroup 组内

### 查看当前`pvdisplay`磁盘列表，将`/dev/sdb`创建 pv 块

```bash
[root@centos ~]# pvdisplay
  --- Physical volume ---
  PV Name               /dev/sda2
  VG Name               vg_hadoop01
  PV Size               7.51 GiB / not usable 3.00 MiB
  Allocatable           yes (but full)
  PE Size               4.00 MiB
  Total PE              1922
  Free PE               0
  Allocated PE          1922
  PV UUID               MUCrDa-eJpZ-EXwE-YwwM-S2Az-p2m7-K9q3Fo

[root@centos ~]# pvcreate /dev/sdb
  Physical volume "/dev/sdb" successfully created
[root@centos ~]# pvdisplay
  --- Physical volume ---
  PV Name               /dev/sda2
  VG Name               vg_hadoop01
  PV Size               7.51 GiB / not usable 3.00 MiB
  Allocatable           yes (but full)
  PE Size               4.00 MiB
  Total PE              1922
  Free PE               0
  Allocated PE          1922
  PV UUID               MUCrDa-eJpZ-EXwE-YwwM-S2Az-p2m7-K9q3Fo

  --- Physical volume ---
  PV Name               /dev/sdb
  VG Name               vg_hadoop01
  PV Size               12.00 GiB / not usable 4.00 MiB
  Allocatable           yes
  PE Size               4.00 MiB
  Total PE              3071
  Free PE               3071
  Allocated PE          0
  PV UUID               XTpaBR-512W-vQIV-fwwz-So7L-ZCa3-yjDccQ
```

### 查看当前`vgdisplay`VGroup 组，将`/dev/sdb`加入根目录所在 VGroup

```sh
[root@centos ~]# vgdisplay
  --- Volume group ---
  VG Name               vg_hadoop01
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  3
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                2
  Open LV               2
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               7.51 GiB
  PE Size               4.00 MiB
  Total PE              1922
  Alloc PE / Size       1922 / 7.51 GiB
  Free  PE / Size       0 / 0
  VG UUID               szQ4fH-Sr1Z-V6c2-KVMp-ZUik-oUDP-rU8dQS

[root@centos ~]# vgextend vg_hadoop01 /dev/sdb
  Volume group "vg_hadoop01" successfully extended
[root@centos ~]# vgdisplay
  --- Volume group ---
  VG Name               vg_hadoop01
  System ID
  Format                lvm2
  Metadata Areas        2
  Metadata Sequence No  4
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                2
  Open LV               2
  Max PV                0
  Cur PV                2
  Act PV                2
  VG Size               19.50 GiB
  PE Size               4.00 MiB
  Total PE              4993
  Alloc PE / Size       1922 / 7.51 GiB
  Free  PE / Size       3071 / 12.00 GiB
  VG UUID               szQ4fH-Sr1Z-V6c2-KVMp-ZUik-oUDP-rU8dQS
```

### 查看`lvdisplay`根卷的名称，将磁盘加入根卷的 LV

```bash
[root@centos ~]# lvdisplay
  --- Logical volume ---
  LV Path                /dev/vg_hadoop01/lv_root
  LV Name                lv_root
  VG Name                vg_hadoop01
  LV UUID                tJDetu-Theq-BQ5g-3ZFe-Gan7-1SSv-OHeYrH
  LV Write Access        read/write
  LV Creation host, time hadoop01, 2017-04-18 07:09:58 +0800
  LV Status              available
  # open                 1
  LV Size                6.71 GiB
  Current LE             1718
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:0

  --- Logical volume ---
  LV Path                /dev/vg_hadoop01/lv_swap
  LV Name                lv_swap
  VG Name                vg_hadoop01
  LV UUID                D4K7I6-tPO0-HMbC-VWkR-2HV4-WjAe-M82wYq
  LV Write Access        read/write
  LV Creation host, time hadoop01, 2017-04-18 07:09:59 +0800
  LV Status              available
  # open                 1
  LV Size                816.00 MiB
  Current LE             204
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:1

[root@centos ~]# lvextend -l +100%FREE /dev/vg_hadoop01/lv_root
  Size of logical volume vg_hadoop01/lv_root changed from 6.71 GiB (1718 extents) to 18.71 GiB (4789 extents).
  Logical volume lv_root successfully resized.
[root@centos ~]# lvdisplay
  --- Logical volume ---
  LV Path                /dev/vg_hadoop01/lv_root
  LV Name                lv_root
  VG Name                vg_hadoop01
  LV UUID                tJDetu-Theq-BQ5g-3ZFe-Gan7-1SSv-OHeYrH
  LV Write Access        read/write
  LV Creation host, time hadoop01, 2017-04-18 07:09:58 +0800
  LV Status              available
  # open                 1
  LV Size                18.71 GiB
  Current LE             4789
  Segments               2
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:0

  --- Logical volume ---
  LV Path                /dev/vg_hadoop01/lv_swap
  LV Name                lv_swap
  VG Name                vg_hadoop01
  LV UUID                D4K7I6-tPO0-HMbC-VWkR-2HV4-WjAe-M82wYq
  LV Write Access        read/write
  LV Creation host, time hadoop01, 2017-04-18 07:09:59 +0800
  LV Status              available
  # open                 1
  LV Size                816.00 MiB
  Current LE             204
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:1
```

## 更新磁盘分区表

当你增加完成之后，这时使用`df -h`查看的磁盘空间仍然没有变化，因为我们还需要将根卷的分区表刷新。

### 使用`resize2fs`刷新根卷信息

```bash
[root@centos ~]# resize2fs /dev/vg_hadoop01/lv_root
resize2fs 1.41.12 (17-May-2010)
Filesystem at /dev/vg_hadoop01/lv_root is mounted on /; on-line resizing required
old desc_blocks = 1, new_desc_blocks = 2
Performing an on-line resize of /dev/vg_hadoop01/lv_root to 4903936 (4k) blocks.
The filesystem on /dev/vg_hadoop01/lv_root is now 4903936 blocks long.

[root@centos ~]# df -h
Filesystem            Size  Used Avail Use% Mounted on
/dev/mapper/vg_hadoop01-lv_root
                       19G  5.8G   12G  33% /
tmpfs                 244M     0  244M   0% /dev/shm
/dev/sda1             477M   52M  400M  12% /boot
```
