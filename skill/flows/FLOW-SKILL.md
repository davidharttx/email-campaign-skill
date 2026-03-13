---
name: email-flow-skill
description: >
  Expert Klaviyo email flow builder for DTC e-commerce brands. Builds complete lifecycle email flows — Welcome, Nurture, Browse Abandonment, Cart Abandonment, Checkout Abandonment, Post-Purchase, Winback, Sunset, Replenishment, and Review Request. Generates production-ready HTML emails with brand-specific design systems, Klaviyo merge tags, dynamic product data, and mobile-responsive layouts. Trigger on phrases like "email flow", "welcome series", "abandoned cart", "browse abandonment", "post-purchase flow", "winback flow", "lifecycle emails", "Klaviyo flow", or any request to build automated email sequences.
---

# Email Flow Builder

Build complete Klaviyo lifecycle email flows for DTC e-commerce brands. Generates production-ready HTML emails with flow architecture, timing, triggers, segmentation, and deployment specs.

## Usage
```
/email-flows
```
Collect brand inputs, then build the complete flow with HTML emails, flow structure, and Klaviyo deployment instructions.

---

## Inputs to Collect

1. **Brand name**
2. **Product catalog** — top products with names, prices, URLs, image URLs, key benefits
3. **Brand voice** — tone adjectives, FDA/compliance requirements, key phrases
4. **Design system** — colors (primary, secondary, accent), fonts (headline, body), logo treatment
5. **Sender identity** — from name, from email, reply-to
6. **Flow type** — which flow to build (Welcome, Nurture, Browse Abandonment, etc.)
7. **Discount/offer** — active discount code, percentage, conditions
8. **Extra notes** — specific angles, products to feature, compliance requirements

---

## Flow Architecture: The Complete Lifecycle

### Flow Hierarchy & Priority

Flows are organized in two layers:

| Layer | Scope | Flows |
|---|---|---|
| **Entry** | Per lead source (unique per list/segment) | Welcome, Nurture |
| **Lifecycle** | Universal (shared across all leads) | Browse Abandonment, Cart Abandonment, Checkout Abandonment, Post-Purchase, Winback, Sunset, Replenishment, Review Request |

**Why two layers?**
- **Entry flows** are list-specific because messaging is tailored to how the customer entered (each lead magnet, signup form, or acquisition channel gets its own welcome sequence)
- **Lifecycle flows** are behavioral — they trigger based on what the customer *does* on the site (views a product, adds to cart, makes a purchase), regardless of which list they came from

### Revenue Priority Order

Build flows in this order for maximum revenue impact:

| Priority | Flow | Revenue Impact | Trigger |
|---|---|---|---|
| 1 | **Welcome** | First impression, sets relationship | Added to List |
| 2 | **Cart Abandonment** | Recovers ~70% of abandoned carts | Added to Cart, no checkout |
| 3 | **Checkout Abandonment** | Highest-intent recovery | Started Checkout, no order |
| 4 | **Browse Abandonment** | Re-engages window shoppers | Viewed Product, no cart |
| 5 | **Post-Purchase** | Builds LTV, reduces refunds | Placed Order |
| 6 | **Nurture** | Converts educated non-buyers | Completed Welcome series |
| 7 | **Winback** | Re-engages lapsed customers | No purchase in 60-90 days |
| 8 | **Replenishment** | Drives repeat orders | X days since last purchase |
| 9 | **Sunset** | Cleans list, last attempt | No engagement in 120+ days |
| 10 | **Review Request** | Collects social proof | X days post-delivery |

---

## Flow Specifications

### 1. Welcome Flow (3-5 emails)

**Trigger:** Added to List
**Scope:** Per lead source (unique per list)

| Email | Timing | Pillar | Purpose |
|---|---|---|---|
| 1 | Immediate | Sales/Product | Deliver discount + introduce brand |
| 2 | Day 2 | Community | Brand story + founder message |
| 3 | Day 4 | Social Proof | Customer testimonials + reviews |
| 4 | Day 7 | Educational | Product guide + ingredients/benefits |
| 5 | Day 10 | Sales | Last chance discount reminder |

