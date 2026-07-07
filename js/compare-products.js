/**
 * Compare Products - Enhanced UX Features
 * Features: localStorage persistence, dynamic table generation,
 * highlight differences, print, share, toast notifications
 */

// Sample Product Database (In production, fetch from API)
const PRODUCT_DATABASE = {
    '1': {
        id: '1',
        name: 'Dell XPS 15 9530',
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop',
        price: 245000,
        rating: 4.5,
        specs: {
            brand: 'Dell',
            model: 'XPS 15 9530',
            releaseYear: '2025',
            screenSize: '15.6 inch',
            resolution: '3840 x 2400 (4K)',
            panelType: 'OLED',
            refreshRate: '60Hz',
            processor: 'Intel Core i7-13700H',
            coresThreads: '14 / 20',
            baseClock: '2.4 GHz',
            maxTurbo: '5.0 GHz',
            ram: '32GB DDR5',
            storage: '1TB NVMe SSD',
            expandable: true,
            graphicsCard: 'NVIDIA RTX 4060 8GB',
            dedicatedGPU: true,
            battery: '86 Wh',
            batteryLife: 'Up to 10 hours',
            wifi: 'Wi-Fi 6E',
            bluetooth: '5.2',
            weight: '2.0 kg',
            thickness: '18 mm',
            material: 'Aluminum',
            warranty: '2 Years',
            extendedWarranty: true
        }
    },
    '2': {
        id: '2',
        name: 'HP Pavilion 15',
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
        price: 185000,
        rating: 4.0,
        specs: {
            brand: 'HP',
            model: 'Pavilion 15',
            releaseYear: '2024',
            screenSize: '15.6 inch',
            resolution: '1920 x 1080 (FHD)',
            panelType: 'IPS',
            refreshRate: '60Hz',
            processor: 'Intel Core i5-12450H',
            coresThreads: '8 / 12',
            baseClock: '2.0 GHz',
            maxTurbo: '4.4 GHz',
            ram: '16GB DDR4',
            storage: '512GB NVMe SSD',
            expandable: true,
            graphicsCard: 'Intel Iris Xe',
            dedicatedGPU: false,
            battery: '52 Wh',
            batteryLife: 'Up to 7 hours',
            wifi: 'Wi-Fi 6',
            bluetooth: '5.2',
            weight: '1.75 kg',
            thickness: '19.9 mm',
            material: 'Plastic',
            warranty: '1 Year',
            extendedWarranty: true
        }
    },
    '3': {
        id: '3',
        name: 'Lenovo ThinkPad X1 Carbon',
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=300&fit=crop',
        price: 275000,
        rating: 5.0,
        specs: {
            brand: 'Lenovo',
            model: 'ThinkPad X1 Carbon',
            releaseYear: '2025',
            screenSize: '14 inch',
            resolution: '2560 x 1600 (QHD)',
            panelType: 'IPS',
            refreshRate: '60Hz',
            processor: 'Intel Core i7-13700U',
            coresThreads: '10 / 12',
            baseClock: '1.5 GHz',
            maxTurbo: '5.0 GHz',
            ram: '32GB DDR5',
            storage: '1TB NVMe SSD',
            expandable: false,
            graphicsCard: 'Intel Iris Xe',
            dedicatedGPU: false,
            battery: '57 Wh',
            batteryLife: 'Up to 12 hours',
            wifi: 'Wi-Fi 6E',
            bluetooth: '5.2',
            weight: '1.12 kg',
            thickness: '14.9 mm',
            material: 'Carbon Fiber',
            warranty: '3 Years',
            extendedWarranty: true
        }
    },
    '4': {
        id: '4',
        name: 'ASUS ROG Strix G15',
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop',
        price: 195000,
        rating: 4.7,
        specs: {
            brand: 'ASUS',
            model: 'ROG Strix G15',
            releaseYear: '2025',
            screenSize: '15.6 inch',
            resolution: '1920 x 1080 (FHD)',
            panelType: 'IPS',
            refreshRate: '144Hz',
            processor: 'AMD Ryzen 7 7735HS',
            coresThreads: '8 / 16',
            baseClock: '3.2 GHz',
            maxTurbo: '4.75 GHz',
            ram: '16GB DDR5',
            storage: '512GB NVMe SSD',
            expandable: true,
            graphicsCard: 'NVIDIA RTX 4050 6GB',
            dedicatedGPU: true,
            battery: '90 Wh',
            batteryLife: 'Up to 8 hours',
            wifi: 'Wi-Fi 6E',
            bluetooth: '5.2',
            weight: '2.3 kg',
            thickness: '22.6 mm',
            material: 'Plastic',
            warranty: '2 Years',
            extendedWarranty: true
        }
    }
};

