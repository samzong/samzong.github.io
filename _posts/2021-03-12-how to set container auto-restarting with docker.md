---
layout: post
title: how to set container auto-restarting with docker
tags:
  - Docker
category:
  - Docker
url: https://www.yuque.com/samzong/code/826f84f907c5084f1f84568afbce7984
---

## auto-restarting with docker

docker run --restart=always my-container

## disable auto-restarting with docker

docker update --restart=no my-container
