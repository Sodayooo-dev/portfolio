export interface ProjectItem {
  id: string
  title: string
  category: 'labs' | 'tools' | 'gaming' | 'infra'
  badge: string
  badgeColor: 'blue' | 'emerald' | 'purple' | 'amber' | 'cyan' | 'rose'
  tagline: string
  description: string
  url: string
  github?: string
  tags: string[]
  status: string
  isExternal: boolean
  architecture: string
  keyFeatures: string[]
  accentColor: string
  accentBg: string
  accentBorder: string
  image: string
  imageAlt: string
}

export interface ServerNotification {
  id: string
  timestamp: string
  title: string
  category: string
  message: string
  read: boolean
}

export const projects: ProjectItem[] = [
  {
    id: 'ncii-css',
    title: 'NCII-CSS Virtual Assessment Lab',
    category: 'labs',
    badge: 'Flagship Simulator',
    badgeColor: 'blue',
    tagline: 'Interactive Computer Systems Servicing NC II Simulator',
    description: 'A hands-on training simulator built from scratch to help students practice for the TESDA Computer Systems Servicing NC II assessment exam. Recreates practical exam scenarios in the browser without requiring physical spare hardware or clean drives.',
    url: '/challenges/NCII-CSS',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Zustand', 'Interactive'],
    status: 'Live & Free',
    isExternal: false,
    accentColor: '#2563eb',
    accentBg: 'rgba(37, 99, 235, 0.08)',
    accentBorder: 'rgba(37, 99, 235, 0.3)',
    architecture: 'Full-stack client simulator with modular state machine for step-by-step practical exam tasks.',
    keyFeatures: [
      'BIOS boot priority setup & Drive 0 disk partitioning',
      'Windows OS installer workflow simulation',
      'Active Directory Domain Services (AD DS) tree and user creation',
      'DHCP scope configuration and DNS record assignment',
      'Interactive T-568A / T-568B RJ-45 modular jack cable crimper'
    ],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'NCII-CSS Assessment Simulator & Hardware Lab'
  },
  {
    id: 'whiteboard',
    title: 'Collaborative Online Whiteboard',
    category: 'tools',
    badge: 'Real-Time Webapp',
    badgeColor: 'emerald',
    tagline: 'Real-time Vector Canvas for Flowcharts & Diagrams',
    description: 'A web-based collaborative drawing board built for real-time brainstorming, study sessions, and quick architectural flowcharts without requiring user accounts or third-party sign-ins.',
    url: 'https://sodayooo.dpdns.org/whiteboard',
    github: 'https://github.com/sodayooo',
    tags: ['HTML5 Canvas', 'WebSockets', 'JavaScript', 'Node.js', 'Express'],
    status: 'Live Service',
    isExternal: true,
    accentColor: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.08)',
    accentBorder: 'rgba(16, 185, 129, 0.3)',
    architecture: 'Dual-buffer HTML5 2D Canvas with lightweight WebSocket room broadcasting.',
    keyFeatures: [
      'Low-latency stroke rendering with pen, shape, and text tools',
      'Real-time multi-cursor awareness across connected peers',
      'High-resolution PNG and SVG diagram export',
      'Instant sharable room links without authentication overhead'
    ],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Collaborative Online Vector Whiteboard'
  },
  {
    id: 'rdb-lab',
    title: 'PostgreSQL Relational DB Quiz & Lab',
    category: 'labs',
    badge: 'Interactive SQL Quiz',
    badgeColor: 'purple',
    tagline: 'Interactive SQL Sandbox for Midterm Exam Review',
    description: 'A dedicated database sandbox and challenge quiz created for the Elective 2 Relational Databases course. Allows students to practice SQL query formulation, table joins, aggregations, and schema constraints with instant verification.',
    url: 'https://sodayooo.dpdns.org/challenges/elective2-rdb/midterms/',
    github: 'https://github.com/sodayooo',
    tags: ['PostgreSQL', 'SQL', 'JavaScript', 'Tailwind CSS', 'Schema Design'],
    status: 'Live Challenge',
    isExternal: true,
    accentColor: '#8b5cf6',
    accentBg: 'rgba(139, 92, 246, 0.08)',
    accentBorder: 'rgba(139, 92, 246, 0.3)',
    architecture: 'In-browser query parser and evaluation engine providing immediate feedback on student SQL syntax.',
    keyFeatures: [
      'Interactive query console with syntax verification',
      'Visual table relationship view for foreign keys and indexes',
      'Scenario-based challenge modules for JOIN, GROUP BY, and HAVING clauses',
      'Automated result comparison against model solution datasets'
    ],
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'PostgreSQL Relational DB Sandbox & Quiz'
  },
  {
    id: 'gitea-server',
    title: 'Self-Hosted Gitea Git Server',
    category: 'tools',
    badge: 'Self-Hosted Service',
    badgeColor: 'amber',
    tagline: 'Lightweight Private Version Control on Ubuntu Linux',
    description: 'A personal Git server hosting private project repositories, documentation, and continuous delivery webhooks on a home-lab Linux server behind an Apache reverse proxy.',
    url: 'https://git.sodayooo.dpdns.org',
    github: 'https://github.com/sodayooo',
    tags: ['Gitea', 'Git', 'Ubuntu Linux', 'Apache', 'SSL / Certbot', 'DevOps'],
    status: 'Operational',
    isExternal: true,
    accentColor: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.08)',
    accentBorder: 'rgba(245, 158, 11, 0.3)',
    architecture: "Native Linux service daemon managed via Systemd, reverse-proxied through Apache with automated Let's Encrypt SSL certificates.",
    keyFeatures: [
      'Fast Git push/pull over secure HTTPS with custom domain',
      'Local webhook triggers for automated PM2 and webapp redeployment',
      'Integrated issue tracking, releases, and branch protection',
      'Full server telemetry monitoring with low memory footprint'
    ],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Self-Hosted Gitea Server on Ubuntu Linux'
  },
  {
    id: 'server-hosting',
    title: 'Home-Lab Server Infrastructure',
    category: 'infra',
    badge: 'Production Host',
    badgeColor: 'cyan',
    tagline: 'Self-Hosted Production Node & Community Game Server',
    description: 'A tuned Ubuntu Linux 24.04 home-lab server hosting Apache reverse proxy gateways, PM2 application runtimes, and a custom Fabric Minecraft multiplayer community node for friends.',
    url: '/minecraft/',
    github: 'https://github.com/sodayooo',
    tags: ['Ubuntu Linux', 'Apache Proxy', 'Certbot SSL', 'PM2 Daemons', 'Java Fabric'],
    status: 'Online 24/7',
    isExternal: false,
    accentColor: '#06b6d4',
    accentBg: 'rgba(6, 182, 212, 0.08)',
    accentBorder: 'rgba(6, 182, 212, 0.3)',
    architecture: "Dedicated Ubuntu 24.04 LTS host with automated systemd unit services, Apache virtualhost routing, and local cron backups.",
    keyFeatures: [
      'Apache VirtualHost reverse-proxy routing for port 3005 and static assets',
      'PM2 process management with automated zero-downtime reloads',
      "Automated Let's Encrypt SSL renewal via Certbot hooks",
      'High-performance Fabric 1.20.1 game node with Lithium & FerriteCore'
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Home-Lab Server Host & Minecraft Fabric Community Node'
  }
]

export const serverNotifications: ServerNotification[] = [
  {
    id: 'notif-1',
    timestamp: 'Recent',
    title: 'NCII-CSS Assessment Lab Active',
    category: 'Lab Release',
    message: 'Active Directory and DHCP scope challenge modules verified and running on port 3005.',
    read: false
  },
  {
    id: 'notif-2',
    timestamp: 'Today',
    title: 'Collaborative Whiteboard',
    category: 'Web App',
    message: 'WebSocket engine online at /whiteboard with multi-peer drawing support.',
    read: false
  },
  {
    id: 'notif-3',
    timestamp: 'Status',
    title: 'Server Gateway Healthy',
    category: 'Infrastructure',
    message: "Apache reverse proxy and Let's Encrypt SSL certificates operational for sodayooo.dpdns.org.",
    read: true
  }
]
