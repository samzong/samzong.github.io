---
layout: post
title: HowTo Install CloudStack 4.8 on CentOS 6.x
tags: 
    - CloudStack
categories: 
    - 虚拟化
    - CloudStack
abbrlink: 61629
date: 2016-05-18 02:38:59
---

```

#!/bin/bash

# Install  CloudStack.sh

# setting static ip in : /etc/sysconfig/network-scripts/ifcfg-eth0

# Check Service

# Install

# hostname --fqdn

# service network restart

# trun off selinux in : /etc/selinux/config
#SELinux=disabed

# trun off iptables.
service iptables stop
service ip6tables stop

chkconfig iptables off
chkconfig ip6tables off

#NTP
yum install -y ntp
chkconfig ntpd on
service ntpd start

# adding cloudstack repos
[cloudstack]
name=cloudstack
baseurl=http://cloudstack.apt-get.eu/centos/6/4.5/
enabled=1
gpgcheck=0

#NFS
yum install -y nfs-utils

# /etc/exports
/secondary *(rw,async,no_root_squash,no_subtree_check)
/primary *(rw,async,no_root_squash,no_subtree_check)
# add top to /etc/sysconfig/nfs
LOCKD_TCPPORT=32803
LOCKD_UDPPORT=32769
MOUNTD_PORT=892
RQUOTAD_PORT=875
STATD_PORT=662
STATD_OUTGOING_PORT=2020
# add iptable rules to /etc/sysconfig/iptables
-A INPUT -s 172.16.10.0/24 -m state --state NEW -p udp --dport 111 -j ACCEPT
-A INPUT -s 172.16.10.0/24 -m state --state NEW -p tcp --dport 111 -j ACCEPT
-A INPUT -s 172.16.10.0/24 -m state --state NEW -p tcp --dport 2049 -j ACCEPT
-A INPUT -s 172.16.10.0/24 -m state --state NEW -p tcp --dport 32803 -j ACCEPT
-A INPUT -s 172.16.10.0/24 -m state --state NEW -p udp --dport 32769 -j ACCEPT
-A INPUT -s 172.16.10.0/24 -m state --state NEW -p tcp --dport 892 -j ACCEPT
-A INPUT -s 172.16.10.0/24 -m state --state NEW -p udp --dport 892 -j ACCEPT
-A INPUT -s 172.16.10.0/24 -m state --state NEW -p tcp --dport 875 -j ACCEPT
-A INPUT -s 172.16.10.0/24 -m state --state NEW -p udp --dport 875 -j ACCEPT
-A INPUT -s 172.16.10.0/24 -m state --state NEW -p tcp --dport 662 -j ACCEPT
-A INPUT -s 172.16.10.0/24 -m state --state NEW -p udp --dport 662 -j ACCEPT
# service iptables restart
service rpcbind start
service nfs start
chkconfig rpcbind on
chkconfig nfs on

# MySQL server
yum install -y mysql-server
# adding configure file in /etc/my.cnf : [mysqld]
innodb_rollback_on_timeout=1
innodb_lock_wait_timeout=600
max_connections=350
log-bin=mysql-bin
binlog-format = 'ROW'

service mysqld start
chkconfig mysqld on
mysql_secure_installation 	# remeber the root pass.

# Cloudstack-management
yum -y install cloudstack-management
cloudstack-setup-databases cloud:[password]@localhost --deploy-as=root:[password]
cloudstack-setup-management

#System Template Setup
/usr/share/cloudstack-common/scripts/storage/secondary/cloud-install-sys-tmplt -m /secondary -u http://cloudstack.apt-get.eu/systemvm/4.6/systemvm64template-4.6.0-kvm.qcow2.bz2 -h kvm -F


# Install kvm
yum -y install cloudstack-agent

# qemu configuration : /etc/libvirt/qemu.conf
vnc_listen=0.0.0.0
# Libvirt Configuration : /etc/libvirt/libvirtd.conf
listen_tls = 0
listen_tcp = 1
tcp_port = "16059"
auth_tcp = "none"
mdns_adv = 0
#  /etc/sysconfig/libvirtd
LIBVIRTD_ARGS="--listen"

service libvirtd restart

lsmod | grep kvm:
kvm_intel              55496  0
kvm                   337772  1 kvm_intel


##### UI Setting ####
http://[ip]:8080/client



```
