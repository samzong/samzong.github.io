---
title: Archives
description: 文章归档
aside: false
---

<script setup>
import { data as posts } from '../.vitepress/theme/archives.data.ts'
</script>

# 文章归档

<div v-for="(articles, year) in posts" :key="year" class="archives-year">
  <h2>{{ year }}</h2>
  <ul class="archives-list">
    <li v-for="post in articles" :key="post.url" class="archives-item">
      <span class="archives-date">{{ post.date }}</span>
      <a :href="post.url" class="archives-title">{{ post.title }}</a>
    </li>
  </ul>
</div>

<style scoped>
.archives-year {
  margin-bottom: 2rem;
}

.archives-list {
  list-style: none;
  padding: 0;
}

.archives-item {
  display: flex;
  align-items: baseline;
  margin: 0.5rem 0;
  line-height: 1.6;
}

.archives-date {
  color: var(--vp-c-text-2);
  font-family: Monaco, monospace;
  margin-right: 1rem;
  font-size: 0.9em;
}

.archives-title {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.archives-title:hover {
  color: var(--vp-c-brand);
}
</style>

