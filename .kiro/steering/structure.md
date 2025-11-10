# Project Structure

## Directory Organization

```
src/
├── components/     # React components (one per file)
├── assets/         # Static assets with index.js barrel export
├── constants/      # Constants with index.js barrel export
├── utils/          # Utility functions (animations.js for GSAP)
├── App.jsx         # Main app component
├── main.jsx        # React entry point
└── index.css       # Global styles

public/
├── assets/         # Public images and media
├── models/         # 3D model files
└── *.png, *.ico    # Favicons and icons
```

## Component Architecture

- **Single-purpose components**: Each component in its own file (e.g., Hero.jsx, Navbar.jsx)
- **Main layout**: App.jsx composes all section components in order
- **Component naming**: PascalCase for files and exports
- **No prop-types**: Disabled in ESLint config

## Key Components

- `Navbar` - Top navigation
- `Hero` - Landing section
- `Highlights` - Product highlights
- `Model` - 3D iPhone model viewer
- `Features` - Feature showcase
- `HowItWorks` - Explainer section
- `Footer` - Bottom section
- `VideoCarousel` - Video slider
- `ModelView`, `IPhone`, `Lights`, `Loader` - 3D rendering helpers

## Conventions

- Use barrel exports (index.js) for assets and constants
- Animation utilities centralized in `utils/animations.js`
- 3D models stored in `public/models/`
- All components use functional React with hooks
- No TypeScript - pure JavaScript with JSX
