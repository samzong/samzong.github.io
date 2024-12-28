<script setup lang="ts">
import { projects } from "../../types/project";
import ProjectCard from "./ProjectCard.vue";
</script>

<template>
  <div class="projects-container">
    <div class="projects-header">
      <h1>My Projects</h1>
      <p class="projects-subtitle">
        Some of my open source projects are shown here.
      </p>
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
  padding: 60px 24px;
}

.projects-header {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h1 {
  font-size: 2.4em;
  font-weight: 700;
  background: linear-gradient(
    120deg,
    var(--vp-c-brand) 0%,
    var(--vp-c-brand-light) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 28px;
  padding: 8px 0;
  letter-spacing: -0.5px;
}

.projects-subtitle {
  color: var(--vp-c-text-2);
  font-size: 1.2em;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
  padding: 4px 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 32px;
  margin-top: 20px;
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (min-width: 1440px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .projects-container {
    padding: 48px 20px;
  }

  .projects-header {
    margin-bottom: 48px;
  }

  h1 {
    font-size: 2em;
    margin-bottom: 24px;
    padding: 6px 0;
  }

  .projects-subtitle {
    font-size: 1.1em;
    padding: 3px 20px;
    line-height: 1.7;
  }

  .projects-grid {
    gap: 24px;
  }
}

@media (max-width: 480px) {
  .projects-container {
    padding: 36px 16px;
  }

  h1 {
    font-size: 1.8em;
    margin-bottom: 20px;
    padding: 4px 0;
  }

  .projects-subtitle {
    font-size: 1em;
    padding: 2px 16px;
    line-height: 1.6;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
