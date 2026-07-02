// Search Overlay - Premium UX
(function() {
    'use strict';

    let searchOverlay = null;
    let searchInput = null;
    let recentSearches = [];
    const MAX_RECENT_SEARCHES = 6;

    // Mock product database
    const mockProducts = [
        { id: 1, name: 'Dell XPS 15 Laptop', price: 189999, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop&q=80', rating: 4.5, reviews: 125 },
        { id: 2, name: 'HP Pavilion Gaming Laptop', price: 149999, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop&q=80', rating: 4.3, reviews: 89 },
        { id: 3, name: 'MacBook Pro M2', price: 249999, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop&q=80', rating: 4.8, reviews: 256 },
        { id: 4, name: 'Logitech MX Master 3 Mouse', price: 8999, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop&q=80', rating: 4.7, reviews: 342 },
        { id: 5, name: 'iPhone 14 Pro', price: 154999, image: 'https://images.unsplash.com/photo-1678652407971-234bc4c1e4f5?w=300&h=300&fit=crop&q=80', rating: 4.6, reviews: 512 },
        { id: 6, name: 'Samsung Galaxy S23', price: 124999, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop&q=80', rating: 4.5, reviews: 387 },
        { id: 7, name: 'Sony WH-1000XM5 Headphones', price: 34999, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop&q=80', rating: 4.9, reviews: 623 },
        { id: 8, name: 'Mechanical Keyboard RGB', price: 12999, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop&q=80', rating: 4.4, reviews: 234 },
    ];

    const quickLinks = [
        { text: 'Laptops', icon: 'laptop', url: 'category.html?cat=laptops' },
        { text: 'Phones', icon: 'mobile-alt', url: 'category.html?cat=phones' },
        { text: 'Accessories', icon: 'keyboard', url: 'category.html?cat=accessories' },
        { text: 'Deals', icon: 'tags', url: 'category.html?cat=deals' }
    ];

    const trendingSearches = [
        'Gaming Laptops',
        'Wireless Mouse',
        'iPhone 14',
        'Mechanical Keyboard',
        'Bluetooth Headphones',
        'USB-C Hub'
    ];

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        createSearchOverlay();
        initializeSearchTriggers();
        loadRecentSearches();
    });

    function createSearchOverlay() {
        const overlayHTML = `
            <div class="search-overlay" id="searchOverlay">
                <div class="search-overlay__container">
                    <!-- Header with Search -->
                    <div class="search-overlay__header">
                        <div class="search-overlay__input-wrapper">
                            <i class="fas fa-search search-icon"></i>
                            <input
                                type="text"
                                id="overlaySearchInput"
                                placeholder="Search for products, brands and more..."
                                autocomplete="off"
                            >
                            <button class="clear-search" id="clearSearch">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <button class="search-overlay__close" id="closeSearchOverlay">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Content -->
                    <div class="search-overlay__content" id="searchOverlayContent">
                        <!-- Initial State -->
                        <div class="search-initial" id="searchInitial">
                            <!-- Quick Links -->
                            <div class="search-quick-links">
                                <h3>Quick Access</h3>
                                <div class="quick-links-grid" id="quickLinksContainer"></div>
                            </div>

                            <!-- Recent Searches -->
                            <div class="search-recent" id="searchRecentSection">
                                <h3>Recent Searches</h3>
                                <div class="recent-tags" id="recentSearchesContainer"></div>
                            </div>

                            <!-- Trending -->
                            <div class="search-trending">
                                <h3><i class="fas fa-fire"></i> Trending Searches</h3>
                                <div class="trending-items" id="trendingSearchesContainer"></div>
                            </div>
                        </div>

                        <!-- Search Results -->
                        <div class="search-results" id="searchResults" style="display: none;">
                            <h3>Results for "<span id="searchQueryText"></span>"</h3>
                            <div class="results-grid" id="resultsGrid"></div>
                            <div class="view-all-results" id="viewAllResults" style="display: none;">
                                <button class="btn-view-all" onclick="window.location.href='category.html'">
                                    View All Results
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Loading -->
                        <div class="search-loading" id="searchLoading" style="display: none;">
                            <div class="loading-spinner"></div>
                            <p>Searching products...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', overlayHTML);
        searchOverlay = document.getElementById('searchOverlay');
        searchInput = document.getElementById('overlaySearchInput');

        setupOverlayEventListeners();
        populateQuickLinks();
        populateTrendingSearches();
    }

    function setupOverlayEventListeners() {
        document.getElementById('closeSearchOverlay').addEventListener('click', closeOverlay);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeOverlay();
            }
        });

        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                closeOverlay();
            }
        });

        searchInput.addEventListener('input', debounce(handleSearchInput, 300));

        document.getElementById('clearSearch').addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            showInitialState();
        });
    }

    function initializeSearchTriggers() {
        const headerSearchForms = document.querySelectorAll('.header__search');

        headerSearchForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
            });

            const input = form.querySelector('input[type="text"]');
            const button = form.querySelector('button');

            if (input) {
                input.addEventListener('click', function(e) {
                    e.preventDefault();
                    openOverlay();
                });

                input.addEventListener('focus', function(e) {
                    e.preventDefault();
                    openOverlay();
                });
            }

            if (button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    openOverlay();
                });
            }
        });
    }

    function openOverlay() {
        searchOverlay.classList.add('active');
        document.body.classList.add('search-overlay-open');

        setTimeout(() => {
            searchInput.focus();
        }, 100);

        showInitialState();
        updateRecentSearches();
    }

    function closeOverlay() {
        searchOverlay.classList.remove('active');
        document.body.classList.remove('search-overlay-open');
        searchInput.value = '';
        showInitialState();
    }

    function showInitialState() {
        document.getElementById('searchInitial').style.display = 'block';
        document.getElementById('searchResults').style.display = 'none';
        document.getElementById('searchLoading').style.display = 'none';
        document.getElementById('clearSearch').classList.remove('active');
    }

    function showLoadingState() {
        document.getElementById('searchInitial').style.display = 'none';
        document.getElementById('searchResults').style.display = 'none';
        document.getElementById('searchLoading').style.display = 'block';
    }

    function showResultsState() {
        document.getElementById('searchInitial').style.display = 'none';
        document.getElementById('searchResults').style.display = 'block';
        document.getElementById('searchLoading').style.display = 'none';
        document.getElementById('clearSearch').classList.add('active');
    }

    function handleSearchInput(e) {
        const query = e.target.value.trim();

        if (query.length === 0) {
            showInitialState();
            return;
        }

        if (query.length < 2) {
            return;
        }

        showLoadingState();

        setTimeout(() => {
            performSearch(query);
        }, 500);
    }

    function performSearch(query) {
        const lowerQuery = query.toLowerCase();
        const results = mockProducts.filter(product =>
            product.name.toLowerCase().includes(lowerQuery)
        );

        displayResults(query, results);
        addToRecentSearches(query);
    }

    function displayResults(query, results) {
        showResultsState();

        document.getElementById('searchQueryText').textContent = query;
        const resultsGrid = document.getElementById('resultsGrid');
        const viewAllBtn = document.getElementById('viewAllResults');

        if (results.length === 0) {
            resultsGrid.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h4>No products found</h4>
                    <p>Try different keywords or browse our categories</p>
                </div>
            `;
            viewAllBtn.style.display = 'none';
        } else {
            const displayResults = results.slice(0, 8);

            resultsGrid.innerHTML = displayResults.map(product => `
                <a href="product-detail.html" class="result-card">
                    <img src="${product.image}" alt="${product.name}" class="result-image">
                    <div class="result-content">
                        <h4 class="result-title">${product.name}</h4>
                        <div class="result-price">NPR ${product.price.toLocaleString()}</div>
                        <div class="result-rating">
                            <span class="stars">${generateStars(product.rating)}</span>
                            <span class="count">(${product.reviews})</span>
                        </div>
                    </div>
                </a>
            `).join('');

            viewAllBtn.style.display = results.length > 8 ? 'block' : 'none';
        }
    }

    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    function populateQuickLinks() {
        const container = document.getElementById('quickLinksContainer');
        container.innerHTML = quickLinks.map(link => `
            <a href="${link.url}" class="quick-link">
                <i class="fas fa-${link.icon}"></i>
                ${link.text}
            </a>
        `).join('');
    }

    function populateTrendingSearches() {
        const container = document.getElementById('trendingSearchesContainer');
        container.innerHTML = trendingSearches.map((search, index) => `
            <div class="trending-item" onclick="window.searchOverlay.searchTerm('${search}')">
                <div class="trending-number">#${index + 1}</div>
                <div class="trending-text">${search}</div>
            </div>
        `).join('');
    }

    function loadRecentSearches() {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            recentSearches = JSON.parse(saved);
        }
    }

    function saveRecentSearches() {
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }

    function addToRecentSearches(query) {
        recentSearches = recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase());
        recentSearches.unshift(query);

        if (recentSearches.length > MAX_RECENT_SEARCHES) {
            recentSearches = recentSearches.slice(0, MAX_RECENT_SEARCHES);
        }

        saveRecentSearches();
    }

    function updateRecentSearches() {
        const section = document.getElementById('searchRecentSection');
        const container = document.getElementById('recentSearchesContainer');

        if (recentSearches.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        section.classList.add('has-items');

        container.innerHTML = recentSearches.map(search => `
            <div class="recent-tag" onclick="window.searchOverlay.searchTerm('${search}')">
                <i class="fas fa-clock"></i>
                ${search}
                <span class="remove-recent" onclick="event.stopPropagation(); window.searchOverlay.removeRecent('${search}')">
                    <i class="fas fa-times"></i>
                </span>
            </div>
        `).join('');
    }

    function removeRecentSearch(query) {
        recentSearches = recentSearches.filter(s => s !== query);
        saveRecentSearches();
        updateRecentSearches();
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public API
    window.searchOverlay = {
        open: openOverlay,
        close: closeOverlay,
        searchTerm: function(term) {
            searchInput.value = term;
            searchInput.focus();
            performSearch(term);
        },
        removeRecent: removeRecentSearch
    };

})();
