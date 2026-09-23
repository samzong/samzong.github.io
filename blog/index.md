---
layout: doc
aside: true
sidebar: true
title: Notes
---

<script setup>
import { data } from '../.vitepress/theme/data/blog.data'
</script>

# Notes

<div class="note-list">
  <a v-for="post in data.latestPosts" :key="post.url" class="note-row" :href="post.url">
    <time>{{ post.date }}</time>
    <span>{{ post.title }}</span>
  </a>
</div>

<p class="note-meta">{{ data.statistics.totalPosts }} posts · {{ data.statistics.totalYears }} years · <a href="/pages/archives">Archive</a> · <a href="/pages/tags">Tags</a></p>
