# REDESIGN AUDIT — Bovine frontend

Audit of `bovinesense-website-frontend/` as it exists today, written before the redesign. Paths are relative to this directory. `../docs/BACKEND.md` and `../docs/FRONTEND.md` are the full references; this file focuses on what matters for the redesign.

---

## 1. Build tooling and architecture

| Concern | What exists | Where |
|---|---|---|
| Build tool | Vite `^5.4.2` + `@vitejs/plugin-react ^4.3.1`. No aliases, no proxy | `package.json`, `vite.config.ts` |
| React | `^18.3.1`, `StrictMode`, `createRoot` | `src/main.tsx` |
| Language | TypeScript `^5.5.3` (`strict`). `build` is `vite build` only, with no `tsc` step, so type errors do not fail the build | `package.json:10`, `tsconfig.app.json` |
| Router | react-router-dom `^6.20.1`, `BrowserRouter`, routes declared inline in `App.tsx` (no data routers, no lazy loading) | `src/App.tsx:57-127` |
| State management | React Context only: `ThemeContext` (light/dark) and `AdminContext` (auth). No Redux/Zustand/etc. | `src/contexts/` |
| Data fetching | axios `^1.6.2`, called from `useEffect` in components/hooks. No react-query/SWR, no caching | `src/services/*.ts`, `hooks/admin/*.ts` |
| Styling | Tailwind CSS `^3.4.1` (utility classes inline in JSX), `darkMode: 'class'`, no plugins. No CSS modules, no styled-components | `tailwind.config.js` |
| Global styles | Two files, both including the Tailwind layers: `src/index.css` (imported in `main.tsx`) and `src/styles/globals.css` (imported in `App.tsx`). `globals.css` also force-overrides dark-mode grays and **strips all gradients in dark mode** with `!important` | `src/index.css`, `src/styles/globals.css` |
| Animation | framer-motion `^10` (34 files), Lenis smooth scroll wrapping the whole app | `src/main.tsx:9-24` |
| Forms | react-hook-form (admin only); native inputs on public Contact form | — |
| Toasts | react-hot-toast `Toaster` in `App.tsx` | `src/App.tsx:132-155` |
| Icons | `react-icons/fa` (public + admin), `lucide-react` (admin) | — |
| SEO | react-helmet-async, per-page `<title>`/description | pages |
| Fonts | Google Fonts Poppins 300–700 via `<link>` in `index.html` | `index.html:7-9` |

Unused dependencies: `swiper`. The `three`/`dat.gui` code (`PerlinNoiseVisualizer.tsx`) is imported by `Hero.tsx`, but its render is commented out.

---

## 2. Route map

"Admin" = wrapped in `ProtectedRoute` (client-side guard, see §4). API paths are relative to `VITE_API_URL` (which already ends in `/api`).

