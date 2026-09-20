<script setup lang="ts">
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import {
  ExternalLink, 
  Terminal, 
  Layers,
} from '@lucide/vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'

const { scrollTo } = useSmoothScroll()
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
    
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">

        <h1 class="hero-animate text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-3xl">
          Hi, I'm <span class="text-blue-400">Jhezriel Jay Barangan</span>.
        </h1>

        <p class="hero-animate text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          I am a Computer Engineering student passionate about systems engineering, computer networking, and practical web tools.
          I build personal projects for helping others, as a personal tool, or just for fun.
        </p>

        <div class="hero-animate flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full sm:w-auto">
          <button
            type="button"
            @click="scrollTo('#projects', { offset: -70 })"
            class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-11"
          >
            <span>Explore My Webapps</span>
            <Layers class="w-4 h-4" />
          </button>

          <a
            href="https://www.linkedin.com/in/jhezriel-barangan"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 active:bg-slate-700 text-slate-200 font-bold text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer min-h-11 shadow-xs"
          >
            <LinkedinIcon class="w-4 h-4 text-blue-400" />
            <span>LinkedIn Profile</span>
            <ExternalLink class="w-3.5 h-3.5 opacity-60" />
          </a>

          <button
            type="button"
            @click="scrollTo('#terminal', { offset: -70 })"
            class="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 hover:border-slate-500 text-slate-300 hover:text-white font-mono text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer min-h-11"
          >
            <Terminal class="w-3.5 h-3.5" />
            <span>Run CLI Shell</span>
          </button>
        </div>

      </div>
    </div>

  </section>
</template>