**Key rules:**
- Email 1 must deliver the promised incentive immediately (discount code, free resource, etc.)
- Build trust before asking for the sale
- End with urgency (discount expiration)
- From a named person (founder, team member) — not "Brand Name"

### 2. Nurture Flow (4-6 emails)

**Trigger:** Added to List (same as Welcome, with 14-day delay to let Welcome complete)
**Scope:** Per lead source
**Audience:** Subscribers who completed Welcome but haven't purchased

| Email | Timing | Pillar | Purpose |
|---|---|---|---|
| 1 | Day 14 | Educational | Deep ingredient/science breakdown |
| 2 | Day 16 | Social Proof | Customer stories and reviews |
| 3 | Day 18 | Product/Collection | Best sellers spotlight |
| 4 | Day 20 | Community | Founder personal note (TEXT-BASED) |
| 5 | Day 23 | Sales | Final discount push with urgency |

**Key rules:**
- Must cover all 5 content pillars
- At least 1 text-based email (the founder note)
- Progressive engagement: educate -> prove -> showcase -> connect -> convert
- Reference the original discount code from Welcome

### 3. Browse Abandonment Flow (2-3 emails)

**Trigger:** Viewed Product metric (no Add to Cart within filter window)
**Scope:** Universal (all customers)

| Email | Timing | Pillar | Purpose |
|---|---|---|---|
| 1 | 1 hour | Product | Soft reminder with dynamic product |
| 2 | 24 hours | Social Proof | Reviews + dynamic product reminder |
| 3 | 48 hours | Sales | Personal note with incentive (TEXT-BASED) |

**Klaviyo dynamic variables:**
```
{{ event.ProductName }}        — browsed product name
{{ event.ProductURL }}         — link to product page
{{ event.ProductImageURL }}    — product image
{{ event.Price }}              — product price
{{ event.Categories }}         — product categories
```

**Key rules:**
- Email 1 is a gentle nudge, not a hard sell
- Email 2 builds confidence with social proof
- Email 3 is text-based (personal, low-pressure)
- All emails show the exact product they browsed (dynamic content)
- Include trust signals (guarantee, reviews, certifications)

### 4. Cart Abandonment Flow (3 emails)

**Trigger:** Added to Cart (no Started Checkout within filter window)
**Scope:** Universal

| Email | Timing | Pillar | Purpose |
|---|---|---|---|
| 1 | 1 hour | Product | "You left something behind" + cart contents |
| 2 | 24 hours | Social Proof | Reviews for carted product + trust signals |
| 3 | 48 hours | Sales | Urgency + potential incentive |

**Klaviyo dynamic variables:**
```
{{ event.ProductName }}
{{ event.ProductURL }}
{{ event.ProductImageURL }}
{{ event.Price }}
{{ event.Quantity }}
{{ event.CartTotal }}
```

**Key rules:**
- Higher intent than browse — these people wanted the product
- Email 1: remind, don't discount (they already want it)
- Email 2: overcome objections with social proof
- Email 3: create urgency (limited stock, expiring cart, or small incentive)
- Show cart contents dynamically
- Include free shipping threshold if applicable

### 5. Checkout Abandonment Flow (3 emails)

**Trigger:** Started Checkout (no Placed Order within filter window)
**Scope:** Universal

| Email | Timing | Pillar | Purpose |
|---|---|---|---|
| 1 | 30 min | Product | "Complete your order" + checkout link |
| 2 | 6 hours | Social Proof | Trust signals + customer reviews |
| 3 | 24 hours | Sales | Final push + guarantee reminder |

**Key rules:**
- Highest intent — they entered payment info
- Email 1 should feel helpful ("Did something go wrong?")
- Shorter delays than browse/cart (urgency is higher)
- Include direct checkout recovery link
- Emphasize trust: secure checkout, guarantee, easy returns
- Do NOT over-discount — these buyers are almost there