| Route | Renders | Access | API calls |
|---|---|---|---|
| `/` | `pages/Home.tsx` | Public | `GET /founders` (via `FoundersSection`) |
| `/about` | `pages/About.tsx` | Public | `GET /founders`, `GET /team` |
| `/services` | `pages/Services.tsx` | Public | `GET /services` |
| `/work` | `pages/Work.tsx` | Public | `GET /projects` |
| `/products` | `pages/Products.tsx` | Public | `GET /products` |
| `/products/:slug` | `pages/ProductDetail.tsx` | Public | `GET /products/slug/:slug` |
| `/blog` | `pages/Blog.tsx` | Public | `GET /blog` |
| `/blog/:slug` | `pages/BlogDetail.tsx` | Public | `GET /blog/slug/:slug` |
| `/recognitions` | `pages/Recognitions.tsx` | Public | `GET /recognitions` |
| `/contact` | `pages/Contact.tsx` | Public | `POST /contact` |
| `/admin-login` | `pages/AdminLogin.tsx` | Public (redirects to `/admin` if logged in) | `POST /admin/login` |
| `/admin` (index) | `admin/founders/AdminFounders.tsx` in `AdminDashboardLayout` | Admin | `GET /founders` |
| `/admin/founders` | `admin/founders/AdminFounders.tsx` | Admin | `GET/POST /founders`, `PUT/DELETE /founders/:id` |
| `/admin/team` | `admin/team/AdminTeam.tsx` | Admin | `GET/POST /team`, `PUT/DELETE /team/:id` |
| `/admin/services` | `admin/services/AdminServices.tsx` | Admin | `GET/POST /services`, `PUT/DELETE /services/:id` |
| `/admin/projects` | `admin/projects/AdminProjects.tsx` | Admin | `GET/POST /projects`, `PUT/DELETE /projects/:id` |
| `/admin/products` | `admin/products/AdminProducts.tsx` | Admin | `GET /products`, `DELETE /products/:id` |
| `/admin/blog` | `admin/blog/AdminBlog.tsx` | Admin | `GET/POST /blog`, `PUT/DELETE /blog/:id` |
| `/admin/contacts` | `admin/contacts/AdminContacts.tsx` | Admin | `GET /contact`, `DELETE /contact/:id` |
| `/admin/partners` | `admin/partners/AdminPartners.tsx` | Admin | `GET/POST /partners`, `PUT/DELETE /partners/:id` |
| `/admin/recognitions` | `admin/recognitions/AdminRecognitions.tsx` | Admin | `GET/POST /recognitions`, `PUT/DELETE /recognitions/:id` |
| `/admin/dashboard` | `<Navigate to="/admin">` | — | — |
| `/admin/products/add` | `pages/AdminProductAdd.tsx` (outside the admin layout) | Admin | `POST /products` |
| `/admin/products/:id` | `pages/AdminProductDetails.tsx` (outside the admin layout) | Admin | `GET /products/:id`, `DELETE /products/:id` |
| `/admin/products/:id/edit` | `pages/AdminProductEdit.tsx` (outside the admin layout) | Admin | `GET /products/:id`, `PUT /products/:id`, `POST /products/:id/screenshots`, `DELETE /products/:id/screenshots/:index` |

Structural facts:
- There is **no 404 route**. Unknown URLs render Navbar + empty `<main>` + Footer.
- The public **Navbar and Footer render on every route, including `/admin-login` and all `/admin/*` pages**, because they sit outside `<Routes>` in `App.tsx:61,129`.
- `/partners` has no public page. `PartnersCarousel` exists but its render is commented out in Home.

---

## 3. Component inventory

★ = rendered on both public and admin sides. These are the risky ones to restyle, because a change shows up in both places.

### 3.1 Layout
| Component | Path | Notes |
|---|---|---|
| ★ `Navbar` | `components/common/Navbar.tsx` | Global, every route incl. admin. Theme toggle, logo swap by theme, mobile menu |
| ★ `Footer` | `components/common/Footer.tsx` | Global, every route incl. admin |
| ★ `CustomBgWrapper` | `components/reusables/CustomBgWrapper.tsx` | Wraps the entire app (gradient + blur blobs); affects admin backgrounds too |
| `HeroBgWrapper` | `components/common/HeroBgWrapper.tsx` | Page hero on About/Services/Work/Products/Contact/Blog/Recognitions; 50 random particles regenerated each render |
| `CTAWrapper` | `components/reusables/CTAWrapper.tsx` | Home and About CTA sections |
| `AdminDashboardLayout`, `AdminHeader`, `AdminSidebar` | `components/admin/` | Admin shell (not used by the 3 product admin pages) |
| `ProtectedRoute` | `components/common/ProtectedRoute.tsx` | Guard, no visual beyond spinner |

### 3.2 Public page sections
`Hero`, `ServicesPreview` (static content), `FoundersSection` + `about/FounderCard`, `TeamSection` + `about/TeamCard`, `services/ServiceCard`, `work/ProjectCard` + `work/ProjectDetailModal`, `products/ProductCard`, `blog/BlogCard`, `PartnersCarousel` (not rendered), `about/OurJourney` (unused), `about/StatsCounter` (unused), `PerlinNoiseVisualizer` (not rendered).

### 3.3 Shared UI (`components/reusables/` + `common/LoadingSpinner`)
| Component | Used on | Side |
|---|---|---|
| `GradientHeading` (renders `<h1>`) | Hero, Home, About, Services, Work, Products, Contact, Blog | Public |
| `SectionHeading` (renders `<h2>`) | Home, About, FoundersSection, ServicesPreview | Public |
| `ValueCard` | Home, About | Public |
| `CustomButton` | Hero, Home, About, Contact, ServicesPreview, ProjectDetailModal | Public |
| `Button` | all admin screens + 3 product admin pages | Admin |
| `Modal` | all admin modals | Admin |
| `FormInput` | all admin forms | Admin |
| `ImageUpload` | admin forms | Admin |
| `LoadingSpinner` | admin screens | Admin |

