---
layout: post
title: HowTo Install Docker on CentOS 6.x
tags: 
    - Docker
categories: 
    - 虚拟化
    - Docker
abbrlink: 11081
date: 2016-07-07 08:03:28
---

### **1. Add the EPEL Repository**
```
rpm -iUvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
```
### **2. Update your system**
```
yum update -y
```

### **3. Install**
```
yum install -y docker-io
```


### **4. Configure**
```
service docker start
chkconfig docker on

docker info
```
### **5. Download a Docker Container**
```
docker pull centos
```
### **6. Run a Docker Container**
```
docker run -i -t centos /bin/bash
```

### **7. Find Docker Container**
```
docker search ubuntu
```

### **FAQ**

#### **1. Faild to start docker on CentOS 6.x**
<code>***/usr/bin/docker: relocation error: /usr/bin/docker: symbol dm_task_get_info_with_deferred_remove, version Base not defined in file libdevmapper.so.1.02 with link time reference***</code>
```
the lib-device-mapper that you have isn't exporting a symbol ("Base") that Docker needs.
this by upgrading lib-device-mapper to version 1.02.90.

# You may have to enable the public_ol6_latest repo in order to get this package.
sudo yum-config-manager --enable public_ol6_latest
sudo yum install device-mapper-event-libs
```

#### **2. Faild to use docker**
<code>***Get http:///var/run/docker.sock/v1.19/info: dial unix /var/run/docker.sock: no such file or directory. Are you trying to connect to a TLS-enabled daemon without TLS?***</code>
```
# this is because docker no restart ok.

pkill -9 docker && service docker start
```

#### **3. HowTo save 'docker run -i -t xxx /bin/bash'**
```
docker ps -l
docker commit ID newname
docker images
```

