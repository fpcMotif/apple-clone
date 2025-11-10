# Tech Stack

## Core Technologies

- **React 18.2** - UI framework
- **Vite** - Build tool and dev server
- **JavaScript** - Primary language (no TypeScript)
- **Tailwind CSS** - Utility-first styling

## Key Libraries

- **Three.js** - 3D rendering engine
- **@react-three/drei** - React Three Fiber helpers
- **GSAP** - Animation library
- **@gsap/react** - GSAP React integration

## Code Quality Tools

- **ESLint** - Linting with Standard config + Prettier
- **Prettier** - Code formatting
- **PostCSS** - CSS processing with Autoprefixer

## Common Commands

```bash
# Development
npm run dev          # Start dev server
yarn dev

# Build
npm run build        # Production build
yarn build

# Preview
npm run preview      # Preview production build
yarn preview

# Linting
npm run lint         # Run ESLint
yarn lint

# Installation
npm install --legacy-peer-deps
yarn install --legacy-peer-deps
```

## Build Configuration

- Vite config is minimal with React plugin only
- Tailwind configured for dark theme with custom colors (blue, gray variants, zinc)
- ESLint extends Standard, React, Tailwind, and Prettier configs
