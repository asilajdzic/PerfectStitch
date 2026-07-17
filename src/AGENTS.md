# AGENTS.md

# PerfectStitch Development Conventions

This document defines the coding standards, project structure, and development workflow for the PerfectStitch project. Follow these conventions when making changes.

---

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- ESLint
- Prettier

---

## Project Structure

```
src/
├── assets/       # Images, fonts, and static files
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── pages/        # Route-level views
└── types/        # TypeScript type definitions
```

### Guidelines

- Place reusable UI elements in `src/components`.
- Keep page-level logic inside `src/pages`.
- Store custom hooks in `src/hooks`.
- Define shared TypeScript types in `src/types`.
- Keep static assets inside `src/assets`.

---

## Coding Conventions

### Components

- Use functional React components.
- Prefer React Hooks over class components.
- Keep components small, focused, and reusable.
- Extract reusable logic into custom hooks.

### TypeScript

- Use strict TypeScript typing.
- Avoid using `any` unless absolutely necessary.
- Define reusable interfaces/types in `src/types`.

### Naming

| Item | Convention |
|------|------------|
| Components | PascalCase |
| Files (components) | PascalCase |
| Variables | camelCase |
| Functions | camelCase |
| Hooks | useSomething |
| Types & Interfaces | PascalCase |

Examples:

```tsx
function ProductCard() {}

const userName = "";

function calculatePrice() {}

function useCart() {}
```

---

## Styling

- Use Tailwind CSS utility classes.
- Prefer utility classes over custom CSS.
- Keep styling close to the component.
- Create reusable components instead of duplicating Tailwind class combinations.

---

## Linting & Formatting

- ESLint with type-aware rules.
- Prettier for consistent formatting.

Before every commit, run:

```bash
npm run lint
```

Ensure there are no linting errors before creating a pull request.

---

## Git Workflow

### Branches

- `main` → Stable production
- `dev` → Active development
- `feature/<name>` → Feature branches

### Pull Requests

- All changes must be submitted through Pull Requests.
- Do not merge directly into `main`.
- Ensure linting passes before requesting review.

---

## Commit Messages

Follow the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Format

Every commit message uses this structure:

```text
<type>[optional scope][optional !]: <description>

[optional body]

[optional footer(s)]
```

- **type** — Required. Describes the kind of change.
- **scope** — Optional. A noun in parentheses naming the affected area (e.g. `navbar`, `cart`, `theme`).
- **!** — Optional. Marks a breaking change when placed before the colon.
- **description** — Required. A short, imperative summary in lowercase (no trailing period).
- **body** — Optional. Additional context, separated from the description by a blank line.
- **footer(s)** — Optional. Metadata such as `BREAKING CHANGE:`, `Refs:`, or `Reviewed-by:`.

### Types

| Type | When to use |
|------|-------------|
| `feat` | A new feature for the user or codebase |
| `fix` | A bug fix |
| `docs` | Documentation-only changes |
| `style` | Formatting, whitespace, or lint fixes — no logic change |
| `refactor` | Code restructuring with no feature or bug fix |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `build` | Build system or dependency changes |
| `ci` | CI/CD configuration changes |
| `chore` | Maintenance tasks that don't fit other types |
| `revert` | Reverting a previous commit |

Use lowercase for types and scopes. Be consistent across the project.

### Breaking changes

Indicate breaking changes in one of two ways:

```text
feat(api)!: remove legacy cart endpoint
```

```text
feat: allow config object to extend other configs

BREAKING CHANGE: `extends` key in config file now merges instead of replaces
```

Breaking changes correlate with a **MAJOR** version bump under Semantic Versioning.

### Semantic Versioning

| Commit type | SemVer bump |
|-------------|-------------|
| `fix` | PATCH |
| `feat` | MINOR |
| Breaking change (any type) | MAJOR |

### Examples

Simple commit:

```text
feat: add authentication page
```

With scope:

```text
feat(navbar): add responsive cart link
```

With body:

```text
fix(cart): prevent duplicate items on rapid clicks

Debounce add-to-cart actions so the same product cannot be inserted twice
before state updates.
```

With footer:

```text
fix: prevent racing of requests

Introduce a request id and dismiss stale responses.

Refs: #42
```

Breaking change:

```text
feat(routing)!: migrate cart page to nested route

BREAKING CHANGE: `/cart` now requires authentication
```

### Guidelines

- One logical change per commit when possible.
- Use imperative mood in the description ("add", "fix", "update", not "added" or "fixes").
- Use `style` only for formatting — UI or theme changes belong in `feat` or `refactor`.
- When squashing a PR, write the final commit message in this format.

---

## General Principles

- Write clean, readable, and maintainable code.
- Prefer composition over duplication.
- Keep functions focused on a single responsibility.
- Reuse components whenever possible.
- Maintain consistency throughout the codebase.
- Prioritize type safety and predictable behavior.
```