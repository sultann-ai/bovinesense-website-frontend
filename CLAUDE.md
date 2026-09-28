# CLAUDE.md — Bovine frontend

React SPA for **Bovine** (legal name: BovineSense (Private) Limited), an AI + IoT livestock health monitoring company. It talks to an Express/MongoDB API in the sibling directory `../bovinesense-website-backend/`.

Before any work, read these references:
- `../docs/BACKEND.md` — API contract (endpoints, payloads, models, auth)
- `../docs/FRONTEND.md` — this app's routes, components, services, styling
- `REDESIGN.md` — audit, keep/replace plan, known drift and contradictions

Commands: `npm run client` (dev server; `npm run dev` also works), `npm run build`, `npm run lint`. The API base URL comes from `VITE_API_URL` (must include `/api`).

## Rules (apply in every session)

### 1. Backend is off-limits
Never change API contracts, models, endpoints, or anything in `../bovinesense-website-backend/`. If a design needs data the API doesn't return, say so and propose a frontend-only workaround. Do not change the backend.

### 2. The API is the only content source
There is no CMS. All content is fetched at runtime from the endpoints in `../docs/BACKEND.md` and edited through the existing admin panel. Do not hardcode content that belongs in the API.

### 3. Brand palette is fixed
Use exactly these values:

```css
--terracotta: #C1502E;
--cream:      #F6F1E9;
--cream-deep: #EDE6DA;
--charcoal:   #2B2A28;
--ink:        #3A3733;
--gold:       #D9A441;
```

- No other colors except white, black, and the rgba values in the glass recipe. The glass recipe has not been provided yet. Ask before using any rgba value.
- Buttons on terracotta use **white** text.
- Terracotta text is allowed only at **24px and above**.
- Gold is **never** used as text on cream.

### 4. Brand name
The public brand name is **"Bovine"** everywhere in the UI (copy, titles, meta, alt text). **"BovineSense (Private) Limited"** appears only in the footer legal line.

### 5. Never invent content
No fake farm counts, accuracy percentages, customer numbers, testimonials, or partner logos. Every number on the site must come from the API or from a value the user has explicitly given. If content is missing, hide the section instead of filling it. `REDESIGN.md` §9.3 lists existing hardcoded claims.

### 6. One module at a time
Work on one module, then do all of the following in order:
1. Run the dev server.
2. Run `npm run build` and `npm run lint`, and fix all errors.
3. Report the files changed, what the user should look at in the browser, and anything you couldn't do.
4. Stop.

### 7. Accessibility baseline
- Semantic HTML.
- Everything reachable by keyboard.
- Visible focus ring: **2px terracotta, 2px offset**.
- Alt text on every image.
- `prefers-reduced-motion` respected, including framer-motion and Lenis smooth scroll.
- At least 4.5:1 contrast for body text.

### 8. Mobile-first
Check every change at **360px, 768px and 1280px**.

### 9. Sanitize API HTML
Any HTML coming from the API must be sanitized before rendering. Never pass raw API HTML to `dangerouslySetInnerHTML`. Current raw uses are `src/pages/BlogDetail.tsx:125` (`BlogPost.content`) and `src/pages/ProductDetail.tsx:148` (`Product.fullDescription`).

### 10. Admin panel: tokens and typography only
Covers `/admin-login`, `/admin/*`, `src/components/admin/**`, `hooks/admin/**` and the `Admin*` pages. Apply colors and typography only. Do not redesign its layout or change its behaviour.

Shared pieces also render on admin routes: `Navbar`, `Footer`, `CustomBgWrapper`, `src/index.css` and `src/styles/globals.css`. Check admin screens after changing any of them.
