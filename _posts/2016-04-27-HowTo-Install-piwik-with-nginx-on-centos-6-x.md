---
layout: post
title: HowTo Install piwik with nginx on centos 6.x
tags: 
    - Piwik
categories: 
    - OpenSource
    - Piwik
abbrlink: 57960
date: 2016-04-27 16:00:44
---


### This is my nginx config.
```
server {
	listen blog.ultraera.org:80;
	server_name blog.ultraera.org;

	location / {
		proxy_set_header	X-Real-IP $remote_addr;
		proxy_set_header	Host	$http_host;
		proxy_pass			http://127.0.0.1:2368;
	}
}

server {
	listen piwik.ultraera.org:80;
	server_name piwik.ultraera.org;

	location / {
		proxy_set_header	X-Real-IP $remote_addr;
		proxy_set_header	Host	$http_host;
		proxy_pass			http://127.0.0.1:2080;
	}
}

```
