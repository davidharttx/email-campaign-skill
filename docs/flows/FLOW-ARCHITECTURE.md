# Flow Architecture for DTC E-Commerce

Complete guide to building and managing Klaviyo lifecycle email flows for DTC e-commerce brands. This document covers the two-layer model, revenue priority, flow interaction rules, and the complete customer lifecycle.

---

## The Two-Layer Model

Every Klaviyo flow falls into one of two layers: **Entry** or **Lifecycle**. Understanding the distinction is the foundation of a well-architected flow system.

### Layer 1: Entry Flows (Per-List)

| Flow | Trigger | Scope |
|---|---|---|
| Welcome | Added to List | Per lead source |
| Nurture | Added to List (delayed) | Per lead source |

Entry flows are **list-specific**. Each lead magnet, signup form, popup, or acquisition channel gets its own Welcome and Nurture sequence. A subscriber who signs up through a "Free Breathing Guide" popup receives different Welcome messaging than someone who enters through a "10% Off First Order" footer form.

**Why per-list?**
- The promised incentive differs by entry point (discount vs. free resource vs. quiz result)
- The subscriber's intent and awareness level varies by source
- Messaging must match the expectation set at signup
- You can tailor the narrative arc to the audience segment

A brand with three active lead magnets should have three Welcome flows and three Nurture flows -- six total Entry flows.

### Layer 2: Lifecycle Flows (Universal)

| Flow | Trigger | Scope |
|---|---|---|
| Browse Abandonment | Viewed Product | Universal |
| Cart Abandonment | Added to Cart | Universal |
| Checkout Abandonment | Started Checkout | Universal |
| Post-Purchase | Placed Order | Universal |
| Winback | No purchase in 60-90 days | Universal |
| Replenishment | X days since last purchase | Universal |
| Sunset | No engagement in 120+ days | Universal |
| Review Request | X days post-delivery | Universal |

Lifecycle flows are **behavioral and universal**. They trigger based on what the customer does on the site -- views a product, adds to cart, completes a purchase -- regardless of which list they originally joined through. A browse abandonment email is the same whether the customer entered through a quiz popup or a paid ad landing page.

**Why universal?**
- The trigger is a site action, not a list membership
- The messaging is about the specific product or behavior, not the entry point
- Having duplicate lifecycle flows per list creates conflicts and deliverability problems
- One well-optimized flow outperforms multiple fragmented ones

### Summary

```
ENTRY LAYER (per-list)          LIFECYCLE LAYER (universal)
========================        ================================
Welcome Flow A (List A)         Browse Abandonment
Welcome Flow B (List B)         Cart Abandonment
Welcome Flow C (List C)         Checkout Abandonment
Nurture Flow A (List A)         Post-Purchase
Nurture Flow B (List B)         Winback
Nurture Flow C (List C)         Replenishment
                                Sunset
                                Review Request
```

---

## Revenue Priority Order

Build flows in this order. Each flow is listed with its typical revenue contribution and the logic behind its position.

| Priority | Flow | Why This Order |
|---|---|---|
| 1 | **Welcome** | First impression. Sets the tone for the entire relationship. Delivers the promised incentive. Highest open rates of any flow. Without this, every other flow underperforms. |
| 2 | **Cart Abandonment** | ~70% of carts are abandoned. These are high-intent buyers who wanted the product enough to add it. Recovery rate of 5-15% is common. Immediate revenue impact. |
| 3 | **Checkout Abandonment** | Highest-intent abandoners -- they entered payment info. Smaller volume than cart abandonment but highest conversion rate per email. |
| 4 | **Browse Abandonment** | Largest addressable audience of the abandonment flows. Lower intent than cart/checkout, but the volume makes up for it. Typically 2-5% conversion rate. |
| 5 | **Post-Purchase** | Builds LTV, reduces refund rates, and creates repeat buyers. Every new customer should enter this flow. Sets up cross-sell, review collection, and replenishment. |
| 6 | **Nurture** | Converts educated non-buyers who completed Welcome but did not purchase. Progressive engagement from education to social proof to conversion. |
| 7 | **Winback** | Re-engages lapsed customers who purchased once but disappeared. Cheaper to reactivate an existing customer than acquire a new one. |
| 8 | **Replenishment** | Drives repeat orders timed to product consumption cycles. Only relevant for consumable products (supplements, skincare, food, pet supplies). |
| 9 | **Sunset** | List hygiene flow. Removes unengaged subscribers to protect deliverability. Not a revenue driver but prevents the other flows from degrading. |
| 10 | **Review Request** | Collects social proof for use in other flows and campaigns. Indirect revenue driver -- reviews improve conversion rates everywhere else. |

---

## Flow Interaction Rules

### How Flows Coexist Without Conflict

The most common mistake is building flows in isolation without considering how they interact. A customer can trigger multiple flows simultaneously -- they might be in a Welcome flow, browse a product, add it to cart, and abandon checkout all in the same session.

