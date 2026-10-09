<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import ProximityDock from '@/components/ProximityDock.vue'
import PersonalInfo from '@/components/PersonalInfo.vue'
import Intro from '@/components/Intro.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import TechStackSection from '@/components/TechStackSection.vue'
import GalleryCarouselSection from '@/components/GalleryCarouselSection.vue'
import TerminalSection from '@/components/TerminalSection.vue'
import ConnectingDotsBackground from '@/components/ConnectingDotsBackground.vue'
import FooterSection from '@/components/FooterSection.vue'

const { init, destroy } = useSmoothScroll()

//Wao so iniinspect mo talaga code ko?

onMounted(() => {
  init()
})

onUnmounted(() => {
  destroy()
})
</script>

<template>
  <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-x-clip font-sans antialiased">

    <ConnectingDotsBackground />

    <ProximityDock />

    <main id="main-content" class="relative z-10 flex-1 space-y-6 sm:space-y-10">
      <PersonalInfo />
      <Intro />
      <ProjectsSection />
      <TechStackSection />
      <GalleryCarouselSection />
      <TerminalSection />
    </main>

    <FooterSection />

  </div>
</template>
