<script setup lang="ts">
import { type Project } from '../../types/project'
import { computed } from 'vue'

const props = defineProps<{
  project: Project
}>()

const isNew = computed(() => {
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  return new Date(props.project.createdAt) > oneYearAgo
})

const truncatedDescription = computed(() => {
  return props.project.description.length > 100
    ? props.project.description.slice(0, 100) + '...'
    : props.project.description
})

// 为不同类型的标签设置不同的颜色
const getTagColor = (tag: string) => {
  const tagColors: { [key: string]: string } = {
    'Vue3': '#42b883',
    'Vue': '#42b883',
    'React': '#61dafb',
    'TypeScript': '#3178c6',
    'JavaScript': '#f7df1e',
    'Node.js': '#339933',
    'Python': '#3776ab',
    'Go': '#00add8',
    'Rust': '#dea584',
    'Docker': '#2496ed',
    'Kubernetes': '#326ce5',
    'AWS': '#ff9900',
    'VitePress': '#646cff',
    'Blog': '#ff5722',
    'Web': '#1e88e5',
    'API': '#4caf50',
    'CLI': '#607d8b',
  }
  return tagColors[tag] || '#8e44ad' // 默认紫色
}

// 生成默认 logo 文本
const defaultLogoText = computed(() => {
  return project.name.split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>

<template>
  <div class="project-card">
    <div v-if="isNew" class="new-badge">NEW</div>
    <div class="card-header">
      <div class="logo-container">
        <img 
          v-if="project.logo"
          :src="project.logo" 
          :alt="project.name"
          class="project-logo"
        >
        <div v-else class="default-logo">
          {{ defaultLogoText }}
        </div>
      </div>
      <div class="header-content">
        <h3 class="project-title">{{ project.name }}</h3>
        <div class="project-tags">
          <span 
            v-for="tag in project.tags" 
            :key="tag" 
            class="project-tag"
            :style="{ backgroundColor: getTagColor(tag) }"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <p class="project-description">{{ truncatedDescription }}</p>
    <div class="project-actions">
      <div class="flex-spacer"></div>
      <a v-if="project.github" :href="project.github" target="_blank" class="action-button github" title="View on GitHub">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>
      <a v-if="project.website" :href="project.website" target="_blank" class="action-button website" title="Visit Website">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.new-badge {
  position: absolute;
  top: 15px;
  left: -30px;
  width: 100px;
  background: #ff3b30;
  color: white;
  text-align: center;
  padding: 3px 0;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.5px;
  transform: rotate(-45deg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.new-badge::before,
.new-badge::after {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  z-index: -1;
}

.new-badge::before {
  right: 100%;
}

.new-badge::after {
  left: 100%;
}

.card-header {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: flex-start;
}

.logo-container {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
}

.project-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.default-logo {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.header-content {
  flex: 1;
  min-width: 0;
  padding-top: 4px;
}

.project-title {
  font-size: 1.5em;
  margin: 0 0 12px;
  color: var(--vp-c-brand);
  font-weight: 600;
  line-height: 1.3;
}

.project-description {
  color: var(--vp-c-text-2);
  margin: 16px 0;
  font-size: 0.95em;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.project-tag {
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75em;
  transition: opacity 0.2s;
  font-weight: 500;
  line-height: 1.5;
}

.project-tag:hover {
  opacity: 0.9;
}

.project-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  justify-content: flex-end;
}

.flex-spacer {
  flex: 1;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  transition: all 0.2s;
}

.action-button:hover {
  color: white;
  transform: translateY(-2px);
}

.action-button.github:hover {
  background: #24292e;
}

.action-button.website:hover {
  background: var(--vp-c-brand);
}

.action-button svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style> 