Note: every shared UI primitive is used on only one side. The public Contact form and AdminLogin use raw inputs, not `FormInput`. The only components that appear on both sides are the ★ layout pieces (Navbar, Footer, CustomBgWrapper) and the global CSS in `globals.css` and `index.css`, especially the dark-mode `!important` overrides.

### 3.4 Admin-only
`AdminBlog`, `admin/blog/BlogCard`, `BlogModal`, `AdminContacts`, `ContactCardAdmin`, `AdminFounders`, `FounderCardAdmin`, `FounderModalAdmin`, `AdminPartners`, `PartnerCardAdmin`, `PartnerModalAdmin`, `AdminProducts`, `admin/products/ProductCard`, `ProductAddForm`, `ProductEditForm`, `ScreenshotManager`, `AdminProjects`, `ProjectCardAdmin`, `ProjectModalAdmin`, `AdminRecognitions`, `AdminServices`, `ServiceCardAdmin`, `ServiceModalAdmin`, `AdminTeam`, `TeamCardAdmin`, `TeamModalAdmin`; pages `AdminLogin`, `AdminProductAdd`, `AdminProductDetails`, `AdminProductEdit`. Dead: `ProductModal`, `ProjectModalAdmin2` (byte-identical copy), `pages/AdminDashboard`.

### 3.5 Utilities
`contexts/ThemeContext`, `contexts/AdminContext`, `services/*` (11 axios modules), `hooks/admin/*` (8 hooks, **outside `src/`**), `utils/iconUtils.ts` (maps service `icon` strings to 13 `react-icons/fa` components, fallback `FaCode`), `types/index.ts`. Dead: `utils/uploadImage.ts`, `services/uploadService.ts` (calls a non-existent `/upload/image`), `constants/sampleProjectData.js`, `enhanced-project-model.js` (empty).

---

## 4. Auth

- **Storage:** JWT in `localStorage['admin_token']` (`contexts/AdminContext.tsx:67`). No cookies, no refresh.
- **Attaching:** Only 4 of the 11 service modules have an axios instance with a request interceptor that adds `Authorization: Bearer <token>`. They are `adminService`, `blogService`, `contactService` and `productsService` (lines 6–32 in each). A response interceptor on a 401 clears the token and hard-redirects to `/admin-login`.
- **The other 6 resource services (`founders`, `team`, `services`, `partners`, `projects`, `recognitions`) use plain `axios` with no token.** After the recent backend change, the backend requires `verifyToken` on POST/PUT/DELETE for those routes, so **every admin create/edit/delete on Founders, Team, Services, Partners, Projects and Recognitions now fails with 401**. Also, because these calls don't go through the interceptor, the 401 shows only an error toast and doesn't trigger the redirect.
- **Route guard:** `ProtectedRoute` reads `isAuthenticated` / `isLoading` from `AdminContext`. On mount, `AdminContext.checkAuth()` calls `GET /admin/profile` if a token exists. The guard is client-side only; the real enforcement is the backend.
- `logout()` clears local state, then fires `POST /admin/logout` (a no-op on the server).

---

## 5. Data fetching

- **Central client:** No. Each of the 11 files in `src/services/` builds its own `API_URL`; four of them each create their own duplicated axios instance with identical interceptors.
- **Base URL:** env var `VITE_API_URL` (must include `/api`), fallback `http://localhost:5000/api`, repeated in every service file. `.env.example` has the variable name only; no `.env` in the repo.
- **Loading state:** Most public pages have a `loading` boolean with a skeleton (`bg-gray-300 animate-pulse`). `Recognitions` has none. `FoundersSection`/`TeamSection` show skeletons; `PartnersCarousel` returns `null`.
- **Error state:** **Inconsistent and mostly absent on public pages.** Services, Work, Products, Blog, Recognitions, FoundersSection and TeamSection only `console.error`; the user sees an empty grid with no message. ProductDetail and BlogDetail fall through to a "Not Found" screen on *any* error (network or 404). Contact uses toasts. Admin list hooks use toasts; `useBlogAdmin`/`useProductsAdmin` store an `error` string that no component renders.
- **Empty state:** Public grids render nothing when the array is empty (no message). Recognitions has explicit empty-state copy.
- No caching, dedupe, retry, timeout or abort on unmount.

---

## 6. `dangerouslySetInnerHTML` with API HTML

