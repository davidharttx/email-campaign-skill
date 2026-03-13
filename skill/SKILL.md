---
name: email-campaign-skill
description: >
  Expert email marketing campaign strategy, ideation, and calendar building for e-commerce brands (especially Klaviyo/DTC). Use this skill whenever a user wants to plan email campaigns, build a campaign calendar, ideate campaign angles, write campaign briefs, decide on send frequency, apply segmentation strategy, or create monthly email marketing plans. Trigger on phrases like "campaign calendar", "email ideas", "what should I send", "campaign strategy", "Klaviyo campaigns", or any request to plan/build email marketing content for a brand.
---

# Campaign Calendar Generator
Generate a complete monthly Klaviyo campaign calendar for a DTC e-commerce brand, with email-by-email briefs, segmentation, design notes, and references to the exact Figma campaign template modules to use.
## Usage
```
/campaign-calendar
```
Collect inputs, then output a full calendar with angles, subject lines, preview text, segmentation, design notes, and Figma module references per email.

---

## Inputs to Collect
1. **Brand name**
2. **Product description** — ingredients, key benefits, differentiators
3. **Customer description** — demographics, pain points, desires, buying motivation
4. **Month** — e.g. "April 2026"
5. **Send frequency** — 2x/week (~8 emails), 3x/week (~13 emails), 4x/week (~17 emails)
6. **Extra notes** — upcoming launches, promos, excluded topics, tone

---

## Core Campaign Strategy

### Send Frequency Rules
- **2–4x/week is the sweet spot.** Default: 3x/week.
- 1–2x/week = customers forget you. Money left on the table.
- 5–7x/week = unsubscribes spike, messaging dilutes, diminishing returns.
- Higher site traffic / list growth = can push frequency up.

### The 5 Content Pillars
Balance ~20% per pillar. Adjust for big sale/launch months.

| Pillar | Examples |
|---|---|
| **Educational** | Ingredient breakdowns, FAQs, myth-busting, what's NOT in the product, competitor comparisons, science-backed content, how-to routines, tips, recipes, blog CTAs |
| **Social Proof** | Customer testimonials, media/press features, UGC, star ratings, before/after, "Real Stories, Real Results" |
| **Community / Branded** | Brand story ("How It All Began"), founder messages, behind-the-scenes, values, cause/mission (Earth Day, give-back), giveaways, referral programs |
| **Product / Collection** | Best sellers, new drops, restocks, seasonal collections, gift guides, product spotlights, "Shop By Category", limited stock alerts |
| **Sales** | Flash sales, BOGO, sitewide %, tiered discounts, holiday sales, last chance, extended sales, doorbuster deals |

### Idea Quality > Design Quality
Angles are everything. Creative ideas outperform beautiful-but-generic emails every time.
Angles must be:
- Creative, seasonal, and brand-specific
- Tied to holidays, cultural moments, product stories, customer pain points
- Varied — no two similar angles back-to-back
- Treated like **content**, not ads

---

## Real Campaign Angle Examples (from template library)
Use these as inspiration — adapt to any brand:

**Educational**
- "Myth-Busting: [Category]" — numbered myth list with ✅/❌ format
- "Top Recovery Tips: Diet Edition" — tips/checklist format
- "Three Ingredients. Zero Fillers." — ingredient transparency
- "Clogged Pores? No More!" — problem/solution
- "Your Hair. Your Journey. Your Routine." — educational routine walkthrough
- "5 Utensils That Belong in Every Kitchen" — tips/list
- "Make Meal Prep a Breeze" — lifestyle education
- "[Ingredient] 101: What it Actually Does" — ingredient deep-dive
- "Step 1: [Action]. Step 2: [Action]." — routine/how-to
- "[Brand Blog] Will Ruin Takeout Forever" — blog CTA angle
- "Get Recipe: [Seasonal Recipe]" — recipe email

**Social Proof**
- "Real Stories, Real Heat" — UGC/testimonials
- "Real Hair Problems, Solved" — before/after + reviews
- "17,000+ Believers Can't Be Wrong…" — social proof volume
- "SPICY TESTIMONIALS" — fun testimonial roundup
- "What Our Customers Are Saying" — review grid
- "Crystal's Story" — single customer spotlight
- "These Hats Have Earned Their Stripes" — repeat buyer loyalty story
- "Trusted By Thousands. Verified By Science." — dual proof angle