### 6. Post-Purchase Flow (4-5 emails)

**Trigger:** Placed Order (Fulfilled Order for shipping-based)
**Scope:** Universal

| Email | Timing | Pillar | Purpose |
|---|---|---|---|
| 1 | Immediate | Community | Thank you + what to expect |
| 2 | Day 3 | Educational | How to use + tips for best results |
| 3 | Day 7 | Community | Brand story + mission (deepen connection) |
| 4 | Day 14 | Product | Cross-sell / upsell related products |
| 5 | Day 21 | Social Proof | Request review + share referral program |

**Key rules:**
- NO selling in email 1 — just gratitude and expectation-setting
- Reduce buyer's remorse with education (how to use, what to expect)
- Cross-sell after they've had time with the product (not immediately)
- Review request timing depends on product type (supplements: 2-3 weeks, instant products: 1 week)

### 7. Winback Flow (3 emails)

**Trigger:** Last purchase 60-90 days ago, no repeat order
**Scope:** Universal

| Email | Timing | Pillar | Purpose |
|---|---|---|---|
| 1 | Day 0 | Community | "We miss you" + what's new |
| 2 | Day 5 | Sales | Incentive to return (discount or free shipping) |
| 3 | Day 10 | Sales | Last chance + stronger incentive |

**Key rules:**
- Acknowledge the gap without being guilt-trippy
- Show what's new or improved since they left
- Escalating incentives (no discount -> small discount -> larger discount)
- If they don't convert after 3 emails, move to Sunset

### 8. Sunset Flow (2 emails)

**Trigger:** No email engagement in 120+ days
**Scope:** Universal

| Email | Timing | Pillar | Purpose |
|---|---|---|---|
| 1 | Day 0 | Community | "Do you still want to hear from us?" |
| 2 | Day 7 | Sales | Final offer + unsubscribe option |

**Key rules:**
- Purpose is list hygiene — unengaged subscribers hurt deliverability
- Give a clear opt-in/opt-out choice
- If no engagement after email 2, suppress from all future sends
- Better to have a smaller, engaged list than a large, dead one

### 9. Replenishment Flow (2 emails)

**Trigger:** X days since last purchase (based on product consumption cycle)
**Scope:** Universal

| Email | Timing | Pillar | Purpose |
|---|---|---|---|
| 1 | Day X-7 | Product | "Time to restock" + easy reorder |
| 2 | Day X | Sales | Last chance + potential incentive |

**Common replenishment cycles:**
- Supplements: 25-30 days
- Skincare: 45-60 days
- Coffee/tea: 14-21 days
- Pet food: 21-30 days

**Key rules:**
- Time based on actual product usage (not arbitrary)
- Make reordering as frictionless as possible
- Subscription upsell opportunity ("Never run out — subscribe & save")

### 10. Review Request Flow (1-2 emails)

**Trigger:** X days post-delivery (product-dependent)
**Scope:** Universal

| Email | Timing | Pillar | Purpose |
|---|---|---|---|
| 1 | Day X+7 | Social Proof | Request review + make it easy |
| 2 | Day X+14 | Social Proof | Gentle reminder if no review |

**Key rules:**
- Wait until they've had time to use the product
- Make the review process as simple as possible (1-click star rating)
- Consider a small incentive (discount on next order, loyalty points)
- Link directly to the review form, not the product page

---

## Email Design System Rules

### Reference HTML Template

Use this as a structural starting point for every flow email. Adapt sections, colors, copy, and dynamic variables per flow and brand.

