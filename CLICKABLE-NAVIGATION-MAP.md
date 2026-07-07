# Clickable Navigation Map
## Where Does Each Click Lead?

### PRODUCTS.HTML - Complete Click Map

---

## 🔝 HEADER SECTION

### Logo & Search
| Element | Destination | Purpose |
|---------|-------------|---------|
| **AKKU Logo** | `index.html` | Back to homepage |
| **Search Bar** (submit) | `search-results.html` | Search products |

### Header Actions (Right Side)
| Icon/Button | Destination | Purpose |
|-------------|-------------|---------|
| 🌐 **EN / NPR** | Opens modal (no navigation) | Language & Currency settings |
| ❤️ **Wishlist Icon** | `wishlist.html` | View saved products |
| 🛒 **Cart Icon** | `cart.html` | View shopping cart |
| 🔑 **Login Button** | `login.html` | User login page |

---

## 📋 NAVIGATION MENU

### Main Navigation Links
| Menu Item | Main Link | Dropdown Items | All Go To |
|-----------|-----------|----------------|-----------|
| **Home** | `index.html` | No dropdown | Homepage |
| **Laptops** | `category.html` | ✅ Yes | See below ⬇️ |
| **Desktop PCs** | `category.html` | ✅ Yes | See below ⬇️ |
| **Custom PC Build** | `pc-builder-v3.html` | No dropdown | PC Builder tool |
| **Mobile Phones** | `category.html` | ✅ Yes | See below ⬇️ |
| **Peripherals** | `category.html` | ✅ Yes | See below ⬇️ |
| **Deals** | `products.html` | No dropdown | Same page (products) |
| **Support** | `contact-us.html` | ✅ Yes | See below ⬇️ |

### Dropdown Menu Items

#### 💻 Laptops Dropdown
| Dropdown Item | Destination | Expected Behavior |
|---------------|-------------|-------------------|
| Gaming Laptops | `category.html` | Should filter to Gaming Laptops |
| Business Laptops | `category.html` | Should filter to Business Laptops |
| Student Laptops | `category.html` | Should filter to Student Laptops |
| Ultrabooks | `category.html` | Should filter to Ultrabooks |

#### 🖥️ Desktop PCs Dropdown
| Dropdown Item | Destination | Expected Behavior |
|---------------|-------------|-------------------|
| Gaming PCs | `category.html` | Should filter to Gaming PCs |
| Workstations | `category.html` | Should filter to Workstations |
| All-in-One PCs | `category.html` | Should filter to All-in-One PCs |
| Mini PCs | `category.html` | Should filter to Mini PCs |

#### 📱 Mobile Phones Dropdown
| Dropdown Item | Destination | Expected Behavior |
|---------------|-------------|-------------------|
| Smartphones | `category.html` | Should filter to Smartphones |
| Feature Phones | `category.html` | Should filter to Feature Phones |
| Accessories | `category.html` | Should filter to Phone Accessories |

#### 🖱️ Peripherals Dropdown
| Dropdown Item | Destination | Expected Behavior |
|---------------|-------------|-------------------|
| Keyboards | `category.html` | Should filter to Keyboards |
| Mice | `category.html` | Should filter to Mice |
| Headphones | `category.html` | Should filter to Headphones |
| Monitors | `category.html` | Should filter to Monitors |
| Webcams | `category.html` | Should filter to Webcams |

#### 💬 Support Dropdown
| Dropdown Item | Destination |
|---------------|-------------|
| Contact Us | `contact-us.html` |
| FAQs | `faq.html` |
| Warranty | `terms-conditions.html` |
| Track Order | `track-order.html` |

---

## 🍞 BREADCRUMB NAVIGATION

| Breadcrumb Link | Destination |
|-----------------|-------------|
| 🏠 **Home** | `index.html` |
| **All Products** | Current page (not clickable) |

---

## 🎛️ FILTERS SIDEBAR

