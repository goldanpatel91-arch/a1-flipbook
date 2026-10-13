# a1album - Luxury Digital Wedding Album & Flipbook Platform

A premier web application built specifically for professional wedding photographers to deliver high-resolution, interactive 3D digital flipbooks with background music, studio branding, client lead generation, unguessable links, and a point-based credit economy with full admin management.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following revisions requested by the user are fully incorporated into the plan:

- **Theme & Aesthetics (Screenshot Matching)**:
  - Canvas: Pure black (`#000000`).
  - Accent: Lime to mint green gradient (`#a3e635` to `#4ade80`). Removed teal/emerald.
  - Typography: **Poppins** (Bold headings, regular body, tight letter-spacing).
  - Hero Structure: 3-line headline with final line highlighted in lime-to-mint gradient, top filled green pill badges (`bg-lime-400 text-black font-semibold rounded-full px-3 py-1 text-xs`), white filled pill primary CTA, outline pill secondary CTA.
  - Hero Visual: Tilted 3D flipbook mockup on the right with floating interactive chips (`3D Page Flip`, `Calm Music`, `WhatsApp Share`).
  - Proof Bar: Clean 4-stat bar (`3D Flip` · `Music` · `Mobile Ready` · `WhatsApp Share`).
  - How It Works: 3 dark glass rounded cards with lime glow borders: **01. Upload** · **02. Customize** · **03. Share**.
- **Point Pricing & Economics**:
  - Exactly **₹89 per point** (1 album creation = 10 points = **₹890**).
  - Recharge Packs with explicit INR pricing:
    - *Starter Pack*: 10 Points (1 Album) = ₹890
    - *Professional Pack*: 30 Points (3 Albums) = ₹2,490 (Save ₹180)
    - *Studio Pro Pack*: 60 Points (6 Albums) = ₹4,690 (Save ₹650)
  - Integrated Razorpay checkout modal simulation with UPI, Card, NetBanking, and instant credit.
- **Image Compression & Performance**:
  - Parallel multi-worker canvas compression (WebP / high-quality JPEG) prior to storage.
  - High resolution preserved with file size reduction up to 75%.
  - Live upload progress bar showing total MB saved.
  - Double-page spread splitter option (splits panoramic 2-page wedding spreads into single left/right pages).
  - Lazy loading: Mobile renders current + next spread only for instantaneous 60fps interaction.
- **Flipbook Engine**:
  - `page-flip` / `st-page-flip` physics engine with realistic paper curl, drag/touch gestures, and audio synthesis.
  - Responsive layout: Single-page mode on mobile phones, double-page book spread on desktop/tablets.
- **Security & Privacy**:
  - Unguessable random alphanumeric album URLs (`/album/a1-x9k2m4...`).
  - Optional client PIN / Password protection + optional expiration date.
  - Right-click & long-press image download protection.
  - Studio watermark overlay toggle.
  - Blocked studio guard: If an admin blocks a photographer, their albums immediately display a suspension notice.
- **Sharing & Studio Growth Engine**:
  - OpenGraph meta tags for rich WhatsApp link previews (cover image, couple names, date).
  - Single photo share modal (WhatsApp direct link, Twitter, Facebook, Copy link).
  - Bulk album ZIP download toggle (default **OFF**, enabled only if photographer permits).
  - Floating "Book this Studio" badge with direct WhatsApp chat redirection (`https://wa.me/...`) and inquiry form.

---