```html
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ subject_line }}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    body, table, td { font-family: 'Helvetica Neue', Arial, sans-serif; }
    img { border: 0; display: block; max-width: 100%; }
    a { color: #1A3D28; text-decoration: underline; }
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; padding: 0 16px !important; }
      .hero-img { height: auto !important; }
      .stack-col { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#FAF7F2;">
  <!-- Preheader (hidden preview text) -->
  <div style="display:none; max-height:0; overflow:hidden;">
    {{ preview_text }}&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF7F2;">
    <tr><td align="center" style="padding: 20px 0;">
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; border-radius:12px; overflow:hidden;">

        <!-- HEADER: Logo + Optional Label -->
        <tr><td style="padding:24px 32px; text-align:center;">
          <img src="{{ brand_logo_url }}" alt="{{ brand_name }}" width="140" style="margin:0 auto;">
        </td></tr>

        <!-- HERO SECTION -->
        <tr><td style="padding:0;">
          <img src="{{ hero_image_url }}" alt="{{ hero_alt_text }}" width="600" class="hero-img" style="width:100%; display:block;">
        </td></tr>

        <!-- HEADLINE + BODY COPY -->
        <tr><td style="padding:32px 32px 16px;">
          <h1 style="margin:0; font-size:28px; line-height:1.3; color:#1A3D28; font-weight:700;">
            {{ headline }}
          </h1>
        </td></tr>
        <tr><td style="padding:0 32px 24px;">
          <p style="margin:0; font-size:16px; line-height:1.6; color:#4A4A4A;">
            {{ body_copy }}
          </p>
        </td></tr>

        <!-- PRIMARY CTA BUTTON -->
        <tr><td style="padding:0 32px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr><td style="background-color:#1A3D28; border-radius:8px;">
              <a href="{{ cta_url }}" style="display:inline-block; padding:16px 40px; color:#FFFFFF; font-size:16px; font-weight:700; text-decoration:none; text-align:center;">
                {{ cta_text }}
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- TRUST BAR (3 signals) -->
        <tr><td style="padding:0 32px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td class="stack-col" width="33%" style="text-align:center; padding:12px 8px; font-size:12px; color:#666;">
                {{ trust_signal_1 }}
              </td>
              <td class="stack-col" width="33%" style="text-align:center; padding:12px 8px; font-size:12px; color:#666;">
                {{ trust_signal_2 }}
              </td>
              <td class="stack-col" width="33%" style="text-align:center; padding:12px 8px; font-size:12px; color:#666;">
                {{ trust_signal_3 }}
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="padding:24px 32px; background-color:#F5F5F5; text-align:center;">
          <p style="margin:0 0 8px; font-size:14px; font-weight:600; color:#1A3D28;">{{ brand_name }}</p>
          <p style="margin:0 0 16px; font-size:12px; color:#999;">
            <a href="{{ shop_url }}" style="color:#999;">Shop</a> &nbsp;|&nbsp;
            <a href="{{ about_url }}" style="color:#999;">Our Story</a> &nbsp;|&nbsp;
            <a href="{{ support_url }}" style="color:#999;">Support</a>
          </p>
          <p style="margin:0 0 8px; font-size:11px; color:#BBB; line-height:1.5;">
            {{ compliance_disclaimer }}
          </p>
          <p style="margin:0; font-size:11px; color:#BBB;">
            <a href="{{ unsubscribe_url }}" style="color:#BBB;">Unsubscribe</a> &nbsp;|&nbsp;
            <a href="{{ manage_preferences_url }}" style="color:#BBB;">Manage Preferences</a>
          </p>
          <p style="margin:8px 0 0; font-size:11px; color:#CCC;">&copy; {{ current_year }} {{ brand_name }}. All rights reserved.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
```

**Adapt this template by:**
- Replacing placeholder variables (`{{ headline }}`, `{{ body_copy }}`, etc.) with actual content or Klaviyo dynamic variables
- Adding/removing sections (product grids, review blocks, ingredient callouts) as needed
- Changing the color palette to match the brand (replace `#1A3D28`, `#FAF7F2`, etc.)
- Adding Outlook-specific table fixes inside `<!--[if mso]>` blocks as needed

---