**Community / Branded**
- "How It All Began…" — brand origin story
- "GROW & BEHOLD" — brand values/mission
- "Every Pair Tells a Story" — brand identity
- "Beauty With A Purpose" — mission/cause
- "In Honor of Earth Day" — cause tie-in with VIP exclusive code
- "We're Giving Away [Prize]" — giveaway/contest
- "Refer a Friend — Earn $20" — referral program
- "JOIN THE GREATS" — community/loyalty
- "Corporate Gifts That Say More" — B2B/gifting angle

**Product / Collection**
- "The Best from the Deep Blue" — product spotlight
- "Send a Meal That Brightens Their Day" — gifting angle
- "A Taste of the Ocean, Straight to Their Door" — sensory/product
- "Restocked: [Product Name]" — restock urgency
- "New Drop: [Product]" — launch announcement
- "New Colors & Soulful Extras" — collection expansion
- "The Hat Pros Hall of Fame" — best sellers spotlight
- "The Ultimate Gift Guide For Him" — gift guide
- "Shop By Category" — collection navigation
- "[Product] — made different." — differentiation
- "What's On Sale: [Category]" — sale preview
- "A Game-Changing Duo" — product pairing/bundle

**Sales**
- "4th of July BBQ Blowout is Live" — holiday flash sale
- "TREAT DAD WITH BOGO 50% OFF" — Father's Day
- "LAST CHANCE FOR VETS" — Veterans Day
- "35% Off Scrubs — The More You Buy, The More You Save" — tiered discount
- "BOGO 50% OFF All Sale Items" — BOGO
- "24 Hours Only. Up to 40% Off Sitewide." — flash sale
- "Last Chance to Secure These Looks" — urgency/scarcity
- "Sale Extended: 25–50% Off Until [Date]" — extended sale
- "NEW WEEK | NEW SAVINGS | NEW LOOK" — weekly cadence sale
- "Doorbuster Deals: 50% Off [Specific Products]" — limited product sale
- "Email Exclusive: 30% Off / Everything Else: 20% Off" — email-only offer
- "ORDER NOW & SAVE $15" — AOV booster
- "LAST CHANCE: [X]% Off Ends Tonight" — final push

---

## S.C.E. Framework (every email)
- **Skimmable**: Sections, bold points, infographics, short paragraphs. 2–3 second decision window.
- **Clear & Concise**: ONE main idea, ONE takeaway, ONE CTA direction. Never stack 5–6 benefits.
- **Engaging**: Humor, curiosity, seasonal hooks, storytelling. Content first, ad second.

---

## Email Type Rules

### Graphic Emails (~80%)
Specify an infographic format in `design_note` for every graphic email:

| Format | Best For |
|---|---|
| **Checklist / ✅❌ List** | Myth-busting, Us vs. Them, what's NOT in product, tips |
| **Us vs. Them Comparison** | "Your Brand ✅ / The Other Guys ❌" — side-by-side with features |
| **Numbered Tips** | Recovery tips, routines, kitchen tools, how-to steps |
| **Feature Diagram** | Product anatomy, how it works, ingredient callouts |
| **Before / After** | Skincare, hair, transformation products |
| **Step-by-Step Routine** | "Step 1: Moisturize + Detangle", routine walkthroughs |
| **Recipe Block** | Food/beverage brands, lifestyle content, seasonal recipes |
| **Gift Guide Grid** | "The Ultimate Gift Guide For Him/Her", holiday collections |
| **Blog CTA Block** | "READ THE BLOG" with teaser copy, drives traffic to content |
| **Testimonial Grid** | 2–3 reviews side-by-side, star ratings, verified buyer badges |
| **Single Customer Story** | One powerful testimonial with name + photo, "Crystal's Story" format |
| **Product Feature List** | Feature #1 / #2 / #3 with icons + short copy per feature |
| **Graph / Stat Visual** | Research claims, % improvement, study data |
| **Collection Grid** | 2/3/4-product grid with names + individual CTAs |
| **Giveaway Entry Block** | Prize visual + "ENTER HERE" CTA |
| **Referral Program Block** | "Earn $20 when you refer a friend" + INVITE A FRIEND CTA |

### Text-Based Emails (~20% — minimum 2/month)
**Why they work:** 99% of ecom emails are graphic-heavy. Text-based stands out, lands in primary inbox, feels like a friend, reduces buyer resistance.