// Specification Categories Configuration
const SPEC_CATEGORIES = [
    {
        title: 'General Information',
        icon: 'fas fa-info-circle',
        specs: [
            { key: 'brand', label: 'Brand' },
            { key: 'model', label: 'Model' },
            { key: 'releaseYear', label: 'Release Year' }
        ]
    },
    {
        title: 'Display',
        icon: 'fas fa-desktop',
        specs: [
            { key: 'screenSize', label: 'Screen Size' },
            { key: 'resolution', label: 'Resolution' },
            { key: 'panelType', label: 'Panel Type' },
            { key: 'refreshRate', label: 'Refresh Rate' }
        ]
    },
    {
        title: 'Processor',
        icon: 'fas fa-microchip',
        specs: [
            { key: 'processor', label: 'Processor' },
            { key: 'coresThreads', label: 'Cores / Threads' },
            { key: 'baseClock', label: 'Base Clock' },
            { key: 'maxTurbo', label: 'Max Turbo' }
        ]
    },
    {
        title: 'Memory & Storage',
        icon: 'fas fa-memory',
        specs: [
            { key: 'ram', label: 'RAM' },
            { key: 'storage', label: 'Storage' },
            { key: 'expandable', label: 'Expandable', type: 'boolean' }
        ]
    },
    {
        title: 'Graphics',
        icon: 'fas fa-paint-brush',
        specs: [
            { key: 'graphicsCard', label: 'Graphics Card' },
            { key: 'dedicatedGPU', label: 'Dedicated GPU', type: 'boolean' }
        ]
    },
    {
        title: 'Battery & Connectivity',
        icon: 'fas fa-battery-full',
        specs: [
            { key: 'battery', label: 'Battery' },
            { key: 'batteryLife', label: 'Battery Life' },
            { key: 'wifi', label: 'Wi-Fi' },
            { key: 'bluetooth', label: 'Bluetooth' }
        ]
    },
    {
        title: 'Physical Dimensions',
        icon: 'fas fa-ruler-combined',
        specs: [
            { key: 'weight', label: 'Weight' },
            { key: 'thickness', label: 'Thickness' },
            { key: 'material', label: 'Material' }
        ]
    },
    {
        title: 'Warranty & Support',
        icon: 'fas fa-certificate',
        specs: [
            { key: 'warranty', label: 'Warranty' },
            { key: 'extendedWarranty', label: 'Extended Warranty', type: 'boolean' }
        ]
    }
];

// State Management
class CompareManager {
    constructor() {
        this.compareList = this.loadFromLocalStorage();
        this.differencesHighlighted = false;
        this.init();
    }