### HTML Email Standards

Every email must follow these technical standards:

| Rule | Specification |
|---|---|
| Max width | 600px |
| Layout | Table-based (not div-based) for email client compatibility |
| CSS | All styles inline (no external stylesheets) |
| Mobile | @media queries for max-width:620px breakpoint |
| Outlook | MSO conditional comments for Outlook compatibility |
| Images | Max-width:100%, display:block, alt text required |
| Preheader | Hidden div with &zwnj;&nbsp; padding after preview text |
| Links | All href attributes must be absolute URLs |
| Fonts | Web-safe fallback stack for every font-family declaration |

### Required Email Sections

Every flow email must include:

1. **Preheader** — Hidden preview text with whitespace padding
2. **Header** — Brand logo/name, optional mint label, headline
3. **Body** — Main content following S.C.E. framework
4. **CTA** — Primary call-to-action button
5. **Trust bar** — 3 trust signals (guarantee, customer count, certification)
6. **Sign-off** — Sender name, title, brand
7. **Footer** — Brand name, navigation links, FDA/compliance disclaimer, unsubscribe, manage preferences, copyright

### Klaviyo Merge Tags

Standard merge tags to use across all emails:

```
{{ first_name|default:"there" }}     — personalized greeting
{{ unsubscribe_url }}                 — required unsubscribe link
{{ manage_preferences_url }}          — preference center link
```

### Image Rules

- **Never use placeholder or fake image URLs** — only use verified CDN URLs or Klaviyo dynamic variables
- Upload all product images to Klaviyo CDN before building emails (POST /api/image-upload/)
- Use Klaviyo CDN URLs (d3k81ch9hvuctc.cloudfront.net/company/{COMPANY_ID}/images/) for all static images
- Use {{ event.ProductImageURL }} for dynamic product images in behavioral flows
- Always include descriptive alt text

### FDA/Compliance (Health & Supplement Brands)

- NO disease claims — use "support" and "help" language only
- Required footer disclaimer: "*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."
- "Individual results may vary" on any testimonial or claim

---

## The 5 Content Pillars in Flows

Just like campaigns, flows should balance across the 5 pillars:

| Pillar | Role in Flows | Example Email |
|---|---|---|
| **Educational** | Teach product usage, ingredients, science | Nurture 1: Ingredient breakdown |
| **Social Proof** | Build confidence with real stories | Browse 2: Customer reviews |
| **Community** | Create emotional connection | Post-Purchase 1: Thank you + brand story |
| **Product** | Showcase what to buy | Browse 1: Dynamic product reminder |
| **Sales** | Drive conversion with urgency/incentive | Nurture 5: Last chance discount |

**Every flow should touch at least 3 pillars.** Flows that only do Product + Sales feel transactional. Adding Social Proof and Education builds trust.

---

## Text-Based Emails in Flows

At least 1 text-based email per flow. Best positions:

| Flow | Best Text-Based Email |
|---|---|
| Welcome | Final "personal note" from founder |
| Nurture | Founder story / personal connection email |
| Browse Abandonment | Final "before you go" personal note |
| Cart Abandonment | "Did something go wrong?" helper email |
| Post-Purchase | Thank you note from founder |
| Winback | "We miss you" personal note |

**Text-based email rules (same as campaigns):**
- Under 250 words
- 1-2 CTAs max
- Named sender (real person)
- P.S. section required
- No images
- Simple white background (feels like a real email)

---

## Flow Timing Best Practices

### Time Delay Guidelines

| Delay Position | Recommended | Why |
|---|---|---|
| Before first email in Nurture | 14 days | Let Welcome series complete |
| Between Welcome emails | 2-3 days | Build relationship, not overwhelm |
| Between Nurture emails | 2-3 days | Consistent engagement cadence |
| Browse Abandonment start | 1 hour | Still fresh, but not intrusive |
| Cart Abandonment start | 1 hour | High intent, time-sensitive |
| Checkout Abandonment start | 30 min | Highest intent, needs immediate recovery |
| Between abandonment emails | 24-48 hours | Escalating urgency |
| Post-Purchase start | Immediate | Gratitude while excitement is high |
| Between post-purchase emails | 3-7 days | Space out to not overwhelm |