### Filter Actions
| Element | Action | Navigation |
|---------|--------|------------|
| **Clear All** button | Clears all filters | Stays on `products.html` |
| **Price Range** slider | Filters products | Stays on `products.html` |
| **Category** checkboxes | Filters by category | Stays on `products.html` |
| **Brand** checkboxes | Filters by brand | Stays on `products.html` |
| **Rating** radio buttons | Filters by rating | Stays on `products.html` |
| **Availability** checkboxes | Filters availability | Stays on `products.html` |
| **Discount** checkboxes | Filters by discount % | Stays on `products.html` |

**Note:** All filters work via JavaScript - NO page navigation occurs

---

## 🛠️ PRODUCTS TOOLBAR

| Element | Action | Navigation |
|---------|--------|------------|
| **Grid View** button | Changes layout | Stays on page |
| **List View** button | Changes layout | Stays on page |
| **Sort** dropdown | Sorts products | Stays on page |
| **Filters** button (mobile) | Opens filter sidebar | No navigation |

---

## 🎴 PRODUCT CARDS

### Each Product Card Has:

| Click Element | Destination | Purpose |
|---------------|-------------|---------|
| **Product Image** | `product-detail.html` | View product details |
| **Product Title** | `product-detail.html` | View product details |
| ❤️ **Wishlist Button** | No navigation | Adds to wishlist (requires login) |
| 👁️ **Quick View Button** | Opens modal | Quick product view |
| ⚖️ **Compare Button** | `compare-products.html` | Add to comparison |
| 🛒 **Add to Cart** | `cart.html` (optional) | Adds to cart |

### Sample Product Cards on Page:
1. Dell XPS 15 → `product-detail.html`
2. MacBook Pro M3 → `product-detail.html`
3. HP Pavilion 15 → `product-detail.html`
4. iPhone 15 Pro Max → `product-detail.html`
5. Samsung Galaxy S24 → `product-detail.html`
6. iPad Pro → `product-detail.html`
7. AirPods Pro → `product-detail.html`
8. Logitech MX Master → `product-detail.html`
9. ASUS ROG Strix → `product-detail.html`

---

## 📄 PAGINATION

| Element | Destination |
|---------|-------------|
| **Previous** button | `products.html?page=prev` (disabled on page 1) |
| **Page Numbers** (1, 2, 3, 4...) | `products.html?page=N` |
| **Next** button | `products.html?page=next` |

---

## 🦶 FOOTER SECTION

### Customer Service
| Link | Destination |
|------|-------------|
| Contact Us | `contact-us.html` |
| FAQs | `faq.html` |
| Help & Advice | `#` (not implemented) |
| Terms & Conditions | `terms-conditions.html` |
| Refund Policy | `#` (not implemented) |

### Help & Support
| Link | Destination |
|------|-------------|
| Shipping Info | `#` (not implemented) |
| Refund Policy | `#` (not implemented) |

### Company Info
| Link | Destination |
|------|-------------|
| About Us | `about-us.html` |
| Our Blog | `#` (not implemented) |
| Careers | `#` (not implemented) |
| Store Locations | `#` (not implemented) |
| Testimonials | `#` (not implemented) |

### Our Shop
| Link | Destination |
|------|-------------|
| Gaming Gears | `category.html` |
| Electronics | `category.html` |
| Laptop | `category.html` |
| Smartphone | `category.html` |
| Audio | `category.html` |

### My Account
| Link | Destination |
|------|-------------|
| Login | `login.html` |
| Register | `register.html` |
| Wishlist | `wishlist.html` |
| Track Your Orders | `my-orders.html` |
| Checkout | `checkout.html` |

---

## 📱 MOBILE MENU

| Element | Action |
|---------|--------|
| **☰ Hamburger Icon** | Opens/closes mobile menu (no navigation) |

---

---

# CATEGORY.HTML - Complete Click Map

---

## 🔝 HEADER SECTION

### Logo & Search
| Element | Destination | Purpose |
|---------|-------------|---------|
| **AKKU Logo** | `index.html` | Back to homepage |
| **Search Bar** (submit) | `search-results.html` | Search products |

### Header Actions (Right Side) - LOGGED IN VERSION
| Icon/Button | Destination | Purpose |
|-------------|-------------|---------|
| 🌐 **EN / NPR** | Opens modal | Language & Currency settings |
| ❤️ **Wishlist Icon** | `wishlist.html` | View saved products |
| 🛒 **Cart Icon** (2 items) | `cart.html` | View shopping cart |
| 👤 **User Avatar (RM)** | Opens dropdown ⬇️ | User menu |

