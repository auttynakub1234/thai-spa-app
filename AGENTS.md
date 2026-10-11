# Agent Guidelines for Thai Spa Luxury Project

## Code Style
- Use **functional React components** with hooks.
- Follow **Tailwind CSS** utility‑first approach; avoid custom CSS unless absolutely necessary.
- TypeScript is used for Cloudflare Functions (`*.ts`). Keep types explicit.
- Keep component files small and focused; split logic into custom hooks when reuse is needed.
- Use **named exports** for utility functions; default export for React components.

## File Organization
- Frontend: `src/components/` for reusable UI, `src/pages/` for route components.
- Styles: Tailwind config in `tailwind.config.js`; base styles in `src/index.css`.
- API: Each endpoint gets its own file under `functions/api/` named after the resource (e.g., `services.ts`, `slots.ts`, `booking.ts`).
- Shared constants (e.g., API base) can be placed in `src/lib/` if needed.

## Git Practices
- Commit messages: imperative mood, short (<50 chars) with optional body.
- Feature branches: `feature/<short-description>`.
- Pull requests must pass linting (if added) and manual review before merging.

## Testing
- Currently no test framework configured; if adding, prefer **Vitest** for unit and **Playwright** for E2E.
- Keep tests alongside source (`*.test.{js,ts}`) or in a `__tests__` folder.

## Performance
- Leverage Cloudflare Pages caching: set appropriate `Cache-Control` headers in `_middleware.ts` for static API responses.
- Minimize bundle size: lazy‑load routes if the app grows.

## Cloudflare Specifics
- All secrets must be set via `wrangler secret put`; never commit them.
- D1 interactions: use prepared statements; avoid string concatenation.
- R2 bindings: only use for binary assets; store metadata in D1.
- Workers runtime: avoid blocking heavy computations; use async/await.

## Documentation
- Update `README.md` when changing setup steps or adding major features.
- Keep `AGENTS.md` up‑to‑date with any new conventions.
- If creating a reusable skill, document in `SKILL.md` (see below).

## Skill Creation (if needed)
- Place skill definition in `SKILL.md` under the project root or in `.codex/skills/`.
- Follow the format: objective, steps, inputs/outputs, and any required permissions.
- Ensure skill is idempotent and can be run in the Codex CLI environment.

---
*These guidelines help maintain consistency as the project evolves.*