### Smart Sending

Enable Smart Sending (16-hour window) on all flow emails to prevent overlap with campaigns. A customer should never receive a flow email and a campaign email within hours of each other.

---

## Deployment

### Klaviyo API Limitations

**What the API CAN do:**
- Create templates (POST /api/templates/)
- Delete templates (DELETE /api/templates/{id}/)
- Upload images (POST /api/image-upload/)
- Read flow structure (GET /api/flows/{id}/)
- Read flow actions and messages

**What the API CANNOT do:**
- Create flows
- Update flow message HTML
- Reassign templates to flow messages
- Modify flow triggers or filters

**Deployment workflow:**
1. Create templates via API with proper naming (`[PREFIX] | Flow Name #N -- Email Name`)
2. Build flow structure in Klaviyo UI (triggers, delays, email actions)
3. Assign templates to flow email actions in the UI
4. OR paste HTML directly into the flow email code editor

### Template Naming Convention

Replace `[PREFIX]` with your brand or agency initials (e.g., "GR" for GlowRoot, "RC" for RoastCraft).

```
[PREFIX] | [Flow Name] [#] -- [Email Name]
```

Examples (using "GR" as prefix):
```
GR | Welcome 1 -- Your 15% Off
GR | Welcome 2 -- Brand Story
GR | Nurture 3 -- Product Spotlight
GR | Browse Abandonment 1 -- Still Looking
GR | Cart Abandonment 2 -- Social Proof
```

---

## Quality Checklist (Per Flow)

- [ ] All emails follow the brand design system (colors, fonts, spacing)
- [ ] At least 3 of 5 pillars represented across the flow
- [ ] At least 1 text-based email per flow
- [ ] All CTAs are clickable with valid absolute URLs
- [ ] All images use verified CDN URLs or Klaviyo dynamic variables (no placeholder URLs)
- [ ] Klaviyo merge tags used for personalization ({{ first_name|default:"there" }})
- [ ] {{ unsubscribe_url }} and {{ manage_preferences_url }} in every footer
- [ ] FDA disclaimer in footer (health/supplement brands)
- [ ] Mobile responsive (@media max-width:620px)
- [ ] MSO conditionals for Outlook
- [ ] Preheader text with whitespace padding
- [ ] Trust bar with 3 signals in every email
- [ ] Smart Sending enabled (16-hour window)
- [ ] Time delays are appropriate for the flow type
- [ ] No duplicate angles back-to-back within the flow

---

## Output Format

### 1. Flow Summary
```
**Flow Name:** [PREFIX] | [Flow Name]
**Trigger:** [Trigger event]
**Scope:** [Per-list | Universal]
**Emails:** [Count]
**From:** [Sender name] <[sender@email.com]>
```

### 2. Flow Structure Table
```
| Step | Type | Setting | Email / Details |
|------|------|---------|-----------------|
| 1    | Time Delay | X hours/days | Wait for [reason] |
| 2    | Email | Send | Email Name |
| ...  | ...  | ...     | ... |
```

### 3. Per-Email Spec
```
### Email [#]: [Name]
- **Pillar:** [Pillar]
- **Type:** Graphic | Text-Based
- **Subject Line:** [Subject]
- **Preview Text:** [Preview]
- **Sections:**
  1. [Section name] -- [description]
  2. [Section name] -- [description]
  ...
- **CTA:** [Button text] -> [URL]
- **Design Notes:** [Layout, infographic type, modules]
```

### 4. Deployment Spec
```
| Template Name | File | Klaviyo ID |
|---|---|---|
| [PREFIX] | Flow Name 1 -- Email Name | filename.html | [after upload] |
```
