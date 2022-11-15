---
layout: post
title: Manage Tomcat Service Use Shell Script
tags: 
    - Shell
    - CentOS
    - Tomcat
categories: 
    - Linux
    - Shell
abbrlink: 45780
date: 2016-07-27 02:18:24
---

#### Tomcat 项目管理交互式脚本.

* Install pssh
* Use Key Login Server Hosts
* ~/.ssh/config 配置使用host名登录服务
*  指定 Server Group Files 存放位置

```

#!/bin/bash

# Author Alex LU
# Date 2016-07-20
# Version 1.0

# HostFile
HostDIR=~/.ssh/host/

# war包上传到该目录
# /warfolder

:'
jobs_select (){
    STRING=``cat $vmname | grep group
    if [ -z "$STRING" ]
    then
        job_tomcat
    else
        job2_tomcat
    fi
}
'

function HOST()
{
    echo ""
    echo "############ Host List ###############"
    echo "ckgroup:ck01,ck02,ck03,ck04"
    echo "sjgroup:sj01,sj02,sj03,sj04"
    echo "ddgroup:dd01,dd02,dd03,dd04"
    echo "htgroup:ht01,ht02"
    echo "othergroup:report,tg"
    echo "######################################"
    echo ""
    echo " Tips: 如果要选择ck01，则输入ck01即可，如果输入ck组，输入ckgroup即可,如果要退出当前脚本输入exit"
    echo " Tips: 退回上一步请输入back"
    read -p "请输入你的选择:" vmname

    case "$vmname" in
        ck01|ck02|ck03|ck04|sj01|sj02|sj03|sj04|dd01|dd02|dd03|dd04|report|tg|ht01|ht02)
            job_tomcat $vmname
            ;;
        ckgroup|sjgroup|htgroup|ddgroup|othergroup)
            job2_tomcat $vmname
            ;;
        exit)
            exit 0;
            ;;
        back)
            clear
            echo ""
            echo "Tips: 欢迎使用Tomcat项目服务管理工具,您需要预先安装pssh工具，以及配置好ssh免密登录到服务器"
            main
            ;;
        *)
            echo "请输入的选择!"
            HOST
            ;;
    esac
}

function job_tomcat ()
{
    echo ""
    echo "############ 动作 ###############"
    echo "  1. 查看当前tomcat7状态"
    echo "  2. 关闭tomcat7"
    echo "  3. 启动tomcat7"
    echo "  4. 重启tomcat7"
    echo "  5. 获取最近200行日志"
    echo "  6. 重新选择主机"
    echo "  7. 回到顶层目录"
    echo ""
    echo "#################################"

    read -p "请输入你的选择:" service_tomcat

    case $service_tomcat in
        1)
        pssh -H $vmname -i "ps aux | grep tomcat"
        job_tomcat
        ;;
        2)
        pssh -H $vmname -i "service tomcat7 stop"
        # tips： 下面grep的字符串要和你的tomcat项目名称契合
        pssh -H $vmname -i "ps aux | grep tomcat7 | awk '{print $2}' | xargs kill -9 "
        # tips: 下面用到的路径为绝对路径，请更改为自己tomcat的目录，也可以在前面增加自定义变量
        pssh -H $vmname -i "rm -rf /tomcat7/work/*"
        pssh -H $vmname -i "rm -rf /tomcat7/logs/*"
        pssh -H $vmname -i "rm -rf /tomcat7/temp/*"
        job_tomcat
        ;;
        3)
        pssh -H $vmname -i "service tomcat7 start"
        job_tomcat
        ;;
        4)
        pssh -H $vmname -i "service tomcat7 stop"
        # tips： 下面grep的字符串要和你的tomcat项目名称契合
        pssh -H $vmname -i "ps aux | grep tomcat7 | awk '{print $2}' | xargs kill -9 "
        # tips: 下面用到的路径为绝对路径，请更改为自己tomcat的目录，也可以在前面增加自定义变量
        pssh -H $vmname -i "rm -rf /tomcat7/work/*"
        pssh -H $vmname -i "rm -rf /tomcat7/logs/*"
        pssh -H $vmname -i "rm -rf /tomcat7/temp/*"
        sleep 1
        pssh -H $vmname -i "service tomcat7 start"
        job_tomcat
        ;;
        5)
        pssh -H $vmname -i "tail -n 200 /tomcat7/logs/catalina.out"
        job_tomcat
        ;;
        6)
        echo ""
        HOST
        ;;
        7)
        clear
        echo ""
        echo "Tips: 欢迎使用Tomcat项目服务管理工具,您需要预先安装pssh工具，以及配置好ssh免密登录到服务器"
        main
        ;;
        *)
        echo "请输入正确的选项！"
        job_tomcat
        ;;
    esac
}

function job2_tomcat ()
{
    echo ""
    echo "############ 动作 ###############"
    echo "  1. 查看当前tomcat7状态"
    echo "  2. 关闭tomcat7"
    echo "  3. 启动tomcat7"
    echo "  4. 重启tomcat7"
    echo "  5. 获取最近200行日志"
    echo "  6. 重新选择主机"
    echo "  7. 回到顶层目录"
    echo ""
    echo "################################"

    read -p "请输入你的选择:" service_tomcat

    case $service_tomcat in
        1)
        pssh -h $HostDIR/$vmname -i "ps aux | grep tomcat"
        job2_tomcat
        ;;
        2)
        pssh -h $HostDIR/$vmname -i "service tomcat7 stop"
        # tips： 下面grep的字符串要和你的tomcat项目名称契合
        pssh -h $HostDIR/$vmname -i "ps aux | grep tomcat7 | awk '{print $2}' | xargs kill -9 "
        # tips: 下面用到的路径为绝对路径，请更改为自己tomcat的目录，也可以在前面增加自定义变量
        pssh -h $HostDIR/$vmname -i "rm -rf /tomcat7/work/*"
        pssh -h $HostDIR/$vmname -i "rm -rf /tomcat7/logs/*"
        pssh -h $HostDIR/$vmname -i "rm -rf /tomcat7/temp/*"
        job2_tomcat
        ;;
        3)
        pssh -h $HostDIR/$vmname -i "service tomcat7 start"
        job2_tomcat
        ;;
        4)
        pssh -h $HostDIR/$vmname -i "service tomcat7 stop"
        # tips： 下面grep的字符串要和你的tomcat项目名称契合
        pssh -h $HostDIR/$vmname -i "ps aux | grep tomcat7 | awk '{print $2}' | xargs kill -9 "
        # tips: 下面用到的路径为绝对路径，请更改为自己tomcat的目录，也可以在前面增加自定义变量
        pssh -h $HostDIR/$vmname -i "rm -rf /tomcat7/work/*"
        pssh -h $HostDIR/$vmname -i "rm -rf /tomcat7/logs/*"
        pssh -h $HostDIR/$vmname -i "rm -rf /tomcat7/temp/*"
        sleep 1
        pssh -h $HostDIR/$vmname -i "service tomcat7 start"
        job2_tomcat
        ;;
        5)
        pssh -h $HostDIR/$vmname -i "tail -n 200 /tomcat7/logs/catalina.out"
        job2_tomcat
        ;;
        6)
        echo ""
        HOST
        ;;
        7)
        clear
        echo ""
        echo "Tips: 欢迎使用Tomcat项目服务管理工具,您需要预先安装pssh工具，以及配置好ssh免密登录到服务器"
        main
        ;;
        *)
        echo "请输入正确的选项！"
        job_tomcat
        ;;
    esac
}

function HOST2()
{
    echo ""
    echo "############ Host List ###############"
    echo "ckgroup:ck01,ck02,ck03,ck04"
    echo "sjgroup:sj01,sj02,sj03,sj04"
    echo "ddgroup:dd01,dd02,dd03,dd04"
    echo "htgroup:ht01,ht02"
    echo "othergroup:report,tg"
    echo "######################################"
    echo ""
# 确认是否所有项目包发布后立即启动
    echo -e "\033[7m 更新订单服务器的war包时，会自动启动tomcat程序，为了释放war包，修改order.no，请设置war包内order.no＝0 ,其它服务器tomcat不会自启动，请使用命令操作 \033[0m"
    echo " Tips: 如果要选择ck01，则输入ck01即可，如果输入ck组，输入ckgroup即可,如果要退出当前脚本输入exit"
    echo " Tips: 退回上一步请输入back"
    read -p "请输入你的选择:" vmname
    case "$vmname" in
        ck01|ck02|ck03|ck04|sj01|sj02|sj03|sj04|dd01|dd02|dd03|dd04|report|tg|ht01|ht02)
            read -p "请输入war包的名称,例如:dzcx_ck.war :" warname
            pscp_tomcat $vmname $warname
            ;;
        ckgroup|sjgroup|htgroup|othergroup)
            read -p "请输入war包的名称,例如:dzcx_ck.war :" warname
            pscp2_tomcat $vmname $warname
            ;;
        ddgroup)
            read -p "请输入war包的名称,例如:dzcx_ck.war :" warname
            pscp3_tomcat $vmname $warname
            ;;
        exit)
            exit 0;
            ;;
        back)
            clear
            echo ""
            echo "Tips: 欢迎使用Tomcat项目服务管理工具,您需要预先安装pssh工具，以及配置好ssh免密登录到服务器"
            main
            ;;
        *)
            echo "请输入的选择!"
            HOST
            ;;
    esac
}

function pscp_tomcat ()
{
    # single host
    pscp.pssh -H $vmname /warfolder/"$warname" /tomcat7/webapps/
    HOST2
}

function pscp2_tomcat ()
{
    # group
    pscp.pssh -h $HostDIR/$vmname /warfolder/"$warname" /tomcat7/webapps/
    HOST2
}

function pscp3_tomcat ()
{
    # group dd 因为订单需要修改服务器编号
    pscp.pssh -h $HostDIR/$vmname /warfolder/"$warname" /tomcat7/webapps/
    pssh -h $vmname -i "service tomcat7 start"
    sleep 10
    pssh -H dd02 "sed -i 's/order.no=0/order.no=1/g' /tomcat7/webapps/dzcx_socket/WEB-INF/classes/base.properties"
    pssh -H dd03 "sed -i 's/order.no=0/order.no=2/g' /tomcat7/webapps/dzcx_socket/WEB-INF/classes/base.properties"
    pssh -H dd04 "sed -i 's/order.no=0/order.no=3/g' /tomcat7/webapps/dzcx_socket/WEB-INF/classes/base.properties"
    HOST2
}

function main ()
{
echo ""
echo "######################################"
echo ""
echo "#  1. 更新war包"
echo "#  2. 管理tomcat7"
echo "#  3. 管理mysql"
echo "#  4. 管理redis"
echo "#  5. 同步服务器时间"
echo "#  6. 清理当前屏幕"
echo "#  7. 退出"
echo ""
echo "######################################"

read -p "请输入你的选择:" num

case "$num" in
    1)
        HOST2
        ;;
    2)
        HOST
        ;;
    3)
        echo "该功能暂未开放"
        ;;
    4)
        echo "该功能暂未开放"
        ;;
    5)
        pssh -h $HostDIR/allhost -i "service ntpd restart"
        ;;
    6)
        clear
        echo ""
        echo "Tips: 欢迎使用Tomcat项目服务管理工具,您需要预先安装pssh工具，以及配置好ssh免密登录到服务器"
        main
        ;;
    7)
        exit 0
        ;;
    *)
        echo "请输入正确的数值！"
        main
    ;;
esac

}

# --------------------------------- main -------------------------------------------------

clear

echo ""
echo "Tips: 欢迎使用Tomcat项目服务管理工具,您需要预先安装pssh工具，以及配置好ssh免密登录到服务器"
command -v pssh > /dev/null 2>&1

if [ $? -eq 0 ]
then
    main
else
    echo -e "\033[07m"
    echo -e "系统检测到您还没安装pssh，请预先安装pssh"
    echo "yum install -y epel-release"
    echo "yum install -y pssh"
    echo "安装成功请重新运行此脚本"
    echo -e "\033[0m"

fi


```
