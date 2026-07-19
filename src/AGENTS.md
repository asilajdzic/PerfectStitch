# AGENTS.md

# PerfectStitch Development Conventions

This document defines the coding standards, project structure, and development workflow for the PerfectStitch project. Follow these conventions when making changes.

---

## Project Rules

### Philosophy

These rules exist to ensure that every feature we build is consistent, accessible, and easy to maintain. They capture lessons learned from comparing vague vs. precise prompts and are meant to reduce review effort while improving overall quality. Following them helps us deliver production-ready code faster and with fewer surprises.

### Prompting

- Always provide explicit constraints, style references, and expected behaviors in prompts.
- Avoid vague instructions — clarity up front reduces rework and ensures code matches project standards.

### Verification

- Every new feature must include a verification step such as automated tests or lint checks.
- Tests should cover edge cases (empty inputs, invalid formats, error scenarios) before code is considered complete.

### Accessibility

- Accessibility is part of the acceptance criteria, not optional.
- Disabled states, clear visual feedback, and consistent styling must be implemented for all interactive elements.

### Integration Readiness

- Even if the backend is not yet available, structure calls with `async/await` to prepare for smooth integration later.
- Stub or mock backend calls where necessary to keep the frontend testable.

### Review Efficiency

- Code should be delivered in a state that minimizes review burden.
- Precise prompts, consistent styling, and automated checks shift review effort from fixing basics to refining details.

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
