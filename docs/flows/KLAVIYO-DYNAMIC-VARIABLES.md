# Klaviyo Dynamic Variables Reference

Complete reference for dynamic variables, merge tags, conditional logic, and loops used in Klaviyo behavioral email flows. All examples use Klaviyo's Django/Jinja-style template syntax.

---

## Profile Variables

Standard properties available on every subscriber profile. These work in all flows and campaigns.

| Variable | Description | Example Output |
|---|---|---|
| `{{ first_name }}` | Subscriber's first name | Sarah |
| `{{ last_name }}` | Subscriber's last name | Chen |
| `{{ email }}` | Subscriber's email address | sarah@example.com |
| `{{ phone_number }}` | Phone number | +15551234567 |
| `{{ city }}` | City from address | Austin |
| `{{ region }}` | State/province | Texas |
| `{{ country }}` | Country | United States |
| `{{ zip }}` | Postal code | 78701 |
| `{{ organization }}` | Company name | Acme Corp |

### Default Filters for Profile Variables

Always use a default filter on profile variables to handle cases where the data is missing. Without a default, a blank space renders in the email.

```django
{{ first_name|default:"there" }}
{{ last_name|default:"friend" }}
{{ city|default:"your area" }}
```

**Usage in a greeting:**
```html
<p>Hey {{ first_name|default:"there" }},</p>
```

Renders as "Hey Sarah," if first_name exists, or "Hey there," if it does not.

---

## System Variables

Required or commonly used system-level variables. These are provided by Klaviyo automatically.

| Variable | Description | Required |
|---|---|---|
| `{{ unsubscribe_url }}` | One-click unsubscribe link | Yes -- required in every email footer |
| `{{ manage_preferences_url }}` | Preference center link | Yes -- required in every email footer |
| `{{ browser_url }}` | "View in browser" link | Optional |
| `{{ organization_name }}` | Your Klaviyo account/company name | Optional |

**Footer usage:**
```html
<p style="font-size:12px; color:#999999;">
  <a href="{{ unsubscribe_url }}" style="color:#999999;">Unsubscribe</a> |
  <a href="{{ manage_preferences_url }}" style="color:#999999;">Manage Preferences</a>
</p>
```

---

## Browse Abandonment Variables

Triggered by the **Viewed Product** event. These variables reference the specific product the customer browsed.

| Variable | Description | Example Output |
|---|---|---|
| `{{ event.ProductName }}` | Name of the browsed product | Daily Vitamin Pack |
| `{{ event.ProductURL }}` | URL to the product page | https://example.com/products/daily-vitamin |
| `{{ event.ProductImageURL }}` | Product image URL | https://cdn.example.com/images/daily-vitamin.jpg |
| `{{ event.Price }}` | Product price | 48.00 |
| `{{ event.Categories }}` | Product categories (list) | Vitamins, Daily Essentials |
| `{{ event.Brand }}` | Product brand | VitalBloom |
| `{{ event.CompareAtPrice }}` | Original price if on sale | 60.00 |
| `{{ event.extra.ProductID }}` | Product ID | 12345 |

### HTML Example: Browse Abandonment Product Block

```html
<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
    <td align="center" style="padding:20px;">
      <img
        src="{{ event.ProductImageURL }}"
        alt="{{ event.ProductName }}"
        width="300"
        style="max-width:100%; display:block; border-radius:8px;"
      />
    </td>
  </tr>
  <tr>
    <td align="center" style="padding:10px 20px;">
      <h2 style="font-family:Georgia,serif; font-size:22px; color:#1a1a1a; margin:0;">
        {{ event.ProductName }}
      </h2>
      <p style="font-family:Arial,sans-serif; font-size:16px; color:#666666; margin:8px 0 0;">
        ${{ event.Price }}
      </p>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding:20px;">
      <a
        href="{{ event.ProductURL }}"
        style="background-color:#2d6a4f; color:#ffffff; font-family:Arial,sans-serif;
               font-size:16px; font-weight:bold; text-decoration:none; padding:14px 32px;
               border-radius:6px; display:inline-block;"
      >
        View Product
      </a>
    </td>
  </tr>
</table>
```

---

## Cart Abandonment Variables

Triggered by the **Added to Cart** event. These reference the specific item added and the overall cart state.

