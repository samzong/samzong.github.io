---
layout: page
title: "Friends"
description: "友链"
group: navigation
permalink: /friends.html
---

<h2 id="friends" itemprop="about">友链</h2>

欢迎[联系我](/about.html) 交换链接。<br/>

<ul>
{% for friend in site.data.friends %}
  <li>
    <a href="{{ friend.url }}">
      {{ friend.name }}
    </a>
    {% if friend.desc != '' %}
   <small>{{ friend.desc }}</small>
 {% endif %}
  </li>
{% endfor %}
</ul>
