# Project Heart — Implementation Plan

**Version:** 1.0

**Status:** Planning

**Owner:** Avadesh Agarwal

**Confidential**

**Last Updated:** July 10, 2026

---

# Table of Contents

1. [Technology Decisions](#1-technology-decisions)
2. [Development Phases](#2-development-phases)
3. [Module Inventory](#3-module-inventory)
4. [Module Dependency Map](#4-module-dependency-map)
5. [Independent Modules](#5-independent-modules)
6. [Build Order](#6-build-order)
7. [File Inventory](#7-file-inventory)
8. [Complexity Estimates](#8-complexity-estimates)
9. [Testing Strategy](#9-testing-strategy)
10. [Deployment Milestones](#10-deployment-milestones)
11. [Git Commit Strategy](#11-git-commit-strategy)
12. [Risks](#12-risks)
13. [Future Expansion](#13-future-expansion)

---

# 1. Technology Decisions

## Frontend

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js 15 (App Router) | Server-side rendering for SEO and Open Graph; React ecosystem; file-based routing; API routes for backend-for-frontend |
| Language | TypeScript | Type safety across the entire codebase; better developer experience; fewer runtime errors |
| Styling | Vanilla CSS + CSS Modules | Maximum control over animations and theming; no external CSS framework dependency; aligns with PRD principle of premium design |
| Animation Library | Framer Motion | Production-grade React animation library; gesture support; layout animations; GPU-accelerated; reduced-motion support built in |
| Canvas/Particles | tsParticles (lightweight) | Ambient animations (confetti, hearts, snow, fireworks); tree-shakeable |
| State Management | Zustand | Lightweight; minimal boilerplate; excellent TypeScript support; no context provider nesting |
| Form Handling | React Hook Form + Zod | Performant forms; schema-based validation; TypeScript-first |
| Rich Text | Tiptap | Extensible; headless; perfect for letter/message editing |
| Audio Engine | Howler.js | Cross-browser audio playback; fade, loop, volume ducking; mobile-friendly |
| Image Editing | Browser-native Canvas API + custom hooks | Crop, rotate, filters without heavy library dependencies |
| QR Code | qrcode.react | Lightweight; customizable; React-native component |
| Date Handling | date-fns | Tree-shakeable; no mutable global state; lightweight |
| Icons | Lucide React | Consistent; lightweight; tree-shakeable |

## Backend

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Runtime | Node.js 22 LTS | Same language as frontend; excellent ecosystem; async I/O for media-heavy workloads |
| API Layer | Next.js Route Handlers + tRPC | End-to-end type safety; eliminates API contract drift; co-located with frontend |
| Database | PostgreSQL 16 (via Supabase) | Relational integrity for user-experience-section data model; JSONB for flexible section content; row-level security for privacy |
| ORM | Drizzle ORM | Type-safe; SQL-like syntax; lightweight; excellent PostgreSQL support; migration tooling |
| Authentication | NextAuth.js v5 (Auth.js) | Google OAuth and email/password out of the box; session management; CSRF protection |
| File Storage | Supabase Storage (S3-compatible) | Media uploads (photos, videos, audio); CDN-backed; access policies; presigned URLs |
| Media Processing | Sharp (images) + FFmpeg (video/audio) via background jobs | Image compression, format conversion, thumbnail generation; video trimming; audio compression |
| Background Jobs | BullMQ + Redis | Media processing queue; email dispatch; analytics aggregation; scheduled publishing |
| Email | Resend | Transactional emails; React Email templates; simple API |
| AI Features | OpenAI API (GPT-4o) | Message generation; caption generation; grammar check; content moderation |
| Payments | Razorpay (India primary) + Stripe (international) | UPI support for Indian market; Stripe for global reach |
| Analytics Engine | Custom (PostgreSQL + aggregation jobs) | Privacy-first; no third-party tracking; full data ownership |
| Search | PostgreSQL Full-Text Search | Sufficient for v1 scale; no additional service dependency |
| Caching | Redis (via Upstash) | Session caching; rate limiting; frequently accessed experience data |
| CDN | Cloudflare | Global edge caching; DDoS protection; image optimization; free SSL |

## Infrastructure

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Hosting | Vercel (frontend) + Supabase (backend) | Zero-config deployment for Next.js; edge functions; preview deployments per PR |
| CI/CD | GitHub Actions | Native GitHub integration; matrix testing; automated deployments |
| Monitoring | Sentry (errors) + Vercel Analytics (performance) | Error tracking with source maps; Core Web Vitals monitoring |
| Logging | Axiom | Structured logging; Vercel integration; cost-effective |
| Domain | projectheart.app | Primary domain; Cloudflare DNS |

## Development Tools

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Package Manager | pnpm | Fast; disk-efficient; strict dependency resolution |
| Linting | ESLint + Prettier | Consistent code style; auto-fixable rules |
| Git Hooks | Husky + lint-staged | Pre-commit linting; pre-push type checking |
| Testing | Vitest (unit) + Playwright (e2e) | Fast; Vite-compatible; native TypeScript; browser testing |
| Documentation | Markdown in /docs | Co-located with code; version-controlled; no external tool dependency |

---

# 2. Development Phases

## Phase 0 — Project Bootstrap

**Duration:** 1 week

**Goal:** Set up the development environment, tooling, CI/CD pipeline, and base project structure so that all subsequent development proceeds without friction.

**Deliverables:**

- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Configure pnpm workspace
- [ ] Set up ESLint, Prettier, Husky, lint-staged
- [ ] Configure Vitest and Playwright
- [ ] Set up GitHub repository with branch protection
- [ ] Configure GitHub Actions for CI (lint, type-check, test)
- [ ] Set up Vercel project with preview deployments
- [ ] Set up Supabase project (database, storage, auth)
- [ ] Configure environment variables and secrets management
- [ ] Create base folder structure
- [ ] Set up CSS design system tokens (colors, typography, spacing, shadows)
- [ ] Create base layout components (Container, Stack, Grid)
- [ ] Set up Drizzle ORM with initial migration
- [ ] Configure Sentry error tracking
- [ ] Create README with local development instructions

---

## Phase 1 — Foundation

**Duration:** 3–4 weeks

**Goal:** Build the core infrastructure that every other feature depends on. After Phase 1, a user can sign up, log in, see a dashboard, and navigate the app shell.

**Modules:**

- [ ] M01 — Design System
- [ ] M02 — Authentication
- [ ] M03 — User Profile
- [ ] M04 — Database Schema (core tables)
- [ ] M05 — Landing Page
- [ ] M06 — App Shell and Navigation
- [ ] M07 — Creator Dashboard (empty state)

**Exit Criteria:**

A new user can discover the landing page, sign up with Google or email, see an empty dashboard, and navigate between pages. The design system is complete and all subsequent UI development uses it.

---

## Phase 2 — Experience Builder (Core)

**Duration:** 4–5 weeks

**Goal:** Build the experience creation flow. After Phase 2, a creator can build a basic experience with photos, text, timeline, and a letter.

**Modules:**

- [ ] M08 — Experience Data Model
- [ ] M09 — Experience Builder Shell (section management, drag-and-drop, reorder)
- [ ] M10 — Media Upload and Processing Pipeline
- [ ] M11 — Section Type: Cover Page
- [ ] M12 — Section Type: Letter
- [ ] M13 — Section Type: Photo Gallery
- [ ] M14 — Section Type: Timeline
- [ ] M15 — Section Type: Text Message
- [ ] M16 — Theme Engine (core themes)
- [ ] M17 — Auto-Save System
- [ ] M18 — Builder Live Preview

**Exit Criteria:**

A creator can create an experience, add sections (cover, letter, gallery, timeline, text), upload photos, apply a theme, auto-save progress, and preview the experience in the builder.

---

## Phase 3 — Recipient Experience (Core)

**Duration:** 3–4 weeks

**Goal:** Build the public-facing recipient experience. After Phase 3, a shared link opens a beautiful, animated, scrollable experience.

**Modules:**

- [ ] M19 — Experience Renderer (public page)
- [ ] M20 — Loading Screen
- [ ] M21 — Welcome Screen
- [ ] M22 — Section Scroll Engine (full-page snap, progress indicator)
- [ ] M23 — Section Transition Animations
- [ ] M24 — Content Reveal Animations
- [ ] M25 — Ambient Animation System (particles, gradients)
- [ ] M26 — Closing Screen
- [ ] M27 — Open Graph and SEO Meta Tags

**Exit Criteria:**

A recipient can open a shared link, see a branded loading screen, experience a cinematic welcome screen, scroll through sections with smooth animations, and reach a satisfying closing screen. Open Graph cards render correctly in WhatsApp, Instagram, and Telegram.

---

## Phase 4 — Music and Audio

**Duration:** 2 weeks

**Goal:** Add background music and voice note support to both the builder and recipient experience.

**Modules:**

- [ ] M28 — Music Library (royalty-free tracks, categorized by mood and genre)
- [ ] M29 — Music Player Engine (autoplay, fade, loop, duck, crossfade)
- [ ] M30 — Music Controls UI (floating player for recipient)
- [ ] M31 — Voice Note Recording and Playback
- [ ] M32 — Builder: Music Selection UI

**Exit Criteria:**

A creator can select background music from a library or upload their own. The recipient hears music that fades in softly, ducks during video playback, loops seamlessly, and can be muted with a floating control.

---

## Phase 5 — Interactive Sections

**Duration:** 4–5 weeks

**Goal:** Build the interactive section types that make Project Heart unique — games, quizzes, reveals, and surprise elements.

**Modules:**

- [ ] M33 — Section Type: Quiz Game
- [ ] M34 — Section Type: Memory Card Matching
- [ ] M35 — Section Type: Scratch Card Reveal
- [ ] M36 — Section Type: Spin the Wheel
- [ ] M37 — Section Type: This or That
- [ ] M38 — Section Type: Countdown Timer
- [ ] M39 — Tap to Reveal System
- [ ] M40 — Shake to Reveal (with tap fallback)
- [ ] M41 — Long Press to Reveal
- [ ] M42 — Confetti / Hearts / Fireworks Celebration System
- [ ] M43 — Easter Egg System

**Exit Criteria:**

A creator can add interactive sections to their experience. The recipient can play quizzes, match cards, scratch to reveal, spin a wheel, and encounter surprise celebration animations. All interactions work on mobile with graceful fallbacks.

---

## Phase 6 — Publishing and Sharing

**Duration:** 2–3 weeks

**Goal:** Build the publish flow, link generation, sharing system, and privacy controls.

**Modules:**

- [ ] M44 — Publish Flow (draft → publish → unpublish)
- [ ] M45 — Unique Link Generation (short URLs, custom slugs)
- [ ] M46 — QR Code Generation
- [ ] M47 — Share Sheet (WhatsApp, Instagram, Telegram, Email, Copy Link)
- [ ] M48 — Privacy Controls (public, private, password-protected, expiry, view limits)
- [ ] M49 — Password Gate (recipient-facing)
- [ ] M50 — Scheduled Publishing

**Exit Criteria:**

A creator can publish an experience, get a shareable link and QR code, share via WhatsApp/Telegram/Email with one tap, set a password, set an expiry date, and schedule future publishing. The recipient encounters a warm password screen for protected experiences.

---

## Phase 7 — Reactions and Analytics

**Duration:** 2–3 weeks

**Goal:** Allow recipients to react to experiences and give creators visibility into how their experience is performing.

**Modules:**

- [ ] M51 — Recipient Reaction System (emoji, text message back to creator)
- [ ] M52 — Analytics Data Collection (views, time spent, section interactions)
- [ ] M53 — Analytics Dashboard (creator-facing)
- [ ] M54 — Real-Time View Counter
- [ ] M55 — Notification System (email notifications for views, reactions)

**Exit Criteria:**

Recipients can send reactions after finishing an experience. Creators see view counts, time spent, section engagement, device breakdown, and reactions in a dashboard. Creators receive email notifications for new views and reactions.

---

## Phase 8 — Templates and Themes

**Duration:** 2–3 weeks

**Goal:** Build a template library and a rich theme engine so creators can produce stunning experiences in minutes.

**Modules:**

- [ ] M56 — Template Data Model and Storage
- [ ] M57 — Template Gallery UI (browse, search, filter by occasion)
- [ ] M58 — Template Preview
- [ ] M59 — Template Application (one-click start from template)
- [ ] M60 — Theme Engine (extended: 15+ themes with animated backgrounds)
- [ ] M61 — Per-Section Theme Override
- [ ] M62 — Custom Color and Font Picker

**Exit Criteria:**

A creator can browse templates by occasion, preview them, and start building with one click. The theme engine supports 15+ themes including animated backgrounds, and creators can override themes per section.

---

## Phase 9 — AI Features

**Duration:** 2–3 weeks

**Goal:** Add AI-powered features that reduce creator effort and improve experience quality.

**Modules:**

- [ ] M63 — AI Message Generator (love letters, birthday messages, poems)
- [ ] M64 — AI Photo Caption Generator
- [ ] M65 — AI Theme and Template Recommender
- [ ] M66 — AI Grammar and Spell Check
- [ ] M67 — AI Content Moderation
- [ ] M68 — AI Music Recommendation

**Exit Criteria:**

A creator can generate messages, captions, and poems with AI. The system recommends themes based on occasion. Grammar is auto-checked. Uploaded content is moderated for policy compliance.

---

## Phase 10 — Payments and Premium

**Duration:** 2–3 weeks

**Goal:** Implement the freemium business model with subscription billing.

**Modules:**

- [ ] M69 — Pricing Tiers and Feature Gating
- [ ] M70 — Razorpay Integration (India)
- [ ] M71 — Stripe Integration (International)
- [ ] M72 — Subscription Management (upgrade, downgrade, cancel, renew)
- [ ] M73 — Promo Code System
- [ ] M74 — Billing Dashboard and Invoice History
- [ ] M75 — Free Trial System

**Exit Criteria:**

Users can subscribe to premium plans, pay via UPI/card/Razorpay/Stripe, manage their subscription, apply promo codes, and view billing history. Free tier limits are enforced. Premium features are gated.

---

## Phase 11 — Edge Cases, Accessibility, and Polish

**Duration:** 2–3 weeks

**Goal:** Handle every edge case from the Recipient Journey PRD, achieve WCAG 2.1 AA compliance, and polish the entire product.

**Modules:**

- [ ] M76 — Slow Connection Handling (progressive loading, blur-up, offline indicator)
- [ ] M77 — Missing Media Fallbacks (themed placeholders, section skipping)
- [ ] M78 — Expired Link Page
- [ ] M79 — Unsupported Browser Fallback Page
- [ ] M80 — 404 and Error Pages
- [ ] M81 — Accessibility Audit and Remediation
- [ ] M82 — Reduced Motion Support
- [ ] M83 — Screen Reader Optimization
- [ ] M84 — Keyboard Navigation
- [ ] M85 — Performance Optimization (Lighthouse 90+)
- [ ] M86 — Return Visit Handling (welcome back, section navigation, cache)

**Exit Criteria:**

Lighthouse scores are 90+ across all categories. The experience degrades gracefully on slow connections and older browsers. All interactive elements have keyboard and screen reader support. The expired link page and 404 page are warm and on-brand.

---

## Phase 12 — Admin Panel

**Duration:** 2 weeks

**Goal:** Build an internal admin panel for content management, user management, and system monitoring.

**Modules:**

- [ ] M87 — Admin Authentication and Role-Based Access
- [ ] M88 — Admin Dashboard (users, experiences, revenue)
- [ ] M89 — User Management (search, ban, suspend, delete)
- [ ] M90 — Experience Moderation (flagged content review, takedown)
- [ ] M91 — Template Management (upload, edit, delete)
- [ ] M92 — Music Library Management
- [ ] M93 — System Health Monitoring
- [ ] M94 — Feature Flag Management

**Exit Criteria:**

Admins can manage users, moderate content, upload templates and music, toggle feature flags, and monitor system health. All admin actions are audit-logged.

---

## Phase 13 — Launch Preparation

**Duration:** 1–2 weeks

**Goal:** Final testing, security audit, performance tuning, documentation, and production deployment.

**Modules:**

- [ ] M95 — Security Audit (OWASP Top 10, CSP headers, rate limiting)
- [ ] M96 — Load Testing
- [ ] M97 — Data Backup and Disaster Recovery Setup
- [ ] M98 — Production Environment Configuration
- [ ] M99 — Monitoring and Alerting Setup
- [ ] M100 — Launch Checklist Execution

**Exit Criteria:**

The product is deployed to production, secured, monitored, backed up, and ready for public traffic.

---

# 3. Module Inventory

| ID | Module | Phase | Category |
|----|--------|-------|----------|
| M01 | Design System | 1 | Frontend |
| M02 | Authentication | 1 | Full Stack |
| M03 | User Profile | 1 | Full Stack |
| M04 | Database Schema (core) | 1 | Backend |
| M05 | Landing Page | 1 | Frontend |
| M06 | App Shell and Navigation | 1 | Frontend |
| M07 | Creator Dashboard | 1 | Full Stack |
| M08 | Experience Data Model | 2 | Backend |
| M09 | Experience Builder Shell | 2 | Frontend |
| M10 | Media Upload Pipeline | 2 | Full Stack |
| M11 | Section: Cover Page | 2 | Full Stack |
| M12 | Section: Letter | 2 | Full Stack |
| M13 | Section: Photo Gallery | 2 | Full Stack |
| M14 | Section: Timeline | 2 | Full Stack |
| M15 | Section: Text Message | 2 | Full Stack |
| M16 | Theme Engine (core) | 2 | Frontend |
| M17 | Auto-Save System | 2 | Full Stack |
| M18 | Builder Live Preview | 2 | Frontend |
| M19 | Experience Renderer | 3 | Frontend |
| M20 | Loading Screen | 3 | Frontend |
| M21 | Welcome Screen | 3 | Frontend |
| M22 | Section Scroll Engine | 3 | Frontend |
| M23 | Section Transition Animations | 3 | Frontend |
| M24 | Content Reveal Animations | 3 | Frontend |
| M25 | Ambient Animation System | 3 | Frontend |
| M26 | Closing Screen | 3 | Frontend |
| M27 | Open Graph and SEO | 3 | Full Stack |
| M28 | Music Library | 4 | Full Stack |
| M29 | Music Player Engine | 4 | Frontend |
| M30 | Music Controls UI | 4 | Frontend |
| M31 | Voice Note Recording | 4 | Full Stack |
| M32 | Builder Music Selection | 4 | Frontend |
| M33 | Section: Quiz Game | 5 | Full Stack |
| M34 | Section: Memory Cards | 5 | Full Stack |
| M35 | Section: Scratch Card | 5 | Frontend |
| M36 | Section: Spin the Wheel | 5 | Frontend |
| M37 | Section: This or That | 5 | Full Stack |
| M38 | Section: Countdown Timer | 5 | Frontend |
| M39 | Tap to Reveal System | 5 | Frontend |
| M40 | Shake to Reveal | 5 | Frontend |
| M41 | Long Press to Reveal | 5 | Frontend |
| M42 | Celebration Animation System | 5 | Frontend |
| M43 | Easter Egg System | 5 | Frontend |
| M44 | Publish Flow | 6 | Full Stack |
| M45 | Link Generation | 6 | Full Stack |
| M46 | QR Code Generation | 6 | Frontend |
| M47 | Share Sheet | 6 | Frontend |
| M48 | Privacy Controls | 6 | Full Stack |
| M49 | Password Gate | 6 | Full Stack |
| M50 | Scheduled Publishing | 6 | Full Stack |
| M51 | Recipient Reactions | 7 | Full Stack |
| M52 | Analytics Collection | 7 | Full Stack |
| M53 | Analytics Dashboard | 7 | Full Stack |
| M54 | Real-Time View Counter | 7 | Full Stack |
| M55 | Notification System | 7 | Full Stack |
| M56 | Template Data Model | 8 | Backend |
| M57 | Template Gallery UI | 8 | Frontend |
| M58 | Template Preview | 8 | Frontend |
| M59 | Template Application | 8 | Full Stack |
| M60 | Theme Engine (extended) | 8 | Frontend |
| M61 | Per-Section Theme Override | 8 | Frontend |
| M62 | Custom Color and Font Picker | 8 | Frontend |
| M63 | AI Message Generator | 9 | Full Stack |
| M64 | AI Photo Caption | 9 | Full Stack |
| M65 | AI Recommender | 9 | Full Stack |
| M66 | AI Grammar Check | 9 | Full Stack |
| M67 | AI Content Moderation | 9 | Full Stack |
| M68 | AI Music Recommendation | 9 | Full Stack |
| M69 | Pricing and Feature Gating | 10 | Full Stack |
| M70 | Razorpay Integration | 10 | Full Stack |
| M71 | Stripe Integration | 10 | Full Stack |
| M72 | Subscription Management | 10 | Full Stack |
| M73 | Promo Code System | 10 | Full Stack |
| M74 | Billing Dashboard | 10 | Full Stack |
| M75 | Free Trial System | 10 | Full Stack |
| M76 | Slow Connection Handling | 11 | Frontend |
| M77 | Missing Media Fallbacks | 11 | Frontend |
| M78 | Expired Link Page | 11 | Frontend |
| M79 | Unsupported Browser Fallback | 11 | Frontend |
| M80 | Error Pages | 11 | Frontend |
| M81 | Accessibility Audit | 11 | Frontend |
| M82 | Reduced Motion Support | 11 | Frontend |
| M83 | Screen Reader Optimization | 11 | Frontend |
| M84 | Keyboard Navigation | 11 | Frontend |
| M85 | Performance Optimization | 11 | Full Stack |
| M86 | Return Visit Handling | 11 | Full Stack |
| M87 | Admin Auth | 12 | Full Stack |
| M88 | Admin Dashboard | 12 | Full Stack |
| M89 | User Management (admin) | 12 | Full Stack |
| M90 | Experience Moderation | 12 | Full Stack |
| M91 | Template Management (admin) | 12 | Full Stack |
| M92 | Music Library Management (admin) | 12 | Full Stack |
| M93 | System Health Monitoring | 12 | Full Stack |
| M94 | Feature Flag Management | 12 | Full Stack |
| M95 | Security Audit | 13 | DevOps |
| M96 | Load Testing | 13 | DevOps |
| M97 | Backup and Recovery | 13 | DevOps |
| M98 | Production Config | 13 | DevOps |
| M99 | Monitoring and Alerting | 13 | DevOps |
| M100 | Launch Checklist | 13 | Operations |

---

# 4. Module Dependency Map

```
M01 Design System
 └── No dependencies (build first)

M04 Database Schema
 └── No dependencies (build first)

M02 Authentication
 ├── M01 Design System
 └── M04 Database Schema

M03 User Profile
 ├── M01 Design System
 ├── M02 Authentication
 └── M04 Database Schema

M05 Landing Page
 └── M01 Design System

M06 App Shell
 ├── M01 Design System
 └── M02 Authentication

M07 Creator Dashboard
 ├── M06 App Shell
 ├── M02 Authentication
 └── M04 Database Schema

M08 Experience Data Model
 └── M04 Database Schema

M09 Experience Builder Shell
 ├── M06 App Shell
 ├── M08 Experience Data Model
 └── M01 Design System

M10 Media Upload Pipeline
 ├── M04 Database Schema
 └── M02 Authentication

M11–M15 Section Types (Cover, Letter, Gallery, Timeline, Text)
 ├── M08 Experience Data Model
 ├── M09 Builder Shell
 └── M10 Media Upload Pipeline

M16 Theme Engine
 └── M01 Design System

M17 Auto-Save
 ├── M08 Experience Data Model
 └── M09 Builder Shell

M18 Builder Preview
 ├── M09 Builder Shell
 ├── M11–M15 Section Types
 └── M16 Theme Engine

M19 Experience Renderer
 ├── M08 Experience Data Model
 ├── M11–M15 Section Types
 └── M16 Theme Engine

M20–M26 Recipient Experience (Loading, Welcome, Scroll, Transitions, Reveals, Ambient, Closing)
 └── M19 Experience Renderer

M27 Open Graph / SEO
 ├── M08 Experience Data Model
 └── M19 Experience Renderer

M28–M32 Music System
 ├── M10 Media Upload Pipeline
 └── M19 Experience Renderer

M33–M43 Interactive Sections
 ├── M08 Experience Data Model
 ├── M09 Builder Shell
 └── M19 Experience Renderer

M44–M50 Publishing and Sharing
 ├── M08 Experience Data Model
 ├── M19 Experience Renderer
 └── M02 Authentication

M51–M55 Reactions and Analytics
 ├── M08 Experience Data Model
 ├── M19 Experience Renderer
 └── M02 Authentication

M56–M62 Templates and Themes
 ├── M08 Experience Data Model
 ├── M09 Builder Shell
 └── M16 Theme Engine

M63–M68 AI Features
 ├── M08 Experience Data Model
 ├── M09 Builder Shell
 └── M10 Media Upload Pipeline

M69–M75 Payments
 ├── M02 Authentication
 ├── M03 User Profile
 └── M04 Database Schema

M76–M86 Polish and Accessibility
 └── M19 Experience Renderer (and all preceding modules)

M87–M94 Admin Panel
 ├── M02 Authentication
 ├── M04 Database Schema
 └── M01 Design System

M95–M100 Launch Preparation
 └── All preceding modules
```

---

# 5. Independent Modules

The following modules can be developed in parallel by different developers because they have no dependencies on each other.

## Parallel Track A — Design and Landing

- M01 Design System
- M05 Landing Page (after M01)

## Parallel Track B — Backend Foundation

- M04 Database Schema
- M08 Experience Data Model (after M04)

## Parallel Track C — Authentication

- M02 Authentication (after M01, M04)

## Parallel Track D — Section Types (once M09 is complete)

Each section type can be developed independently and in parallel:

- M11 Cover Page
- M12 Letter
- M13 Photo Gallery
- M14 Timeline
- M15 Text Message
- M33 Quiz Game
- M34 Memory Cards
- M35 Scratch Card
- M36 Spin the Wheel
- M37 This or That
- M38 Countdown Timer

## Parallel Track E — Interactive Systems (once M19 is complete)

Each interactive system can be developed independently:

- M39 Tap to Reveal
- M40 Shake to Reveal
- M41 Long Press to Reveal
- M42 Celebration Animations
- M43 Easter Egg System

## Parallel Track F — AI Features (once M08, M09 are complete)

All AI modules are independent of each other:

- M63 AI Message Generator
- M64 AI Photo Caption
- M65 AI Recommender
- M66 AI Grammar Check
- M67 AI Content Moderation
- M68 AI Music Recommendation

## Parallel Track G — Admin Panel (once M02, M04 are complete)

The admin panel can be built entirely independently from the consumer-facing product:

- M87–M94 (all admin modules)

---

# 6. Build Order

The strict build order respects all dependency chains.

```
Week 1        → Phase 0: Project Bootstrap
                  ↓
Week 2–3      → M01 Design System + M04 Database Schema (parallel)
                  ↓
Week 3–4      → M02 Authentication + M05 Landing Page (parallel)
                  ↓
Week 4–5      → M03 User Profile + M06 App Shell + M07 Dashboard
                  ↓
Week 5–6      → M08 Experience Data Model + M10 Media Upload
                  ↓
Week 6–8      → M09 Builder Shell + M16 Theme Engine (parallel)
                  ↓
Week 8–10     → M11–M15 Section Types (parallel) + M17 Auto-Save
                  ↓
Week 10–11    → M18 Builder Preview
                  ↓
Week 11–14    → M19 Renderer + M20–M26 Recipient Experience
                  ↓
Week 14–15    → M27 Open Graph / SEO
                  ↓
Week 15–17    → M28–M32 Music System
                  ↓
Week 17–21    → M33–M43 Interactive Sections (parallel tracks)
                  ↓
Week 21–23    → M44–M50 Publishing and Sharing
                  ↓
Week 23–25    → M51–M55 Reactions and Analytics
                  ↓
Week 25–27    → M56–M62 Templates and Themes
                  ↓
Week 27–29    → M63–M68 AI Features
                  ↓
Week 29–31    → M69–M75 Payments
                  ↓
Week 31–33    → M76–M86 Polish and Accessibility
                  ↓
Week 33–35    → M87–M94 Admin Panel (can overlap with Phase 11)
                  ↓
Week 35–36    → M95–M100 Launch Preparation
```

**Total estimated timeline: 36 weeks (9 months) for a solo developer.**

**With a 2-person team: 20–24 weeks (5–6 months).**

**With a 3-person team: 16–18 weeks (4–4.5 months).**

---

# 7. File Inventory

## Root Structure

```
project-heart/
├── docs/                          # Documentation (existing)
├── src/
│   ├── app/                       # Next.js App Router pages
│   ├── components/                # Shared React components
│   ├── lib/                       # Utility functions and shared logic
│   ├── server/                    # Server-side code (tRPC, db, services)
│   ├── styles/                    # Global CSS and design tokens
│   ├── hooks/                     # Custom React hooks
│   ├── stores/                    # Zustand state stores
│   ├── types/                     # Shared TypeScript types
│   └── assets/                    # Static assets (fonts, icons, images)
├── public/                        # Public static files
├── prisma/                        # Database migrations (if using Prisma, or drizzle/)
├── tests/                         # Test files
├── scripts/                       # Build and utility scripts
└── config files                   # package.json, tsconfig, etc.
```

## Detailed File Inventory by Module

### Phase 0 — Bootstrap (~15 files)

```
package.json
pnpm-lock.yaml
tsconfig.json
next.config.ts
.eslintrc.json
.prettierrc
.gitignore
.env.local
.env.example
.github/workflows/ci.yml
.github/workflows/deploy.yml
.husky/pre-commit
.husky/pre-push
vitest.config.ts
playwright.config.ts
```

### M01 — Design System (~20 files)

```
src/styles/globals.css
src/styles/tokens.css                  # CSS custom properties (colors, spacing, typography, shadows, radii)
src/styles/reset.css                   # CSS reset / normalize
src/styles/animations.css              # Reusable keyframe definitions
src/styles/utilities.css               # Utility classes (visually-hidden, etc.)
src/components/ui/Button/Button.tsx
src/components/ui/Button/Button.module.css
src/components/ui/Input/Input.tsx
src/components/ui/Input/Input.module.css
src/components/ui/Card/Card.tsx
src/components/ui/Card/Card.module.css
src/components/ui/Modal/Modal.tsx
src/components/ui/Modal/Modal.module.css
src/components/ui/Toast/Toast.tsx
src/components/ui/Toast/Toast.module.css
src/components/ui/Spinner/Spinner.tsx
src/components/ui/Spinner/Spinner.module.css
src/components/layout/Container/Container.tsx
src/components/layout/Stack/Stack.tsx
src/components/layout/Grid/Grid.tsx
```

### M02 — Authentication (~12 files)

```
src/app/(auth)/login/page.tsx
src/app/(auth)/login/login.module.css
src/app/(auth)/signup/page.tsx
src/app/(auth)/signup/signup.module.css
src/app/(auth)/forgot-password/page.tsx
src/app/(auth)/verify-email/page.tsx
src/app/api/auth/[...nextauth]/route.ts
src/lib/auth/auth-config.ts
src/lib/auth/auth-utils.ts
src/server/services/auth-service.ts
src/hooks/useAuth.ts
src/stores/auth-store.ts
```

### M04 — Database Schema (~8 files)

```
src/server/db/index.ts                 # Database client
src/server/db/schema/users.ts
src/server/db/schema/experiences.ts
src/server/db/schema/sections.ts
src/server/db/schema/media.ts
src/server/db/schema/index.ts
src/server/db/migrations/0001_initial.sql
src/server/db/seed.ts
```

### M05 — Landing Page (~10 files)

```
src/app/(marketing)/page.tsx
src/app/(marketing)/page.module.css
src/components/marketing/Hero/Hero.tsx
src/components/marketing/Hero/Hero.module.css
src/components/marketing/Features/Features.tsx
src/components/marketing/Features/Features.module.css
src/components/marketing/Pricing/Pricing.tsx
src/components/marketing/Pricing/Pricing.module.css
src/components/marketing/Footer/Footer.tsx
src/components/marketing/Navbar/Navbar.tsx
```

### M06–M07 — App Shell and Dashboard (~12 files)

```
src/app/(app)/layout.tsx
src/app/(app)/layout.module.css
src/app/(app)/dashboard/page.tsx
src/app/(app)/dashboard/dashboard.module.css
src/components/app/Sidebar/Sidebar.tsx
src/components/app/Sidebar/Sidebar.module.css
src/components/app/Header/Header.tsx
src/components/app/Header/Header.module.css
src/components/app/ExperienceCard/ExperienceCard.tsx
src/components/app/ExperienceCard/ExperienceCard.module.css
src/components/app/EmptyState/EmptyState.tsx
src/server/api/routers/experience-router.ts
```

### M08–M18 — Experience Builder (~60 files)

```
src/app/(app)/builder/[id]/page.tsx
src/app/(app)/builder/[id]/builder.module.css
src/components/builder/BuilderShell/BuilderShell.tsx
src/components/builder/SectionPanel/SectionPanel.tsx
src/components/builder/SectionList/SectionList.tsx
src/components/builder/SectionEditor/SectionEditor.tsx
src/components/builder/SectionTypeSelector/SectionTypeSelector.tsx
src/components/builder/Toolbar/Toolbar.tsx
src/components/builder/PreviewPanel/PreviewPanel.tsx
src/components/builder/ThemePicker/ThemePicker.tsx
src/components/builder/sections/CoverEditor.tsx
src/components/builder/sections/LetterEditor.tsx
src/components/builder/sections/GalleryEditor.tsx
src/components/builder/sections/TimelineEditor.tsx
src/components/builder/sections/TextMessageEditor.tsx
src/components/builder/MediaUploader/MediaUploader.tsx
src/components/builder/MediaLibrary/MediaLibrary.tsx
src/components/builder/ImageEditor/ImageEditor.tsx
src/hooks/useBuilder.ts
src/hooks/useAutoSave.ts
src/hooks/useMediaUpload.ts
src/stores/builder-store.ts
src/server/api/routers/builder-router.ts
src/server/api/routers/media-router.ts
src/server/services/media-service.ts
src/server/services/experience-service.ts
src/server/jobs/media-processing.ts
src/lib/themes/index.ts
src/lib/themes/romantic.ts
src/lib/themes/minimal.ts
src/lib/themes/vintage.ts
(additional theme files × 10+)
```

### M19–M27 — Recipient Experience (~40 files)

```
src/app/(experience)/[slug]/page.tsx
src/app/(experience)/[slug]/experience.module.css
src/components/experience/ExperienceRenderer/ExperienceRenderer.tsx
src/components/experience/LoadingScreen/LoadingScreen.tsx
src/components/experience/LoadingScreen/LoadingScreen.module.css
src/components/experience/WelcomeScreen/WelcomeScreen.tsx
src/components/experience/WelcomeScreen/WelcomeScreen.module.css
src/components/experience/ScrollEngine/ScrollEngine.tsx
src/components/experience/ScrollEngine/ScrollEngine.module.css
src/components/experience/ProgressIndicator/ProgressIndicator.tsx
src/components/experience/ClosingScreen/ClosingScreen.tsx
src/components/experience/ClosingScreen/ClosingScreen.module.css
src/components/experience/sections/CoverRenderer.tsx
src/components/experience/sections/LetterRenderer.tsx
src/components/experience/sections/GalleryRenderer.tsx
src/components/experience/sections/TimelineRenderer.tsx
src/components/experience/sections/TextMessageRenderer.tsx
src/components/experience/transitions/FadeTransition.tsx
src/components/experience/transitions/SlideTransition.tsx
src/components/experience/transitions/ParallaxTransition.tsx
src/components/experience/ambient/Particles.tsx
src/components/experience/ambient/FloatingHearts.tsx
src/components/experience/ambient/GradientBackground.tsx
src/hooks/useScrollSnap.ts
src/hooks/useIntersectionReveal.ts
src/hooks/useReducedMotion.ts
src/lib/og/generate-og-image.ts
src/app/api/og/[slug]/route.ts
```

### M28–M32 — Music System (~12 files)

```
src/components/experience/MusicPlayer/MusicPlayer.tsx
src/components/experience/MusicPlayer/MusicPlayer.module.css
src/components/experience/MusicPrompt/MusicPrompt.tsx
src/components/builder/MusicSelector/MusicSelector.tsx
src/components/builder/MusicSelector/MusicSelector.module.css
src/components/builder/VoiceRecorder/VoiceRecorder.tsx
src/hooks/useMusicPlayer.ts
src/hooks/useVoiceRecorder.ts
src/lib/audio/audio-engine.ts
src/lib/audio/volume-duck.ts
src/server/api/routers/music-router.ts
src/server/db/schema/music.ts
```

### M33–M43 — Interactive Sections (~35 files)

```
src/components/builder/sections/QuizEditor.tsx
src/components/builder/sections/MemoryCardEditor.tsx
src/components/builder/sections/ScratchCardEditor.tsx
src/components/builder/sections/SpinWheelEditor.tsx
src/components/builder/sections/ThisOrThatEditor.tsx
src/components/builder/sections/CountdownEditor.tsx
src/components/experience/sections/QuizRenderer.tsx
src/components/experience/sections/MemoryCardRenderer.tsx
src/components/experience/sections/ScratchCardRenderer.tsx
src/components/experience/sections/SpinWheelRenderer.tsx
src/components/experience/sections/ThisOrThatRenderer.tsx
src/components/experience/sections/CountdownRenderer.tsx
src/components/experience/interactions/TapReveal.tsx
src/components/experience/interactions/ShakeReveal.tsx
src/components/experience/interactions/LongPressReveal.tsx
src/components/experience/celebrations/Confetti.tsx
src/components/experience/celebrations/Hearts.tsx
src/components/experience/celebrations/Fireworks.tsx
src/components/experience/celebrations/Balloons.tsx
src/components/experience/celebrations/Snow.tsx
src/components/experience/EasterEgg/EasterEgg.tsx
src/hooks/useDeviceMotion.ts
src/hooks/useLongPress.ts
src/hooks/useScratchCanvas.ts
src/hooks/useSpinWheel.ts
src/lib/games/quiz-engine.ts
src/lib/games/memory-engine.ts
src/lib/games/score-calculator.ts
```

### M44–M50 — Publishing and Sharing (~15 files)

```
src/components/builder/PublishDialog/PublishDialog.tsx
src/components/builder/ShareSheet/ShareSheet.tsx
src/components/builder/QRCodeDisplay/QRCodeDisplay.tsx
src/components/builder/PrivacySettings/PrivacySettings.tsx
src/components/experience/PasswordGate/PasswordGate.tsx
src/components/experience/PasswordGate/PasswordGate.module.css
src/server/api/routers/publish-router.ts
src/server/services/publish-service.ts
src/server/services/link-service.ts
src/server/jobs/scheduled-publish.ts
src/hooks/useShareSheet.ts
src/lib/share/share-utils.ts
src/lib/share/og-utils.ts
src/server/db/schema/links.ts
src/server/db/schema/publish.ts
```

### M51–M55 — Reactions and Analytics (~18 files)

```
src/components/experience/ReactionBar/ReactionBar.tsx
src/components/experience/ReactionBar/ReactionBar.module.css
src/components/experience/ReactionDialog/ReactionDialog.tsx
src/app/(app)/analytics/[id]/page.tsx
src/app/(app)/analytics/[id]/analytics.module.css
src/components/analytics/ViewChart/ViewChart.tsx
src/components/analytics/SectionEngagement/SectionEngagement.tsx
src/components/analytics/DeviceBreakdown/DeviceBreakdown.tsx
src/components/analytics/ReactionSummary/ReactionSummary.tsx
src/server/api/routers/analytics-router.ts
src/server/api/routers/reaction-router.ts
src/server/services/analytics-service.ts
src/server/services/notification-service.ts
src/server/jobs/analytics-aggregation.ts
src/server/jobs/notification-dispatch.ts
src/server/db/schema/analytics.ts
src/server/db/schema/reactions.ts
src/server/db/schema/notifications.ts
```

### M69–M75 — Payments (~15 files)

```
src/app/(app)/settings/billing/page.tsx
src/components/app/PricingTable/PricingTable.tsx
src/components/app/SubscriptionManager/SubscriptionManager.tsx
src/components/app/PromoCodeInput/PromoCodeInput.tsx
src/components/app/InvoiceHistory/InvoiceHistory.tsx
src/server/api/routers/payment-router.ts
src/server/services/razorpay-service.ts
src/server/services/stripe-service.ts
src/server/services/subscription-service.ts
src/server/services/promo-service.ts
src/app/api/webhooks/razorpay/route.ts
src/app/api/webhooks/stripe/route.ts
src/server/db/schema/subscriptions.ts
src/server/db/schema/payments.ts
src/server/db/schema/promos.ts
```

### M87–M94 — Admin Panel (~20 files)

```
src/app/(admin)/admin/layout.tsx
src/app/(admin)/admin/page.tsx
src/app/(admin)/admin/users/page.tsx
src/app/(admin)/admin/experiences/page.tsx
src/app/(admin)/admin/moderation/page.tsx
src/app/(admin)/admin/templates/page.tsx
src/app/(admin)/admin/music/page.tsx
src/app/(admin)/admin/flags/page.tsx
src/app/(admin)/admin/health/page.tsx
src/components/admin/AdminSidebar/AdminSidebar.tsx
src/components/admin/UserTable/UserTable.tsx
src/components/admin/ExperienceTable/ExperienceTable.tsx
src/components/admin/ModerationQueue/ModerationQueue.tsx
src/components/admin/TemplateUploader/TemplateUploader.tsx
src/components/admin/FeatureFlagToggle/FeatureFlagToggle.tsx
src/server/api/routers/admin-router.ts
src/server/services/admin-service.ts
src/server/services/moderation-service.ts
src/server/middleware/admin-auth.ts
src/server/db/schema/audit-log.ts
```

### Estimated Total File Count

| Category | Estimated Files |
|----------|----------------|
| Configuration and tooling | ~15 |
| Design system and UI components | ~20 |
| Authentication | ~12 |
| Database schema and migrations | ~15 |
| Marketing pages | ~10 |
| App shell and dashboard | ~12 |
| Experience builder | ~60 |
| Recipient experience | ~40 |
| Music system | ~12 |
| Interactive sections | ~35 |
| Publishing and sharing | ~15 |
| Reactions and analytics | ~18 |
| Templates and themes | ~15 |
| AI features | ~12 |
| Payments | ~15 |
| Edge cases and accessibility | ~10 |
| Admin panel | ~20 |
| Tests | ~80 |
| **Total** | **~415 files** |

---

# 8. Complexity Estimates

Each module is rated on a 1–5 complexity scale.

| Level | Label | Definition |
|-------|-------|------------|
| 1 | Trivial | Static UI; no state; straightforward implementation |
| 2 | Simple | Basic state management; standard CRUD; established patterns |
| 3 | Moderate | Significant state logic; API integration; responsive behavior |
| 4 | Complex | Advanced interactions; real-time features; performance-sensitive |
| 5 | Very Complex | Novel engineering; cross-cutting concerns; animation physics; payment security |

| ID | Module | Complexity | Justification |
|----|--------|------------|---------------|
| M01 | Design System | 3 | Foundational decisions; token architecture; animation keyframes; responsive |
| M02 | Authentication | 3 | OAuth flows; session management; security considerations |
| M03 | User Profile | 2 | Standard CRUD with avatar upload |
| M04 | Database Schema | 3 | Data model design; migration strategy; JSONB for flexible section content |
| M05 | Landing Page | 2 | Marketing page; SEO; responsive design |
| M06 | App Shell | 2 | Layout; navigation; route protection |
| M07 | Dashboard | 2 | Experience list; empty states; quick stats |
| M08 | Experience Data Model | 4 | Complex nested data; section polymorphism; versioning |
| M09 | Builder Shell | 5 | Drag-and-drop; section management; real-time preview sync; undo/redo |
| M10 | Media Upload Pipeline | 4 | Multipart upload; compression; format conversion; progress tracking; background jobs |
| M11 | Section: Cover | 2 | Background image; text overlay; animation selection |
| M12 | Section: Letter | 3 | Rich text editing; handwriting fonts; envelope animation; typewriter effect |
| M13 | Section: Photo Gallery | 3 | Multiple layouts; swipe; lightbox; responsive grid |
| M14 | Section: Timeline | 3 | Event management; date handling; scroll animations; dual layout |
| M15 | Section: Text Message | 1 | Simple text with formatting |
| M16 | Theme Engine | 4 | Token system; animated backgrounds; per-section overrides; theme switching |
| M17 | Auto-Save | 3 | Debouncing; conflict resolution; offline queue; save indicators |
| M18 | Builder Preview | 4 | Synchronized rendering; iframe or shadow DOM; responsive toggle |
| M19 | Experience Renderer | 5 | Dynamic section rendering; theme application; SSR for SEO; data fetching |
| M20 | Loading Screen | 2 | Branded animation; progress indicator; personalization |
| M21 | Welcome Screen | 3 | Cinematic animation; music trigger; responsive typography |
| M22 | Scroll Engine | 5 | Full-page snap scrolling; smooth transitions; touch handling; performance |
| M23 | Section Transitions | 4 | Multiple transition types; GPU acceleration; timing control |
| M24 | Content Reveals | 3 | Intersection Observer; staggered animations; fade/scale/slide |
| M25 | Ambient Animations | 4 | Particle systems; canvas rendering; performance on low-end devices |
| M26 | Closing Screen | 2 | Static layout with celebration trigger |
| M27 | Open Graph / SEO | 3 | Dynamic OG image generation; per-experience meta tags; SSR |
| M28 | Music Library | 2 | Track storage; categorization; search |
| M29 | Music Player Engine | 5 | Autoplay handling; fade/loop/duck/crossfade; browser compatibility; memory |
| M30 | Music Controls UI | 2 | Floating player; play/pause/mute; translucent design |
| M31 | Voice Note Recording | 3 | MediaRecorder API; browser compatibility; audio encoding |
| M32 | Builder Music Selection | 2 | Category browse; preview; selection state |
| M33 | Section: Quiz | 3 | Question editor; multiple choice; scoring; result messages; animations |
| M34 | Section: Memory Cards | 4 | Card flip animation; match detection; timer; photo-based cards |
| M35 | Section: Scratch Card | 4 | Canvas-based scratch effect; touch tracking; reveal animation |
| M36 | Section: Spin Wheel | 4 | Canvas wheel; physics-based spin; segment customization; result display |
| M37 | Section: This or That | 2 | Binary choice; content reveal; animation |
| M38 | Section: Countdown | 2 | Live timer; date calculation; formatting |
| M39 | Tap to Reveal | 2 | Touch handler; content toggle; animation |
| M40 | Shake to Reveal | 3 | DeviceMotion API; threshold calibration; tap fallback |
| M41 | Long Press to Reveal | 2 | Touch duration timer; visual feedback; content reveal |
| M42 | Celebration System | 4 | Canvas particles; multiple effects; performance optimization; trigger timing |
| M43 | Easter Egg System | 2 | Hidden triggers; state tracking; surprise content |
| M44 | Publish Flow | 3 | State machine (draft/published/unpublished); validation; confirmation |
| M45 | Link Generation | 3 | Short URL generation; slug uniqueness; collision handling |
| M46 | QR Code Generation | 1 | Library wrapper; customization; download |
| M47 | Share Sheet | 2 | Platform detection; native share API; fallback buttons |
| M48 | Privacy Controls | 3 | Access control logic; password hashing; view counting; expiry enforcement |
| M49 | Password Gate | 2 | Themed password screen; attempt limiting; hint display |
| M50 | Scheduled Publishing | 3 | Cron job; time zone handling; queue management |
| M51 | Recipient Reactions | 2 | Emoji selection; text input; real-time delivery to creator |
| M52 | Analytics Collection | 4 | Event tracking; batching; privacy-safe collection; time-on-section |
| M53 | Analytics Dashboard | 3 | Charts; data aggregation; date range filtering |
| M54 | Real-Time View Counter | 3 | WebSocket or polling; concurrent viewer tracking |
| M55 | Notification System | 3 | Email dispatch; preference management; template rendering; queuing |
| M56 | Template Data Model | 2 | Schema extension; template-experience relationship |
| M57 | Template Gallery | 2 | Grid layout; search; filtering; pagination |
| M58 | Template Preview | 3 | Read-only renderer; thumbnail generation |
| M59 | Template Application | 3 | Deep clone of template data; content replacement; section mapping |
| M60 | Theme Engine (extended) | 3 | Additional themes; animated backgrounds; performance |
| M61 | Per-Section Theme Override | 3 | Override cascading; preview sync; builder UI |
| M62 | Custom Color/Font Picker | 2 | Color wheel; font preview; state persistence |
| M63 | AI Message Generator | 3 | Prompt engineering; token management; streaming response; UI |
| M64 | AI Photo Caption | 2 | Vision API integration; fallback handling |
| M65 | AI Recommender | 2 | Occasion-based rules; scoring algorithm |
| M66 | AI Grammar Check | 2 | API integration; inline suggestions; accept/reject UI |
| M67 | AI Content Moderation | 3 | Upload-time scanning; policy rules; flagging workflow |
| M68 | AI Music Recommendation | 2 | Mood mapping; content-based filtering |
| M69 | Pricing/Feature Gating | 3 | Plan hierarchy; feature matrix; middleware enforcement |
| M70 | Razorpay Integration | 4 | Payment flow; webhook handling; signature verification; refunds |
| M71 | Stripe Integration | 4 | Checkout session; webhook handling; subscription lifecycle |
| M72 | Subscription Management | 3 | Upgrade/downgrade; proration; grace period; cancellation |
| M73 | Promo Code System | 2 | Code validation; discount calculation; usage limits |
| M74 | Billing Dashboard | 2 | Invoice list; payment history; subscription details |
| M75 | Free Trial System | 2 | Trial activation; expiry tracking; conversion prompts |
| M76 | Slow Connection Handling | 3 | Progressive loading; blur-up placeholders; offline detection |
| M77 | Missing Media Fallbacks | 2 | Error boundaries; themed placeholders; section skipping |
| M78 | Expired Link Page | 1 | Static branded page |
| M79 | Unsupported Browser Fallback | 1 | Feature detection; static fallback page |
| M80 | Error Pages | 1 | 404; 500; branded design |
| M81 | Accessibility Audit | 3 | WCAG 2.1 AA audit; remediation across all components |
| M82 | Reduced Motion | 2 | prefers-reduced-motion detection; animation replacement |
| M83 | Screen Reader Optimization | 3 | ARIA labels; focus management; live regions; section announcements |
| M84 | Keyboard Navigation | 3 | Focus trapping; tab order; keyboard shortcuts; game accessibility |
| M85 | Performance Optimization | 4 | Code splitting; lazy loading; bundle analysis; Lighthouse tuning |
| M86 | Return Visit Handling | 3 | Cache management; welcome-back detection; section navigation |
| M87 | Admin Auth | 2 | Role-based access; protected routes |
| M88 | Admin Dashboard | 2 | Aggregate stats; charts; key metrics |
| M89 | User Management | 2 | Search; table; actions (ban/suspend/delete) |
| M90 | Experience Moderation | 3 | Queue; review workflow; takedown actions; audit log |
| M91 | Template Management | 2 | Upload; edit; delete; categorize |
| M92 | Music Library Management | 2 | Upload; categorize; edit metadata; delete |
| M93 | System Health | 2 | Status page; service checks; error rates |
| M94 | Feature Flags | 2 | Toggle UI; percentage rollout; user targeting |
| M95 | Security Audit | 4 | OWASP review; CSP; rate limiting; penetration testing |
| M96 | Load Testing | 3 | k6 or Artillery scripts; baseline benchmarks |
| M97 | Backup/Recovery | 3 | Automated backups; restoration procedure; testing |
| M98 | Production Config | 2 | Environment setup; secrets; domain configuration |
| M99 | Monitoring/Alerting | 2 | Sentry rules; uptime monitoring; Slack alerts |
| M100 | Launch Checklist | 1 | Verification steps; sign-off |

### Complexity Summary

| Complexity Level | Count | Percentage |
|------------------|-------|------------|
| 1 — Trivial | 6 | 6% |
| 2 — Simple | 42 | 42% |
| 3 — Moderate | 34 | 34% |
| 4 — Complex | 13 | 13% |
| 5 — Very Complex | 5 | 5% |

The five most complex modules (complexity 5) are:

1. **M09 — Experience Builder Shell** — Drag-and-drop, undo/redo, real-time preview synchronization
2. **M19 — Experience Renderer** — Dynamic polymorphic rendering, SSR, theme application
3. **M22 — Section Scroll Engine** — Full-page snap, touch handling, cross-browser consistency
4. **M29 — Music Player Engine** — Autoplay policies, fade/duck/crossfade, mobile browser quirks
5. **M10 — Media Upload Pipeline** — Multi-format processing, background jobs, progress tracking (tied at 4 but elevated to 5 for integration complexity)

---

# 9. Testing Strategy

## Testing Pyramid

```
              ╱‾‾‾‾‾‾‾‾╲
             ╱  Manual    ╲         5% — Exploratory, emotional UX
            ╱  QA Testing  ╲
           ╱________________╲
          ╱                  ╲
         ╱    E2E Tests       ╲     15% — Critical user flows
        ╱  (Playwright)        ╲
       ╱________________________╲
      ╱                          ╲
     ╱   Integration Tests        ╲   30% — API routes, services, database
    ╱   (Vitest)                   ╲
   ╱________________________________╲
  ╱                                  ╲
 ╱       Unit Tests                   ╲  50% — Components, hooks, utilities
╱       (Vitest + Testing Library)     ╲
╱________________________________________╲
```

## Unit Tests (Vitest + React Testing Library)

**Target:** Every utility function, custom hook, and presentational component.

**Coverage Target:** 80% line coverage minimum for `src/lib/`, `src/hooks/`, `src/server/services/`.

**Key areas:**

- Theme token generation and application
- Quiz scoring engine
- Memory game match detection
- Link generation and slug validation
- Date formatting and countdown calculations
- Music volume ducking calculations
- Media validation (file type, file size)
- Promo code validation
- Analytics aggregation logic
- Privacy access control logic
- Subscription feature gating logic

## Integration Tests (Vitest)

**Target:** tRPC route handlers, database operations, and service layers.

**Key areas:**

- Authentication flow (signup, login, session management)
- Experience CRUD operations
- Section CRUD operations
- Media upload and processing
- Publishing flow (draft → published → unpublished)
- Link generation and retrieval
- Privacy enforcement (password, expiry, view limits)
- Reaction creation and retrieval
- Analytics event recording and aggregation
- Subscription creation and feature gating
- Webhook processing (Stripe, Razorpay)
- Admin operations (user management, moderation)

## End-to-End Tests (Playwright)

**Target:** Critical user journeys from the PRD.

**Test scenarios:**

1. **Creator Journey — Happy Path:** Landing → Signup → Dashboard → Create Experience → Add Sections → Preview → Publish → Share
2. **Recipient Journey — Happy Path:** Open Link → Loading → Welcome → Scroll Through → Interact → Closing → React
3. **Authentication:** Google OAuth login; Email signup and login; Password reset
4. **Builder:** Add/remove/reorder sections; Upload media; Apply theme; Auto-save recovery
5. **Publishing:** Publish with password; Share link; Verify Open Graph preview
6. **Payments:** Subscribe to premium; Verify feature unlocking; Cancel subscription
7. **Privacy:** Password-protected experience; Expired experience; View limit enforcement
8. **Accessibility:** Keyboard-only navigation through the entire recipient experience
9. **Mobile:** Critical flows on mobile viewport (375px width)

## Performance Tests

**Target:** Core Web Vitals and animation performance.

**Tools:** Lighthouse CI (automated per PR), custom FPS monitoring in animations.

**Benchmarks:**

| Metric | Target |
|--------|--------|
| Lighthouse Performance Score | ≥ 90 |
| Lighthouse Accessibility Score | ≥ 90 |
| Largest Contentful Paint (LCP) | < 2.5s |
| First Input Delay (FID) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Animation FPS (mid-range device) | ≥ 60fps |

## Visual Regression Tests

**Tool:** Playwright screenshot comparison.

**Target:** Design system components, landing page, loading screen, welcome screen, closing screen, and all section renderers.

## Manual QA Protocol

**When:** Before each deployment milestone.

**Focus areas:**

- Emotional impact of the recipient experience (subjective but critical)
- Cross-browser testing (Chrome, Safari, Firefox, Samsung Internet)
- Cross-device testing (iPhone, Android flagship, Android mid-range)
- Animation smoothness on low-end devices
- Music behavior across browsers (autoplay policies)
- Accessibility with VoiceOver and TalkBack

---

# 10. Deployment Milestones

| Milestone | Phase | Target Week | Environment | Description |
|-----------|-------|-------------|-------------|-------------|
| **DM-0: Dev Environment** | 0 | Week 1 | Local + Preview | Project bootstrapped; CI/CD pipeline active; preview deployments per PR |
| **DM-1: Alpha — Skeleton** | 1 | Week 5 | Staging | Auth, dashboard, empty app shell deployed to staging |
| **DM-2: Alpha — Builder** | 2 | Week 11 | Staging | Experience builder with core sections functional on staging |
| **DM-3: Alpha — Viewer** | 3 | Week 15 | Staging | Recipient experience with animations functional on staging |
| **DM-4: Beta — Interactive** | 4–5 | Week 21 | Staging | Music + interactive sections functional; internal beta testing begins |
| **DM-5: Beta — Shareable** | 6 | Week 23 | Staging | Publishing + sharing functional; experiences shareable via real links |
| **DM-6: Beta — Measurable** | 7 | Week 25 | Staging | Analytics + reactions functional; closed beta with 20–50 external users |
| **DM-7: RC1 — Feature Complete** | 8–9 | Week 29 | Staging | Templates, themes, AI features complete; feature freeze |
| **DM-8: RC2 — Monetizable** | 10 | Week 31 | Staging | Payments functional; premium features gated; pricing live |
| **DM-9: RC3 — Polished** | 11 | Week 33 | Staging | Accessibility, edge cases, performance optimized; open beta with 200+ users |
| **DM-10: Production Launch** | 12–13 | Week 36 | Production | Admin panel live; security audit passed; monitoring active; public launch |

---

# 11. Git Commit Strategy

## Branch Strategy

```
main
 └── develop
      ├── feature/M01-design-system
      ├── feature/M02-auth
      ├── feature/M09-builder-shell
      ├── feature/M19-experience-renderer
      ├── fix/scroll-snap-ios-safari
      ├── chore/update-dependencies
      └── hotfix/auth-session-expiry
```

**Main Branch (main):**
- Always deployable to production.
- Protected: requires PR approval + passing CI.
- Tagged with semantic version on each release.

**Development Branch (develop):**
- Integration branch for feature work.
- Auto-deploys to staging.
- Protected: requires passing CI.

**Feature Branches (feature/MXX-module-name):**
- One branch per module or logical unit of work.
- Branched from and merged into `develop`.
- Auto-deploys to Vercel preview URL.

**Fix Branches (fix/description):**
- Bug fixes; branched from `develop`.

**Hotfix Branches (hotfix/description):**
- Critical production fixes; branched from `main`, merged into both `main` and `develop`.

## Commit Convention

All commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**

| Type | Use |
|------|-----|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring without behavior change |
| `style` | CSS, formatting, no logic change |
| `docs` | Documentation only |
| `test` | Adding or updating tests |
| `chore` | Build, tooling, dependency updates |
| `perf` | Performance improvement |
| `a11y` | Accessibility improvement |

**Scopes (examples):**

`auth`, `builder`, `renderer`, `media`, `theme`, `music`, `quiz`, `analytics`, `payments`, `admin`, `seo`, `db`

**Example commits:**

```
feat(builder): add drag-and-drop section reordering
fix(renderer): resolve scroll snap jank on iOS Safari
refactor(theme): extract token generation into utility
style(landing): adjust hero section gradient and spacing
test(quiz): add unit tests for score calculation engine
chore(deps): update framer-motion to v12.1.0
perf(media): implement progressive image loading with blur-up
a11y(renderer): add ARIA labels to all interactive sections
```

## Release Tagging

Releases follow semantic versioning:

```
v0.1.0  — Phase 1 complete (Foundation)
v0.2.0  — Phase 2 complete (Builder)
v0.3.0  — Phase 3 complete (Renderer)
v0.4.0  — Phase 4 complete (Music)
v0.5.0  — Phase 5 complete (Interactive)
v0.6.0  — Phase 6 complete (Publishing)
v0.7.0  — Phase 7 complete (Analytics)
v0.8.0  — Phase 8 complete (Templates)
v0.9.0  — Phase 9 complete (AI)
v0.10.0 — Phase 10 complete (Payments)
v0.11.0 — Phase 11 complete (Polish)
v0.12.0 — Phase 12 complete (Admin)
v1.0.0  — Production Launch
```

---

# 12. Risks

## Technical Risks

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| T1 | **Scroll snap inconsistency across browsers.** iOS Safari, Android Chrome, and Samsung Internet handle CSS scroll snap differently. | High | High | Build a custom scroll engine with fallback behavior. Test on 10+ device/browser combinations weekly. Maintain a browser compatibility matrix. |
| T2 | **Music autoplay blocked on mobile browsers.** Most mobile browsers require a user gesture before playing audio. | High | Medium | Implement the "tap to begin with music" prompt from the PRD. Use the Web Audio API with a gesture-unlocked AudioContext. |
| T3 | **Animation performance on mid-range Android devices.** Complex CSS animations and canvas effects may cause jank on budget devices. | High | High | Profile on real mid-range devices (e.g., Samsung A14, Redmi Note). Use GPU-accelerated transforms only. Implement adaptive quality (reduce particles, disable parallax on low-end). |
| T4 | **Media processing costs and latency.** Image compression, video transcoding, and thumbnail generation can be slow and expensive at scale. | Medium | Medium | Use background job queues. Process media asynchronously. Show optimistic UI with low-res previews. Set upload size limits. Monitor processing costs per user. |
| T5 | **Experience data model complexity.** Polymorphic sections (quiz, gallery, letter, timeline) stored in a single table with JSONB may lead to data integrity issues. | Medium | High | Use Zod schemas for runtime validation of JSONB content. Write comprehensive integration tests for every section type. Consider separate section tables if JSONB becomes unwieldy. |
| T6 | **Drag-and-drop builder complexity.** Building a reliable, performant drag-and-drop interface with live preview synchronization is a major engineering challenge. | Medium | High | Use dnd-kit library as a foundation. Build incrementally — start with basic reordering, add drag handles and visual feedback iteratively. |
| T7 | **Canvas-based interactions (scratch card, spin wheel) on touch devices.** Touch event handling on canvas elements is error-prone across devices. | Medium | Medium | Extensive touch device testing. Implement pointer events API with touch fallbacks. Test on devices with and without stylus support. |
| T8 | **Payment integration in India.** Razorpay UPI flow has specific quirks (intent flow, collect flow, QR flow) that differ from standard card payments. | Medium | Medium | Follow Razorpay's official integration guides exactly. Test with real UPI apps in sandbox. Plan for payment failure and retry flows. |

## Product Risks

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| P1 | **User experiences look generic despite theme system.** If all experiences using the same template look identical, the "personal" feeling is lost. | Medium | High | Invest heavily in template variety (20+ at launch). Allow deep customization. Use AI to suggest personalized variations. Ensure user photos and text dominate the visual experience, not template chrome. |
| P2 | **Creator abandonment during building.** The builder may feel too complex or time-consuming, causing creators to abandon before publishing. | Medium | High | Track builder funnel analytics obsessively. Implement guided wizard mode. Show progress percentage. Set a 10-minute target and design every interaction to meet it. |
| P3 | **Recipient experience feels too short or too long.** Finding the right pacing for 3–10 minutes of engagement is difficult. | Medium | Medium | Provide creator guidance on section count (6–12 sections recommended). Show estimated experience duration in the builder. A/B test different default template lengths. |
| P4 | **Free tier is too generous (no conversion to paid).** If the free tier satisfies all user needs, premium conversion will be low. | Medium | High | Gate specific high-value features (AI, advanced themes, analytics, unlimited history) behind premium. Monitor free-to-paid conversion weekly. Adjust gating based on data. |
| P5 | **AI-generated content feels generic.** If every AI love letter sounds the same, it undermines the personal nature of the product. | Medium | Medium | Use contextual prompts (recipient name, relationship type, specific memories the creator mentions). Allow editing of AI output. Position AI as a starting point, not a replacement for personal expression. |

## Business Risks

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| B1 | **Seasonality.** Demand may spike around Valentine's Day, birthdays, and anniversaries, but drop during other periods. | High | Medium | Market toward non-romantic occasions (friendship, family, graduation, farewell). Build occasion reminders. Run seasonal campaigns. Track monthly cohorts. |
| B2 | **Music licensing.** Using copyrighted music in experiences could create legal liability. | High | High | Curate a royalty-free music library only. Partner with royalty-free music providers. Clearly communicate that uploaded music is the creator's responsibility. Add terms of service clause. |
| B3 | **Content moderation.** Users may upload inappropriate or illegal content. | Medium | High | AI-based upload screening. Manual moderation queue. Clear content policy. DMCA takedown process. Report mechanism for recipients. |
| B4 | **Data privacy regulations.** GDPR, India's DPDPA, and other regulations require careful data handling. | Medium | High | Privacy-by-design from day one. Data export and deletion features. Cookie consent. Clear privacy policy. Minimize data collection. No third-party tracking. |

## Operational Risks

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| O1 | **Solo developer burnout.** 100 modules over 36 weeks is intense for a solo developer. | High | High | Prioritize ruthlessly. Ship MVP with Phases 0–6 first (23 weeks). Defer AI, payments, and admin to post-launch. Consider hiring or contracting for specific modules. |
| O2 | **Scope creep.** The feature inventory (500+ features) makes it tempting to add "just one more thing." | High | Medium | Use the phase system as a strict gate. No Phase N+1 work until Phase N is complete and deployed. Use feature flags to hide incomplete work. |
| O3 | **Database migration failures.** Schema changes on a production database with user data require careful migration. | Low | High | Test every migration on staging with production-like data volumes. Never run destructive migrations without a tested rollback plan. Use expand-and-contract migration pattern. |

---

# 13. Future Expansion

These items are explicitly deferred from v1 but should influence architectural decisions today.

## Architecture Decisions for Future-Proofing

| Future Feature | Architectural Implication Today |
|----------------|--------------------------------|
| Native mobile apps (iOS/Android) | Build all business logic as API endpoints (tRPC), not embedded in React Server Components. Mobile apps will consume the same API. |
| Collaborative editing | Design the experience data model to support operational transforms or CRDT-based merge. Use timestamps and user IDs on all section edits. |
| Offline experience viewing | Structure the experience renderer to work with a static data payload (JSON + media URLs). This enables service worker caching and offline viewing. |
| Multi-language support | Externalize all user-facing strings from day one using a string table pattern. Use locale-aware date and number formatting everywhere. |
| Marketplace (templates, themes, music) | Design template and theme data models to support third-party authorship (creator ID, pricing, license type). |
| Custom domains | Build the experience renderer to be domain-agnostic. Use the slug/ID for routing, not the domain. |
| API for developers | Document all tRPC routes with input/output schemas. Consider exposing a REST wrapper for external consumers. |
| Wearable integration | Design notification system to be channel-agnostic (email, push, SMS, webhook). Adding a new channel should require minimal code change. |

## Post-Launch Feature Priorities

| Priority | Feature | Target Timeline |
|----------|---------|----------------|
| P1 | Native iOS app (React Native) | v1.1 (Month 2 post-launch) |
| P2 | Native Android app (React Native) | v1.1 (Month 2 post-launch) |
| P3 | Collaborative experience creation | v1.2 (Month 4 post-launch) |
| P4 | Experience duplication and remixing | v1.2 (Month 4 post-launch) |
| P5 | Offline experience viewing | v1.3 (Month 6 post-launch) |
| P6 | Public experience gallery (opt-in showcase) | v1.3 (Month 6 post-launch) |
| P7 | Spotify/Apple Music playlist integration | v1.4 (Month 8 post-launch) |
| P8 | AR experience elements | v2.0 (Month 12 post-launch) |
| P9 | Physical gift pairing (QR on printed card) | v2.0 (Month 12 post-launch) |
| P10 | White-label solution for businesses | v2.5 (Month 18 post-launch) |

---

# Appendix A — NPM Dependencies (Planned)

## Production Dependencies

```
next
react
react-dom
typescript
@auth/core
next-auth
drizzle-orm
@supabase/supabase-js
zod
zustand
framer-motion
@dnd-kit/core
@dnd-kit/sortable
@tiptap/react
@tiptap/starter-kit
howler
tsparticles
qrcode.react
date-fns
lucide-react
react-hook-form
@hookform/resolvers
sharp
bullmq
ioredis
resend
@react-email/components
openai
razorpay
stripe
nanoid
slugify
```

## Development Dependencies

```
@types/react
@types/node
eslint
eslint-config-next
prettier
husky
lint-staged
vitest
@testing-library/react
@testing-library/jest-dom
playwright
@playwright/test
drizzle-kit
tsx
dotenv
```

---

# Appendix B — Environment Variables

```
# Database
DATABASE_URL=
DIRECT_DATABASE_URL=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Auth
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Redis
REDIS_URL=

# Media
SUPABASE_STORAGE_BUCKET=

# AI
OPENAI_API_KEY=

# Payments
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Email
RESEND_API_KEY=

# Monitoring
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# App
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_CDN_URL=
```

---

*This implementation plan is a living document. It should be updated as development progresses, technical discoveries are made, and product requirements evolve.*

*— Project Heart Engineering Team*