### Single Item Variables

| Variable | Description | Example Output |
|---|---|---|
| `{{ event.ProductName }}` | Name of the carted product | Magnesium Sleep Blend |
| `{{ event.ProductURL }}` | URL to the product page | https://example.com/products/magnesium-sleep |
| `{{ event.ProductImageURL }}` | Product image URL | https://cdn.example.com/images/mag-sleep.jpg |
| `{{ event.Price }}` | Unit price | 38.00 |
| `{{ event.Quantity }}` | Quantity added | 2 |
| `{{ event.Categories }}` | Product categories | Sleep, Adaptogens |

### Cart-Level Variables

| Variable | Description | Example Output |
|---|---|---|
| `{{ event.extra.CartTotal }}` | Total cart value | 76.00 |
| `{{ event.extra.CartItems }}` | List of all cart items | (iterable -- see loop example) |
| `{{ event.extra.CartURL }}` | Link to restore the cart | https://example.com/cart/recover/abc123 |
| `{{ event.extra.ItemCount }}` | Number of items in cart | 2 |

### HTML Example: Cart Items Loop

When a customer has multiple items in their cart, loop through `event.extra.CartItems` to display each one.

```html
{% for item in event.extra.CartItems %}
<table width="100%" cellpadding="0" cellspacing="0" role="presentation"
       style="border-bottom:1px solid #eeeeee; margin-bottom:16px;">
  <tr>
    <td width="120" style="padding:12px;">
      <img
        src="{{ item.ProductImageURL }}"
        alt="{{ item.ProductName }}"
        width="100"
        style="max-width:100%; display:block; border-radius:4px;"
      />
    </td>
    <td style="padding:12px; vertical-align:top;">
      <p style="font-family:Arial,sans-serif; font-size:16px; font-weight:bold;
                color:#1a1a1a; margin:0;">
        {{ item.ProductName }}
      </p>
      <p style="font-family:Arial,sans-serif; font-size:14px; color:#666666; margin:4px 0 0;">
        Qty: {{ item.Quantity }} | ${{ item.Price }}
      </p>
    </td>
  </tr>
</table>
{% endfor %}

<!-- Cart total -->
<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
    <td align="right" style="padding:16px 12px;">
      <p style="font-family:Arial,sans-serif; font-size:18px; font-weight:bold;
                color:#1a1a1a; margin:0;">
        Cart Total: ${{ event.extra.CartTotal }}
      </p>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding:20px;">
      <a
        href="{{ event.extra.CartURL }}"
        style="background-color:#2d6a4f; color:#ffffff; font-family:Arial,sans-serif;
               font-size:16px; font-weight:bold; text-decoration:none; padding:14px 32px;
               border-radius:6px; display:inline-block;"
      >
        Complete Your Order
      </a>
    </td>
  </tr>
</table>
```

---

## Checkout Abandonment Variables

Triggered by the **Started Checkout** event. These include cart contents plus checkout-specific data.

| Variable | Description | Example Output |
|---|---|---|
| `{{ event.extra.CheckoutURL }}` | Link to resume checkout | https://example.com/checkouts/abc123 |
| `{{ event.extra.CartTotal }}` | Total checkout value | 114.00 |
| `{{ event.extra.CartItems }}` | List of checkout items | (iterable) |
| `{{ event.extra.ShippingTotal }}` | Shipping cost | 5.99 |
| `{{ event.extra.DiscountCode }}` | Applied discount code | WELCOME15 |
| `{{ event.extra.DiscountValue }}` | Discount amount | 17.10 |

Checkout abandonment emails typically use the same loop structure as cart abandonment (see above), with `event.extra.CheckoutURL` replacing the cart URL in the CTA.

### HTML Example: Checkout Recovery CTA

```html
<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
    <td align="center" style="padding:24px;">
      <h2 style="font-family:Georgia,serif; font-size:24px; color:#1a1a1a; margin:0 0 8px;">
        Your order is waiting
      </h2>
      <p style="font-family:Arial,sans-serif; font-size:15px; color:#666666; margin:0 0 20px;">
        You're just one step away. Pick up right where you left off.
      </p>
      <a
        href="{{ event.extra.CheckoutURL }}"
        style="background-color:#2d6a4f; color:#ffffff; font-family:Arial,sans-serif;
               font-size:16px; font-weight:bold; text-decoration:none; padding:14px 32px;
               border-radius:6px; display:inline-block;"
      >
        Complete Checkout
      </a>
    </td>
  </tr>
</table>
```

