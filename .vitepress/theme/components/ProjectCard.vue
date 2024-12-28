<script setup lang="ts">
import { type Project } from "../../types/project";
import { computed } from "vue";
import { useRouter } from "vitepress";

const router = useRouter();
const props = defineProps<{
  project: Project;
}>();

const navigateToDoc = () => {
  router.go(props.project.docPath);
};

// 判断项目是否是新项目, 如果项目创建时间超过1个月, 则不显示新项目标签
const isNew = computed(() => {
  const oneYearAgo = new Date();
  oneYearAgo.setMonth(oneYearAgo.getMonth() - 1);
  return new Date(props.project.createdAt) > oneYearAgo;
});

const truncatedDescription = computed(() => {
  const maxLength = 80;
  return props.project.description.length > maxLength
    ? props.project.description.slice(0, maxLength) + "..."
    : props.project.description;
});

const MAX_VISIBLE_TAGS = 3;

const visibleTags = computed(() => {
  return props.project.tags.slice(0, MAX_VISIBLE_TAGS);
});

const remainingTagsCount = computed(() => {
  return Math.max(0, props.project.tags.length - MAX_VISIBLE_TAGS);
});

// 为不同类型的标签设置不同的颜色
const getTagColor = (tag: string) => {
  const tagColors: { [key: string]: string } = {
    Vue3: "#42b883",
    Vue: "#42b883",
    React: "#61dafb",
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    "Node.js": "#339933",
    Python: "#3776ab",
    Go: "#00add8",
    Rust: "#dea584",
    Docker: "#2496ed",
    Kubernetes: "#326ce5",
    AWS: "#ff9900",
    VitePress: "#646cff",
    Blog: "#ff5722",
    Web: "#1e88e5",
    API: "#4caf50",
    CLI: "#607d8b",
  };
  return tagColors[tag] || "#8e44ad"; // 默认紫色
};

// 生成默认 logo 文本
const defaultLogoText = computed(() => {
  return props.project.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});
</script>

<template>
  <div class="project-card" @click="navigateToDoc">
    <div v-if="isNew" class="new-badge">NEW</div>
    <div class="card-content">
      <div class="card-header">
        <div class="logo-container">
          <img
            v-if="project.logo"
            :src="project.logo"
            :alt="project.name"
            class="project-logo"
          />
          <div v-else class="default-logo">
            {{ defaultLogoText }}
          </div>
        </div>
        <div class="header-content">
          <h3 class="project-title">{{ project.name }}</h3>
          <div class="project-tags">
            <span
              v-for="tag in visibleTags"
              :key="tag"
              class="project-tag"
              :style="{ backgroundColor: getTagColor(tag) }"
            >
              {{ tag }}
            </span>
            <span v-if="remainingTagsCount > 0" class="tags-more">
              +{{ remainingTagsCount }}
            </span>
          </div>
        </div>
      </div>
      <p class="project-description">{{ truncatedDescription }}</p>
      <div class="project-actions" @click.stop>
        <div class="flex-spacer"></div>
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          class="action-button github"
          title="View on GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>
        <a
          v-if="project.website"
          :href="project.website"
          target="_blank"
          class="action-button website"
          title="Visit Website"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  backdrop-filter: blur(12px);
  height: 100%;
  display: flex;
  flex-direction: column;
  max-height: 280px;
  cursor: pointer;
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 4px var(--vp-c-brand-light);
}

.dark .project-card {
  background: rgba(36, 36, 36, 0.8);
  border-color: rgba(82, 82, 89, 0.48);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.dark .project-card:hover {
  background: rgba(36, 36, 36, 0.9);
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), 0 2px 4px var(--vp-c-brand);
}

.new-badge {
  position: absolute;
  top: 12px;
  left: -35px;
  width: 120px;
  background: linear-gradient(45deg, #ff3b30, #ff9500);
  color: white;
  text-align: center;
  padding: 5px 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  transform: rotate(-45deg);
  box-shadow: 0 2px 8px rgba(255, 59, 48, 0.3);
  z-index: 1;
}

.new-badge::before,
.new-badge::after {
  content: "";
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
  gap: 16px;
  margin-bottom: 12px;
  align-items: flex-start;
}

.logo-container {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.project-card:hover .logo-container {
  transform: scale(1.05);
}

.project-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.default-logo {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    var(--vp-c-brand) 0%,
    var(--vp-c-brand-light) 100%
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.header-content {
  flex: 1;
  min-width: 0;
  padding-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.project-title {
  font-size: 1.4em;
  margin: 0;
  background: linear-gradient(
    120deg,
    var(--vp-c-brand) 0%,
    var(--vp-c-brand-light) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
  line-height: 1.3;
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-card:hover .project-title {
  transform: translateX(4px);
}

.project-description {
  color: var(--vp-c-text-2);
  margin: 12px 0;
  font-size: 0.95em;
  line-height: 1.5;
  flex-grow: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.project-tags {
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  overflow: hidden;
  align-items: center;
  height: 24px;
}

.project-tag {
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.75em;
  transition: all 0.2s ease;
  font-weight: 600;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
}

.project-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.tags-more {
  color: var(--vp-c-text-2);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.75em;
  font-weight: 600;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  height: 22px;
}

.project-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  justify-content: flex-end;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 16px;
  position: relative;
  z-index: 1;
}

.flex-spacer {
  flex: 1;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--vp-c-divider);
  opacity: 0.9;
}

.action-button.disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.dark .action-button {
  background: rgba(50, 50, 50, 0.8);
  border-color: rgba(82, 82, 89, 0.48);
}

.action-button:not(.disabled):hover {
  color: white;
  transform: translateY(-3px);
  opacity: 1;
}

.action-button.github:not(.disabled):hover {
  background: #24292e;
  border-color: #24292e;
  box-shadow: 0 4px 12px rgba(36, 41, 46, 0.25);
}

.action-button.website:not(.disabled):hover {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.25);
}

.action-button svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
  transition: transform 0.3s ease;
}

.action-button:hover svg {
  transform: scale(1.1);
}
</style>
