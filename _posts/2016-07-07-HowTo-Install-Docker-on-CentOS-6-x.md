---
layout: post
title: HowTo Install Docker on CentOS 6.x
tags: 
    - CentOS
categories: 
    - Docker
date: 2016-07-07 08:03:28
---

## **1. Add the EPEL Repository**

```bash
rpm -iUvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
```

## **2. Update your system**

```bash
yum update -y
```

## **3. Install**

```bash
yum install -y docker-io
```

## **4. Configure**

```bash
service docker start
chkconfig docker on

docker info
```

## **5. Download a Docker Container**

```bash
docker pull centos
```

## **6. Run a Docker Container**

```bash
docker run -i -t centos /bin/bash
```

## **7. Find Docker Container**

```bash
docker search ubuntu
```

## **FAQ**

### **1. Faild to start docker on CentOS 6.x**

`***/usr/bin/docker: relocation error: /usr/bin/docker: symbol dm_task_get_info_with_deferred_remove, version Base not defined in file libdevmapper.so.1.02 with link time reference***`

```bash
the lib-device-mapper that you have isn't exporting a symbol ("Base") that Docker needs.
this by upgrading lib-device-mapper to version 1.02.90.

# You may have to enable the public_ol6_latest repo in order to get this package.
sudo yum-config-manager --enable public_ol6_latest
sudo yum install device-mapper-event-libs
```

### **2. Faild to use docker**

`***Get <http:///var/run/docker.sock/v1.19/info>: dial unix /var/run/docker.sock: no such file or directory. Are you trying to connect to a TLS-enabled daemon without TLS?***`

```bash
# this is because docker no restart ok.

pkill -9 docker && service docker start
```

### **3. HowTo save 'docker run -i -t xxx /bin/bash'**

```bash
docker ps -l
docker commit ID newname
docker images
```