---

## Post-Purchase / Placed Order Variables

Triggered by the **Placed Order** event. These reference the completed order and its line items.

### Order-Level Variables

| Variable | Description | Example Output |
|---|---|---|
| `{{ event.OrderId }}` | Order number | #1042 |
| `{{ event.Value }}` | Order total | 114.00 |
| `{{ event.ItemCount }}` | Number of items ordered | 3 |
| `{{ event.DiscountCode }}` | Discount code used | WELCOME15 |
| `{{ event.DiscountValue }}` | Discount amount | 17.10 |
| `{{ event.ShippingTotal }}` | Shipping cost | 0.00 |
| `{{ event.Currency }}` | Currency code | USD |

### Line Item Variables (via loop)

| Variable | Description |
|---|---|
| `{{ item.ProductName }}` | Product name |
| `{{ item.ProductURL }}` | Product page URL |
| `{{ item.ProductImageURL }}` | Product image |
| `{{ item.Price }}` | Unit price |
| `{{ item.Quantity }}` | Quantity ordered |
| `{{ item.SKU }}` | Product SKU |

### HTML Example: Order Summary Loop

```html
<table width="100%" cellpadding="0" cellspacing="0" role="presentation"
       style="background-color:#f9f9f9; border-radius:8px; padding:16px;">
  <tr>
    <td style="padding:16px;">
      <h3 style="font-family:Arial,sans-serif; font-size:16px; color:#1a1a1a;
                 margin:0 0 12px; text-transform:uppercase; letter-spacing:1px;">
        Order Summary
      </h3>
    </td>
  </tr>
  {% for item in event.Items %}
  <tr>
    <td style="padding:8px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td width="80">
            <img
              src="{{ item.ProductImageURL }}"
              alt="{{ item.ProductName }}"
              width="60"
              style="display:block; border-radius:4px;"
            />
          </td>
          <td style="padding-left:12px; vertical-align:top;">
            <p style="font-family:Arial,sans-serif; font-size:14px; color:#1a1a1a;
                      font-weight:bold; margin:0;">
              {{ item.ProductName }}
            </p>
            <p style="font-family:Arial,sans-serif; font-size:13px; color:#666666;
                      margin:4px 0 0;">
              Qty: {{ item.Quantity }} -- ${{ item.Price }}
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  {% endfor %}
  <tr>
    <td style="padding:16px; border-top:1px solid #dddddd;">
      <p style="font-family:Arial,sans-serif; font-size:16px; font-weight:bold;
                color:#1a1a1a; margin:0; text-align:right;">
        Total: ${{ event.Value }}
      </p>
    </td>
  </tr>
</table>
```

---

## Default Filters

Default filters provide fallback values when a variable is empty or missing. Always use them on profile properties and any event property that might not exist.

### Syntax

```django
{{ variable|default:"fallback value" }}
```

### Common Defaults

| Variable | With Default | Fallback |
|---|---|---|
| `{{ first_name\|default:"there" }}` | "Hey there," | When first name is missing |
| `{{ event.ProductName\|default:"this item" }}` | "Still thinking about this item?" | When product name is missing |
| `{{ event.Price\|default:"" }}` | Hides price entirely | When price is missing |
| `{{ city\|default:"your area" }}` | "Shipping to your area" | When city is missing |

### Number Formatting

```django
{{ event.Price|floatformat:2 }}
```

Renders `48.00` instead of `48` or `48.0`.

---

## Conditional Blocks

Use `{% if %}` / `{% endif %}` to show or hide content based on variable values. This is essential for personalizing emails based on customer data.

### Basic Conditional

```html
{% if first_name %}
  <p>Hey {{ first_name }},</p>
{% else %}
  <p>Hey there,</p>
{% endif %}
```

### Checking Event Properties

```html
{% if event.CompareAtPrice %}
  <p>
    <span style="text-decoration:line-through; color:#999999;">
      ${{ event.CompareAtPrice }}
    </span>
    <span style="color:#cc0000; font-weight:bold;">
      ${{ event.Price }}
    </span>
  </p>
{% else %}
  <p>${{ event.Price }}</p>
{% endif %}
```

