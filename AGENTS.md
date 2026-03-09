# Repository Guidelines

## Project Structure & Module Organization

- `src/` contains all application code (React + TypeScript).
- `src/app/` holds app-level setup (Redux store).
- `src/features/` contains domain logic (API clients, slices, selectors, types).
- `src/common/components/` contains reusable and page-level UI blocks; component styles are usually colocated as `*.module.css`.
- `src/common/constants/` and `src/common/utils/` hold shared constants and helpers.
- `public/` stores static files served as-is; `dist/` is build output (do not edit manually).

## Build, Test, and Development Commands

- `pnpm install` installs dependencies.
- `pnpm dev` starts Vite dev server with HMR.
- `pnpm build` runs TypeScript project build (`tsc -b`) and production bundle.
- `pnpm preview` serves the production build locally.
- `pnpm lint` runs ESLint for `ts/tsx` sources.
- `pnpm format` runs Prettier (see `.prettierrc`) and should be part of every workflow completion.

## Coding Style & Naming Conventions

- Use TypeScript for logic and React components (`.tsx`).
- Follow ESLint config in `eslint.config.js` (TS + React Hooks + React Refresh rules).
- Keep indentation consistent with existing files; prefer 2 spaces in new code.
- Component files use `PascalCase` (for example, `FilmSlider.tsx`).
- Hooks, helpers, selectors, and variables use `camelCase`.
- Use CSS Modules for component-local styles: `ComponentName.module.css`.
- `.prettierrc` enforces `printWidth: 120`, `semi: true`, `singleQuote: true`, `trailingComma: es5`, `tabWidth: 2`, `bracketSpacing: true`, `arrowParens: always`, and `endOfLine: lf`.

## Testing Guidelines

- No automated test runner is configured yet (`package.json` has no `test` script).
- Before opening a PR, run `pnpm lint` and `pnpm build`.
- If you add tests, colocate as `*.test.ts(x)` near the related module and document the new command in `package.json`.

## Commit & Pull Request Guidelines

- Recent commits use short, imperative subjects (for example, `add Footer`, `add EmptyMoviesState`).
- Prefer clear, scoped messages: `add upcoming movies section` instead of vague `change style`.
- PRs should include:
  - concise description of behavior changes,
  - linked issue/task,
  - screenshots/GIFs for UI updates,
  - confirmation that `pnpm lint` and `pnpm build` pass.

## Security & Configuration Tips

- Keep secrets in `.env.local`; do not commit API keys.
- Treat `.env` as non-sensitive defaults only.
