<script setup lang="ts">
import { ref } from 'vue'
import type { ProjectItem } from '@/data/projects'
import { ExternalLink, CheckCircle2, Cpu, ArrowRight } from '@lucide/vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'

defineProps<{ project: ProjectItem }>()

const activeTab = ref<'overview' | 'modules' | 'architecture'>('overview')

const cardRef = ref<HTMLElement | null>(null)
const rotateX = ref(0)
const rotateY = ref(0)
const isHovered = ref(false)

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  rotateX.value = ((centerY - (e.clientY - rect.top)) / centerY) * 4.5
  rotateY.value = (((e.clientX - rect.left) - centerX) / centerX) * 4.5
}

function handleMouseEnter() { isHovered.value = true }

function handleMouseLeave() {
  isHovered.value = false
  rotateX.value = 0
  rotateY.value = 0
}
</script>

<template>
  <div 
    ref="cardRef"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :style="{
      transform: isHovered 
        ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)` 
        : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
    }"
    class="project-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-400/50 flex flex-col justify-between transition-shadow duration-300"
  >
    <div>

      <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors leading-snug">
        {{ project.title }}
      </h3>
      <p class="text-xs font-mono text-blue-600 dark:text-blue-400 mb-3">
        {{ project.tagline }}
      </p>

      <div class="flex items-center space-x-1 border-b border-slate-100 dark:border-slate-800 pb-2 mb-3 text-xs font-medium">
        <button
          type="button"
          @click="activeTab = 'overview'"
          class="px-2.5 py-1 rounded-md transition-colors cursor-pointer"
          :class="activeTab === 'overview' 
            ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold' 
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'"
        >
          Overview
        </button>

        <button
          type="button"
          @click="activeTab = 'modules'"
          class="px-2.5 py-1 rounded-md transition-colors cursor-pointer"
          :class="activeTab === 'modules' 
            ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold' 
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'"
        >
          Key Modules
        </button>

        <button
          type="button"
          @click="activeTab = 'architecture'"
          class="px-2.5 py-1 rounded-md transition-colors cursor-pointer"
          :class="activeTab === 'architecture' 
            ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold' 
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'"
        >
          Architecture
        </button>
      </div>

      <div class="min-h-[100px] mb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">

        <div v-if="activeTab === 'overview'">
          <p>{{ project.description }}</p>
        </div>

        <div v-else-if="activeTab === 'modules'" class="space-y-1.5">
          <div 
            v-for="feature in project.keyFeatures.slice(0, 3)" 
            :key="feature"
            class="flex items-start space-x-2 text-xs"
          >
            <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{{ feature }}</span>
          </div>
        </div>

        <div v-else-if="activeTab === 'architecture'" class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div class="flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 font-bold">
            <Cpu class="w-3.5 h-3.5" />
            <span>System Spec</span>
          </div>
          <p class="text-[11px] leading-relaxed">{{ project.architecture }}</p>
        </div>

      </div>
    </div>

    <div>

      <div class="flex flex-wrap gap-1.5 mb-4">
        <span 
          v-for="tag in project.tags" 
          :key="tag"
          class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
        >
          {{ tag }}
        </span>
      </div>

      <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between min-h-[44px] gap-2">
        <a 
          v-if="project.available"
          :href="project.url" 
          :target="project.isExternal ? '_blank' : '_self'"
          :rel="project.isExternal ? 'noopener noreferrer' : ''"
          class="inline-flex items-center space-x-1.5 py-2 px-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-xs font-bold text-blue-600 dark:text-blue-400 transition-colors min-h-[44px]"
        >
          <span>Open Webapp</span>
          <ExternalLink v-if="project.isExternal" class="w-3.5 h-3.5" />
          <ArrowRight v-else class="w-3.5 h-3.5" />
        </a>

        <a 
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center min-w-[44px] min-h-[44px]"
          title="View Source on GitHub"
          aria-label="View Source on GitHub"
        >
          <GithubIcon class="w-4 h-4" />
        </a>
      </div>
    </div>

  </div>
</template>