### User Dropdown Menu (Logged In)
| Menu Item | Destination |
|-----------|-------------|
| 👤 My Profile | `my-profile.html` |
| 🛍️ My Orders | `my-orders.html` |
| ❤️ Wishlist | `wishlist.html` |
| ⭐ My Reviews | `my-reviews.html` |
| ⚙️ Settings | `settings.html` |
| 🚪 Logout | `login.html` |

---

## 📋 NAVIGATION MENU
(Same as products.html - see above)

---

## 🍞 BREADCRUMB NAVIGATION

| Breadcrumb Link | Destination |
|-----------------|-------------|
| 🏠 **Home** | `index.html` |
| **Categories** | Not clickable |
| **Laptops & Computers** | Current page (not clickable) |

---

## 📑 CATEGORY HEADER

### Category Info
| Element | Action |
|---------|--------|
| 🖥️ **Category Icon** | Not clickable (visual only) |
| **Category Title** | Not clickable |
| **Category Description** | Not clickable |
| **Stats** (234 Products, 15 Brands) | Not clickable |

---

## 🏷️ SUBCATEGORIES SECTION

### Subcategory Cards (Currently Hidden - `d-none` class)
| Subcategory Card | Expected Destination | Purpose |
|------------------|---------------------|---------|
| 🎮 Gaming Laptops | `category.html?sub=gaming` | Filter to gaming laptops |
| 💼 Business Laptops | `category.html?sub=business` | Filter to business laptops |
| 🎓 Student Laptops | `category.html?sub=student` | Filter to student laptops |
| ✨ Ultrabooks | `category.html?sub=ultrabooks` | Filter to ultrabooks |
| 🔄 2-in-1 Convertibles | `category.html?sub=2in1` | Filter to convertibles |
| 🎨 Creator Laptops | `category.html?sub=creator` | Filter to creator laptops |

**Note:** Subcategories section is currently hidden with `d-none` class

---

## 🏢 BRAND CAROUSEL

### Brand Logos (Clickable)
| Brand | Expected Action |
|-------|-----------------|
| Lenovo | Filter to Lenovo products |
| Acer | Filter to Acer products |
| ASUS | Filter to ASUS products |
| Dell | Filter to Dell products |
| HP | Filter to HP products |
| Apple | Filter to Apple products |
| Toshiba | Filter to Toshiba products |
| MSI | Filter to MSI products |

### Carousel Navigation
| Button | Action |
|--------|--------|
| ◀️ **Previous** | Scroll carousel left |
| ▶️ **Next** | Scroll carousel right |

---

## 🎛️ FILTERS SIDEBAR
(Same as products.html)

### Key Difference:
- **Category filter**: Pre-selected to "Laptops & Computers"
- **Brand filter**: Shows only laptop brands (15 brands vs 50+ on products.html)

---

## 🛠️ PRODUCTS TOOLBAR
(Same as products.html)

---

## 🎴 PRODUCT CARDS

### Sample Product Cards on Category Page:
1. Dell XPS 15 → `product-detail.html`
2. MacBook Pro M3 → `product-detail.html`
3. HP Pavilion 15 → `product-detail.html`
4. Lenovo ThinkPad X1 → `product-detail.html`
5. ASUS ROG Strix G16 → `product-detail.html`
6. Acer Swift 3 → `product-detail.html`

(All product cards work the same as products.html - see above)

---

## 📄 PAGINATION
(Same as products.html)

---

## 🦶 FOOTER SECTION
(Same as products.html)

---

---

# 🔍 KEY DIFFERENCES SUMMARY

## PRODUCTS.HTML vs CATEGORY.HTML

### Header Differences
| Feature | PRODUCTS.HTML | CATEGORY.HTML |
|---------|---------------|---------------|
| User State | Guest (Login button) | Logged In (User avatar) |
| Cart Badge | 0 items | 2 items |
| User Menu | ❌ No | ✅ Yes (6 options) |

