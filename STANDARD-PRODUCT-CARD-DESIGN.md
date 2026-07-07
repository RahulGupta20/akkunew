# Standard Product Card Design Pattern

This document defines the standard design pattern for product cards across the entire project, based on the `.deal__card` design from [index.html](index.html).

## When to Use This Standard

Apply this design pattern to **any product card** throughout the project to maintain visual consistency, including:
- Product listing pages
- Category pages
- Search results
- Related products sections
- Featured products
- Recommendation sections

## Complete Design Specification

### Card Container (`.deal__card`)

```scss
.deal__card {
  background: #231D22;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    border-color: rgba(237, 50, 55, 0.5);
    text-decoration: none;
  }

  &:hover .deal__image img {
    transform: scale(1.08);
  }
}
```

**Key Properties:**
- Background: `#231D22` (dark gray with slight brown tint)
- Border: `1px solid rgba(255, 255, 255, 0.1)` (subtle white border)
- Border radius: `16px` (rounded corners)
- Backdrop filter: `blur(10px)` (glassmorphism effect)
- Hover transform: `translateY(-8px)` (lift up effect)
- Hover border: `rgba(237, 50, 55, 0.5)` (red accent border)
- Hover shadow: `0 12px 32px rgba(0, 0, 0, 0.4)` (deep shadow)

---

### Image Section (`.deal__image`)

```scss
.deal__image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
}
```

**Key Properties:**
- Height: `220px` (fixed height)
- Background: `rgba(0, 0, 0, 0.3)` (dark overlay)
- Image fit: `cover` (fills container)
- Hover effect: `scale(1.08)` (zoom in)

---

### Badge (`.deal__badge`)

```scss
.deal__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: $primary-color; // #ED3237
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 2;
}
```

**Key Properties:**
- Position: `top: 12px, left: 12px`
- Background: `#ED3237` (primary red)
- Padding: `6px 14px`
- Border radius: `20px` (pill shape)
- Font: `0.75rem, 700 weight`

---

### Info Section (`.deal__info`)

```scss
.deal__info {
  padding: 16px;
  background: linear-gradient(180deg,
    rgba(237, 50, 55, 0.1) 0%,
    rgba(255, 255, 255, 0.01) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgba(255, 255, 255, .1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}
```

**Key Properties:**
- Padding: `16px`
- Background: Linear gradient from red tint to transparent
- Backdrop filter: `blur(20px) saturate(180%)` (enhanced glassmorphism)
- Border top: `1px solid rgba(255, 255, 255, .1)` (separator line)
- Box shadow: `0 8px 32px 0 rgba(31, 38, 135, 0.15)` (subtle depth)

---

### Typography

#### Category (`.deal__category`)
```scss
.deal__category {
  font-size: 0.75rem;
  color: $text-secondary;
  text-transform: uppercase;
  margin-bottom: 6px;
  font-weight: 600;
}
```

#### Title (`.deal__title`)
```scss
.deal__title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```
- **2-line clamp** to prevent overflow

#### Price Section (`.deal__price`)
```scss
.deal__price {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 12px;
  margin-top: 12px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.62) 0%,
      rgba(161, 161, 161, 0.62) 10%,
      transparent 100%
    );
  }

  .price__current {
    font-size: 1.1rem;
    font-weight: 700;
    color: $primary-color; // #ED3237
  }

  .price__old {
    font-size: 0.85rem;
    color: $text-secondary;
    text-decoration: line-through;
  }
}
```
- **Separator**: Radial gradient line above price
- **Current price**: `1.1rem, 700 weight, #ED3237`
- **Old price**: `0.85rem, strikethrough, gray`

---

## Quick Copy Prompt (For AI/Developer Use)

### Full Version:
```
Use the deal__card design from index.html for this product card:

CARD CONTAINER:
- Background: #231D22
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border radius: 16px
- Backdrop filter: blur(10px)
- Hover: translateY(-8px), border-color rgba(237, 50, 55, 0.5), box-shadow 0 12px 32px rgba(0, 0, 0, 0.4)

IMAGE:
- Height: 220px
- Background: rgba(0, 0, 0, 0.3)
- Hover: img scale(1.08)

INFO SECTION (.deal__info):
- Padding: 16px
- Background: linear-gradient(180deg, rgba(237, 50, 55, 0.1) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(255, 255, 255, 0) 100%)
- Backdrop filter: blur(20px) saturate(180%)
- Border-top: 1px solid rgba(255, 255, 255, .1)
- Box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15)

TYPOGRAPHY:
- Category: 0.75rem, $text-secondary, uppercase, 600 weight
- Title: 0.95rem, 600 weight, #fff, 2-line clamp
- Price current: 1.1rem, 700 weight, $primary-color (#ED3237)
- Price old: 0.85rem, $text-secondary, line-through
- Price section: padding-top 12px with radial gradient separator

BADGE (optional):
- Position: top 12px, left 12px
- Background: $primary-color (#ED3237)
- Padding: 6px 14px
- Border radius: 20px
- Font: 0.75rem, 700 weight, white
```

### Short Version:
```
Apply deal__card styling: #231D22 background, 16px radius, 220px image, .deal__info gradient (rgba(237,50,55,0.1) to transparent), 16px padding, 0.95rem title, $primary-color price, translateY(-8px) hover with scale(1.08) image
```

---

## Color Variables Reference

```scss
$primary-color: #ED3237;        // Red accent
$text-secondary: rgba(255, 255, 255, 0.6); // Gray text
$bg-card: #231D22;              // Card background
```

---

## Example HTML Structure

```html
<a href="product-detail.html" class="deal__card">
  <div class="deal__image">
    <span class="deal__badge">-25%</span>
    <img src="product.jpg" alt="Product Name">
  </div>
  <div class="deal__info">
    <p class="deal__category">Laptops</p>
    <h3 class="deal__title">ASUS ROG Strix G15 Gaming Laptop</h3>
    <div class="deal__price">
      <span class="price__current">NPR 1,49,999</span>
      <span class="price__old">NPR 1,99,999</span>
    </div>
  </div>
</a>
```

---

## Related Files

- **Source SCSS**: [scss/pages/_home.scss:919-1090](scss/pages/_home.scss)
- **Reference Page**: [index.html](index.html) (Deals of the Week section)
- **Compiled CSS**: [css/home.css](css/home.css)

---

**Last Updated**: 2026-07-07
**Maintained By**: Akku Electronics Development Team
