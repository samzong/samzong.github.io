---
title: Tomcat java.lang.OutOfMemoryError
tags: [Tomcat]
date: 2016-11-29 02:19:38
---


### 1. 什么是 *PermGen space* ?

PermGen space 的全称是 Permanent Generation space，是指内存的永久保存区域，这块内存主要是被 JVM 存放 Class 和 Meta 信息的，Class 在被 Loader 时就会被放到 PermGen space 中，它和存放类实例 (Instance) 的 Heap 区域不同，GC(Garbage Collection) 不会在主程序运行期对 PermGen space 进行清理，所以如果你的应用中有很 CLASS 的话，就很可能出现 PermGen space 错误，这种错误常见在 web 服务器对 JSP 进行 pre compile 的时候。如果你的 WEB APP 下都用了大量的第三方 jar，其大小超过了 jvm 默认的大小 (4M) 那么就会产生此错误信息了。

### 2. 解决方法

#### 2.1 手动设置 MaxPermSize 大小

```bash
# 修改$TOMCAT_HOME/bin/catalina.sh，在“echo "Using CATALINA_BASE:   $CATALINA_BASE"”上面加入以下行：
JAVA_OPTS="-server -Xms256m -Xmx512m -XX:PermSize=64M -XX:MaxPermSize=128m"
```

### 3. Java heap space

#### 解释

Heap size 设置
JVM 堆的设置是指 java 程序运行过程中 JVM 可以调配使用的内存空间的设置.JVM 在启动的时候会自动设置 Heap size 的值，其初始空间 (即-Xms) 是物理内存的 1/64，最大空间 (-Xmx) 是物理内存的 1/4。可以利用 JVM 提供的-Xmn -Xms -Xmx 等选项可进行设置。Heap size 的大小是 Young Generation 和 Tenured Generaion 之和。

* 提示：在 JVM 中如果 98％的时间是用于 GC 且可用的 Heap size 不足 2％的时候将抛出此异常信息。
* 提示：Heap Size 最大不要超过可用物理内存的 80％，一般的要将-Xms 和-Xmx 选项设置为相同，而-Xmn 为 1/4 的-Xmx 值。

> 修改设置方法如 PermGen space
