---
title: Gitlab 发送企微机器人消息
tags: [Github]
---

- 企业微信机器人消息说明： [https://developer.work.weixin.qq.com/document/path/91770](https://developer.work.weixin.qq.com/document/path/91770)
- GitLab Webhook Event：   [https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html)

![image](images/resize,w_960,m_lfit_22f30921.jpg)

## Gitlab 配置

![image.png](images/resize,w_960,m_lfit_6113be51.png)
:::info
\=> 高级用法 开启鉴权
:::

```markdown
- 在 Gitlab 配置好之后 Secret token
- 在服务端接收推送时验证
```

## 实现中转站服务

:::warning
**基本需求说明：**

- 可以 接受  gitlab 的 event 推送
- 可以 发送 消息到微信服务器
- 稳定
  :::

我采用的方式，腾讯云函数；薅羊毛的方式

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
            "content": "实时新增用户反馈<font color=\"warning\">132 例，请相关同事注意。\n
             >类型:<font color=\"comment\">用户反馈
             >普通用户反馈:<font color=\"comment\">117 例
             >VIP 用户反馈:<font color=\"comment\">15 例"
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
        md_content += "## 文档站 <font color=\"info\">{} 通知：\n\n".format(resp['event'])
        md_content += "- 项目：[{}]({}) \n".format(resp['project_name'],resp['project_url'])
        md_content += "- 更新人：*{}* \n".format(resp['author'])
        md_content += "- 提交信息：{} \n".format(resp['commit_msg'])

    elif event_type == 'build':
        resp['author'] = data['user']['username']
        resp['project_name'] = data['repository']['name']
        resp['project_url'] = data['repository']['homepage']
        resp['commit_msg'] = data['commit']['message'].replace("\n", "")
        resp['build_status'] = data['build_status']
        resp['build_duration'] = int(data['build_duration']) + 1

        if resp['build_status'] == 'failed':
            md_content += "## 文档站 {} <font color=\"warning\">{} 通知：\n\n".format(resp['event'], resp['build_status'])
            md_content += "- 项目：[{}]({}) \n".format(resp['project_name'],resp['project_url'])
            md_content += "- 请 **{}** 关注最近提交的内容 \n".format(resp['author'])
            md_content += "- 提交信息：{} \n".format(resp['commit_msg'])

    msg_send_wecom(md_content)

    print("INFO: " + json.dumps(resp))
    return json.dumps(resp)

@app.route("/")
def index():
    return {"code": 200, "msg": "it's ok!"}

# 启动服务，监听 9000 端口，监听地址为 0.0.0.0
app.run(debug=IS_SERVERLESS != True, port=9000, host='0.0.0.0')

```

## 创建企微群机器人

成功创建机器人后，会获取到一个 用于推送消息的 webhook Key
![image.png](images/resize,w_960,m_lfit_bd956cb0.png)
:::info
\=> 高级用法 针对推送来源进行 IP 限制
:::
![image.png](images/resize,w_960,m_lfit_de79f111.png)

## 消息呈现展示

![image.png](images/resize,w_960,m_lfit_0e7b4b54.png)
