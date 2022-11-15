---
layout: post
title: HowTo Reset Azure VM Linux Password
tags: 
    - Azure
    - CentOS
categories: 
    - 云服务
    - Azure
abbrlink: 30472
date: 2016-07-10 11:21:47
---


>   **Setup1:** 这种方法仅适用于已存在的用户，也就是说$Username是之前创建过的用户，否则不适用

### **1. 指定虚拟机**
```
$vm = Get-AzureVM -ServiceName '云服务名称' -Name '虚拟机名称'
$vm.GetInstance().ProvisionGuestAgent = $true
```
### **2. 输入您当前的用户名和新密码**
```
$UserName = "指定用户名"
$Password = "指定密码"

$PrivateConfig = '{"username":"'+ $UserName + '", "password":"' +  $Password + '"}'
```
### **3. 开始执行**
```
$ExtensionName = 'VMAccessForLinux'
$Publisher = 'Microsoft.OSTCExtensions'
$Version =  '1.0'

Set-AzureVMExtension -ExtensionName $ExtensionName -VM  $vm -Publisher $Publisher -Version $Version -PrivateConfiguration $PrivateConfig | Update-AzureVM

```

> **Setup2:** 如果是由于错误修改了SSH的配置文件导致无法登录，例如在登录时报错：This service allows sftp connections only.Connection to vm closed.这是因为错误配置了sftp导致的，那碰到这种问题需要做的是重置ssh服务。

### **1. 指定虚拟机**
```
$vm = Get-AzureVM -ServiceName 'MyServiceName' -Name 'MyVMName'
$PrivateConfig = '{"reset_ssh":"True"}''
```
### **2. 开始执行**
```
$ExtensionName = 'VMAccessForLinux'
$Publisher = 'Microsoft.OSTCExtensions'
$Version =  '1.0'

Set-AzureVMExtension -ExtensionName $ExtensionName -VM  $vm -Publisher $Publisher -Version $Version -PrivateConfiguration $PrivateConfig | Update-AzureVM
```