    init() {
        this.updateBadge();
        this.renderCompareTable();
        this.attachEventListeners();
        this.checkStickyToggle();
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('compareProducts');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Error parsing localStorage:', e);
                return [];
            }
        }
        // Default: Load sample products if localStorage is empty
        return ['1', '2', '3'];
    }

    saveToLocalStorage() {
        localStorage.setItem('compareProducts', JSON.stringify(this.compareList));
        this.updateBadge();
    }

    updateBadge() {
        const badge = document.getElementById('compareBadge');
        if (badge) {
            badge.textContent = this.compareList.length;
        }
        const countEl = document.getElementById('compareCount');
        if (countEl) {
            countEl.textContent = this.compareList.length;
        }
    }

    addProduct(productId) {
        if (this.compareList.length >= 4) {
            showToast('Maximum Limit Reached', 'You can only compare up to 4 products', 'error');
            return false;
        }
        if (this.compareList.includes(productId)) {
            showToast('Already Added', 'This product is already in your compare list', 'info');
            return false;
        }
        this.compareList.push(productId);
        this.saveToLocalStorage();
        this.renderCompareTable();
        showToast('Product Added', 'Product added to compare list successfully', 'success');
        return true;
    }

    removeProduct(productId) {
        this.compareList = this.compareList.filter(id => id !== productId);
        this.saveToLocalStorage();
        this.renderCompareTable();
        showToast('Product Removed', 'Product removed from compare list', 'success');
    }

    clearAll() {
        if (confirm('Are you sure you want to clear all products from comparison?')) {
            this.compareList = [];
            this.saveToLocalStorage();
            this.renderCompareTable();
            showToast('Cleared', 'All products removed from compare list', 'success');
        }
    }

    renderCompareTable() {
        const emptyState = document.getElementById('emptyState');
        const compareContent = document.getElementById('compareContent');
        const table = document.getElementById('compareTable');

        // Show empty state if no products
        if (this.compareList.length === 0) {
            emptyState.style.display = 'flex';
            compareContent.style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        compareContent.style.display = 'block';

        // Get product data
        const products = this.compareList.map(id => PRODUCT_DATABASE[id]).filter(Boolean);

        if (products.length === 0) {
            emptyState.style.display = 'flex';
            compareContent.style.display = 'none';
            return;
        }

        // Build table HTML
        let html = '<thead><tr class="product-cards-row">';

        // Header cell
        html += `
            <th class="spec-label-header">
                <div class="header-label">Features</div>
            </th>
        `;

        // Product cards
        products.forEach(product => {
            const stars = this.renderStars(product.rating);
            html += `
                <th class="product-card">
                    <button class="btn-remove" data-product-id="${product.id}">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <h3>${product.name}</h3>
                    <div class="product-rating">
                        ${stars}
                        <span>(${product.rating})</span>
                    </div>
                    <p class="product-price">NPR ${product.price.toLocaleString()}</p>
                    <div class="product-actions">
                        <button class="btn-add-cart" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i>
                            <span>Add to Cart</span>
                        </button>
                        <a href="product-detail.html?id=${product.id}" class="btn-view">View Details</a>
                    </div>
                </th>
            `;
        });

        html += '</tr></thead><tbody>';

        // Specifications rows
        SPEC_CATEGORIES.forEach(category => {
            // Category header
            html += `
                <tr class="category-header">
                    <td colspan="${products.length + 1}">
                        <i class="${category.icon}"></i> ${category.title}
                    </td>
                </tr>
            `;

            // Spec rows
            category.specs.forEach(spec => {
                html += '<tr>';
                html += `<td class="spec-label">${spec.label}</td>`;

                products.forEach(product => {
                    const value = product.specs[spec.key];
                    let displayValue;

                    if (spec.type === 'boolean') {
                        displayValue = value
                            ? '<i class="fas fa-check text-success"></i> Yes'
                            : '<i class="fas fa-times text-danger"></i> No';
                    } else {
                        displayValue = value !== undefined ? value : 'N/A';
                    }

                    html += `<td data-spec="${spec.key}">${displayValue}</td>`;
                });

                html += '</tr>';
            });
        });

        html += '</tbody>';
        table.innerHTML = html;

        // Reattach event listeners for dynamic elements
        this.attachDynamicListeners();
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let html = '';

        for (let i = 0; i < fullStars; i++) {
            html += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            html += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            html += '<i class="far fa-star"></i>';
        }

        return html;
    }

    attachEventListeners() {
        // Menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const mainNav = document.getElementById('mainNav');
        if (menuToggle && mainNav) {
            menuToggle.addEventListener('click', () => {
                mainNav.classList.toggle('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });
        }

        // Clear all
        const clearAllBtn = document.getElementById('clearAll');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.clearAll());
        }

        // Highlight differences
        const highlightBtn = document.getElementById('highlightDiff');
        if (highlightBtn) {
            highlightBtn.addEventListener('click', () => this.toggleHighlightDifferences());
        }

        // Sticky highlight toggle
        const stickyBtn = document.getElementById('stickyDiffBtn');
        if (stickyBtn) {
            stickyBtn.addEventListener('click', () => this.toggleHighlightDifferences());
        }

        // Print
        const printBtn = document.getElementById('printCompare');
        if (printBtn) {
            printBtn.addEventListener('click', () => window.print());
        }

        // Share
        const shareBtn = document.getElementById('shareCompare');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareComparison());
        }

        // Add more products
        const addMoreBtn = document.getElementById('addMoreProducts');
        if (addMoreBtn) {
            addMoreBtn.addEventListener('click', () => {
                window.location.href = 'products.html';
            });
        }

        // Scroll listener for sticky toggle
        window.addEventListener('scroll', () => this.checkStickyToggle());
    }

    attachDynamicListeners() {
        // Remove product buttons
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.productId;
                this.removeProduct(productId);
            });
        });

        // Add to cart buttons
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.productId;
                const product = PRODUCT_DATABASE[productId];
                if (product) {
                    this.addToCart(product);
                }
            });
        });
    }

    toggleHighlightDifferences() {
        this.differencesHighlighted = !this.differencesHighlighted;
        const rows = document.querySelectorAll('.compare-table tbody tr:not(.category-header)');

        rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll('td:not(.spec-label)'));
            if (cells.length > 1) {
                const values = cells.map(cell => cell.textContent.trim());
                const allSame = values.every(val => val === values[0]);

                if (this.differencesHighlighted && !allSame) {
                    cells.forEach(cell => cell.classList.add('highlight-diff'));
                } else {
                    cells.forEach(cell => cell.classList.remove('highlight-diff'));
                }
            }
        });

        // Update button text
        const btnText = this.differencesHighlighted ? 'Clear Highlights' : 'Highlight Differences';
        const highlightBtn = document.querySelector('#highlightDiff span');
        const stickyBtn = document.querySelector('#stickyDiffBtn span');
        if (highlightBtn) highlightBtn.textContent = btnText;
        if (stickyBtn) stickyBtn.textContent = this.differencesHighlighted ? 'Hide Differences' : 'Show Differences';
    }

    checkStickyToggle() {
        const stickyToggle = document.getElementById('stickyToggle');
        const compareTools = document.querySelector('.compare-tools');

        if (!stickyToggle || !compareTools) return;

        const toolsRect = compareTools.getBoundingClientRect();
        if (toolsRect.top < 0) {
            stickyToggle.classList.add('visible');
        } else {
            stickyToggle.classList.remove('visible');
        }
    }

    shareComparison() {
        const productIds = this.compareList.join(',');
        const shareUrl = `${window.location.origin}${window.location.pathname}?compare=${productIds}`;

        if (navigator.share) {
            navigator.share({
                title: 'Compare Products - Akku Electronics',
                text: 'Check out this product comparison',
                url: shareUrl
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(shareUrl).then(() => {
                showToast('Link Copied', 'Comparison link copied to clipboard', 'success');
            }).catch(() => {
                showToast('Share Failed', 'Could not copy link', 'error');
            });
        }
    }

    addToCart(product) {
        // Simulate adding to cart
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            const current = parseInt(cartBadge.textContent) || 0;
            cartBadge.textContent = current + 1;
        }
        showToast('Added to Cart', `${product.name} added to cart`, 'success');
    }
}

// Toast Notification System
function showToast(title, message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? 'fa-check-circle' :
                 type === 'error' ? 'fa-exclamation-circle' :
                 'fa-info-circle';

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <div>
            <strong>${title}</strong>
            <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">${message}</p>
        </div>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// Initialize on page load
let compareManager;

document.addEventListener('DOMContentLoaded', () => {
    // Check if URL has compare parameter
    const urlParams = new URLSearchParams(window.location.search);
    const compareParam = urlParams.get('compare');

    if (compareParam) {
        const productIds = compareParam.split(',');
        localStorage.setItem('compareProducts', JSON.stringify(productIds));
    }

    compareManager = new CompareManager();
});

// Expose functions globally for inline usage if needed
window.addToCompare = function(productId) {
    if (!compareManager) {
        compareManager = new CompareManager();
    }
    return compareManager.addProduct(productId);
};

window.removeFromCompare = function(productId) {
    if (compareManager) {
        compareManager.removeProduct(productId);
    }
};
