# Akku Electronics - Bootstrap SCSS Project

## Project Structure

```
akku-electronics/
├── scss/
│   ├── common/
│   │   ├── _common.scss      # Common styles + imports header
│   │   └── _header.scss      # Header styles (shared across all pages)
│   ├── pages/
│   │   ├── _home.scss        # Home page specific styles
│   │   └── _products.scss    # Products page specific styles
│   ├── _variables.scss       # Global variables
│   ├── home.scss            # Home page entry point
│   └── products.scss        # Products page entry point
├── css/                      # Compiled CSS (generated)
├── index.html               # Home page
├── products.html            # Products page
└── package.json
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Compile SCSS (Watch Mode)**
   ```bash
   npm run sass
   ```
   This will watch for changes and automatically compile SCSS to CSS.

3. **Build for Production**
   ```bash
   npm run build
   ```

## How It Works

### Page-Wise CSS System
- Each page has its own main SCSS file (e.g., `home.scss`, `products.scss`)
- Each main SCSS file imports:
  1. Variables
  2. Bootstrap
  3. Common styles (including header)
  4. Page-specific styles
- Each HTML page links to its own compiled CSS file

### Common Header
- Header styles are in `scss/common/_header.scss`
- Header is automatically included in all pages via `_common.scss`
- The header is fully responsive with mobile menu toggle

## Features

✓ Bootstrap 5.3.2 integrated
✓ SCSS with variables and modular structure
✓ Page-wise CSS compilation
✓ Responsive e-commerce header
✓ Mobile-friendly navigation
✓ Reusable common components

## Adding New Pages

1. Create page-specific SCSS in `scss/pages/_pagename.scss`
2. Create main SCSS file `scss/pagename.scss`:
   ```scss
   @import 'variables';
   @import 'node_modules/bootstrap/scss/bootstrap';
   @import 'common/common';
   @import 'pages/pagename';
   ```
3. Create HTML file linking to `css/pagename.css`
