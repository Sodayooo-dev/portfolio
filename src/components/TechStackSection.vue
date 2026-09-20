<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Cpu, Terminal, Database, Code, Globe, Shield } from '@lucide/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    name: 'C++',
    badge: 'Core Programming',
    description: 'Basic Programming Logic and Design',
    context: 'Studied for basic programming algorithm implementations.',
    color: 'text-blue-400',
    bg: 'bg-blue-950/60 border-blue-900',
    icon: Code
  },
  {
    name: 'Java',
    badge: 'OOP and DSAA',
    description: 'Object Oriented Programming and Data Structures and Algorithm',
    context: 'Studied Java for basic OOP and DSAA. Currently only knows the basics',
    color: 'text-amber-400',
    bg: 'bg-amber-950/60 border-amber-900',
    icon: Cpu
  },
  {
    name: 'Python',
    badge: 'Data Analysis and Frameworks',
    description: 'Data Analysis using Pandas, Numpy, and Matplotlib.',
    context: 'Current main language for development and studies',
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/60 border-emerald-900',
    icon: Terminal
  },
  {
    name: 'PostgreSQL & SQL',
    badge: 'Relational Databases',
    description: 'Relational schema design, normalization, multi-table joins, subqueries, and constraint enforcement.',
    context: 'Powers the Elective 2 interactive database lab and NCII-CSS persistent data.',
    color: 'text-purple-400',
    bg: 'bg-purple-950/60 border-purple-900',
    icon: Database
  },
  {
    name: 'HTML5, Tailwind, Vue',
    badge: 'Frontend Systems',
    description: 'Semantic markup, modern flex/grid layouts, responsive breakpoints, and custom CSS interactions.',
    context: 'Frontend foundation used for this portfolio and NCII-CSS Simulator.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-950/60 border-cyan-900',
    icon: Globe
  },
  {
    name: 'Django REST Framework and JWT',
    badge: 'API Development',
    description: 'API Development and API testing',
    context: 'Currently taking lessons for API development and backends.',
    color: 'text-rose-400',
    bg: 'bg-rose-950/60 border-rose-900',
    icon: Shield
  }
]

let techCtx: gsap.Context | null = null

onMounted(() => {
  techCtx = gsap.context(() => {
    gsap.from('#tech-stack .tech-header-anim', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '#tech-stack', start: 'top 85%', toggleActions: 'play none none reverse' }
    })
    gsap.from('#tech-stack .tech-card-anim', {
      y: 35, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: '#tech-stack .tech-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
    })
  })
})

onUnmounted(() => {
  techCtx?.revert()
  techCtx = null
})
</script>

<template>
  <section id="tech-stack" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
    
    <div class="tech-header-anim space-y-1">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
        Tech Stack &amp; Practical Skills
      </h2>
      <p class="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
        Languages, databases, and server environments I use to build working tools. Focused on real project implementation.
      </p>
    </div>

    <div class="tech-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      <div 
        v-for="skill in skills" 
        :key="skill.name"
        class="tech-card-anim p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="p-2.5 rounded-xl border" :class="skill.bg">
              <component :is="skill.icon" class="w-5 h-5" :class="skill.color" />
            </div>
            <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {{ skill.badge }}
            </span>
          </div>

          <div>
            <h3 class="text-base sm:text-lg font-bold text-white">
              {{ skill.name }}
            </h3>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
              {{ skill.description }}
            </p>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 leading-relaxed">
          <strong class="text-slate-200">Application:</strong> {{ skill.context }}
        </div>
      </div>
    </div>

  </section>
</template>
