---
layout: post
title: Tomcat java.lang.OutOfMemoryError
tags: 
    - Tomcat
categories: 
    - Tomcat
abbrlink: 18323
date: 2016-11-29 02:19:38
---


### 1. 什么是 *PermGen space* ?
PermGen space的全称是Permanent Generation space，是指内存的永久保存区域，这块内存主要是被JVM存放Class和Meta信息的，Class在被Loader时就会被放到PermGen space中，它和存放类实例(Instance)的Heap区域不同，GC(Garbage Collection)不会在主程序运行期对PermGen space进行清理，所以如果你的应用中有很CLASS的话，就很可能出现PermGen space错误，这种错误常见在web服务器对JSP进行pre compile的时候。如果你的WEB APP下都用了大量的第三方jar，其大小超过了jvm默认的大小(4M)那么就会产生此错误信息了。

### 2. 解决方法
##### 2.1 手动设置MaxPermSize大小
```
# 修改$TOMCAT_HOME/bin/catalina.sh，在“echo "Using CATALINA_BASE:   $CATALINA_BASE"”上面加入以下行：
JAVA_OPTS="-server -Xms256m -Xmx512m -XX:PermSize=64M -XX:MaxPermSize=128m"
```

### 3. Java heap space
#### 解释：
Heap size 设置
JVM堆的设置是指java程序运行过程中JVM可以调配使用的内存空间的设置.JVM在启动的时候会自动设置Heap size的值，其初始空间(即-Xms)是物理内存的1/64，最大空间(-Xmx)是物理内存的1/4。可以利用JVM提供的-Xmn -Xms -Xmx等选项可进行设置。Heap size 的大小是Young Generation 和Tenured Generaion 之和。

* 提示：在JVM中如果98％的时间是用于GC且可用的Heap size 不足2％的时候将抛出此异常信息。
* 提示：Heap Size 最大不要超过可用物理内存的80％，一般的要将-Xms和-Xmx选项设置为相同，而-Xmn为1/4的-Xmx值。

> 修改设置方法如PermGen space
