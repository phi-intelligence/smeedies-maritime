# Smeedies Maritime Shipping Agency - Design Guidelines

## Design Approach: Industry Reference-Based (Maritime/Logistics)

**Selected References**: Maersk Line, Hapag-Lloyd, Mediterranean Shipping Company (MSC)
**Rationale**: Professional maritime industry with emphasis on trust, reliability, and operational excellence. Design should convey authority and efficiency while remaining accessible.

---

## Core Design Principles

1. **Professional Maritime Identity**: Establish credibility through clean, structured layouts reflecting operational precision
2. **Service-First Hierarchy**: Emphasize 24/7 availability and comprehensive service offerings
3. **West African Context**: Acknowledge local expertise while projecting international standards
4. **Trust & Reliability**: Visual consistency reinforcing the "100% On-Time Delivery" promise

---

## Color Palette

### Primary Colors
- **Navy Blue**: 217 71% 28% (Maritime professionalism, primary brand)
- **Ocean Blue**: 217 91% 60% (Trust, interactive elements)
- **Gold Accent**: 38 92% 50% (Premium service quality, sparingly used)

### Supporting Colors
- **Success Green**: 160 84% 39% (On-time delivery indicators)
- **Neutral Gray Scale**: 220 9% 46% (text), 0 0% 98% (backgrounds)

### Dark Mode
- **Background**: 220 26% 14%
- **Card Surface**: 217 33% 17%
- **Text**: 0 0% 95%

---

## Typography

**Primary Font**: Inter (Google Fonts CDN)
- **Headings**: 700 weight, tight letter-spacing for professional impact
- **Subheadings**: 600 weight
- **Body**: 400 weight, 1.6 line-height for readability
- **CTAs**: 600 weight, slight uppercase for emphasis

**Scale**: Use tailwind text sizes - text-5xl/6xl for hero, text-3xl/4xl for section headers, text-xl for subheadings, text-base for body

---

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 (e.g., p-8, gap-12, py-20)

**Container Strategy**:
- Max-width: 7xl (1280px) for content sections
- Full-width for hero, quote section, and footer
- Generous padding: py-16 to py-24 for major sections

**Grid Patterns**:
- Services/Features: 4-column desktop (lg:grid-cols-4), 2-column tablet (md:grid-cols-2), single column mobile
- Office Network: 3-column grid with location cards
- Testimonials: 3-column grid (2 rows)
- News: 3-column card layout

---

## Component Library

### Hero Section
- **Full viewport height** with maritime background image (container ship at Ghana port)
- Dark overlay (bg-black/60) for text readability
- Centered content with location badge at top
- Two prominent CTAs: "Get Quote" (filled, gold) and "Our Services" (outline with blur backdrop)
- Animated scroll indicator at bottom

### Statistics Section (About Us)
- **Animated counters** with scroll-trigger reveal
- 4-column grid displaying: 40+ Countries, 24/7 Service, 3 Major Ports, 100% On-Time
- Large numbers (text-5xl) with descriptive labels below
- Navy blue background with subtle texture

### Service Cards
- **Elevated cards** with hover lift effect (shadow transition)
- Icon at top (use Heroicons: ship, truck, globe, document-text)
- Feature list with checkmark icons
- "Learn More" link with arrow
- White cards on light gray background

### Location/Office Cards
- **Map pin icon** in accent color
- Location name as header
- Digital address and services listed
- Subtle border, minimal shadow
- Hover state reveals GPS coordinates

### Testimonial Cards
- **Portrait placeholder** (circular, 80px)
- Quote in italics with quotation marks
- Name and company below
- Soft shadow, white background
- Staggered reveal animation on scroll

### News Cards
- **Featured image** at top (16:9 aspect ratio)
- Category badge (small, colored)
- Title and excerpt
- "Read More" link
- Clean card design with hover scale

### Contact Form
- **Two-column layout** (form left, contact info right)
- Input fields: Name, Email, Company, Service Required (dropdown), Message (textarea)
- Navy blue "Send Message" button
- Contact details with icons (phone, email, location)
- 24/7 availability badge prominent

### Footer
- **Four-column layout**: Company Info, Main Pages, Services, Contact & Accreditations
- Dark navy background (217 71% 20%)
- Logo in gold accent color
- Accreditation badges for GPHA and WWSA
- Copyright and social links at bottom

---

## Images & Visual Assets

### Required Images
1. **Hero Background**: Large maritime scene - container ship at Tema port with Ghana coastline, golden hour lighting
2. **Operational Scope**: Map visualization of West Africa highlighting 8 service countries
3. **Warehousing**: Modern warehouse facility with organized storage
4. **News Cards**: Port operations, tugboats, trade routes imagery
5. **Testimonial Placeholders**: Professional headshots (can use placeholder service initially)

**Icon Library**: Heroicons (CDN) for all UI icons - ship, clock, check-circle, map, document-text, truck, globe, shield-check

---

## Animations & Interactions

**Minimal & Purposeful**:
- Statistics counters: Animate on scroll into view
- Service cards: Subtle hover lift (translateY(-4px))
- Section reveals: Staggered fade-in for cards/testimonials
- CTA buttons: Built-in hover states only
- News cards: Gentle scale on hover (1.02)

**Performance**: Use CSS transforms for animations, no heavy JavaScript libraries

---

## Accessibility & Responsive Design

- **Color contrast**: All text meets WCAG AA standards (4.5:1 minimum)
- **Touch targets**: Minimum 44px for all interactive elements
- **Mobile navigation**: Hamburger menu with slide-out drawer
- **Form validation**: Clear error states with helpful messages
- **Focus indicators**: Visible focus rings for keyboard navigation

**Breakpoints**:
- Mobile: Base (< 768px) - single column, stacked layouts
- Tablet: md (768px+) - 2-column grids
- Desktop: lg (1024px+) - 3-4 column grids, full layout features

---

## Section-Specific Guidelines

**Hero**: 90vh height, strong focal point with dual CTAs, location badge subtly positioned

**Services**: Each card comprehensive with 5-7 bullet points, not sparse

**Office Network**: All 7 locations displayed prominently with digital addresses

**Testimonials**: 6 real testimonials, arranged in 2 rows of 3 columns

**Quote Section**: Full-width with maritime background, centered Aristotle quote in large serif italic

**Footer**: Comprehensive with all navigation, services list, contact details, and accreditation logos clearly displayed