# Portafolio — Tomás Montoya

Portafolio personal de desarrollador Full-Stack. React 19 + Vite + TypeScript + Tailwind CSS v4, animaciones con Motion (Framer Motion) y smooth scroll con Lenis. Bilingüe ES / EN.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview  # sirve dist/ localmente
```

## Editar contenido

Todo el texto, proyectos, experiencia y skills están en [`src/data/content.ts`](src/data/content.ts).
Las capturas de proyectos van en `public/projects/` (WebP, ~1440px de ancho). Si un proyecto no tiene `image`, se genera una portada con sus colores `accent`.

## Deploy

Vercel o Netlify: importar el repo, framework **Vite**, build `npm run build`, output `dist`.
