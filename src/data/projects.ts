//Wao pati ito binuksan

export interface ProjectItem {
  id: string
  title: string
  category: 'labs' | 'tools' | 'gaming' | 'infra' | 'software'
  tagline: string
  description: string
  url: string
  github?: string
  tags: string[]
  isExternal: boolean
  available: boolean
  architecture: string
  keyFeatures: string[]
  accentColor: string
  accentBg: string
  accentBorder: string
  image: string
  imageAlt: string
}

export const projects: ProjectItem[] = [
  {
    id: 'ncii-css',
    title: 'NCII-CSS Virtual Assessment Lab',
    category: 'labs',
    tagline: 'Computer Systems Servicing NC II Simulator',
    description: 'A hands-on training simulator to help students practice for the TESDA Computer Systems Servicing NC II assessment. The goal was to create a simulated environment for users to explore and perform assessment tasks and requirements directly in the browser without having to install anything to their system. This covers the requirements from operating system installation to setting up domain controllers. (This is a work-in-progress).',
    url: 'https://sodayooo.dpdns.org/challenges/NCII-CSS',
    tags: ['Vue', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    isExternal: false,
    available: true,
    accentColor: '#2563eb',
    accentBg: 'rgba(37, 99, 235, 0.08)',
    accentBorder: 'rgba(37, 99, 235, 0.3)',
    architecture: 'Full-stack simulator with modular state machine for step-by-step practical exam tasks. Computations are directly client-based with minimal server-side resources even under heavy traffic',
    keyFeatures: [
      'BIOS setup and configuration',
      'T568A and T568B Cabling',
      'Setting up Domain Controllers',
      'Folder Redirection and Group Policies'
    ],
    image: '/projects/NCII_Simulator.png',
    imageAlt: 'NCII-CSS Assessment Simulator & Hardware Lab'
  },
  {
    id: 'rdb-lab',
    title: 'PostgreSQL Relational DB Challenge',
    category: 'labs',
    tagline: 'SQL Sandbox with tasks to test your Relational Database knowledge',
    description: 'A task-driven PostgreSQL challenge that tests practical skills in creating queries, table joins, filters, aggregations, and schemas.',
    url: 'https://sodayooo.dpdns.org/challenges/elective2-rdb/midterms/',
    tags: ['PostgreSQL', 'SQL', 'JavaScript', 'Tailwind CSS', 'Schema Design'],
    isExternal: true,
    available: true,
    accentColor: '#8b5cf6',
    accentBg: 'rgba(139, 92, 246, 0.08)',
    accentBorder: 'rgba(139, 92, 246, 0.3)',
    architecture: 'In-browser query parser and evaluation engine providing immediate feedback on student SQL syntax. Data is stored locally while synchronized live to the server.',
    keyFeatures: [
      'Interactive query console with syntax verification',
      'Visual table relationship view for foreign keys and indexes',
      'Scenario-based challenge modules for JOIN, GROUP BY, and HAVING clauses',
      'Leaderboard showing users times and scores'
    ],
    image: '/projects/PostgreSQL.png',
    imageAlt: 'PostgreSQL Relational DB Sandbox & Quiz'
  },
  {
    id: 'server-hosting',
    title: 'Self-managed Server Hosting',
    category: 'infra',
    tagline: 'Self-managed and maintained virtual private server for web applications hosting and game servers.',
    description: 'Ubuntu-based virtual private server for hosting. All deployed web applications, domains, game servers, and projects including this portfolio are hosted in this server.',
    url: 'https://www.oracle.com/asean/cloud/',
    tags: ['Ubuntu Linux', 'NodeJS', 'Apache Proxy', 'Certbot SSL', 'PM2 Daemons', 'Networking'],
    isExternal: true,
    available: false,
    accentColor: '#06b6d4',
    accentBg: 'rgba(6, 182, 212, 0.08)',
    accentBorder: 'rgba(6, 182, 212, 0.3)',
    architecture: "Dedicated Ubuntu 24.04 LTS host with automated systemd unit services, Apache virtualhost routing, PM2 and NodeJS deployment, database management, and Game Server Hosting",
    keyFeatures: [
      'Apache VirtualHost reverse-proxy routing for NodeJS applications, self-hosted services, and game servers',
      'PM2 process management with automated zero-downtime reloads',
      'High performance game server hosting',
      'Database management'
    ],
    image: '/projects/Oracle.jpg',
    imageAlt: 'Virtual Private Server Hosting',
  },
  {
    id: 'android-application',
    title: 'ICpEP Attendance Application',
    category: 'software',
    tagline: 'Fully offline android application for monitoring student attendance through QR codes',
    description: 'Offline android application that generates QR codes embedded with student details for seamless attendance monitoring during school events. With timestamps and PDF exporting.',
    url: '',
    tags: ['Kotlin', 'Gradle', 'Android Studio', 'ZXing Core', 'SQLite'],
    isExternal: false,
    available: false,
    accentColor: '#06b6d4',
    accentBg: 'rgba(6, 182, 212, 0.08)',
    accentBorder: 'rgba(6, 182, 212, 0.3)',
    architecture: "Kotlin with AndroidX AppCompat and ViewBinding. Utilizes ZXing Core for QR Generation and JSON serialized payloads",
    keyFeatures: [
      'Easy to scan QR codes containing student details',
      'Stores details on-device and imposes QR expirations to prevent attendance forging',
      'Timestamped records and PDF exports following official document format',
      'Web version for iOS users'
    ],
    image: '/projects/Attendance_app.jpg',
    imageAlt: 'Fully Offline Attendance Monitoring Application',
  }
]