**Core principle:** Higher-intent flows take priority over lower-intent flows.

### Priority Hierarchy

```
HIGHEST INTENT
    |
    |  Checkout Abandonment  (entered payment info)
    |  Cart Abandonment      (added product to cart)
    |  Browse Abandonment    (viewed product page)
    |  Post-Purchase         (completed order)
    |  Welcome / Nurture     (joined list)
    |  Winback               (lapsed customer)
    |  Sunset                (unengaged subscriber)
    |
LOWEST INTENT
```

When a customer qualifies for multiple flows, Klaviyo's flow filters and conditional splits determine which messages they receive.

### Smart Sending

Smart Sending enforces a minimum time gap between any two flow emails (or between a flow email and a campaign) sent to the same recipient.

| Setting | Recommendation |
|---|---|
| Smart Sending window | 16 hours |
| Apply to | All flow emails and campaigns |

**What Smart Sending does:**
- If a customer is scheduled to receive a Browse Abandonment email at 2pm but already received a campaign at 8am, Smart Sending skips the flow email
- Prevents inbox flooding when a customer is active across multiple flows
- Does NOT remove the customer from the flow -- it skips the individual message and continues to the next step

**What Smart Sending does NOT do:**
- It does not prevent a customer from entering multiple flows
- It does not prioritize one flow over another
- It does not suppress all future emails -- only the one that falls within the window

Smart Sending is a safety net, not an architecture strategy. Proper flow filters are the primary tool for preventing overlap.

### Flow Filters

Flow filters are conditions evaluated **before** each email in a flow is sent. They act as gatekeepers that suppress messages when the customer's state has changed.

**Critical flow filters by flow type:**

| Flow | Filter (skip if true) |
|---|---|
| Browse Abandonment | Has Added to Cart since flow start |
| Browse Abandonment | Has Placed Order since flow start |
| Cart Abandonment | Has Started Checkout since flow start |
| Cart Abandonment | Has Placed Order since flow start |
| Checkout Abandonment | Has Placed Order since flow start |
| Welcome | Has Placed Order (ever) -- optional, moves them to Post-Purchase |
| Nurture | Has Placed Order since entering flow |
| Winback | Has Placed Order since entering flow |

**Why these matter:**
- A customer who browses a product, then adds it to cart, should exit the Browse Abandonment flow and enter Cart Abandonment instead
- A customer who completes checkout should exit all abandonment flows immediately
- Without these filters, a customer could receive a "You left something behind" email after they already purchased

### Conditional Splits

Conditional splits branch the flow based on customer attributes or behavior at a specific point in the sequence.

**Common conditional splits:**

| Flow | Split Condition | Branch A | Branch B |
|---|---|---|---|
| Cart Abandonment | Cart value > $100 | Offer free shipping | Standard reminder |
| Browse Abandonment | Has purchased before | Skip discount email | Include discount |
| Post-Purchase | First-time buyer vs. repeat | Onboarding content | Cross-sell content |
| Welcome | Discount code used | Skip discount reminder | Send discount reminder |
| Winback | Total lifetime spend > $200 | VIP winback offer | Standard winback |

### Handling Customers in Multiple Flows Simultaneously

A customer can be in multiple flows at once. This is normal and expected. The key is ensuring the flows do not send conflicting or redundant messages.

**Scenario: New subscriber browses and abandons cart in the same session**

```
Day 0, 10:00am  -- Subscribes via popup         -> Enters Welcome Flow
Day 0, 10:05am  -- Browses product page          -> Enters Browse Abandonment Flow
Day 0, 10:08am  -- Adds to cart, leaves site      -> Enters Cart Abandonment Flow

What should happen:
- Welcome Email 1 sends immediately (highest priority for new subscribers)
- Browse Abandonment Email 1 is SKIPPED (flow filter: "Has Added to Cart")
- Cart Abandonment Email 1 sends at 11:08am (1 hour delay)
  - Smart Sending checks: Welcome email sent at 10:00am
  - 11:08am is within 16-hour window -> Cart email is SKIPPED
  - Cart Abandonment Email 1 sends next day instead
- Welcome Email 2 sends Day 2
- Cart Abandonment continues on its schedule, filtered by purchase status
```

**Best practices for multi-flow customers:**
1. Always set flow filters that check for higher-intent actions
2. Enable Smart Sending on every flow email
3. Use "Has Placed Order" as a universal exit condition on all abandonment flows
4. Do not stack multiple incentives -- if Welcome offers 15% off, Cart Abandonment should reference the same code rather than adding a second discount
5. Test the full lifecycle by triggering every flow for a test profile and reviewing the send schedule

---

## Complete Lifecycle Flow Chart

