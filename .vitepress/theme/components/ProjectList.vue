<script setup lang="ts">
import { projects } from '../../types/project'
import ProjectCard from './ProjectCard.vue'
</script>

<template>
  <div class="projects-container">
    <h1>My Projects</h1>
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
  padding: 20px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

h1 {
  text-align: center;
  color: var(--vp-c-brand);
  margin-bottom: 40px;
}
</style> 