### Content Differences
| Feature | PRODUCTS.HTML | CATEGORY.HTML |
|---------|---------------|---------------|
| Breadcrumb | Home > All Products | Home > Categories > Laptops |
| Page Title | "All Products" | "Laptops & Computers" |
| Category Icon | ❌ No | ✅ Yes (🖥️) |
| Description | Generic | Category-specific |
| Stats | 1,234 Products, 50+ Brands | 234 Products, 15 Brands |
| Subcategories | ❌ No | ✅ Yes (6 subcategories) |
| Brand Carousel | ❌ No | ✅ Yes (8 brands) |
| Product Pool | ALL products (mixed) | Laptops ONLY |
| Filters - Category | All categories available | Pre-filtered to Laptops |
| Filters - Brands | 50+ brands | 15 laptop brands |

### Navigation Patterns

**FROM PRODUCTS.HTML:**
```
User clicks "Laptops" in nav → Goes to category.html
User clicks product card → Goes to product-detail.html
User clicks filter checkbox → Stays on products.html (JS filter)
User clicks "Add to Cart" → May go to cart.html or stay (depends on implementation)
```

**FROM CATEGORY.HTML:**
```
User clicks subcategory → Stays on category.html (filters to subcategory)
User clicks brand in carousel → Stays on category.html (filters to brand)
User clicks product card → Goes to product-detail.html
User clicks "Gaming Laptops" in nav → Stays on category.html (changes filter)
```

---

# ⚠️ NOTES & RECOMMENDATIONS

## Current Issues

### 1. **Missing URL Parameters**
All category/subcategory links go to `category.html` without query parameters.

**Recommended:**
```javascript
// Instead of:
<a href="category.html">Gaming Laptops</a>

// Should be:
<a href="category.html?cat=laptops&sub=gaming">Gaming Laptops</a>
```

### 2. **Subcategories Hidden**
The subcategories section has class `d-none` (display: none).

**Recommendation:** Remove `d-none` class to show subcategories.

### 3. **Filters Are Static**
All filter checkboxes/radios don't actually filter - need JavaScript implementation.

**Recommendation:** Add JavaScript to handle filtering dynamically.

### 4. **Wishlist/Compare/Quick View**
Buttons exist but functionality not implemented.

**Recommendation:** Add JavaScript handlers for these features.

### 5. **Add to Cart**
Currently just a button - doesn't add to cart or navigate.

**Recommendation:** Add JavaScript to handle cart addition + optional redirect.

---

# 📊 COMPLETE CLICK FLOW EXAMPLES

## Example 1: User Wants Gaming Laptop

```
START: products.html
  ↓
Click "Laptops" in nav
  ↓
Goes to: category.html (Laptops & Computers)
  ↓
Sees subcategories section
  ↓
Click "Gaming Laptops" subcategory
  ↓
Stays on: category.html?sub=gaming (should filter to gaming laptops)
  ↓
Click product: "ASUS ROG Strix G16"
  ↓
Goes to: product-detail.html
  ↓
Click "Add to Cart"
  ↓
Goes to: cart.html
```

## Example 2: User Browses All Products

```
START: index.html
  ↓
Click "View All" on Featured Products
  ↓
Goes to: products.html
  ↓
Check filter: "Laptops" category
  ↓
Stays on: products.html (JS filters to show only laptops)
  ↓
Check filter: "Dell" brand
  ↓
Stays on: products.html (JS filters to Dell laptops only)
  ↓
Adjust price slider to NPR 100,000
  ↓
Stays on: products.html (JS filters by price)
  ↓
Click product: "Dell XPS 15"
  ↓
Goes to: product-detail.html
```

## Example 3: User Compares Products

```
START: category.html (Laptops)
  ↓
Hover over product 1 (Dell XPS)
  ↓
Click "Compare" button (⚖️)
  ↓
Stays on: category.html (adds to comparison list)
  ↓
Hover over product 2 (MacBook Pro)
  ↓
Click "Compare" button
  ↓
Stays on: category.html (adds to comparison list)
  ↓
Click "View Comparison" (if button exists)
  ↓
Goes to: compare-products.html
```

---

**Document Created:** July 7, 2026
**Pages Analyzed:** products.html, category.html
**Total Clickable Elements Mapped:** 100+