**Hard rules:**
- **Under 250 words.** Hard limit.
- **1–2 CTAs max.** One button, highlighted, stands out in black text.
- **Named sender** — real person or invented persona. e.g. "Sarah from GlowRoot"
- **P.S. section required** — most-read line in the email. Put the offer or key CTA here.

**Monthly minimum:** 1 educational + 1 promotional

**Live text-based email examples from template library:**

Example 1 — Cyber Monday urgency (travel brand):
```
Subject: ENDS TONIGHT
Hey {{ first_name|default:'there' }}!
These are the final hours of our Cyber Monday deals…
50% OFF when you spend $500 and 40% OFF sitewide. We're running out
of packing cubes, which you can get for free when you spend over $200.
On top of all this — you can get an EXTRA $11 OFF with code: [CODE].
Click here to shop now. By tomorrow, everything goes back to full price.
Save on bags today, spend more on travels tomorrow! 😉
Best,
[Name] from [Brand]
```

Example 2 — Hormones/supplement sale:
```
Hey {{ firstname }},
[1-2 sentences of personal context or product belief]
Sale ends tonight, [Date]. Don't wait!
>> [CTA: SUBSCRIBE & SAVE 20% OFF]
Your [benefit] deserve this.
With love,
[Name]
```

Example 3 — Founder note format with P.S.:
```
Hey [first name],
[Personal observation or brand story hook — 2-3 sentences]
[Core value prop or objection answered — 2-3 sentences]
[Soft CTA — 1 sentence]
[CTA Button]
Warm,
[Founder Name] from [Brand]
P.S. [Offer + code + expiry — this is the most-read line]
```

---

## Holiday & Seasonal Campaign Calendar
Always check for applicable holidays and seasonal angles. Reference this when building any monthly calendar:

| Month | Key Dates / Angles |
|---|---|
| **January** | New Year New You, New Fits, Start Strong, "Welcome 2025 with Sweet Balance", Subscribe & Save push |
| **February** | Valentine's Day gifting, "Gift a Truly Decadent Meal", Galentine's, heart health awareness |
| **March** | Spring collection drop, St. Patrick's Day, March Favorites, spring prep |
| **April** | Earth Day (VIP exclusive, cause tie-in), Spring sale, Easter |
| **May** | Mother's Day gifting, Memorial Day sale, spring into summer |
| **June** | Father's Day ("TREAT DAD", "Give Him the Gift of Silent Confidence"), Summer launch, Pride |
| **July** | 4th of July ("BBQ Blowout is Live", "Shop Father's Day Cuts"), Canada Day (CANADA20), Summer sale, "Last Chance for Summer" |
| **August** | Back to school, Late summer drops, "Endless Summer" |
| **September** | Fall collection, Labor Day sale, New Season New Routine |
| **October** | Halloween, Fall Favorites, October best sellers, "Trick" theme |
| **November** | BFCM — Black Friday ("BF2024", countdown, doorbuster deals, 20–50% off), Cyber Monday (SWEETCYBERMONDAY), Veterans Day ("LAST CHANCE FOR VETS"), Thanksgiving |
| **December** | Christmas collection, Gift guides ("The Gift That Fits Every Taste"), Shipping deadlines ("GET-IT-IN-TIME", Last Call for Standard Shipping, Order by Dec 12th/24th), Holiday gift cards, New Year's teaser |

---

## Campaign Figma Template Modules
Reference these by name in `design_note` so the designer/builder knows exactly what to pull.

### Hero / Header Modules
- **Holiday Sale Banner** — Full-width seasonal headline (4th of July, BFCM, Cyber Monday, Christmas, Canada Day, Earth Day). Includes scrolling ticker variant ("Black Friday · Black Friday · Black Friday…")
- **Countdown Timer Hero** — `00 : 00 : 00` Hours/Minutes/Seconds. Use for flash sales, BFCM, offer expiry, launch day.
- **Discount Code Hero** — Large headline + code block + expiry line. Static or `[DYNAMIC]` Klaviyo code.
- **BOGO Hero** — "BUY ONE GET ONE [X]% OFF SITEWIDE" full-width header.
- **Urgency Banner** — "ENDS TONIGHT / LAST CHANCE / 24 HOURS ONLY / SALE EXTENDED" headline strip.
- **New Drop Hero** — "NEW DROP / RESTOCKED / NEW ARRIVALS" with product visual.
- **Standard Editorial Header** — Logo + headline + subheadline. Clean entry for educational or brand emails.
- **Gift Guide Hero** — "The Ultimate Gift Guide For [Him/Her/Them]" with seasonal treatment.

