# Cursor Rules Documentation

This directory contains Cursor rules that document the project's tech stack and best practices.

## Rule Files

### Always Applied Rules
These rules are automatically applied to every AI request:

1. **`next16.mdc`** - Next.js 16 best practices
   - React Compiler configuration
   - Turbopack usage
   - Middleware patterns
   - Performance optimizations

2. **`lint-format.mdc`** - Linting & formatting strategy
   - Oxlint for linting (primary)
   - Biome/Ultracite for formatting only
   - Pre-commit hooks
   - Performance metrics

### Context-Specific Rules
These rules apply based on file patterns:

3. **`react19.mdc`** (applies to `*.ts`, `*.tsx`)
   - useEffectEvent hook patterns
   - React cache API usage
   - Migration from traditional useEffect

4. **`effect-ts.mdc`** (applies to `app/api/**/*.ts`, `lib/**/*.ts`)
   - Effect-TS pipeline patterns
   - safeApiCall helper usage
   - Type-safe error handling

### Manual Reference Rules
These rules are fetched when explicitly needed:

5. **`migration-summary.mdc`**
   - Complete tech stack migration overview
   - Dependency upgrades summary
   - Testing instructions
   - Performance improvements

## How Cursor Uses These Rules

- **Always Applied**: Rules with `alwaysApply: true` are shown to the AI in every conversation
- **Glob-based**: Rules with `globs` patterns apply only when working with matching files
- **Description-based**: Rules with `description` can be manually fetched by the AI when relevant

## Tech Stack Summary

**Core Technologies:**
- Next.js 16.0.0 (React Compiler + Turbopack)
- React 19.2.0 (useEffectEvent + cache API)
- Effect-TS 3.18.4 (Type-safe async pipelines)
- Oxlint 1.24.0 (Fast linting)
- Biome/Ultracite (Formatting)

**Key Benefits:**
- 2-5x faster builds (Turbopack)
- 5-10x faster Fast Refresh
- 100x faster linting (Oxlint vs ESLint)
- Type-safe error handling (Effect-TS)
- Zero-config formatting (Biome)

## Reference Documentation

For complete migration details, see:
- [`MIGRATION_NEXT16_REACT19.md`](../MIGRATION_NEXT16_REACT19.md)
- [`LINTING_FORMATTING.md`](../LINTING_FORMATTING.md)

## Updating Rules

To modify or add new rules:
1. Create/edit `.mdc` files in this directory
2. Use proper frontmatter metadata:
   - `alwaysApply: true` - Apply to all requests
   - `globs: pattern` - Apply to matching files
   - `description: text` - Allow manual fetching
3. Reference files using `[filename](mdc:path/to/file)`
4. Keep rules concise and actionable

## Rule Maintenance

Last updated: 2025-10-27
Updated by: AI Assistant (Claude Sonnet 4.5)

Rules reflect the current state of the codebase after the Next.js 16 + React 19.2 migration.

