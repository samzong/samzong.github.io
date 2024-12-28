<script setup lang="ts">
import { projects } from '../../types/project'
import ProjectCard from './ProjectCard.vue'
</script>

<template>
  <div class="projects-container">
    <div class="projects-header">
      <h1>My Projects</h1>
      <p class="projects-subtitle">这里展示了我的一些开源项目，包括个人项目和工具库。</p>
    </div>
    <div class="projects-grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :project="project"
      />
    </div>
  </div>
</template>

<style scoped>
.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

.projects-header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-size: 2em;
  font-weight: 600;
  background: linear-gradient(120deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 16px;
}

.projects-subtitle {
  color: var(--vp-c-text-2);
  font-size: 1.1em;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 20px;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .projects-container {
    padding: 20px 16px;
  }

  h1 {
    font-size: 1.8em;
  }

  .projects-subtitle {
    font-size: 1em;
    padding: 0 16px;
  }
}
</style> 