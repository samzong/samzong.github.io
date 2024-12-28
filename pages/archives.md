---
title: Archives
description: 文章归档
aside: true
layout: doc
---

<script setup>
import { data } from '../.vitepress/theme/data/archives.data'
import { ref, computed } from 'vue'

const years = computed(() => 
  Object.keys(data)
    .map(Number)
    .sort((a, b) => b - a)
    .map(String)
)
</script>

<div class="archives-wrapper">
  <div v-for="year in years" :key="year" class="year-section">
    <h2 :id="year">{{ year }}</h2>
    <ul class="post-list">
      <li v-for="post in data[year]" :key="post.url" class="post-item">
        <span class="post-date">{{ post.date.slice(5) }}</span>
        <a :href="post.url" class="post-title">{{ post.title }}</a>
      </li>
    </ul>
  </div>
</div>

<style scoped>
.archives-wrapper {
  padding-top: 1rem;
}

.year-section {
  margin-bottom: 3rem;
}

.year-section h2 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: var(--vp-c-brand);
  scroll-margin-top: 5rem;
}

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
  min-width: 5em;
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

