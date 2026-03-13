# Segmentation Strategy Guide

Segmentation determines who receives each campaign email. Sending every email to your entire list burns engagement, triggers spam filters, and tanks deliverability. The right segment for the right email is just as important as the content itself.

---

## The 5 Core Segments

### 1. 90-Day Engaged (Default Segment)

**Definition:** Subscribers who have opened or clicked an email within the last 90 days.

**Klaviyo filter criteria:**
- Has opened email at least once in the last 90 days, OR
- Has clicked email at least once in the last 90 days

**When to use:**
- Every regular campaign email. This is your default send list.
- 80-90% of your monthly revenue comes from this segment.
- All content pillars apply.

**Why it works:** These people are actively paying attention. They open emails, click links, and are most likely to convert. Sending to this segment keeps your open rates high and your sender reputation strong.

---

### 2. 180-Day Engaged

**Definition:** Subscribers who have opened or clicked an email within the last 180 days. This is a wider net than 90-Day -- it includes the 90-Day segment plus people who have gone quiet in the last 1-3 months.

**Klaviyo filter criteria:**
- Has opened email at least once in the last 180 days, OR
- Has clicked email at least once in the last 180 days

**When to use:**
- Product launches (maximize reach for new product awareness)
- BFCM and major holiday sales (everyone should see the biggest deals)
- Major flash sales with deep discounts (the offer is strong enough to re-engage lapsed subscribers)
- Brand milestones or announcements

**Why it works:** Bigger audience means more eyeballs on your most important campaigns. The trade-off is slightly lower engagement rates, so reserve this for emails where reach matters more than rate.

---

### 3. High Potential Purchasers

**Definition:** Subscribers who are active on your site but have never purchased. These are window shoppers -- they browse, they click, they add to cart, but they have not converted yet.

**Klaviyo filter criteria:**
- Has been active on site at least once in the last 30 days, AND
- Has placed order zero times over all time

**When to use:**
- 1-2 extra emails per month targeted specifically at this group
- Product education emails (help them understand the value)
- Social proof emails (show them that others have bought and loved it)
- First-purchase incentive offers (free shipping, small discount)

**Why it works:** These people are already interested -- they just need the right push. A well-timed testimonial or a first-purchase offer can convert them into paying customers.

---

### 4. Win-Back

**Definition:** Customers who purchased 90-150 days ago and have not purchased again since. They bought once, liked it enough to not return the product, but have not come back.

**Klaviyo filter criteria:**
- Has placed order at least once between 90 and 150 days ago, AND
- Has placed order zero times in the last 90 days

**When to use:**
- Dedicated win-back campaigns (1-2 per month)
- "We miss you" or "It's been a while" messaging
- Replenishment reminders (if the product has a natural reorder cycle)
- Exclusive comeback offers

**Why it works:** Acquiring a new customer costs 5-7x more than retaining an existing one. These people already know your brand and have used your product. A targeted nudge can reactivate them before they churn permanently.

---

### 5. VIP

**Definition:** High lifetime value customers and repeat purchasers. Your best customers.

**Klaviyo filter criteria:**
- Has placed order at least 3 times over all time, OR
- Total revenue from customer is in the top 10% of all customers

**When to use:**
- Early access to new products
- VIP-exclusive discount codes
- Loyalty and referral program pushes
- Behind-the-scenes or founder-level content
- Asking for reviews or UGC

**Why it works:** VIPs are your most profitable segment. They convert at higher rates, spend more per order, and are your best advocates. Treating them differently makes them feel valued and increases retention.

---

## Exclusion Rules

**Always exclude these profiles from every campaign send:**

| Exclusion Criteria | Why |
|---|---|
| Bounced 3+ times | Sending to invalid addresses damages sender reputation |
| Marked as spam | Continuing to send to spam reporters can get your domain blacklisted |
| 0 opens in 12 months | These profiles are either inactive, fake, or have abandoned the email address entirely |

**How to implement in Klaviyo:**
Create a suppression segment with these criteria and add it as an exclusion on every campaign send. This is non-negotiable -- skipping exclusions will damage deliverability over time.

---

## Segment Rotation Strategy Across a Month

### Standard month (3x/week = ~13 emails)

| Segment | Sends per Month | Percentage |
|---|---|---|
| 90-Day Engaged | 8-10 | ~70% |
| 180-Day Engaged | 1-2 | ~10% |
| High Potential Purchasers | 1-2 | ~10% |
| Win-Back | 1 | ~5-8% |
| VIP | 1 | ~5-8% |

### Weekly rhythm

- **Week 1:** 90-Day (x2), High Potential Purchasers (x1)
- **Week 2:** 90-Day (x2), VIP (x1)
- **Week 3:** 90-Day (x2), 180-Day (x1)
- **Week 4:** 90-Day (x2), Win-Back (x1)

This rotation ensures every non-standard segment gets at least one touchpoint per month without over-saturating any group.

### BFCM / Major sale month

180-Day Engaged usage increases to 3-4 sends (all major sale announcements). VIP gets early access sends (1-2 extra). 90-Day remains the backbone for everything else.

---

## Advanced Segment Combinations

### VIP + New Product Launch
Send VIPs a "first look" or "early access" email 24-48 hours before the general launch goes to 90-Day Engaged. Creates exclusivity and rewards loyalty.

### High Potential Purchasers + Social Proof
Pair the High Potential Purchasers segment with a Social Proof pillar email. These people are on the fence -- seeing real customer results can tip them over.

### Win-Back + Sales Pillar
Pair the Win-Back segment with a strong offer. A simple "We miss you -- here's 20% off" with a discount code hero and a best sellers grid can reactivate lapsed buyers.

### 180-Day Engaged + BFCM Countdown
Use 180-Day for the initial BFCM teaser and the main sale launch. Switch to 90-Day for the mid-sale and final-push emails where you need high engagement rates to maximize deliverability during the highest-volume sending period of the year.

### VIP + Referral Program
Send referral program emails exclusively to VIPs. They are most likely to refer friends and have the strongest brand affinity. Pair with the Referral Program Block module.

---

## Segment Sizing Expectations

Segment sizes vary by brand, but here are rough benchmarks:

| Segment | Typical % of Total List |
|---|---|
| 90-Day Engaged | 20-40% |
| 180-Day Engaged | 35-55% |
| High Potential Purchasers | 5-15% |
| Win-Back | 5-10% |
| VIP | 3-8% |

If your 90-Day Engaged segment is below 15% of total list, focus on growing the list and improving engagement before scaling send frequency. If it is above 50%, you likely have a very healthy, active list and can push frequency higher.
