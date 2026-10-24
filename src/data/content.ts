import type { L } from '../i18n'

export const PROFILE = {
  name: 'Tomás Montoya',
  email: 'tomasmontoyabuitrago@gmail.com',
  github: 'https://github.com/TomiMontoyaDev',
  githubUser: 'TomiMontoyaDev',
  cv: '/cv-tomas-montoya.pdf',
  location: 'Pereira, Colombia',
}

export type Category = 'web' | 'fullstack' | 'software'

export type Project = {
  id: string
  title: string
  year: string
  category: Category
  tagline: L
  description: L
  stack: string[]
  image?: string
  /** Gradient used for the generated cover when there is no screenshot */
  accent: [string, string]
  demo?: string
  repo?: string
}

export const FEATURED = {
  title: 'WOLFEX',
  url: 'https://www.wolfex.xyz',
  repo: 'https://github.com/TomiMontoyaDev/Wolfex',
  image: '/projects/wolfex.webp',
  year: '2026',
  kicker: { es: 'Proyecto destacado', en: 'Featured project' },
  tagline: {
    es: 'E-commerce full-stack de suplementos deportivos, en producción y vendiendo.',
    en: 'Full-stack sports-supplement e-commerce, live in production and selling.',
  },
  description: {
    es: 'Diseñé y construí WOLFEX de punta a punta: identidad visual, tienda, pagos, base de datos y panel de administración. Una experiencia de marca agresiva y cinematográfica, pensada para convertir visitas en ventas.',
    en: 'I designed and built WOLFEX end to end: visual identity, storefront, payments, database and admin panel. An aggressive, cinematic brand experience engineered to turn visits into sales.',
  },
  features: [
    { es: 'Pagos reales con MercadoPago', en: 'Real payments via MercadoPago' },
    { es: 'Panel admin: productos, pedidos e inventario', en: 'Admin panel: products, orders & inventory' },
    { es: 'Constructor de combos con descuentos escalonados', en: 'Combo builder with tiered discounts' },
    { es: 'Prisma + PostgreSQL, validación con Zod', en: 'Prisma + PostgreSQL, Zod validation' },
    { es: 'Animaciones GSAP ScrollTrigger + Framer Motion', en: 'GSAP ScrollTrigger + Framer Motion animations' },
    { es: 'SEO técnico: sitemap, JSON-LD, OG dinámico', en: 'Technical SEO: sitemap, JSON-LD, dynamic OG' },
  ] satisfies L[],
  stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Prisma', 'PostgreSQL', 'MercadoPago', 'GSAP', 'Vercel'],
}