```
                          CUSTOMER ENTERS
                               |
                    +----------+----------+
                    |                     |
              [SUBSCRIBES]          [VISITS SITE]
                    |                     |
                    v                     |
            +--------------+              |
            | WELCOME FLOW |              |
            | (per-list)   |              |
            | 3-5 emails   |              |
            | Days 0-10    |              |
            +--------------+              |
                    |                     |
          +---------+---------+           |
          |                   |           |
     [PURCHASES]        [NO PURCHASE]     |
          |                   |           |
          v                   v           |
  +---------------+   +--------------+    |
  | POST-PURCHASE |   | NURTURE FLOW |    |
  | FLOW          |   | (per-list)   |    |
  | 4-5 emails    |   | 4-6 emails   |    |
  | Days 0-21     |   | Days 14-28   |    |
  +---------------+   +--------------+    |
          |                   |           |
          |            +------+------+    |
          |            |             |    |
          |       [PURCHASES]  [NO PURCHASE]
          |            |             |    |
          |            v             v    |
          |    +---------------+     |    |
          |    | POST-PURCHASE |     |    |
          |    | (enters here) |     |    |
          |    +---------------+     |    |
          |                          |    |
          +----------+---------------+    |
                     |                    |
                     v                    v
          +--------------------+   +---------------------+
          |  BEHAVIORAL FLOWS  |   |  BEHAVIORAL FLOWS   |
          |  (ongoing, universal)  |  (ongoing, universal)|
          +--------------------+   +---------------------+
                     |                    |
    +----------------+--------------------+----------------+
    |                |                    |                |
    v                v                    v                v
+--------+    +-----------+    +------------+    +---------+
| BROWSE |    |   CART    |    |  CHECKOUT  |    | REPLEN- |
| ABANDON|    | ABANDON   |    |  ABANDON   |    | ISHMENT |
| 2-3    |    | 3 emails  |    |  3 emails  |    | 2 emails|
| emails |    | 1hr start |    |  30m start |    | Timed   |
+--------+    +-----------+    +------------+    +---------+
    |                |                |                |
    +-------+--------+-------+--------+-------+--------+
            |                |                |
       [PURCHASES]     [NO PURCHASE      [NO PURCHASE
            |           60-90 DAYS]       120+ DAYS]
            v                |                |
    +---------------+        v                v
    | POST-PURCHASE |   +-----------+   +-----------+
    | (re-enters)   |   |  WINBACK  |   |  SUNSET   |
    +---------------+   |  FLOW     |   |  FLOW     |
            |           |  3 emails |   |  2 emails |
            v           +-----------+   +-----------+
    +---------------+        |                |
    | REVIEW        |   [PURCHASES]     [NO ENGAGE]
    | REQUEST       |        |                |
    | 1-2 emails    |        v                v
    +---------------+   +-----------+   +-----------+
                        | POST-     |   | SUPPRESS  |
                        | PURCHASE  |   | FROM ALL  |
                        | (re-enter)|   | SENDS     |
                        +-----------+   +-----------+
```

### Reading the Chart

1. Every customer starts at the top -- either by subscribing (left path) or visiting the site directly (right path)
2. Entry flows (Welcome, Nurture) run first for new subscribers
3. Behavioral flows run continuously in the background for all customers
4. A purchase at any point routes the customer into the Post-Purchase flow
5. Abandonment flows have escalating intent: Browse < Cart < Checkout
6. Flow filters ensure customers exit lower-intent flows when they take higher-intent actions
7. Winback and Sunset are end-of-lifecycle flows for re-engagement and list hygiene
8. A customer who converts from Winback re-enters Post-Purchase, restarting the cycle

---

## Flow Interaction Matrix

This matrix shows what happens when a customer in Flow A takes an action that triggers Flow B.

| Customer is in... | Then triggers... | What happens |
|---|---|---|
| Welcome | Browse Abandonment | Both run; Smart Sending prevents overlap |
| Welcome | Cart Abandonment | Both run; Smart Sending prevents overlap |
| Browse Abandonment | Cart Abandonment | Browse exits (flow filter); Cart takes over |
| Cart Abandonment | Checkout Abandonment | Cart exits (flow filter); Checkout takes over |
| Any Abandonment | Placed Order | All abandonment flows exit; Post-Purchase starts |
| Nurture | Placed Order | Nurture exits; Post-Purchase starts |
| Post-Purchase | Browse Abandonment | Both run; Smart Sending prevents overlap |
| Winback | Placed Order | Winback exits; Post-Purchase starts |

---

## Implementation Checklist

- [ ] Entry flows created per list (one Welcome + one Nurture per lead source)
- [ ] Lifecycle flows created once each (universal, not duplicated per list)
- [ ] Flow filters set on every abandonment flow to check for higher-intent actions
- [ ] "Has Placed Order" filter on all abandonment and nurture flows
- [ ] Smart Sending enabled at 16 hours on every flow email
- [ ] Conditional splits added where customer segments need different treatment
- [ ] Test profile run through full lifecycle to verify filter logic
- [ ] No conflicting discount codes stacked across flows
- [ ] Timing verified: Nurture starts after Welcome completes (14-day delay)
- [ ] Sunset flow suppresses unengaged subscribers from all future sends