### Offer Modules
- **Tiered Discount Block** — 3-tier structure: 15% off $50 / 20% off $100 / 25% off $150 (or any tiers).
- **BOGO Module** — "BUY ONE GET ONE [X]% OFF" with product image + CTA.
- **Doorbuster Deals Grid** — 3–4 specific products each with their own % off + individual SHOP NOW.
- **Email Exclusive Split** — Two-column: "Email Exclusive [X]% / Everything Else [Y]%".
- **Flash Sale Strip** — "1 Day Only. Don't miss it! Orders $X+ get [X]% off" — stacked tiers.
- **Offer Expiry Block** — "Your [X]% Off Expires Tonight" or "Your $[X] Offer Expires Soon" + code + CTA.
- **Klaviyo Dynamic Section** — Personalized product recs or dynamic discount codes from Klaviyo.
- **Price Strike-Through Block** — Original price crossed out → Sale price. e.g. €280 → €169, "-40%".
- **Limited Stock Badge** — "LIMITED STOCK" callout overlay on product image.

### Educational / Content Modules
- **Myth-Busting Numbered List** — "Common [Category] Myths: 1, 2, 3…" with ✅/❌ per myth.
- **Us vs. Them Comparison** — Two columns: "YOUR BRAND ✅ / The Other Guys ❌" with feature rows.
- **Numbered Tips Module** — "Top [X] Tips: Diet/Recovery/Routine Edition" — numbered with icon or image per tip.
- **Step-by-Step Routine** — "Step 1: [Action]" sequential flow, good for skincare/haircare/supplement routines.
- **Recipe Block** — Recipe name + ingredient callout + "Get Recipe" CTA. For food, beverage, supplement brands.
- **Blog CTA Block** — "READ THE BLOG" headline + teaser sentence + CTA button. Drives traffic to content.
- **How It Works (4-Step)** — Select → Choose → Customize → Order (or any 4-step flow).
- **Tip Callout Block** — "✅ Tip: [short actionable tip]" — inline educational callout.
- **Ingredient Callout Icons** — Icon + benefit one-liner (e.g., "Promotes healthy estrogen levels", "Reduces hormonal acne").

### Social Proof Modules
- **Single Testimonial Full-Width** — Large quote + reviewer name + Verified Buyer badge + date.
- **Multi-Review Grid** — 2–3 testimonials side by side with names and ratings.
- **Star Rating Bar** — "[X,000]+ Reviews · [X.X] Average Rating" trust strip.
- **Customer Story Spotlight** — "Crystal's Story" / "Real Stories, Real Heat" — one featured customer narrative.
- **Before / After Module** — BEFORE image / AFTER image side-by-side or stacked. For transformation products.
- **UGC Block** — User photo + caption + verified buyer attribution.
- **SPICY TESTIMONIALS** — Fun/punchy review compilation with brand personality.
- **Repeat Buyer Badge** — "503+ Verified Reviews" / "267+ Verified Reviews" trust callout near CTA.

### Product / Collection Modules
- **Single Product Spotlight** — Hero image + product name + short description + SHOP NOW.
- **2-Product Grid** — Two products side by side with names + CTAs.
- **3-Product Grid** — Three products (PRODUCT 1/2/3) with images + individual SHOP NOW.
- **4-Product Grid** — Four products. Best for collection highlights or gift guides.
- **Best Sellers Callout** — "The Top Picks" / "Check Out Our Best Sellers" header + product grid.
- **Shop By Category** — Category tiles (SHOP MEN'S / SHOP WOMEN'S / Kits & Supplies / etc.).
- **New Arrivals Strip** — NEW ARRIVALS / FINAL SALE / CONTACT US navigation bar.
- **Size Selector Display** — XXS / XS / S / M / L / XL / 2XL / 3XL / 4XL / 5XL grid for apparel.
- **Product Feature Breakdown** — Feature #1 / Feature #2 / Feature #3 with icons + 1-line descriptions.
- **Add to Box Module** — For subscription brands. "Add to Box" CTA on product card.
- **Bundle / Combo Module** — Product A + Product B with "+" visual = "A Game-Changing Duo".

