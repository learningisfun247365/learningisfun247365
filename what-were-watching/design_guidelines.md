# Design Guidelines: Shared Watchlist Web Application

## Design Approach
**Selected System:** Material Design with modifications for entertainment-focused UI
**Justification:** This utility-focused collaborative tool benefits from Material's established patterns for cards, filters, and data display, while allowing customization for the poster-centric visual experience.

**Design Philosophy:** Create a **Netflix-meets-productivity-tool** aesthetic - combining the visual richness of streaming platforms with the functional clarity of task management apps. The poster images should be heroes, not afterthoughts.

---

## Typography System

**Primary Font:** Inter (via Google Fonts CDN)
**Accent Font:** Poppins for headings (via Google Fonts CDN)

**Hierarchy:**
- Page Headers: Poppins Bold, 32px (2xl)
- Section Titles: Poppins SemiBold, 24px (xl)
- Card Titles: Inter SemiBold, 18px (lg)
- Body/Metadata: Inter Regular, 14px (sm)
- Status Badges: Inter Medium, 12px (xs), uppercase tracking

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **4, 6, and 8** consistently
- Component padding: `p-6`
- Card spacing: `gap-6`
- Section margins: `mb-8`
- Page margins: `p-8`

**Container Strategy:**
- Max-width wrapper: `max-w-7xl mx-auto`
- Card grid: Responsive columns (1 col mobile → 2 col tablet → 3-4 col desktop)
- Filter bar: Full-width sticky header below main navigation

---

## Component Library

### Navigation Header
- Fixed top position with slight elevation shadow
- Logo/app name (left), user switcher dropdown (center), user avatar/name (right)
- Height: 16 units (`h-16`)
- Include subtle bottom border for definition

### Filter Bar (Critical Component)
- Sticky position below header (`top-16`)
- Horizontal scroll on mobile, full row on desktop
- Filter chips/pills with clear active state (not color-based, use border weight + fill)
- Quick filters: "🔥 Must Watch", "Movies", "TV Shows", "Ready to Watch"
- Dropdown for streaming services
- Spacing: `gap-4` between filter elements

### Movie/TV Show Cards (Primary UI Element)
**Card Structure (Poster-Dominant):**
- Aspect ratio: 2:3 (standard movie poster)
- Poster fills entire card background with slight rounded corners (`rounded-lg`)
- Dark gradient overlay at bottom 40% for text readability
- Hover: Subtle scale transform (`hover:scale-105 transition-transform`)

**Card Content Overlay (Bottom-anchored):**
- Title: Bold, 18px, positioned at bottom with `p-4`
- Status badges: Floating top-right corner (`absolute top-4 right-4`)
  - 🔥 MUST WATCH: Filled badge with icon
  - ⚠️ SPOILER ALERT: Warning-styled badge
  - ✅ Completed: Success badge
- Streaming service pill: Small, subtle, bottom-left corner

**Card Expansion/Detail View:**
- Click card to expand into modal or slide-out panel
- Show full metadata: plot summary, runtime, genre, both users' priorities and progress
- Include "Edit" buttons for priority/progress updates
- Layout: Poster (left 40%) + Details (right 60%)

### Add New Title Form
- Prominent "+" floating action button (bottom-right, `fixed bottom-8 right-8`)
- Modal dialog on click with single text input for title
- Auto-complete/search as user types (powered by API)
- Show mini preview card before adding
- After API fetch: Display fetched metadata with manual fields for streaming service

### Priority & Progress Controls
- Priority: Three-button toggle group (High / Medium / Low) - not dropdown
- Progress: Combined input:
  - Movies: Single toggle (Unwatched / Watched)
  - TV Shows: Episode tracker (S__ E__) + status dropdown (Watching / Caught Up)
- Visual indicator showing both users' selections side-by-side for comparison

### Empty States
- When no titles match filters: Large illustration placeholder
- Message: "No matches found. Try different filters or add a new title!"
- CTA button to clear filters or add new content

---

## Grid & Responsive Behavior

**Desktop (lg: 1024px+):**
- 4-column card grid (`grid-cols-4`)
- Full filter bar visible

**Tablet (md: 768px):**
- 3-column card grid (`grid-cols-3`)
- Horizontal scrollable filter chips

**Mobile (base):**
- 2-column card grid (`grid-cols-2`)
- Condensed card text (title only, no streaming service pill)
- Bottom navigation for filters

---

## Status Indicators & Badges

**Badge Design System:**
- Rounded pills with icon + text
- Slightly elevated with subtle shadow
- High contrast against poster backgrounds (use semi-transparent blur backdrop)

**Priority Indicators:**
- 🔥 MUST WATCH: Large, prominent, top-right
- Medium Interest: Smaller badge
- (No badge for low priority)

**Watch Status:**
- ✅ Completed: Top-right, success style
- ⚠️ SPOILER ALERT: Top-right, warning style (amber)
- 🍿 Ready to Watch: Optional subtle indicator

---

## Interactions & Micro-animations

**Minimal Animation Budget - Use Sparingly:**
- Card hover scale (smooth, 200ms transition)
- Filter chip active state transition
- Modal/dialog fade-in
- **No scroll animations, no complex page transitions**

---

## Images

**Poster Images:**
- Primary visual element - fill card completely
- Fallback: Gradient placeholder with title text if poster unavailable
- Lazy load images below fold for performance

**No Hero Image Required:** This is a functional dashboard, not a marketing page. Lead directly with filter bar + card grid.

---

## Accessibility Standards

- All interactive elements minimum 44px touch target
- Filter chips have clear focus indicators (outline)
- Modal dialogs trap focus and have close button
- Form inputs include visible labels (not just placeholders)
- Status badges have semantic HTML (`<span role="status">`)