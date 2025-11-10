# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Modern iPhone 15 inspired website featuring interactive 3D models and animations. Built with React, Three.js, GSAP, and Tailwind CSS. The site showcases the iPhone 15 Pro with realistic 3D models that users can rotate and view in different colors and sizes, accompanied by smooth scroll-based animations.

## Development Commands

### Setup
```powershell
npm install --legacy-peer-deps
```
Note: Use `--legacy-peer-deps` flag due to peer dependency conflicts in the Three.js ecosystem.

### Development
```powershell
npm run dev
```
Starts Vite development server with hot module replacement.

### Build
```powershell
npm run build
```
Creates production-optimized build in `dist/` directory.

### Linting
```powershell
npm run lint
```
Runs ESLint to check code quality. Configured with React, Tailwind CSS, and Prettier rules.

### Preview
```powershell
npm run preview
```
Preview production build locally before deployment.

## Architecture

### Component Structure
The app uses a single-page layout with sequential sections orchestrated by `App.jsx`:
- **Navbar** → Top navigation
- **Hero** → Landing section with main headline
- **Highlights** → Video carousel showcasing iPhone features
- **Model** → Interactive 3D iPhone model viewer (core feature)
- **Features** → Product features section
- **HowItWorks** → Explanatory section
- **Footer** → Bottom content

### 3D Rendering Architecture
The project uses React Three Fiber with a shared Canvas pattern:

1. **Model.jsx** - Container component that:
   - Manages state for model size (small/large) and color variants
   - Creates a single shared `<Canvas>` using `<View.Port />` 
   - Renders two `<ModelView>` instances simultaneously for size comparison
   - Uses GSAP timeline animations to transition between views

2. **ModelView.jsx** - Individual viewport component that:
   - Uses `<View>` from `@react-three/drei` to render into the shared Canvas
   - Contains camera, lights, and orbit controls for user interaction
   - Renders the `<IPhone>` 3D model with `<Suspense>` boundary

3. **IPhone.jsx** - 3D model component:
   - Loads GLTF model from `/public/models/scene.glb`
   - Dynamically applies material colors based on selected variant
   - Uses texture mapping for the screen surface
   - Preloads model for performance

4. **Lights.jsx** - Lighting setup:
   - Combines `Environment` with custom `Lightformer` components
   - Adds multiple `spotLight` elements for realistic illumination

This architecture allows multiple 3D views to share a single WebGL context, improving performance.

### Animation System
Two animation utilities in `src/utils/animations.js`:

- **animateWithGsap**: Scroll-triggered animations using GSAP's ScrollTrigger
- **animateWithGsapTimeline**: Timeline-based animations for coordinated multi-element transitions (used in Model component)

### Video Carousel
`VideoCarousel.jsx` implements a custom video slider with:
- Synchronized video playback and progress indicators
- GSAP-based slide transitions
- Custom play/pause/reset controls
- Progress bars that animate in sync with video playback

## Code Patterns

### Import Organization
ESLint enforces strict import ordering:
1. React imports first
2. External packages (alphabetically)
3. Internal imports (alphabetically)
4. Blank line between groups

Example:
```jsx
import React from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { myUtil } from "../utils";
```

### GSAP Hooks
Use `useGSAP` hook (from `@gsap/react`) instead of `useEffect` for GSAP animations to ensure proper cleanup and React 18 compatibility.

### Three.js Refs
Use `useRef` with THREE.js objects (e.g., `new THREE.Group()`) for 3D scene management, not React state.

## Styling

### Tailwind Configuration
Custom color palette in `tailwind.config.js`:
- `blue: #2997FF` (Apple blue)
- `gray` shades (100, 200, 300)
- `zinc: #101010` (dark backgrounds)

### Custom CSS Classes
Several global utility classes defined in `src/index.css`:
- `.common-padding` - Consistent section spacing
- `.screen-max-width` - Content width constraints
- `.section-heading` - Typography for section titles
- `.flex-center` - Common flexbox centering
- `.color-container`, `.size-btn-container`, `.size-btn` - Model selector UI
- `.video-carousel_container` - Video layout wrapper
- `.control-btn` - Video control styling
- Animation classes: `.g_grow`, `.g_text` for GSAP targets

Check `src/index.css` for complete list before creating new utilities.

## Static Assets

### Public Directory Structure
- `/public/assets/` - Images and videos
- `/public/models/` - GLTF 3D model files (scene.glb is the main iPhone model)
- Favicon files at root

### Asset Imports
Import helper in `src/assets/index.js` exports all media assets for easy importing throughout the app.

### Model Color Variants
Defined in `src/constants/index.js`:
- Yellow (Natural Titanium)
- Blue (Blue Titanium)  
- White (White Titanium)
- Black (Black Titanium)

Each variant has RGB color array for materials and an associated texture image.

## ESLint Rules

### React-Specific
- `react/no-unknown-property: off` - Allows Three.js props like `castShadow`, `receiveShadow`
- `react/prop-types: off` - PropTypes not enforced (consider TypeScript for future)
- `react-refresh/only-export-components: warn` - Fast Refresh compatibility

### Code Style
- Max line length: 250 characters
- Single empty line maximum between statements
- Unused imports automatically removed
- `no-unused-vars: off` - Disabled (be mindful of cleanup)

### Tailwind
Custom classes whitelisted: `text-gray`, `bg-zinc`, `g_grow`, `g_text`, `text-blue`

## Known Patterns

### Material Color Updates
The IPhone component excludes certain materials from color changes (screen, camera lens, etc.). Material names to preserve:
- `zFdeDaGNRwzccye`
- `ujsvqBWRMnqdwPx`
- `hUlRcbieVuIiOXG`
- `jlzuBkUzuJqgiAK`
- `xNrofRCqOXXHVZt`

### Video Progress Calculation
VideoCarousel uses GSAP ticker for smooth progress animations synchronized with HTML5 video `currentTime`.

### Scroll Trigger Configuration
Default configuration for scroll animations:
- `toggleActions: "restart reverse restart reverse"`
- `start: "top 85%"`

Adjust these values in `animateWithGsap` calls for different behaviors.

## Dependencies Note

This project uses `--legacy-peer-deps` due to peer dependency conflicts between:
- Three.js and React Three Fiber ecosystem packages
- ESLint plugins

When adding new dependencies, use the same flag to maintain consistency.
