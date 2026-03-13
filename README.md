# Email Campaign & Flow Skills for Claude Code

A complete AI-powered email marketing toolkit for [Claude Code](https://claude.com/claude-code). Two skills in one repo:

1. **Campaign Calendar Skill** (`/campaign-calendar`) — Generates complete monthly Klaviyo campaign calendars for DTC e-commerce brands with email-by-email briefs, segmentation, design notes, and Figma module references.

2. **Email Flow Skill** (`/email-flows`) — Builds complete Klaviyo lifecycle email flows (Welcome, Nurture, Browse Abandonment, Cart Abandonment, Checkout Abandonment, Post-Purchase, Winback, Sunset, Replenishment, Review Request) with production-ready HTML, dynamic Klaviyo merge tags, and deployment specs.

Built for email marketers, e-commerce operators, and agencies managing Klaviyo accounts.

---

## Table of Contents

- [What This Skill Does](#what-this-skill-does)
- [Architecture](#architecture)
- [Installation](#installation)
- [Skill 1: Campaign Calendar](#skill-1-campaign-calendar)
  - [Usage](#campaign-calendar-usage)
  - [SKILL.md (Core Strategy Engine)](#skillmd-core-strategy-engine)
  - [campaign_ideator.jsx (Interactive UI)](#campaign_ideatorjsx-interactive-ui)
- [Skill 2: Email Flows](#skill-2-email-flows)
  - [Usage](#email-flow-usage)
  - [FLOW-SKILL.md (Flow Builder Engine)](#flow-skillmd-flow-builder-engine)
  - [The 10 Lifecycle Flows](#the-10-lifecycle-flows)
  - [Flow Architecture](#flow-architecture)
  - [Klaviyo Dynamic Variables](#klaviyo-dynamic-variables)
- [Shared Concepts](#shared-concepts)
- [The 5 Content Pillars](#the-5-content-pillars)
- [Email Type System](#email-type-system)
- [S.C.E. Framework](#sce-framework)
- [Segmentation Strategy](#segmentation-strategy)
- [Holiday & Seasonal Calendar](#holiday--seasonal-calendar)
- [Figma Template Module Library](#figma-template-module-library)
- [Output Format](#output-format)
- [Campaign Metrics Targets](#campaign-metrics-targets)
- [Quality Checklist](#quality-checklist)
- [Examples](#examples)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---

## What This Skill Does

This skill turns Claude Code into a senior email marketing strategist. Given basic brand information, it produces:

1. **A complete monthly campaign calendar** with exact send dates, pillar balance, and email types
2. **Per-email briefs** with subject lines, preview text, angles, hooks, CTAs, and design direction
3. **Segmentation recommendations** per email (90-day engaged, VIP, win-back, etc.)
4. **Figma module references** so designers know exactly which template components to pull
5. **Text-based email scaffolds** with named senders, word counts, and P.S. lines

It enforces proven DTC email marketing principles:
- 5-pillar content balance (Educational, Social Proof, Community, Product, Sales)
- 80/20 graphic-to-text email ratio
- S.C.E. framework (Skimmable, Clear & Concise, Engaging)
- Holiday/seasonal integration
- Strategic segmentation beyond "send to everyone"

---

## Architecture

```
email-campaign-skill/
|-- skill/
|   |-- SKILL.md                        # Campaign calendar strategy engine
|   |-- flows/
|       |-- FLOW-SKILL.md               # Email flow builder engine
|-- scripts/
|   |-- campaign_ideator.jsx            # React UI for interactive calendar generation
|-- docs/
|   |-- PILLARS.md                      # Deep dive on the 5 content pillars
|   |-- FIGMA-MODULES.md                # Complete Figma template module reference
|   |-- SEGMENTATION.md                 # Segmentation strategy guide
|   |-- TEXT-BASED-EMAILS.md            # Text-based email rules and examples
|   |-- flows/
|       |-- FLOW-ARCHITECTURE.md        # Flow hierarchy, timing, interaction rules
|       |-- KLAVIYO-DYNAMIC-VARIABLES.md # Complete Klaviyo merge tag reference
|-- examples/
|   |-- example-calendar.md             # Sample campaign calendar output
|   |-- flows/
|       |-- example-browse-abandonment.md # Sample browse abandonment flow
|-- README.md                           # This file
|-- LICENSE                             # MIT License
|-- .gitignore
```

### How the pieces connect

**Campaign Calendar Skill:**
- **`skill/SKILL.md`** is the campaign brain. It contains the strategy framework, rules, 60+ angle examples, Figma module references, and output format. Loaded as a Claude Code skill, it transforms Claude into a senior email marketing strategist.
- **`scripts/campaign_ideator.jsx`** is the optional interactive UI. A React component with form-based inputs that calls the Claude API to generate calendars visually.

**Email Flow Skill:**
- **`skill/flows/FLOW-SKILL.md`** is the flow builder brain. It contains specifications for all 10 lifecycle flows, HTML email design system rules, Klaviyo merge tag usage, timing best practices, and deployment specs. Loaded as a Claude Code skill, it enables Claude to build production-ready HTML email flows.

**Both skills share** the 5 Content Pillar framework, S.C.E. quality standard, text-based email rules, and segmentation strategy.

---

## Installation

### As a Claude Code Skill (Recommended)

1. Clone this repo:
   ```bash
   git clone https://github.com/davidharttx/email-campaign-skill.git
   ```

2. Copy the skill directory into your Claude Code skills folder:
   ```bash
   cp -r email-campaign-skill/skill/ ~/.claude/skills/email-campaign-skill/
   cp -r email-campaign-skill/scripts/ ~/.claude/skills/email-campaign-skill/scripts/
   ```

3. The skill will automatically be available in Claude Code. Trigger it with:
   ```
   /campaign-calendar
   ```

### As a Standalone Reference

You can also use `skill/SKILL.md` as a system prompt or reference document for any LLM. The strategy framework, angle library, and output format work independently of Claude Code.

### Using the React UI Component

The `scripts/campaign_ideator.jsx` component can be integrated into any React application:

```bash
# In your React project
cp scripts/campaign_ideator.jsx src/components/CampaignIdeator.jsx
```

**Requirements for the React component:**
- React 18+
- Tailwind CSS (for styling classes)
- A backend proxy endpoint that forwards requests to the Anthropic API

**Backend Proxy Setup (required):**

The component sends requests to `/api/generate` by default (or `VITE_API_PROXY_URL` env var). You need a backend endpoint that adds your API key and forwards to Anthropic. Never expose API keys in client-side code.

Example Express proxy:
```js
// server.js
import express from "express";
const app = express();
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3001);
```

---

## Usage

### In Claude Code

Invoke the skill:
```
/campaign-calendar
```

Claude will collect these inputs:

| Input | Description | Example |
|---|---|---|
| **Brand name** | Your brand | "GlowRoot" |
| **Product description** | What you sell, ingredients, benefits, differentiators | "Natural skincare line with vitamin C serum, retinol cream, and hyaluronic acid moisturizer" |
| **Customer description** | Demographics, pain points, desires, buying motivation | "Women 25-45 concerned about aging, acne scarring, and uneven skin tone" |
| **Month** | Target calendar month | "April 2026" |
| **Send frequency** | Emails per week | "3x/week" (default, ~13 emails) |
| **Extra notes** | Launches, promos, exclusions, tone | "Earth Day promo planned, no BOGO this month" |

### Send Frequency Options

| Frequency | Emails/Month | Best For |
|---|---|---|
| **2x/week** | ~8 emails | Smaller lists, luxury brands, low-frequency preference |
| **3x/week** | ~13 emails | Default sweet spot for most DTC brands |
| **4x/week** | ~17 emails | High-traffic brands, large engaged lists, sale months |

**Rules:**
- 1-2x/week = customers forget you. Revenue left on the table.
- 5-7x/week = unsubscribes spike, messaging dilutes, diminishing returns.

---

## Skill Components

### SKILL.md (Core Strategy Engine)

**Location:** `skill/SKILL.md`

This is the core of the skill. It's a structured markdown document that contains:

1. **Frontmatter** — Skill metadata (name, description, trigger phrases)
2. **Input Collection** — The 6 data points to gather before generating
3. **Core Campaign Strategy** — Send frequency rules, 5-pillar balance, angle quality principles
4. **Campaign Angle Library** — 60+ real campaign angle examples organized by pillar
5. **S.C.E. Framework** — The quality standard every email must meet
6. **Email Type Rules** — Graphic vs. text-based email specifications
7. **Holiday & Seasonal Calendar** — Month-by-month holiday and seasonal hooks
8. **Figma Template Module Library** — 70+ named design modules organized by category
9. **Segmentation Strategy** — 5 core segments with usage guidelines
10. **Campaign Metrics Targets** — Open rate, click rate, placed order rate benchmarks
11. **Output Format** — Exact structure for calendar table and per-campaign briefs
12. **Quality Checklist** — 12-point validation checklist

When loaded as a Claude Code skill, SKILL.md acts as the system prompt that governs how Claude generates campaign calendars. Every rule in this file is enforced during generation.

### campaign_ideator.jsx (Interactive UI)

**Location:** `scripts/campaign_ideator.jsx`

A self-contained React component with three states:

1. **Form State** — Collects brand name, product description, customer description, month, frequency, and extra notes through a styled form interface
2. **Loading State** — Shows a spinner while the Claude API generates the calendar
3. **Results State** — Renders the complete calendar with:
   - Strategy summary
   - Pillar distribution breakdown (5-column grid showing count per pillar)
   - Filter controls (by pillar and email type)
   - Campaign cards grouped by week, expandable to show full brief details

**Key features:**
- Pillar-coded color badges (blue=Educational, purple=Social Proof, green=Community, amber=Product, red=Sales)
- Expandable campaign cards with all brief fields
- Filtering by pillar and email type (Graphic/Text-Based)
- Week-based grouping
- Dark mode UI with Tailwind CSS

**Dependencies:**
- React (useState hook)
- Tailwind CSS utility classes
- Anthropic API (`claude-sonnet-4-20250514` model)

---

## Skill 2: Email Flows

### Email Flow Usage

Invoke the flow builder skill:
```
/email-flows
```

Claude will collect brand inputs and then build complete lifecycle flows with:
- Production-ready HTML emails (inline CSS, mobile responsive, Outlook compatible)
- Klaviyo dynamic variables for behavioral data (browsed product, cart contents, etc.)
- Flow structure with timing, triggers, and filters
- Template naming and deployment specs

### FLOW-SKILL.md (Flow Builder Engine)

**Location:** `skill/flows/FLOW-SKILL.md`

Contains complete specifications for building all 10 lifecycle email flows:

1. Flow architecture (entry vs. lifecycle layers)
2. Revenue priority order
3. Per-flow specifications (emails, timing, pillars, purpose)
4. Klaviyo dynamic variable reference
5. HTML email design system rules
6. Text-based email rules for flows
7. Timing best practices
8. Deployment workflow and API limitations
9. Quality checklist

### The 10 Lifecycle Flows

| # | Flow | Trigger | Emails | Scope |
|---|------|---------|--------|-------|
| 1 | **Welcome** | Added to List | 3-5 | Per list |
| 2 | **Cart Abandonment** | Added to Cart | 3 | Universal |
| 3 | **Checkout Abandonment** | Started Checkout | 3 | Universal |
| 4 | **Browse Abandonment** | Viewed Product | 2-3 | Universal |
| 5 | **Post-Purchase** | Placed Order | 4-5 | Universal |
| 6 | **Nurture** | Added to List + delay | 4-6 | Per list |
| 7 | **Winback** | Purchase inactivity | 3 | Universal |
| 8 | **Replenishment** | Time since last order | 2 | Universal |
| 9 | **Sunset** | Engagement inactivity | 2 | Universal |
| 10 | **Review Request** | Post-delivery | 1-2 | Universal |

### Flow Architecture

Flows are organized in two layers:

- **Entry Flows** (per lead source) — Welcome and Nurture flows are unique to each list/signup source because messaging is tailored to how the customer entered.
- **Lifecycle Flows** (universal) — Behavioral flows like Browse Abandonment, Cart Abandonment, and Post-Purchase are shared across all customers because they trigger based on site behavior, not list membership.

See [docs/flows/FLOW-ARCHITECTURE.md](docs/flows/FLOW-ARCHITECTURE.md) for the complete architecture guide.

### Klaviyo Dynamic Variables

Behavioral flows use Klaviyo event variables to show the exact product, cart, or order the customer interacted with:

```
{{ event.ProductName }}        -- browsed/carted product name
{{ event.ProductURL }}         -- link to product page
{{ event.ProductImageURL }}    -- product image
{{ event.Price }}              -- product price
{{ event.CartTotal }}          -- total cart value (cart flows)
{{ first_name|default:"there" }} -- personalized greeting
```

See [docs/flows/KLAVIYO-DYNAMIC-VARIABLES.md](docs/flows/KLAVIYO-DYNAMIC-VARIABLES.md) for the complete reference.

---

## Shared Concepts

Both skills share these foundational frameworks:

---

## The 5 Content Pillars

Every monthly calendar balances approximately 20% per pillar. This prevents over-indexing on sales (which kills engagement) or education (which doesn't convert).

### 1. Educational (~20%)

Teach your audience something valuable. Position your brand as the expert.

| Angle Type | Examples |
|---|---|
| Ingredient breakdowns | "[Ingredient] 101: What it Actually Does" |
| Myth-busting | "Myth-Busting: [Category]" with check/x format |
| How-to routines | "Step 1: [Action]. Step 2: [Action]." |
| Tips/checklists | "Top Recovery Tips: Diet Edition" |
| Blog CTAs | "[Brand Blog] Will Ruin Takeout Forever" |
| Recipes | "Get Recipe: [Seasonal Recipe]" |
| Competitor comparisons | "Three Ingredients. Zero Fillers." |

### 2. Social Proof (~20%)

Let your customers do the selling. Real stories beat marketing copy.

| Angle Type | Examples |
|---|---|
| Review roundups | "What Our Customers Are Saying" |
| Single spotlights | "Crystal's Story" |
| Volume proof | "17,000+ Believers Can't Be Wrong..." |
| Before/after | "Real Hair Problems, Solved" |
| UGC compilations | "SPICY TESTIMONIALS" |
| Dual proof | "Trusted By Thousands. Verified By Science." |

### 3. Community / Branded (~20%)

Build emotional connection. Make customers feel like they belong.

| Angle Type | Examples |
|---|---|
| Origin story | "How It All Began..." |
| Founder messages | Personal notes from the founder |
| Mission/values | "Beauty With A Purpose" |
| Cause tie-ins | "In Honor of Earth Day" + VIP code |
| Giveaways | "We're Giving Away [Prize]" |
| Referral programs | "Refer a Friend -- Earn $20" |

### 4. Product / Collection (~20%)

Showcase what you sell. Make it easy to shop.

| Angle Type | Examples |
|---|---|
| Best sellers | "The Hat Pros Hall of Fame" |
| New drops | "New Drop: [Product]" |
| Restocks | "Restocked: [Product Name]" |
| Gift guides | "The Ultimate Gift Guide For Him" |
| Category navigation | "Shop By Category" |
| Bundles | "A Game-Changing Duo" |

### 5. Sales (~20%)

Drive revenue with strategic offers. Never over-discount.

| Angle Type | Examples |
|---|---|
| Flash sales | "24 Hours Only. Up to 40% Off Sitewide." |
| BOGO | "BOGO 50% OFF All Sale Items" |
| Tiered discounts | "The More You Buy, The More You Save" |
| Holiday sales | "4th of July BBQ Blowout is Live" |
| Email exclusives | "Email Exclusive: 30% Off" |
| Last chance | "LAST CHANCE: [X]% Off Ends Tonight" |

---

## Email Type System

### Graphic Emails (~80% of sends)

Every graphic email must specify an infographic format in the design note:

| Format | Best For |
|---|---|
| Checklist / Check-X List | Myth-busting, tips, what's NOT in product |
| Us vs. Them Comparison | Side-by-side brand comparison |
| Numbered Tips | Recovery tips, routines, how-to steps |
| Feature Diagram | Product anatomy, ingredient callouts |
| Before / After | Transformation products |
| Step-by-Step Routine | Skincare, haircare, supplement routines |
| Recipe Block | Food/beverage brands, lifestyle content |
| Gift Guide Grid | Holiday collections |
| Testimonial Grid | 2-3 reviews side-by-side |
| Single Customer Story | One powerful testimonial |
| Product Feature List | Feature breakdown with icons |
| Collection Grid | 2/3/4-product grid with individual CTAs |

### Text-Based Emails (~20% of sends, minimum 2/month)

**Why they work:** 99% of ecom emails are graphic-heavy. Text-based emails stand out, land in the primary inbox, feel like a friend wrote them, and reduce buyer resistance.

**Hard rules:**
- Under 250 words (hard limit)
- 1-2 CTAs maximum
- Named sender (real person or created persona)
- P.S. section required (most-read line in the email)

**Monthly minimum:** 1 educational text email + 1 promotional text email

**Example format:**
```
Hey [first name],

[Personal observation or brand story hook -- 2-3 sentences]

[Core value prop or objection answered -- 2-3 sentences]

[Soft CTA -- 1 sentence]

[CTA Button]

Warm,
[Founder Name] from [Brand]

P.S. [Offer + code + expiry -- this is the most-read line]
```

---

## S.C.E. Framework

Every email generated by this skill follows the S.C.E. framework:

### S -- Skimmable
- Sections with clear visual hierarchy
- Bold key points
- Infographics over paragraphs
- Short paragraphs (2-3 sentences max)
- 2-3 second decision window: can the reader get the point at a glance?

### C -- Clear & Concise
- ONE main idea per email
- ONE key takeaway
- ONE CTA direction
- Never stack 5-6 benefits in a single email
- If you can't summarize the email's purpose in one sentence, it's too complex

### E -- Engaging
- Humor where appropriate
- Curiosity-driven subject lines
- Seasonal hooks and cultural moments
- Storytelling over selling
- Content first, ad second

---

## Segmentation Strategy

| Segment | Use For | % of Sends |
|---|---|---|
| **90-Day Engaged** | Default for all regular campaigns. Drives 80-90% of revenue. | ~70% |
| **180-Day Engaged** | Product launches, BFCM, major flash sales. Wider net for big moments. | ~10% |
| **High Potential Purchasers** | Active on site in last 30 days, 0 purchases. Window shoppers who need a push. | 1-2 extra/month |
| **Win-Back** | Purchased 90-150 days ago, nothing since. Re-engage before they're gone. | 1-2/month |
| **VIP** | High LTV / repeat purchasers. Early access, exclusives, loyalty rewards. | 1-2/month |

**Always exclude from all sends:**
- Bounced 3+ times
- Marked as spam
- 0 opens in 12 months

---

## Holiday & Seasonal Calendar

The skill automatically checks for applicable holidays and seasonal angles based on the target month:

| Month | Key Dates & Angles |
|---|---|
| **January** | New Year New You, Start Strong, Subscribe & Save push |
| **February** | Valentine's Day gifting, Galentine's, heart health awareness |
| **March** | Spring collection, St. Patrick's Day, spring prep |
| **April** | Earth Day (VIP exclusive + cause tie-in), Spring sale, Easter |
| **May** | Mother's Day gifting, Memorial Day sale |
| **June** | Father's Day, Summer launch, Pride |
| **July** | 4th of July, Canada Day, Summer sale |
| **August** | Back to school, Late summer drops |
| **September** | Fall collection, Labor Day sale, New Season New Routine |
| **October** | Halloween, Fall Favorites, best sellers spotlight |
| **November** | BFCM (Black Friday + Cyber Monday), Veterans Day, Thanksgiving |
| **December** | Christmas, Gift guides, Shipping deadlines, Holiday gift cards, New Year's teaser |

---

## Figma Template Module Library

The skill references 70+ named Figma design modules. These are organized by category so designers know exactly which component to pull for each email.

See [docs/FIGMA-MODULES.md](docs/FIGMA-MODULES.md) for the complete reference.

**Categories:**
- Hero / Header Modules (8 modules)
- Offer Modules (9 modules)
- Educational / Content Modules (9 modules)
- Social Proof Modules (8 modules)
- Product / Collection Modules (11 modules)
- Brand / Community Modules (6 modules)
- Logistics / Trust Modules (5 modules)
- Footer Modules (3 modules)

---

## Output Format

The skill generates output in three sections:

### 1. Strategy Summary
A 2-sentence overview of the month's approach and key themes.

### 2. Calendar Table
```
| # | Week | Day | Name | Pillar | Type | Segment | Figma Modules |
|---|------|-----|------|--------|------|---------|---------------|
| 1 | 1    | Mon | ...  | ...    | ...  | ...     | ...           |
```

### 3. Per-Campaign Brief
Each email gets a full brief:

```
### Campaign [ID]: [Name]
- **Week / Day:** Week X -- [Day]
- **Pillar:** [Pillar]
- **Type:** Graphic | Text-Based
- **Segment:** [Segment]
- **Angle:** [Creative, brand-specific 1-sentence concept]
- **Subject Line:** [Curiosity-driven or benefit-led]
- **Preview Text:** [Builds on subject]
- **Hook / Pain Point:** [What problem or curiosity is addressed]
- **Primary CTA:** [Button text]
- **Design / Format Note:** [Infographic type + specific Figma modules]
- **Sender:** [Text-based only -- name/persona]
- **P.S. Line:** [Text-based only -- put the offer here]
```

---

## Campaign Metrics Targets

| Metric | Target | Notes |
|---|---|---|
| Open Rate | 50-60% ideal, 40%+ acceptable | Below 40% = subject line or deliverability issue |
| Click Rate | 1-3% | Below 1% = CTA or content issue |
| Placed Order Rate | 1%+ | The metric that matters most |

---

## Quality Checklist

Every calendar generated by this skill is validated against these 12 criteria:

- [ ] Every email: ONE idea, ONE takeaway, ONE CTA direction
- [ ] All 5 pillars represented across the month
- [ ] At least 2 text-based emails (1 educational, 1 promotional)
- [ ] Text-based emails: under 250 words, named sender, P.S. included
- [ ] Graphic emails: infographic type + Figma module named in design note
- [ ] Subject lines: curiosity-driven or benefit-led (never generic)
- [ ] Angles: creative, brand-specific, varied, no repeats back-to-back
- [ ] Holidays and seasonal moments incorporated where applicable
- [ ] Sales pillar approximately 20% unless BFCM or launch month
- [ ] Non-standard segments used at least once (Win-Back, VIP, High Potential)
- [ ] Countdown timer module called out for any flash sale or expiry email
- [ ] Shipping deadline block included for December calendars

---

## Examples

See [examples/example-calendar.md](examples/example-calendar.md) for a complete sample output.

**Quick preview -- April 2026 calendar for a supplement brand at 3x/week:**

| # | Week | Day | Name | Pillar | Type |
|---|------|-----|------|--------|------|
| 1 | 1 | Tue | Ingredient Deep-Dive: Vitamin C | Educational | Graphic |
| 2 | 1 | Thu | "My Skin Has Never Looked Better" | Social Proof | Graphic |
| 3 | 1 | Sat | Spring Refresh: Our Top 4 | Product | Graphic |
| 4 | 2 | Tue | A Note from Our Founder | Community | Text-Based |
| 5 | 2 | Thu | Earth Day: 20% Off + We Plant a Tree | Sales | Graphic |
| ... | ... | ... | ... | ... | ... |

---

## Customization

### Modifying the Strategy

Edit `skill/SKILL.md` to:

- **Add brand-specific angle examples** to the Campaign Angle Library
- **Adjust pillar ratios** (e.g., 30% Sales during BFCM month)
- **Add custom Figma modules** that match your design system
- **Modify segments** to match your Klaviyo setup
- **Update holiday calendar** with brand-specific events

### Modifying the UI

Edit `scripts/campaign_ideator.jsx` to:

- **Change the color scheme** (currently dark mode with violet/indigo accents)
- **Add export functionality** (CSV, JSON, Klaviyo API integration)
- **Modify the API model** (default: `claude-sonnet-4-20250514`)
- **Add additional input fields** (budget, brand voice, competitor URLs)

### Adding to an Existing Skill Library

The SKILL.md format is compatible with Claude Code's skill system. Place it in any skills directory and it will be discoverable by trigger phrases like:
- "campaign calendar"
- "email ideas"
- "what should I send"
- "campaign strategy"
- "Klaviyo campaigns"

---

## Contributing

Contributions are welcome. Areas where help is needed:

1. **More angle examples** -- real-world campaign angles organized by pillar
2. **Industry-specific templates** -- beauty, food, fitness, apparel, supplements
3. **Klaviyo API integration** -- auto-creating campaigns from generated calendars
4. **Additional ESP support** -- adapting merge tags for Mailchimp, Drip, etc.
5. **Localization** -- holiday calendars for non-US markets

### How to contribute

1. Fork this repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Submit a pull request with a clear description

---

## License

MIT License. See [LICENSE](LICENSE) for details.
