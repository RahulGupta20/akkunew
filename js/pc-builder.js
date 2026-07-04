// ============================================
// PC Builder JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // ============================================
    // Component Selection Modal
    // ============================================
    const componentModal = document.getElementById('componentModal');
    const closeModalBtn = document.querySelector('.component-modal__close');
    const modalOverlay = document.querySelector('.component-modal__overlay');

    // Track current component category being selected
    let currentCategory = null;

    // Component category configuration
    const componentConfig = {
        cpu: {
            title: 'Processor (CPU)',
            subtitle: 'Choose compatible processors for your build',
            icon: 'fa-microchip'
        },
        motherboard: {
            title: 'Motherboard',
            subtitle: 'Select a motherboard compatible with your CPU',
            icon: 'fa-th'
        },
        gpu: {
            title: 'Graphics Card (GPU)',
            subtitle: 'Choose a graphics card for your build',
            icon: 'fa-tv'
        },
        ram: {
            title: 'RAM (Memory)',
            subtitle: 'Select memory for your system',
            icon: 'fa-memory'
        },
        storage: {
            title: 'Storage (SSD/HDD)',
            subtitle: 'Choose storage drives for your build',
            icon: 'fa-hdd'
        },
        psu: {
            title: 'Power Supply (PSU)',
            subtitle: 'Select a power supply unit',
            icon: 'fa-plug'
        },
        case: {
            title: 'PC Case',
            subtitle: 'Choose a case to house your build',
            icon: 'fa-box'
        },
        cooling: {
            title: 'CPU Cooler',
            subtitle: 'Select a cooling solution (optional)',
            icon: 'fa-fan'
        }
    };

    // Initially hide the modal
    if (componentModal) {
        componentModal.style.display = 'none';
    }

    // Open modal function
    function openModal(category) {
        console.log('Opening modal for:', category);
        currentCategory = category;

        if (componentModal) {
            // Update modal title and subtitle based on category
            const config = componentConfig[category];
            const modalHeader = componentModal.querySelector('.component-modal__header h2');
            const modalSubtitle = componentModal.querySelector('.component-modal__header p');

            if (modalHeader && config) {
                modalHeader.innerHTML = `<i class="fas ${config.icon}"></i> Select ${config.title}`;
            }
            if (modalSubtitle && config) {
                modalSubtitle.textContent = config.subtitle;
            }

            // Show modal
            componentModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log('Modal opened for:', category);
        }
    }

    // Attach click handlers to all select buttons
    function attachSelectButtonHandlers() {
        const selectBtns = document.querySelectorAll('.component-select-btn');
        console.log('Attaching handlers to', selectBtns.length, 'buttons');

        selectBtns.forEach(btn => {
            const section = btn.closest('.component-category');
            const category = section ? section.id.replace('-section', '') : 'unknown';

            // Remove existing listeners by cloning
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            console.log(`Button for ${category}: disabled=${newBtn.disabled}`);

            // Only attach listener if not disabled
            if (!newBtn.disabled) {
                newBtn.addEventListener('click', function() {
                    console.log(`Click handler fired for ${category}`);
                    // Find the parent section to determine category
                    const section = this.closest('.component-category');
                    if (section) {
                        const category = section.id.replace('-section', '');
                        openModal(category);
                    }
                });
                console.log(`Handler attached for ${category}`);
            } else {
                console.log(`Skipped ${category} - button is disabled`);
            }
        });
    }

    // Initial attachment
    attachSelectButtonHandlers();

    // Close modal
    function closeModal() {
        console.log('Closing modal');
        if (componentModal) {
            componentModal.style.display = 'none';
            document.body.style.overflow = '';
            currentCategory = null;
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && componentModal && componentModal.style.display === 'flex') {
            closeModal();
        }
    });

    // ============================================
    // Quick Start Cards - AI Build
    // ============================================
    const quickStartCards = document.querySelectorAll('.quick-start-card');

    quickStartCards.forEach(card => {
        const btn = card.querySelector('.btn-outline-primary');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const useCase = card.dataset.usecase;
                console.log('Starting AI build for:', useCase);

                // Show loading state
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Building...';
                this.disabled = true;

                // Simulate AI building process
                setTimeout(() => {
                    showToast('AI Build Complete!', `Your ${useCase} PC build is ready!`, 'success');
                    this.innerHTML = '<i class="fas fa-robot"></i> AI Build';
                    this.disabled = false;
                }, 2000);
            });
        }
    });

    // ============================================
    // AI Custom Query Input
    // ============================================
    const aiQueryBtn = document.querySelector('.ai-custom-query__input button');
    const aiQueryInput = document.querySelector('.ai-custom-query__input input');

    if (aiQueryBtn && aiQueryInput) {
        aiQueryBtn.addEventListener('click', function() {
            const query = aiQueryInput.value.trim();
            if (query) {
                console.log('AI Query:', query);
                showToast('Processing...', 'Our AI is analyzing your request', 'info');
                aiQueryInput.value = '';
            }
        });

        aiQueryInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                aiQueryBtn.click();
            }
        });
    }

    // ============================================
    // AI Quick Questions
    // ============================================
    const aiQuestionBtns = document.querySelectorAll('.ai-question-btn');

    aiQuestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.textContent.trim();
            console.log('AI Question:', question);
            showToast('AI Assistant', 'Analyzing your question...', 'info');
        });
    });

    // ============================================
    // Filter Chips
    // ============================================
    const filterChips = document.querySelectorAll('.filter-chip');

    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active from siblings
            const siblings = this.parentElement.querySelectorAll('.filter-chip');
            siblings.forEach(s => s.classList.remove('filter-chip--active'));

            // Add active to clicked
            this.classList.add('filter-chip--active');
        });
    });

    // ============================================
    // Component Item Selection
    // ============================================
    function attachComponentItemHandlers() {
        const componentItems = document.querySelectorAll('.component-item:not(.component-item--incompatible)');

        componentItems.forEach(item => {
            const selectBtn = item.querySelector('.btn-primary');
            if (selectBtn && !selectBtn.disabled) {
                // Clone to remove existing listeners
                const newBtn = selectBtn.cloneNode(true);
                selectBtn.parentNode.replaceChild(newBtn, selectBtn);

                newBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const componentName = item.querySelector('h4').textContent;
                    const componentPrice = item.querySelector('.price-current').textContent;
                    const componentImage = item.querySelector('img').src;

                    console.log('Selected component:', componentName, 'for category:', currentCategory);

                    // Use currentCategory instead of hardcoded 'cpu'
                    if (currentCategory) {
                        // Show the selected component in the category
                        showSelectedComponent(currentCategory, {
                            name: componentName,
                            price: componentPrice,
                            image: componentImage,
                            specs: Array.from(item.querySelectorAll('.spec-tag')).map(tag => tag.textContent)
                        });

                        // Show toast
                        showToast('Component Added!', componentName, 'success');

                        // Close modal
                        closeModal();

                        // Update build summary
                        updateBuildSummary();

                        // Enable dependent components based on selection
                        handleComponentDependencies(currentCategory);
                    }
                });
            }
        });
    }

    // Initial attachment
    attachComponentItemHandlers();

    // ============================================
    // Price Range Slider
    // ============================================
    const priceSlider = document.querySelector('.price-range-slider');
    const priceValues = document.querySelector('.price-range-values');

    if (priceSlider && priceValues) {
        priceSlider.addEventListener('input', function() {
            const value = this.value;
            const spans = priceValues.querySelectorAll('span');
            if (spans[1]) {
                spans[1].textContent = `NPR ${parseInt(value).toLocaleString()}`;
            }
        });
    }

    // ============================================
    // Build Summary Actions
    // ============================================
    const saveBuildBtn = document.querySelector('.build-summary__secondary-actions .btn-secondary:first-child');
    const shareBuildBtn = document.querySelector('.build-summary__secondary-actions .btn-secondary:last-child');

    if (saveBuildBtn) {
        saveBuildBtn.addEventListener('click', function() {
            showToast('Build Saved!', 'Your PC build has been saved', 'success');
        });
    }

    if (shareBuildBtn) {
        shareBuildBtn.addEventListener('click', function() {
            // Copy share link to clipboard
            const shareLink = window.location.href;
            navigator.clipboard.writeText(shareLink).then(() => {
                showToast('Link Copied!', 'Share link copied to clipboard', 'success');
            });
        });
    }

    // ============================================
    // Header Actions
    // ============================================
    const loadBuildBtn = document.getElementById('loadBuildBtn');
    const startFreshBtn = document.getElementById('startFreshBtn');

    if (loadBuildBtn) {
        loadBuildBtn.addEventListener('click', function() {
            showToast('Load Build', 'This feature will be available soon', 'info');
        });
    }

    if (startFreshBtn) {
        startFreshBtn.addEventListener('click', function() {
            if (confirm('Start a new build? This will clear your current selections.')) {
                // Reset all selections
                resetBuild();
                showToast('Build Reset', 'Starting fresh build', 'success');
            }
        });
    }

    // ============================================
    // Helper Functions
    // ============================================

    // Track build state
    let buildState = {
        components: {},
        totalPrice: 0,
        componentCount: 0
    };

    function showSelectedComponent(category, componentData) {
        // Find the category section
        const categorySection = document.getElementById(`${category}-section`);
        if (!categorySection) return;

        // Hide the select button
        const selectBtn = categorySection.querySelector('.component-select-btn');
        if (selectBtn) {
            selectBtn.style.display = 'none';
        }

        // Show or create the selected component display
        let selectedDiv = categorySection.querySelector('.selected-component');
        if (!selectedDiv) {
            selectedDiv = document.createElement('div');
            selectedDiv.className = 'selected-component';
            const content = categorySection.querySelector('.component-category__content');
            content.insertBefore(selectedDiv, selectBtn);
        }

        // Build specs HTML
        const specsHTML = componentData.specs.map(spec =>
            `<span class="spec-tag">${spec}</span>`
        ).join('');

        selectedDiv.innerHTML = `
            <div class="selected-component__image">
                <img src="${componentData.image}" alt="${componentData.name}">
            </div>
            <div class="selected-component__info">
                <h4>${componentData.name}</h4>
                <div class="selected-component__specs">
                    ${specsHTML}
                </div>
                <div class="ai-recommendation-inline">
                    <i class="fas fa-robot"></i>
                    <span>Great choice! Perfect for gaming and content creation</span>
                </div>
            </div>
            <div class="selected-component__price">
                <span class="price">${componentData.price}</span>
            </div>
            <div class="selected-component__actions">
                <button class="btn-icon" title="Change" onclick="changeComponent('${category}')">
                    <i class="fas fa-exchange-alt"></i>
                </button>
                <button class="btn-icon btn-icon--danger" title="Remove" onclick="removeComponent('${category}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        selectedDiv.style.display = 'flex';

        // Update build state
        buildState.components[category] = componentData;
        buildState.componentCount = Object.keys(buildState.components).length;

        // Extract numeric price
        const priceNum = parseInt(componentData.price.replace(/[^0-9]/g, ''));
        buildState.totalPrice = Object.values(buildState.components).reduce((sum, comp) => {
            return sum + parseInt(comp.price.replace(/[^0-9]/g, ''));
        }, 0);

        // Re-attach handlers since we modified the DOM
        attachSelectButtonHandlers();
    }

    function handleComponentDependencies(category) {
        // Handle dependencies based on selected component
        if (category === 'cpu') {
            enableMotherboardSelection();
        }
        // Can add more dependencies here in the future
        // e.g., if GPU selected, suggest compatible PSU wattage
    }

    function enableMotherboardSelection() {
        console.log('Enabling motherboard selection...');
        const motherboardSection = document.getElementById('motherboard-section');
        if (!motherboardSection) {
            console.error('Motherboard section not found!');
            return;
        }

        const lockedBadge = motherboardSection.querySelector('.status-badge--locked');
        if (lockedBadge) {
            lockedBadge.remove();
            console.log('Removed locked badge');
        }

        const selectBtn = motherboardSection.querySelector('.component-select-btn');
        if (selectBtn) {
            selectBtn.disabled = false;
            console.log('Motherboard button disabled state:', selectBtn.disabled);

            // Directly attach handler to this specific button
            selectBtn.addEventListener('click', function(e) {
                console.log('Motherboard button clicked!');
                openModal('motherboard');
            });
            console.log('Direct handler attached to motherboard button');
        }

        // Add AI suggestion
        const content = motherboardSection.querySelector('.component-category__content');
        const existingSuggestion = content.querySelector('.ai-suggestion-box');
        if (!existingSuggestion) {
            const suggestionBox = document.createElement('div');
            suggestionBox.className = 'ai-suggestion-box';
            suggestionBox.innerHTML = `
                <div class="ai-suggestion-box__icon">
                    <i class="fas fa-lightbulb"></i>
                </div>
                <div class="ai-suggestion-box__content">
                    <strong>AI Suggests:</strong> Based on your CPU, we recommend Z790 or B760 chipset motherboards with LGA1700 socket
                </div>
            `;
            content.appendChild(suggestionBox);
            console.log('AI suggestion added');
        }
    }

    function updateBuildSummary() {
        // Update component count
        const buildProgress = document.querySelector('.build-progress');
        if (buildProgress) {
            buildProgress.textContent = `${buildState.componentCount}/7 Components`;
        }

        // Update compatibility status
        const compatibilityStatus = document.querySelector('.compatibility-status');
        if (compatibilityStatus) {
            if (buildState.componentCount === 0) {
                compatibilityStatus.className = 'compatibility-status compatibility-status--incomplete';
                compatibilityStatus.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <div>
                        <strong>Build Incomplete</strong>
                        <p>Select required components to continue</p>
                    </div>
                `;
            } else if (buildState.componentCount < 7) {
                compatibilityStatus.className = 'compatibility-status compatibility-status--incomplete';
                compatibilityStatus.innerHTML = `
                    <i class="fas fa-cog fa-spin"></i>
                    <div>
                        <strong>In Progress</strong>
                        <p>Continue adding components</p>
                    </div>
                `;
            } else {
                compatibilityStatus.className = 'compatibility-status compatibility-status--compatible';
                compatibilityStatus.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <strong>All Compatible!</strong>
                        <p>Your build is ready to order</p>
                    </div>
                `;
            }
        }

        // Update price
        const priceValue = document.querySelector('.price-row .price-value');
        const priceTotal = document.querySelector('.price-total');

        if (priceValue) {
            priceValue.textContent = `NPR ${buildState.totalPrice.toLocaleString()}`;
        }

        if (priceTotal) {
            const assemblyPrice = 5000;
            const total = buildState.totalPrice + assemblyPrice;
            priceTotal.textContent = `NPR ${total.toLocaleString()}`;
        }

        // Enable/disable Add to Cart button
        const addToCartBtn = document.querySelector('.build-summary__actions .btn-primary');
        if (addToCartBtn) {
            if (buildState.componentCount >= 7) {
                addToCartBtn.disabled = false;
                addToCartBtn.onclick = function() {
                    showToast('Added to Cart!', 'Your custom PC build has been added to cart', 'success');
                };
            } else {
                addToCartBtn.disabled = true;
            }
        }
    }

    function resetBuild() {
        // Reset build state
        buildState = {
            components: {},
            totalPrice: 0,
            componentCount: 0
        };

        // Hide all selected components and show select buttons
        document.querySelectorAll('.component-category').forEach(section => {
            const selectedDiv = section.querySelector('.selected-component');
            if (selectedDiv) {
                selectedDiv.style.display = 'none';
            }

            const selectBtn = section.querySelector('.component-select-btn');
            if (selectBtn) {
                selectBtn.style.display = 'flex';
            }
        });

        // Update UI
        updateBuildSummary();

        // Re-lock motherboard
        const motherboardSection = document.getElementById('motherboard-section');
        if (motherboardSection) {
            const selectBtn = motherboardSection.querySelector('.component-select-btn');
            if (selectBtn) {
                selectBtn.disabled = true;
            }

            const statusDiv = motherboardSection.querySelector('.component-category__status');
            const existingLocked = statusDiv.querySelector('.status-badge--locked');
            if (!existingLocked) {
                const lockedBadge = document.createElement('span');
                lockedBadge.className = 'status-badge status-badge--locked';
                lockedBadge.innerHTML = '<i class="fas fa-lock"></i> Select CPU first';
                statusDiv.appendChild(lockedBadge);
            }

            // Remove AI suggestion
            const suggestionBox = motherboardSection.querySelector('.ai-suggestion-box');
            if (suggestionBox) {
                suggestionBox.remove();
            }
        }

        // Re-attach handlers
        attachSelectButtonHandlers();
    }

    // Make these functions globally available for onclick handlers
    window.changeComponent = function(category) {
        console.log('Change component:', category);
        openModal(category);
    };

    window.removeComponent = function(category) {
        console.log('Remove component:', category);

        // Remove from state
        delete buildState.components[category];
        buildState.componentCount = Object.keys(buildState.components).length;
        buildState.totalPrice = Object.values(buildState.components).reduce((sum, comp) => {
            return sum + parseInt(comp.price.replace(/[^0-9]/g, ''));
        }, 0);

        // Hide selected component and show select button
        const categorySection = document.getElementById(`${category}-section`);
        if (categorySection) {
            const selectedDiv = categorySection.querySelector('.selected-component');
            if (selectedDiv) {
                selectedDiv.style.display = 'none';
            }

            const selectBtn = categorySection.querySelector('.component-select-btn');
            if (selectBtn) {
                selectBtn.style.display = 'flex';
            }
        }

        // Update UI
        updateBuildSummary();

        // Show toast
        showToast('Component Removed', 'Component has been removed from your build', 'info');
    };

    function showToast(title, message, type = 'success') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `custom-toast ${type}`;

        const iconMap = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${iconMap[type] || iconMap.success}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;

        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // ============================================
    // Demo: Show example of selected CPU on load
    // ============================================
    setTimeout(() => {
        const selectedCpu = document.getElementById('selected-cpu');
        if (selectedCpu) {
            // Keep it hidden for clean mockup
            // selectedCpu.style.display = 'flex';
        }
    }, 1000);

});