## 1. System Architecture & Flows

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PUBLIC PORTAL & LANDING                         │
│   Pure Black (#000000) · Lime-Mint Gradient · Poppins · Demo Album     │
│   Tilted Flipbook Mockup · How It Works · ₹89/Point Pricing Matrix     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌───────────────────────────────┐         ┌───────────────────────────────┐
│     PHOTOGRAPHER DASHBOARD    │         │      CLIENT VIEW WORKFLOW     │
│ · Point Balance (1 pt = ₹89)  │         │ · Unguessable URL /album/:id  │
│ · Low Balance Alert (<20 pts) │         │ · Optional PIN Access Screen  │
│ · Event Creator (10 pts cost) │         │ · 3D Turn (StPageFlip Engine) │
│ · Multi-file Parallel Canvas  │         │ · Ambient Wedding Music       │
│   Compression & Spread Split  │         │ · Single Photo WhatsApp Share │
│ · Razorpay Recharge Modal     │         │ · Floating Studio Lead Badge  │
│ · Inquiries & Analytics Log   │         │ · Bulk Download (if allowed)  │
└──────────────┬────────────────┘         └───────────────────────────────┘
               │
               ▼
┌───────────────────────────────┐
│        ADMIN CONSOLE          │
│ · Real-time Platform Metrics  │
│ · Studio List & Block/Unblock │
│ · Add / Deduct Points + Reason│
│ · Password & Credential Reset │
│ · Complete Audit Trail        │
└───────────────────────────────┘
```

---

## 2. Detailed Feature Breakdown

### A. Landing Page & Visual Theme
- **Color Tokens**:
  - Background: `#000000` (Pitch black).
  - Surface Glass: `rgba(18, 24, 20, 0.65)` with border `1px solid rgba(74, 222, 128, 0.2)`.
  - Brand Accent: Linear gradient from lime `#a3e635` to mint `#4ade80`.
  - Text: `#ffffff` primary, `#94a3b8` muted text.
- **Hero Section**:
  - Top pill tag: `AI-POWERED FLIPBOOK BUILDER` in lime green pill badge.
  - 3-line headline:
    - *Your Memories.*
    - *Our Digital Canvas.*
    - *Stunning Wedding Flipbooks.* (in gradient text).
  - CTAs: White pill button ("Explore Demo Free") + Outline pill button ("Watch Showcase").
  - Right Side: Interactive tilted 3D album card with floating glowing chips (`3D Page Flip`, `Calm Music`, `WhatsApp Share`).
- **Feature & Process Showcase**:
  - Proof bar: 4 segmented items separated by subtle dividers.
  - How It Works: 3 glass cards (**01. Upload**, **02. Customize**, **03. Publish & Share**).
  - Pricing Calculator: Interactive points calculator based on ₹89/point.

### B. Upload & Parallel Compression Engine
- **Client-Side Parallel Processing**:
  - Canvas worker processes multiple high-res photos concurrently using `Promise.all`.
  - Downscales oversized camera RAW/JPEGs (e.g. 15MB 6000x4000) to web-optimized 2560px luxury print resolution at 82% WebP/JPEG quality.
  - Real-time compression status indicator: *"Compressed 24 photos · Saved 182 MB (78% storage saved)"*.
- **Spread Splitter**:
  - Automatically detects or allows 1-click splitting of double-page panoramic wedding spreads into individual left and right album leaves.

### C. Realistic 3D Flipbook Viewer
- **Physics Engine**:
  - Powered by responsive page-turn physics with smooth corner drag, swipe gestures, and keyboard arrow controls.
  - Mobile: Smooth single-page presentation.
  - Desktop: Dual-page coffee-table spread presentation.
- **Audio Soundscape**:
  - 4 pre-bundled soothing wedding instrumental tracks (Piano Harmony, Sacred Vows, Acoustic Romance, Sunset Waltz) + Custom Audio MP3 link support.
  - First-tap play complying with browser policies, with floating player controls.
- **Security & Watermark**:
  - Optional password/PIN barrier.
  - Disable right-click context menu and CSS user-select to prevent casual image copying.
  - Optional subtle studio watermark stamped on preview pages.

### D. Photographer Dashboard & Points Store
- **Balance Card**:
  - Real-time point counter.
  - Automatic amber warning banner when balance drops below 20 points.
- **Event Creator**:
  - Form: Event Name, Couple/Client Name, Client Mobile, Event Date, Music Selection, Bulk Download Toggle, Password/PIN (optional), Expiry Date.
  - Deducts 10 points upon publishing.
- **Razorpay Recharge System**:
  - Modal checkout displaying exact INR pricing (1 pt = ₹89).
  - Demo payment gateway simulation with UPI QR code, Cards, and instant point credit with receipt.
- **Client Inquiries & Views**:
  - Analytics: Total album views, last viewed timestamp, WhatsApp inquiry notifications.

### E. Admin Control Center
- **System Overview**: Total photographers, active albums, point circulation, and revenue metrics.
- **Photographer Management**:
  - Table of all registered studios with point balance, status (`Active` / `Blocked`).
  - Action buttons: "Adjust Points" (+/- points with reason recorded in audit log), "Block/Unblock", "Reset Password".
  - When blocked, all associated albums immediately display "This album is temporarily suspended".
- **Audit Logs**: Full timestamped record of every point credit, debit, and admin action.

---

## 3. Implementation Sequence & Build Order

1. **Brand & Typography Setup**:
   - Embed Google Font `Poppins` (weights 400, 500, 600, 700).
   - Configure pure black `#000000` background and lime-to-mint gradient utility classes in Tailwind.
2. **State & Mock Data Architecture**:
   - Seed pre-configured photographers, wedding albums with high-res photos, inquiries, and transaction histories.
   - Setup unguessable album IDs and role switching (Admin, Photographer, Client).
3. **Landing Page with Reference Screenshots Fidelity**:
   - Build header with logo left, navigation center, and outline pill "Sign In" button.
   - Build 3-line Hero with lime pill badge, tilted 3D flipbook mockup, and floating feature tags.
   - Build proof bar, 3-card "How It Works" grid, live interactive sample album demo, and ₹89/point pricing tiers.
4. **Interactive 3D Flipbook Viewer**:
   - Realistic page curl physics, mobile single-page vs desktop dual-page spread.
   - Integrated ambient wedding music player with first-tap autoplay.
   - Studio badge with direct WhatsApp lead inquiry modal.
   - Single-photo social share modal and optional bulk ZIP download.
5. **Photographer Studio Dashboard & Upload Engine**:
   - Parallel canvas compression engine with real-time compression progress and MB saved stats.
   - Spread splitter toggle.
   - Event creation wizard with 10-point deduction and low-balance warnings.
   - Razorpay point purchase gateway modal.
6. **Admin Command Center**:
   - Complete photographer directory with point adjuster, block toggle, password reset, and real-time audit ledger.
7. **Build & Quality Verification**:
   - Run compilation checks and verify 60fps mobile responsiveness across all views.