### Brand / Community Modules
- **Founder Story Block** — Founder name + image + personal narrative. "How It All Began…" / "Our Story".
- **Brand Mission Block** — "GROW & BEHOLD" / "Beauty With A Purpose" / "MY MISSION" — values copy.
- **Giveaway Entry Block** — Prize visual + contest description + "ENTER HERE" CTA.
- **Referral Program Block** — "Earn $20 when you refer a friend" + INVITE A FRIEND button.
- **Digital Gift Card Block** — "DIGITAL GIFT CARD" product image + gifting copy + CTA.
- **Cause / Holiday Tie-In Block** — Earth Day, Veterans Day, Canada Day — mission-aligned offer. e.g. "In Honor of Earth Day — Use code VIPEARTHDAY".

### Logistics / Trust Modules
- **Shipping Guide / Deadline Block** — "GET-IT-IN-TIME" with standard shipping cutoff dates (e.g. "Order by Dec 12th for Dec 24th arrival"). Holiday essential.
- **Trust Badge Strip** — BUY NOW PAY LATER · FREE X DAY SHIPPING · 24/7 SUPPORT.
- **Customer Support Block** — "Have a question? Contact us at support@brand.com".
- **Buy Now Pay Later Block** — "BUY NOW, PAY LATER WITH PAYPAL" — financing callout near high-AOV products.
- **Free Shipping Banner** — "FREE SHIPPING ON ALL ORDERS" or "Free shipping on orders $100+".

### Footer Modules
- **Standard Footer** — Unsubscribe + copyright + brand address.
- **Social Footer** — Instagram handle + website + unsubscribe.
- **Branded Tagline Footer** — "Powered by [Values], Mastered by [NAME]" + copyright.

---

## Segmentation

| Segment | Use For |
|---|---|
| **90-Day Engaged** | Default — all regular campaigns. 80–90% of sales. |
| **180-Day Engaged** | Product launches, BFCM, major flash sales. |
| **High Potential Purchasers** | Active on site 30 days, 0 purchases — window shoppers. 1–2 extra/month. |
| **Win-Back** | Purchased 90–150 days ago, nothing since. |
| **VIP** | High LTV / repeat purchasers — early access, exclusives. |

**Always exclude:** Bounced 3+ times · Marked spam · 0 opens in 12 months.

---

## Campaign Metrics Targets

| Metric | Target |
|---|---|
| Open Rate | 50–60% ideal, 40%+ acceptable |
| Click Rate | 1–3% |
| Placed Order Rate | 1%+ |

---

## Output Format

### 1. Summary
2-sentence overview of the month's strategy and key themes.

### 2. Calendar Table
```
| # | Week | Day | Name | Pillar | Type | Segment | Figma Modules |
```

### 3. Per-Campaign Brief
```
### Campaign [ID]: [Name]
- **Week / Day:** Week X — [Day]
- **Pillar:** [Pillar]
- **Type:** Graphic | Text-Based
- **Segment:** [Segment]
- **Angle:** [Creative, brand-specific 1-sentence concept]
- **Subject Line:** [Curiosity-driven or benefit-led — never generic]
- **Preview Text:** [Builds on subject]
- **Hook / Pain Point:** [What problem, objection, or curiosity is addressed]
- **Primary CTA:** [Button text]
- **Design / Format Note:** [Infographic type + specific Figma modules to pull]
- **Sender:** [Text-based only — name/persona]
- **P.S. Line:** [Text-based only — put the offer here]
```

---

## Quality Checklist
- [ ] Every email: ONE idea, ONE takeaway, ONE CTA direction
- [ ] All 5 pillars represented across the month
- [ ] At least 2 text-based emails (1 educational, 1 promotional)
- [ ] Text-based: under 250 words, named sender, P.S. included
- [ ] Graphic emails: infographic type + Figma module named in design note
- [ ] Subject lines: curiosity-driven or benefit-led — never generic
- [ ] Angles: creative, brand-specific, varied, no repeats
- [ ] Holidays / seasonal moments incorporated
- [ ] Sales pillar ~20% unless BFCM / launch month
- [ ] Non-standard segments used at least once (Win-Back, VIP, High Potential)
- [ ] Countdown timer module called out for any flash sale or expiry email
- [ ] Shipping deadline block included for December calendars
