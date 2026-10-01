# Sodayooo Portfolio

Personal portfolio landing page for [sodayooo.dpdns.org](https://sodayooo.dpdns.org/).

## Tech Stack

| Library | Purpose |
|---|---|
| [Vue 3](https://vuejs.org/) | UI framework (Composition API, `<script setup>`) |
| [Vite](https://vite.dev/) | Build tool and dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling via `@tailwindcss/vite` plugin |
| [GSAP](https://gsap.com/) + ScrollTrigger | Scroll-driven animations and timeline sequencing |
| [Lenis](https://lenis.darkroom.engineering/) | Smooth scroll engine synced with GSAP ticker |
| [Lucide Vue](https://lucide.dev/) | SVG icon components |
| [Three.js](https://threejs.org/) (CDN) | WebGL image carousel with custom shaders |
| [TypeScript](https://www.typescriptlang.org/) | Type checking via `vue-tsc` |

Some of the scroll animations and templates are from open source projects:

| Sources | Purpose |
|---|---|
| [Lenis](https://lenis.dev/templates) | Smooth scroll animations |
| [Ben Scott](https://benscott.dev) | Connecting dots background |
| [freefrontend](https://freefrontend.com/lenis-js/) | More free lenis scroll templates |


## Setup

```bash
npm install
npm run dev      # Dev server at localhost:5173
npm run build    # Production build to dist/
```

## Project Structure

```
src/
├── App.vue
├── main.ts
├── assets/main.css
├── composables/useSmoothScroll.ts
├── data/projects.ts
└── components/
    ├── PersonalInfo.vue            # Information section
    ├── Intro.vue                   # Scroll-driven video reveal
    ├── ProjectsSection.vue         # Pinned project showcase
    ├── ProjectFolderCard.vue       # Tabbed project card
    ├── TechStackSection.vue        # Skills grid
    ├── GalleryCarouselSection.vue  # WebGL photo carousel
    ├── TerminalSection.vue         # Interactive CLI emulator
    ├── AiDisclaimerSection.vue     # AI usage disclosure
    ├── ConnectingDotsBackground.vue # Animated particle background
    ├── ProximityDock.vue           # Sticky header navigation
    └── FooterSection.vue           # Footer with back-to-top
```