export const PROJECTS: Project[] = [
  {
    id: 'altea',
    title: 'Altea Casa de Moda',
    year: '2026',
    category: 'fullstack',
    tagline: { es: 'E-commerce de moda de lujo', en: 'Luxury fashion e-commerce' },
    description: {
      es: 'Plataforma para venta y alquiler de vestidos de evento: filtros avanzados, carrito, cuentas de usuario con auth propia y un design system fiel al manual de marca.',
      en: 'Platform for selling and renting event wear: advanced filtering, cart, user accounts with custom auth and a design system true to the brand book.',
    },
    stack: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'GSAP', 'Lenis'],
    accent: ['#c9a96e', '#2a1f14'],
    repo: 'https://github.com/TomiMontoyaDev/Altea-Casa-De-Moda',
  },
  {
    id: 'decortiles',
    title: 'DecorTiles',
    year: '2025',
    category: 'web',
    tagline: { es: 'Sitio corporativo + catálogo', en: 'Corporate site + catalog' },
    description: {
      es: 'Sitio para una empresa de porcelanatos y acabados con catálogo navegable, zoom de producto y formulario de cotización conectado a email.',
      en: 'Website for a tiles & finishes company with a browsable catalog, product zoom and a quote form wired to email.',
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Radix UI', 'EmailJS'],
    image: '/projects/decortiles.webp',
    accent: ['#e8e2d6', '#3b3127'],
    demo: 'https://www.decorcolombiatiles.com/',
    repo: 'https://github.com/TomiMontoyaDev/Decortiles-Webpage',
  },
  {
    id: 'sichar',
    title: 'Catálogo Sichar',
    year: '2026',
    category: 'web',
    tagline: { es: 'Catálogo digital vivo', en: 'Live digital catalog' },
    description: {
      es: 'Vitrina digital con +90 referencias, búsqueda instantánea, líneas de producto y contacto directo con asesor por WhatsApp.',
      en: 'Digital showroom with 90+ references, instant search, product lines and one-tap WhatsApp contact with a sales rep.',
    },
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    image: '/projects/sichar.webp',
    accent: ['#f86e1d', '#111111'],
    demo: 'https://sichar-catalogo.vercel.app',
    repo: 'https://github.com/TomiMontoyaDev/Sichar-Catalogo',
  },
  {
    id: 'mci',
    title: 'My Call Insurance',
    year: '2025',
    category: 'web',
    tagline: { es: 'Web bilingüe para aseguradora (EE. UU.)', en: 'Bilingual site for a US insurance agency' },
    description: {
      es: 'Sitio bilingüe ES/EN con routing, formularios de captación de leads y animaciones, construido para la agencia donde trabajo.',
      en: 'Bilingual ES/EN site with routing, lead-capture forms and animations, built for the agency I work at.',
    },
    stack: ['React', 'Vite', 'Tailwind', 'Framer Motion', 'i18next'],
    image: '/projects/mci.webp',
    accent: ['#1e5eff', '#0a1a3a'],
    demo: 'https://mycallinsurance.onrender.com/',
    repo: 'https://github.com/TomiMontoyaDev/MyCallInsurance',
  },
  {
    id: 'vetcloud',
    title: 'VetCloud',
    year: '2025',
    category: 'fullstack',
    tagline: { es: 'Gestión veterinaria full-stack', en: 'Full-stack veterinary management' },
    description: {
      es: 'API REST en Spring Boot + frontend React: agendamiento de citas, mascotas, historial clínico y roles cliente / veterinario. Dockerizado.',
      en: 'Spring Boot REST API + React frontend: appointment booking, pets, medical history and client / vet roles. Dockerized.',
    },
    stack: ['Java', 'Spring Boot', 'React', 'REST API', 'Docker'],
    image: '/projects/vetcloud.webp',
    accent: ['#00968a', '#062b28'],
    demo: 'https://vetcloud-09ay.onrender.com/',
    repo: 'https://github.com/TomiMontoyaDev/VetCloud',
  },
  {
    id: 'tswallet',
    title: 'TSWallet',
    year: '2026',
    category: 'fullstack',
    tagline: { es: 'App de finanzas personales', en: 'Personal finance app' },
    description: {
      es: 'Registro de ingresos y gastos con gráficas interactivas. API en Express con autenticación JWT + bcrypt y persistencia en MongoDB.',
      en: 'Income & expense tracking with interactive charts. Express API with JWT + bcrypt auth and MongoDB persistence.',
    },
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Recharts'],
    accent: ['#3fe0ff', '#06202a'],
    repo: 'https://github.com/TomiMontoyaDev/TSWallet',
  },
  {
    id: 'mototec',
    title: 'MotoTec',
    year: '2025',
    category: 'fullstack',
    tagline: { es: 'Proyección de ventas con álgebra lineal', en: 'Sales forecasting with linear algebra' },
    description: {
      es: 'API en Flask que proyecta ventas y demanda de componentes con mínimos cuadrados (NumPy), visualizado en un dashboard React.',
      en: 'Flask API that forecasts sales and component demand using least squares (NumPy), visualized in a React dashboard.',
    },
    stack: ['Python', 'Flask', 'NumPy', 'React', 'Recharts'],
    accent: ['#ff4d4d', '#2a0808'],
    repo: 'https://github.com/TomiMontoyaDev/MotoTec',
  },
  {
    id: 'circuit-rush',
    title: 'Circuit Rush',
    year: '2026',
    category: 'software',
    tagline: { es: 'Juego de carreras 3D', en: '3D arcade racing game' },
    description: {
      es: 'Carreras arcade en 3D con drift, humo, skid marks y cámaras dinámicas. Arquitectura con patrones Strategy, Factory y Builder.',
      en: '3D arcade racer with drifting, smoke, skid marks and dynamic cameras. Architected with Strategy, Factory and Builder patterns.',
    },
    stack: ['Java 21', 'jMonkeyEngine', 'LWJGL', 'Gradle', 'Design Patterns'],
    accent: ['#ffb627', '#2a1a00'],
    repo: 'https://github.com/TomiMontoyaDev/Circuit-Rush',
  },
  {
    id: 'exposhow',
    title: 'Exposhow La Milagrosa',
    year: '2026',
    category: 'web',
    tagline: { es: 'Landing de evento premium', en: 'Premium event landing' },
    description: {
      es: 'Landing inmersiva para un evento de autos y hamburguesas: hero full-screen, secciones animadas y CTA de asistencia.',
      en: 'Immersive landing for a cars & burgers event: full-screen hero, animated sections and RSVP call-to-action.',
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    accent: ['#ff3d6e', '#1e0610'],
    repo: 'https://github.com/TomiMontoyaDev/Exposhow-La-Milagrosa',
  },
  {
    id: 'pasolimo',
    title: 'Pasolimo Car Service',
    year: '2025',
    category: 'web',
    tagline: { es: 'Web para servicio de transporte (EE. UU.)', en: 'Website for a US car service' },
    description: {
      es: 'Sitio para empresa de transporte ejecutivo con reservas, políticas y canales de contacto. En producción con dominio propio.',
      en: 'Website for an executive car service with booking, policies and contact channels. Live on its own domain.',
    },
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/pasolimo.webp',
    accent: ['#e8d8b8', '#202226'],
    demo: 'https://paso-limo.com/',
    repo: 'https://github.com/TomiMontoyaDev/Pasolimo',
  },
  {
    id: 'pacman',
    title: 'Pacman C++',
    year: '2024',
    category: 'software',
    tagline: { es: 'Clásico arcade desde cero', en: 'Arcade classic from scratch' },
    description: {
      es: 'Pacman implementado en C++ con game loop, colisiones y fantasmas.',
      en: 'Pacman implemented in C++ with a game loop, collisions and ghosts.',
    },
    stack: ['C++'],
    image: '/projects/pacman.webp',
    accent: ['#ffe600', '#05051a'],
    repo: 'https://github.com/TomiMontoyaDev/Pacman-C-',
  },
  {
    id: 'exotic',
    title: 'Exotic Cars Pereira',
    year: '2024',
    category: 'web',
    tagline: { es: 'Car spotting de la ciudad', en: 'City car-spotting gallery' },
    description: {
      es: 'Galería de car spotting de Pereira: mi primer proyecto publicado.',
      en: 'Car-spotting gallery for Pereira: my first published project.',
    },
    stack: ['HTML', 'CSS', 'Bootstrap'],
    image: '/projects/exotic.webp',
    accent: ['#ff2a2a', '#140404'],
    demo: 'https://tomimontoyadev.github.io/Exotic-Cars-Pereira/carros.html',
    repo: 'https://github.com/TomiMontoyaDev/Exotic-Cars-Pereira',
  },
]

export const CATEGORIES: { id: Category | 'all'; label: L }[] = [
  { id: 'all', label: { es: 'Todos', en: 'All' } },
  { id: 'fullstack', label: { es: 'Full-Stack', en: 'Full-Stack' } },
  { id: 'web', label: { es: 'Web & E-commerce', en: 'Web & E-commerce' } },
  { id: 'software', label: { es: 'Juegos & Software', en: 'Games & Software' } },
]

export const SKILLS: { group: L; items: string[] }[] = [
  { group: { es: 'Frontend', en: 'Frontend' }, items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Angular', 'HTML / CSS'] },
  { group: { es: 'Backend', en: 'Backend' }, items: ['Node.js', 'Express', 'Java', 'Spring Boot', 'Python', 'Flask', 'FastAPI', 'REST APIs', 'JWT / Auth'] },
  { group: { es: 'Datos & Infra', en: 'Data & Infra' }, items: ['PostgreSQL', 'Prisma', 'MongoDB', 'Docker', 'Vercel', 'Render', 'Git / GitHub', 'MercadoPago'] },
  { group: { es: 'IA & Productividad', en: 'AI & Productivity' }, items: ['Claude Code', 'GitHub Copilot', 'ChatGPT', 'Prompt engineering', 'Agentes de código', 'PowerApps'] },
]

export const MARQUEE = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Prisma', 'PostgreSQL', 'Spring Boot', 'Python', 'MongoDB', 'GSAP', 'Framer Motion', 'Docker', 'Claude Code', 'Vercel']

export const EXPERIENCE: { period: L; role: L; org: string; detail: L }[] = [
  {
    period: { es: '2024 — Hoy', en: '2024 — Now' },
    role: { es: 'Desarrollador Full-Stack Freelance', en: 'Freelance Full-Stack Developer' },
    org: 'Independiente',
    detail: {
      es: 'E-commerce, sitios corporativos y catálogos para marcas en Colombia y EE. UU.: WOLFEX, Altea, DecorTiles, Sichar, Pasolimo. Del diseño al deploy, incluyendo pagos, bases de datos y paneles admin.',
      en: 'E-commerce, corporate sites and catalogs for brands in Colombia and the US: WOLFEX, Altea, DecorTiles, Sichar, Pasolimo. From design to deploy, including payments, databases and admin panels.',
    },
  },
  {
    period: { es: '2025 — Hoy', en: '2025 — Now' },
    role: { es: 'Desarrollo web & Marketing', en: 'Web Development & Marketing' },
    org: 'My Call Insurance',
    detail: {
      es: 'Construí y mantengo el sitio bilingüe de la agencia; apoyo marketing digital y operaciones de oficina.',
      en: 'Built and maintain the agency’s bilingual website; support digital marketing and office operations.',
    },
  },
  {
    period: { es: '2024 — 2025', en: '2024 — 2025' },
    role: { es: 'Desarrollador de apps PowerApps', en: 'PowerApps Developer' },
    org: 'Independiente',
    detail: {
      es: 'Apps internas low-code para digitalizar procesos de negocio.',
      en: 'Internal low-code apps to digitize business processes.',
    },
  },
  {
    period: { es: '2022 — 2025', en: '2022 — 2025' },
    role: { es: 'Jefe de Bodega y Asesor Comercial', en: 'Warehouse Lead & Sales Advisor' },
    org: 'Occidente Papelería y más',
    detail: {
      es: 'Liderazgo de despachos e inventario y atención a clientes: entiendo cómo funciona un negocio por dentro.',
      en: 'Led dispatch & inventory and served customers: I know how a business works from the inside.',
    },
  },
]

export const EDUCATION: L[] = [
  { es: 'Tecnología en Desarrollo de Software — UTP (en curso)', en: 'Software Development Technology — UTP (in progress)' },
  { es: 'Curso Desarrollo Front End — AprendemosWEB', en: 'Front-End Development Course — AprendemosWEB' },
  { es: 'Bachiller Técnico en Diseño y Desarrollo Web — ITSP', en: 'Technical High School Diploma in Web Design & Development — ITSP' },
  { es: 'Inglés B1 — Universidad Tecnológica de Pereira', en: 'English B1 — Universidad Tecnológica de Pereira' },
]
