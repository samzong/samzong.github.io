---
title: Tags
description: 文章标签
outline: deep
---

<script setup>
import { ref, computed } from 'vue'
import { data } from '../.vitepress/theme/data/tags.data'

const searchQuery = ref('')
const filteredTags = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return query
    ? Object.fromEntries(
        Object.entries(data).filter(([tag]) => 
          tag.toLowerCase().includes(query)
        )
      )
    : data
})
</script>

<div class="tags-search">
  <input 
    v-model="searchQuery" 
    type="text" 
    placeholder="搜索标签..." 
    class="search-input"
  />
</div>

<div class="tags-wrapper">
  <div v-for="(posts, tag) in filteredTags" :key="tag" class="tag-section">
    <h2 :id="tag">{{ tag }} ({{ posts.length }})</h2>
    <ul class="tag-posts">
      <li v-for="post in posts" :key="post.url" class="tag-post-item">
        <a :href="post.url" class="tag-post-title">{{ post.title }}</a>
        <span class="tag-post-date">{{ post.date }}</span>
      </li>
    </ul>
  </div>
</div>

<style scoped>
.tags-search {
  position: sticky;
  top: calc(var(--vp-nav-height) + 16px);
  z-index: 10;
  background-color: var(--vp-c-bg);
  padding: 1rem 0;
  margin: -1rem 0 1rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.tag-section {
  margin-bottom: 3rem;
}

.tag-section h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  scroll-margin-top: 5rem;
}

.tag-posts {
  list-style: none;
  padding: 0;
}

.tag-post-item {
  margin: 0.8rem 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.tag-post-title {
  color: var(--vp-c-text-1);
  text-decoration: none;
  margin-right: 1rem;
  flex: 1;
}

.tag-post-title:hover {
  color: var(--vp-c-brand);
}

.tag-post-date {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
  font-family: Monaco, monospace;
}

@media (max-width: 960px) {
  .tag-post-item {
    flex-direction: column;
  }
  
  .tag-post-date {
    margin-top: 0.3rem;
  }
}
</style>

