---
layout: doc
aside: true
sidebar: true
---

<script setup>
import { data } from '../.vitepress/theme/data/blog.data'
</script>

# Latest Posts

<div class="posts-list">
  <div v-for="post in data.latestPosts" :key="post.url" class="post-item">
    <span class="post-date">{{ post.date }}</span>
    <a :href="post.url" class="post-title">{{ post.title }}</a>
  </div>
</div>

## Statistics

- Total Posts: {{ data.statistics.totalPosts }}
- Years of Writing: {{ data.statistics.totalYears }}

<div class="actions">
  <a href="/pages/archives" class="action-link">View All Posts</a>
  <a href="/pages/tags" class="action-link">Browse by Tags</a>
</div>

<style scoped>
.posts-list {
  margin: 2rem 0;
}

.post-item {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin: 0.8rem 0;
}

.post-date {
  font-family: Monaco, monospace;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  min-width: 6.5rem;
}

.post-title {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.post-title:hover {
  color: var(--vp-c-brand);
}

.actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

.action-link {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.action-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .post-item {
    flex-direction: column;
    gap: 0.3rem;
  }

  .post-date {
    min-width: auto;
  }
}
</style>