| File:line | Source field | Sanitized? |
|---|---|---|
| `src/pages/ProductDetail.tsx:148` | `Product.fullDescription` | No |
| `src/pages/BlogDetail.tsx:125` | `BlogPost.content` | No |

No sanitizer is installed (no DOMPurify or equivalent in `package.json`). Those are the only two uses. `ProjectDetailModal.tsx:180` sets `innerHTML` in an image `onError` handler, but with a static string, not API data. `BlogDetail` wraps content in `prose` classes, but `@tailwindcss/typography` is not installed, so the injected HTML is effectively unstyled.

Other places that show API text render it as plain text (React-escaped): project descriptions, bios, excerpts and so on. `AdminProductDetails.tsx:139` shows `fullDescription` as plain text with `whitespace-pre-wrap`, so admins see raw HTML tags there.

---

## 7. Image handling

- All content images are plain `<img src={url}>` with the URL exactly as stored in MongoDB (Cloudinary `secure_url` for uploads; seed data uses pexels/unsplash URLs).
- **No Cloudinary transformations** (`f_auto`, `q_auto`, `w_…`) are applied anywhere. The full-size original is always downloaded.
- **No lazy loading** (`loading="lazy"` appears nowhere), no `srcset`/`sizes`, no `width`/`height` attributes (so there's layout shift), no placeholder/blur.
- Sizing is done with CSS `object-cover` at fixed heights (`h-48`, `h-64 md:h-96`, etc.).
- `alt` is set to the entity name/title on content images. The `ImageUpload` preview uses `alt="Preview"`.
- Error fallback exists only in `ProjectDetailModal` screenshots.
- Static logos: `/blackLogo.png` (light) and `/whiteLogo.png` (dark, **8192×2035 px**, ~123 KB) from `public/`.

---

## 8. Keep / replace

### Keep
| Item | Reason |
|---|---|
| Vite + React 18 + TypeScript | Works; no reason to change the build for a visual redesign |
| react-router-dom v6 and the URL structure | URLs may already be indexed and linked; the admin relies on them |
| Tailwind CSS | Everything is already expressed in utilities; the brand palette maps cleanly onto `theme.extend.colors` + CSS variables |
| `src/services/*` API signatures and payload shapes | They match the backend contract exactly (incl. multipart field names like `image`, `coverImage`, `screenshots`, `features[]`); the backend is off-limits |
| `AdminContext` + `ProtectedRoute` + `localStorage` token | Behaviour must not change; the admin is restyle-only |
| All admin components, hooks and forms (logic) | Rule: tokens and typography only |
| react-helmet-async | Per-page titles/descriptions; just change strings to "Bovine" |
| react-hot-toast | Fine; restyle via `toastOptions` in `App.tsx` |
| `iconUtils.ts` mapping | The `Service.icon` values stored in the DB are these exact names |

### Replace
| Item | Replace with | Reason |
|---|---|---|
| `tailwind.config.js` `primary`/`secondary` cyan/sky scales, all `bg-gradient-*`, `from-purple-*`, hardcoded navy hexes (`#06101f`, `#0a1b33`, …) | Brand tokens as CSS variables (`--terracotta`, `--cream`, …) exposed as Tailwind colors | The brand palette is fixed; current colors are all off-palette |
| Dark mode (`ThemeContext`, `dark:` variants, `globals.css` `!important` overrides) | Remove from the public site (**decision needed from you**) | The fixed palette defines no dark variants; the overrides fight any new styling and also leak into the admin |
| Poppins | Brand typography (not yet specified; **needs your input**) | — |
| `GradientHeading` / `SectionHeading` gradient text | Solid-color headings | Gradient text isn't in the palette; terracotta text is only allowed at ≥24px |
| `HeroBgWrapper`, `CustomBgWrapper`, `CTAWrapper`, `Hero` particle/blob/grid backgrounds | Calm cream sections, optionally the glass recipe | Heavy decorative DOM (50 random particles re-randomized on every render), off-palette, no reduced-motion handling |
| framer-motion entrance/hover animations everywhere, Lenis smooth scroll | Minimal motion gated by `prefers-reduced-motion` | Accessibility baseline; Lenis hijacks scrolling and needs `data-lenis-prevent` workarounds in modals |
| Raw `dangerouslySetInnerHTML` (2 places) | A sanitizer (e.g. DOMPurify) plus typography styles for rich text | Rule 9; content is currently also unstyled |
| Plain `<img>` | A small `Image` component: `loading="lazy"`, `width`/`height`, Cloudinary `f_auto,q_auto,w_…` inserted into `/upload/` URLs only when the host is Cloudinary | Performance; frontend-only, no API change |
| Per-page `console.error`-only error handling | A shared loading/error/empty pattern | Users currently see blank grids on failure |
| Navbar/Footer rendered on admin routes | Split public layout vs admin layout via a layout route | Lets the public redesign proceed without touching the admin; the admin keeps its own shell |
| Missing 404 | A NotFound route | Unknown URLs render an empty page today |
| 11 duplicated `API_URL` definitions / 4 duplicated interceptors | One shared axios instance (same endpoints, same payloads) | Also the natural fix for the 6 services that no longer authenticate. That change is a behaviour fix, so it needs your approval under the admin rule |
| Hardcoded unverifiable claims (see §9.3) | Remove, or replace with content you supply | Rule: never invent content |
| `whiteLogo.png` 8192×2035 | Properly sized logo asset | Oversized download in the header on every page |
| Dead code (`ProductModal`, `ProjectModalAdmin2`, `AdminDashboard`, `OurJourney`, `StatsCounter`, `PerlinNoiseVisualizer`, `uploadService`, `uploadImage`, `sampleProjectData`, `enhanced-project-model.js`, `swiper`, `three`, `dat.gui`) | Delete | Reduces the surface to restyle and the bundle size |

---

## 9. Contradictions and drift

### 9.1 Code vs `../docs/FRONTEND.md`
| FRONTEND.md says | Reality now |
|---|---|
| §10: "Founders/team/services/partners/projects/recognitions write calls send no Authorization header; the backend does not require one for those routes." | The backend now applies `verifyToken` to POST/PUT/DELETE on all six routers (`bovinesense-website-backend/routes/*.routes.js`). The frontend still sends no token, so those admin writes fail with 401. The frontend code itself matches FRONTEND.md; the statement about the backend is stale. |

No other contradictions were found when the code was re-checked against FRONTEND.md for routes, component list, services, auth storage, env var, the `dangerouslySetInnerHTML` locations, and styling tokens.

### 9.2 `../docs/BACKEND.md` is also stale on the same point
§5.4 ("Where auth is applied") and the "Auth" column in §7.5–7.9 and §7.11 still list founders/team/services/partners/projects/recognitions writes as `No`. `controllers/admin.controller.js` no longer logs the login body or response (BACKEND.md §7.2 still says it does).

### 9.3 Code vs the brand rules (things the redesign must fix)
- The brand name "BovineSense" appears in UI copy, alt text and titles in: `index.html:10`, `Navbar.tsx:60`, `Footer.tsx:20,71`, `Home.tsx:43,55,57`, `About.tsx:58,59,80,83`, `Services.tsx:66,67`, `Work.tsx:59`, `Products.tsx:59`, `ProductDetail.tsx:70`, `Blog.tsx:60,61`, `BlogDetail.tsx:79`, `Recognitions.tsx:29,30`, `Contact.tsx:56,57`, `AdminLogin.tsx:55`. It should be "Bovine", with "BovineSense (Private) Limited" only in the footer legal line.
- Unverifiable claims hardcoded in the UI: `Hero.tsx:62` "Trusted by many worldwide"; `Home.tsx:120` "Free consultation available"; `Home.tsx:124` "24/7 support included"; `About.tsx:266` "Join hundreds of satisfied clients…". Also in not-rendered code: `Hero.tsx:119-122` stats, `OurJourney.tsx` milestones ("50+ experts", "Fortune 500"), and `PartnersCarousel.tsx:36` "Trusted by leading organizations worldwide".
- Positioning copy describes a generic AI/software agency (Hero "Building the Future with AI", `ServicesPreview`, About mission/values, meta descriptions), not AI + IoT livestock health monitoring. The copy needs to come from you.
- Contact details disagree: `Contact.tsx:145` `info@bovnehq.com` (typo) vs `Footer.tsx:39,61` `info@bovinehq.com`. The LinkedIn links also differ: `Contact.tsx:170` `/company/bovinesense/` vs `Footer.tsx:30` `/company/zynin/`.
- Contact CTAs with no action: `Contact.tsx:100-103` "Book Meeting"; `About.tsx:271-279` "Start Your Journey" / "Schedule Consultation".