### Checking for Multiple Conditions

```html
{% if event.extra.CartTotal|add:0 >= 50 %}
  <p style="color:#2d6a4f; font-weight:bold;">
    You qualify for FREE shipping.
  </p>
{% else %}
  <p>
    Add ${{ event.extra.CartTotal|add:0|subtract_from:50 }} more for free shipping.
  </p>
{% endif %}
```

### Conditional Product Categories

```html
{% if "Supplements" in event.Categories %}
  <p style="font-size:11px; color:#999999;">
    *These statements have not been evaluated by the Food and Drug Administration.
    This product is not intended to diagnose, treat, cure, or prevent any disease.
  </p>
{% endif %}
```

---

## Loops

Use `{% for %}` / `{% endfor %}` to iterate over lists of items. This is used most often for cart items, order line items, and product recommendations.

### Basic Loop Structure

```html
{% for item in event.extra.CartItems %}
  <p>{{ item.ProductName }} -- ${{ item.Price }}</p>
{% endfor %}
```

### Loop with Index

```html
{% for item in event.extra.CartItems %}
  {% if forloop.first %}
    <h3>Your Cart</h3>
  {% endif %}

  <p>{{ item.ProductName }} -- Qty: {{ item.Quantity }}</p>

  {% if forloop.last %}
    <p><strong>Total: ${{ event.extra.CartTotal }}</strong></p>
  {% endif %}
{% endfor %}
```

### Loop Variables

| Variable | Description |
|---|---|
| `{{ forloop.counter }}` | Current iteration (1-indexed) |
| `{{ forloop.counter0 }}` | Current iteration (0-indexed) |
| `{{ forloop.first }}` | True on first iteration |
| `{{ forloop.last }}` | True on last iteration |

### Complete Cart Loop with HTML

```html
<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  {% for item in event.extra.CartItems %}
  <tr style="{% if not forloop.last %}border-bottom:1px solid #eeeeee;{% endif %}">
    <td width="100" style="padding:12px;">
      <a href="{{ item.ProductURL }}">
        <img
          src="{{ item.ProductImageURL }}"
          alt="{{ item.ProductName }}"
          width="80"
          style="display:block; border-radius:4px;"
        />
      </a>
    </td>
    <td style="padding:12px; vertical-align:middle;">
      <a href="{{ item.ProductURL }}"
         style="font-family:Arial,sans-serif; font-size:15px; font-weight:bold;
                color:#1a1a1a; text-decoration:none;">
        {{ item.ProductName }}
      </a>
      <p style="font-family:Arial,sans-serif; font-size:13px; color:#666666; margin:4px 0 0;">
        Qty: {{ item.Quantity }} | ${{ item.Price }}
      </p>
    </td>
  </tr>
  {% endfor %}
</table>
```

---

## Quick Reference by Flow Type

### Browse Abandonment

```django
{{ event.ProductName }}
{{ event.ProductURL }}
{{ event.ProductImageURL }}
{{ event.Price }}
{{ event.Categories }}
{{ event.Brand }}
{{ event.CompareAtPrice }}
```

### Cart Abandonment

```django
{{ event.ProductName }}
{{ event.ProductURL }}
{{ event.ProductImageURL }}
{{ event.Price }}
{{ event.Quantity }}
{{ event.extra.CartTotal }}
{{ event.extra.CartURL }}
{{ event.extra.CartItems }}  {# iterable #}
```

### Checkout Abandonment

```django
{{ event.extra.CheckoutURL }}
{{ event.extra.CartTotal }}
{{ event.extra.CartItems }}  {# iterable #}
{{ event.extra.ShippingTotal }}
{{ event.extra.DiscountCode }}
{{ event.extra.DiscountValue }}
```

### Post-Purchase / Placed Order

```django
{{ event.OrderId }}
{{ event.Value }}
{{ event.ItemCount }}
{{ event.Items }}  {# iterable #}
{{ event.DiscountCode }}
{{ event.ShippingTotal }}
{{ event.Currency }}
```

### All Flows (Profile + System)

```django
{{ first_name|default:"there" }}
{{ email }}
{{ unsubscribe_url }}
{{ manage_preferences_url }}
{{ browser_url }}
```
