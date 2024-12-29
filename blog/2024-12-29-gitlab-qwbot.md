---
title: Gitlab 发送企微机器人消息
tags:
  - GitLab
date: 2024-12-29 23:00:20
toc: "true"
---

# Gitlab 发送企微机器人消息

- 企业微信机器人消息说明： [https://developer.work.weixin.qq.com/document/path/91770](https://developer.work.weixin.qq.com/document/path/91770)
- GitLab Webhook Event： [https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html)

![](../images/Pasted%20image%2020241229233937.png)

## Gitlab 配置

![](../images/Pasted%20image%2020241229233952.png)

:::info
=> 高级用法 开启鉴权
:::

## 实现中转站服务

基本需求说明：

- 可以 接受 gitlab 的 event 推送
- 可以 发送 消息到微信服务器
- 稳定

我采用的方式， 腾讯云函数；薅羊毛的方式，云函数代码如下：

```python
import os
import json
from flask import Flask, jsonify, render_template, request, url_for, send_from_directory
from werkzeug.utils import secure_filename
import requests

IS_SERVERLESS = bool(os.environ.get('SERVERLESS'))
print(IS_SERVERLESS)

app = Flask(__name__)

# send_msg_wecom
def msg_send_wecom(md_content):
    """msg_send_wecom
    {
        "msgtype": "markdown",
        "markdown": {
            "content": "实时新增用户反馈<font color=\"warning\">132例</font>，请相关同事注意。\n
             >类型:<font color=\"comment\">用户反馈</font>
             >普通用户反馈:<font color=\"comment\">117例</font>
             >VIP用户反馈:<font color=\"comment\">15例</font>"
        }
    }
    """

    url = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key="

    webhooks = ["xxxxxxxxxxxxxxxxxxxxxxxxxxx"] # 多个 webhook 需要推送时
    headers = {'Content-Type': 'application/json'}

    message = {
        "msgtype": "markdown",
        "markdown": {
            "content": md_content
            }
        }

    for webhook in webhooks:
        try:
            requests.post(url=url+webhook, headers=headers, json=message)
        except Exception as e:
            print(e)


@app.route("/from_gitlab_webhook", methods=['POST'])
def say_hello():
    data = request.get_json()
    event_type = data['object_kind']

    resp = {
        'event': event_type,
        }

    md_content = ""

    if event_type == 'push':
        resp['commit_msg'] = data['commits'][0]['message'].replace("\n", "")
        resp['author'] = data['user_username']
        resp['project_name'] = data['project']['name']
        resp['project_url'] = data['project']['web_url']

        # fit md_content
        md_content += "## 文档站 <font color=\"info\">{}</font> 通知: \n\n".format(resp['event'])
        md_content += "- 项目: [{}]({}) \n".format(resp['project_name'],resp['project_url'])
        md_content += "- 更新人: *{}* \n".format(resp['author'])
        md_content += "- 提交信息: {} \n".format(resp['commit_msg'])

    elif event_type == 'build':
        resp['author'] = data['user']['username']
        resp['project_name'] = data['repository']['name']
        resp['project_url'] = data['repository']['homepage']
        resp['commit_msg'] = data['commit']['message'].replace("\n", "")
        resp['build_status'] = data['build_status']
        resp['build_duration'] = int(data['build_duration']) + 1

        if resp['build_status'] == 'failed':
            md_content += "## 文档站 {} <font color=\"warning\">{}</font> 通知: \n\n".format(resp['event'], resp['build_status'])
            md_content += "- 项目: [{}]({}) \n".format(resp['project_name'],resp['project_url'])
            md_content += "- 请 **{}** 关注最近提交的内容 \n".format(resp['author'])
            md_content += "- 提交信息: {} \n".format(resp['commit_msg'])

    msg_send_wecom(md_content)

    print("INFO: " + json.dumps(resp))
    return json.dumps(resp)

@app.route("/")
def index():
    return {"code": 200, "msg": "it's ok!"}

# 启动服务，监听 9000 端口，监听地址为 0.0.0.0
app.run(debug=IS_SERVERLESS != True, port=9000, host='0.0.0.0')
```

## 企微群机器人

成功创建机器人后，会获取到一个 用于推送消息的 webhook Key

![](../images/Pasted%20image%2020241229234136.png)

支持对群进行来源 IP 限制

![](../images/Pasted%20image%2020241229234158.png)

## 消息呈现样式

![](../images/Pasted%20image%2020241229234210.png)
