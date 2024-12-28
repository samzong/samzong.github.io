---
layout: doc
aside: true
sidebar: false

---

<script setup>
import { data } from '../.vitepress/theme/data/blog.data'
</script>

# Blog Posts

## Latest Posts

<ul class="post-list">
  <li v-for="post in data.latestPosts" :key="post.url" class="post-item">
    <span class="post-date">{{ post.date }}</span>
    <a :href="post.url" class="post-title">{{ post.title }}</a>
  </li>
</ul>

## Statistics

- Total Posts: {{ data.statistics.totalPosts }}
- Years of Writing: {{ data.statistics.totalYears }}

<style scoped>
.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  margin: 0.8rem 0;
  display: flex;
  align-items: baseline;
}

.post-date {
  color: var(--vp-c-text-2);
  font-family: Monaco, monospace;
  font-size: 0.9em;
  margin-right: 1rem;
  min-width: 7em;
}

.post-title {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.post-title:hover {
  color: var(--vp-c-brand);
}

@media (max-width: 960px) {
  .post-item {
    flex-direction: column;
  }
  
  .post-date {
    margin-bottom: 0.3rem;
  }
}
</style>
