// ============================================
// PC Builder V2 - Advanced JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // Builder Mode Tabs
    // ============================================
    const builderTabs = document.querySelectorAll('.builder-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    builderTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // Remove active class from all tabs
            builderTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Show target tab content
            const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ============================================
    // Mobile Menu
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
    // Build State Management
    // ============================================
    let buildState = {
        components: {},
        totalPrice: 0,
        componentCount: 0,
        maxComponents: 8
    };

    // ============================================
    // Bento Card Quick Start
    // ============================================
    const bentoCards = document.querySelectorAll('.bento-card');

    bentoCards.forEach(card => {
        card.addEventListener('click', function() {
            const buildType = this.dataset.build;
            console.log('Selected build type:', buildType);

            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(237, 50, 55, 0.5);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            ripple.style.left = event.offsetX + 'px';
            ripple.style.top = event.offsetY + 'px';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

            // Trigger build generation
            generateAIBuild(buildType);
        });

        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ============================================
    // AI Chat Bar
    // ============================================
    const aiChatInput = document.querySelector('.ai-chat-bar__input');
    const aiChatSend = document.querySelector('.ai-chat-bar__send');

    if (aiChatSend && aiChatInput) {
        aiChatSend.addEventListener('click', function() {
            const query = aiChatInput.value.trim();
            if (query) {
                console.log('AI Query:', query);
                processAIQuery(query);
                aiChatInput.value = '';
            }
        });

        aiChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                aiChatSend.click();
            }
        });
    }

    // ============================================
    // Component Card Selection
    // ============================================
    const componentCards = document.querySelectorAll('.component-card');

    componentCards.forEach(card => {
        const selectBtn = card.querySelector('.component-select-action');
        const component = card.dataset.component;

        if (selectBtn) {
            selectBtn.addEventListener('click', function() {
                console.log('Select component:', component);
                openComponentSelector(component);
            });
        }
    });

    // ============================================
    // View Toggle
    // ============================================
    const viewBtns = document.querySelectorAll('.view-btn');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const view = this.dataset.view;
            console.log('Switch to view:', view);

            const grid = document.querySelector('.component-cards-grid');
            if (view === 'list') {
                grid.style.gridTemplateColumns = '1fr';
            } else {
                grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            }
        });
    });

    // ============================================
    // Floating Summary Toggle
    // ============================================
    const summaryToggle = document.querySelector('.summary-toggle');
    const summaryContent = document.querySelector('.floating-summary__content');
    const floatingSummary = document.querySelector('.floating-summary');

    if (summaryToggle && summaryContent) {
        summaryToggle.addEventListener('click', function() {
            const isCollapsed = summaryContent.style.display === 'none';

            if (isCollapsed) {
                summaryContent.style.display = 'block';
                this.querySelector('i').className = 'fas fa-chevron-up';
                floatingSummary.style.maxHeight = '600px';
            } else {
                summaryContent.style.display = 'none';
                this.querySelector('i').className = 'fas fa-chevron-down';
                floatingSummary.style.maxHeight = '80px';
            }
        });
    }

    // ============================================
    // AI Assistant FAB
    // ============================================
    const aiFab = document.querySelector('.ai-assistant-fab');

    if (aiFab) {
        aiFab.addEventListener('click', function() {
            console.log('Open AI Assistant');
            showToast('AI Assistant', 'AI chat feature coming soon!', 'info');
        });
    }

    // ============================================
    // Preview Controls
    // ============================================
    const previewBtns = document.querySelectorAll('.preview-btn');

    previewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const title = this.getAttribute('title');
            console.log('Preview control:', title);

            // Add button feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // ============================================
    // Helper Functions
    // ============================================

    function generateAIBuild(buildType) {
        console.log('Generating AI build for:', buildType);

        // Show loading state
        showToast('AI Building...', `Creating your perfect ${buildType} PC`, 'info');

        // Simulate AI generation
        setTimeout(() => {
            const builds = {
                gaming: {
                    cpu: { name: 'Intel Core i9-13900K', price: 55000 },
                    motherboard: { name: 'ASUS ROG STRIX Z790-E', price: 45000 },
                    gpu: { name: 'RTX 4080 16GB', price: 120000 },
                    ram: { name: 'G.Skill Trident Z5 DDR5 32GB', price: 28000 },
                    storage: { name: 'Samsung 980 Pro 2TB', price: 25000 },
                    psu: { name: 'Corsair RM850x 850W', price: 15000 },
                    case: { name: 'Lian Li O11 Dynamic', price: 18000 },
                    cooling: { name: 'NZXT Kraken Z73 360mm', price: 25000 }
                },
                creator: {
                    cpu: { name: 'AMD Ryzen 9 7950X', price: 65000 },
                    motherboard: { name: 'MSI X670E Carbon', price: 42000 },
                    gpu: { name: 'RTX 4070 Ti 12GB', price: 85000 },
                    ram: { name: 'Corsair Vengeance DDR5 64GB', price: 45000 },
                    storage: { name: 'Samsung 980 Pro 2TB', price: 25000 },
                    psu: { name: 'EVGA SuperNOVA 850W', price: 14000 },
                    case: { name: 'Fractal Define 7', price: 16000 },
                    cooling: { name: 'be quiet! Dark Rock Pro 4', price: 9000 }
                }
            };

            const selectedBuild = builds[buildType] || builds.gaming;
            populateBuildFromAI(selectedBuild);

            showToast('Build Complete!', `Your ${buildType} PC is ready!`, 'success');
        }, 2000);
    }

    function populateBuildFromAI(buildData) {
        // Populate all components
        Object.keys(buildData).forEach((component, index) => {
            setTimeout(() => {
                selectComponent(component, buildData[component]);
            }, index * 200); // Stagger animations
        });
    }

    function selectComponent(componentType, data) {
        // Update build state
        buildState.components[componentType] = data;
        buildState.componentCount = Object.keys(buildState.components).length;
        buildState.totalPrice = Object.values(buildState.components).reduce((sum, c) => sum + c.price, 0);

        // Update UI
        updateComponentCard(componentType, data);
        updateProgress();
        updatePriceSummary();
        updatePerformancePrediction();
        animateComponentIn3DPreview(componentType);
    }

    function updateComponentCard(componentType, data) {
        const card = document.querySelector(`.component-card[data-component="${componentType}"]`);
        if (!card) return;

        const statusEl = card.querySelector('.component-status');
        const actionBtn = card.querySelector('.component-select-action');

        if (statusEl) {
            statusEl.textContent = data.name;
            statusEl.style.color = '#27ae60';
        }

        if (actionBtn) {
            actionBtn.innerHTML = `
                <i class="fas fa-check"></i>
                <span>Selected - ${formatPrice(data.price)}</span>
            `;
            actionBtn.style.background = 'rgba(39, 174, 96, 0.1)';
            actionBtn.style.borderColor = '#27ae60';
            actionBtn.style.borderStyle = 'solid';
            actionBtn.classList.remove('selected');
        }

        // Add checkmark to icon
        const icon = card.querySelector('.component-icon i');
        if (icon) {
            icon.style.color = '#27ae60';
        }
    }

    function updateProgress() {
        const percentage = (buildState.componentCount / buildState.maxComponents) * 100;

        const progressFill = document.querySelector('.progress-fill');
        const progressCount = document.querySelector('.progress-count');
        const progressPercentage = document.querySelector('.progress-percentage');

        if (progressFill) {
            progressFill.style.width = percentage + '%';
        }

        if (progressCount) {
            progressCount.textContent = `${buildState.componentCount}/${buildState.maxComponents} Components`;
        }

        if (progressPercentage) {
            progressPercentage.textContent = Math.round(percentage) + '%';
        }
    }

    function updatePriceSummary() {
        const priceRows = document.querySelectorAll('.price-row .price');

        if (priceRows[0]) {
            priceRows[0].textContent = formatPrice(buildState.totalPrice);
        }

        if (priceRows[2]) {
            const total = buildState.totalPrice + 5000; // Add assembly
            priceRows[2].textContent = formatPrice(total);
        }

        // Update compatibility
        const compatibilityText = document.querySelector('.compatibility-text span');
        const compatibilityStatus = document.querySelector('.compatibility-status');

        if (buildState.componentCount >= 7) {
            compatibilityText.textContent = 'All components compatible!';
            compatibilityStatus.className = 'compatibility-status compatible';
            compatibilityStatus.innerHTML = '<i class="fas fa-check-circle" style="color: #27ae60"></i>';

            // Enable add to cart
            const addToCartBtn = document.querySelector('.floating-summary .btn-primary');
            if (addToCartBtn) {
                addToCartBtn.disabled = false;
            }
        } else {
            compatibilityText.textContent = `${7 - buildState.componentCount} more required`;
        }
    }

    function updatePerformancePrediction() {
        if (!buildState.components.cpu || !buildState.components.gpu) return;

        // Simulate performance prediction
        const predictions = [
            { label: '1080p Gaming', fps: 165, width: 90 },
            { label: '1440p Gaming', fps: 120, width: 75 },
            { label: '4K Gaming', fps: 75, width: 50 }
        ];

        const predictionItems = document.querySelectorAll('.prediction-item');

        predictionItems.forEach((item, index) => {
            const fill = item.querySelector('.prediction-fill');
            const value = item.querySelector('.prediction-value');

            if (fill && value && predictions[index]) {
                setTimeout(() => {
                    fill.style.width = predictions[index].width + '%';
                    value.textContent = predictions[index].fps + ' FPS';
                }, index * 200);
            }
        });
    }

    function animateComponentIn3DPreview(componentType) {
        const slot = document.querySelector(`.${componentType}-slot`);
        if (!slot) return;

        slot.style.background = 'rgba(39, 174, 96, 0.2)';
        slot.style.borderColor = '#27ae60';

        const icon = slot.querySelector('i');
        if (icon) {
            icon.style.color = '#27ae60';
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'iconPop 0.4s ease-out';
            }, 10);
        }
    }

    function openComponentSelector(component) {
        console.log('Open selector for:', component);

        const modal = document.getElementById('componentModalV2');
        const modalTitle = modal.querySelector('h2');
        const optionsGrid = document.getElementById('componentOptionsGrid');

        // Component configuration
        const componentConfig = {
            cpu: {
                title: 'Processor (CPU)',
                icon: 'fa-microchip',
                options: [
                    { name: 'Intel Core i9-13900K', specs: '24 Cores, 32 Threads, 5.8GHz', price: 55000, brand: 'intel', recommended: true },
                    { name: 'AMD Ryzen 9 7950X', specs: '16 Cores, 32 Threads, 5.7GHz', price: 65000, brand: 'amd', recommended: true },
                    { name: 'Intel Core i7-13700K', specs: '16 Cores, 24 Threads, 5.4GHz', price: 42000, brand: 'intel' },
                    { name: 'AMD Ryzen 7 7800X3D', specs: '8 Cores, 16 Threads, 5.0GHz', price: 48000, brand: 'amd' },
                    { name: 'Intel Core i5-13600K', specs: '14 Cores, 20 Threads, 5.1GHz', price: 32000, brand: 'intel' },
                    { name: 'AMD Ryzen 5 7600X', specs: '6 Cores, 12 Threads, 5.3GHz', price: 28000, brand: 'amd' }
                ]
            },
            motherboard: {
                title: 'Motherboard',
                icon: 'fa-th',
                options: [
                    { name: 'ASUS ROG STRIX Z790-E', specs: 'LGA1700, DDR5, WiFi 6E', price: 45000, brand: 'asus', recommended: true },
                    { name: 'MSI X670E Carbon', specs: 'AM5, DDR5, WiFi 6E', price: 42000, brand: 'msi', recommended: true },
                    { name: 'Gigabyte Z790 AORUS', specs: 'LGA1700, DDR5, PCIe 5.0', price: 38000, brand: 'gigabyte' },
                    { name: 'ASRock X670E Taichi', specs: 'AM5, DDR5, 2.5GbE LAN', price: 40000, brand: 'asrock' },
                    { name: 'ASUS TUF B760M-PLUS', specs: 'LGA1700, DDR4, Micro-ATX', price: 18000, brand: 'asus' }
                ]
            },
            gpu: {
                title: 'Graphics Card (GPU)',
                icon: 'fa-tv',
                options: [
                    { name: 'RTX 4080 16GB', specs: '16GB GDDR6X, Ray Tracing', price: 120000, brand: 'nvidia', recommended: true },
                    { name: 'RTX 4070 Ti 12GB', specs: '12GB GDDR6X, DLSS 3', price: 85000, brand: 'nvidia', recommended: true },
                    { name: 'AMD RX 7900 XTX', specs: '24GB GDDR6, FSR 3', price: 95000, brand: 'amd' },
                    { name: 'RTX 4070 12GB', specs: '12GB GDDR6X, Ray Tracing', price: 65000, brand: 'nvidia' },
                    { name: 'AMD RX 7800 XT', specs: '16GB GDDR6, 1440p Gaming', price: 58000, brand: 'amd' },
                    { name: 'RTX 4060 Ti 8GB', specs: '8GB GDDR6, 1080p Gaming', price: 45000, brand: 'nvidia' }
                ]
            },
            ram: {
                title: 'RAM (Memory)',
                icon: 'fa-memory',
                options: [
                    { name: 'G.Skill Trident Z5 DDR5 32GB', specs: '32GB (2x16GB), 6000MHz', price: 28000, brand: 'gskill', recommended: true },
                    { name: 'Corsair Vengeance DDR5 64GB', specs: '64GB (2x32GB), 5600MHz', price: 45000, brand: 'corsair', recommended: true },
                    { name: 'Kingston Fury DDR5 32GB', specs: '32GB (2x16GB), 5200MHz', price: 22000, brand: 'kingston' },
                    { name: 'G.Skill Ripjaws DDR4 32GB', specs: '32GB (2x16GB), 3600MHz', price: 15000, brand: 'gskill' },
                    { name: 'Corsair Vengeance DDR4 16GB', specs: '16GB (2x8GB), 3200MHz', price: 8000, brand: 'corsair' }
                ]
            },
            storage: {
                title: 'Storage (SSD/HDD)',
                icon: 'fa-hdd',
                options: [
                    { name: 'Samsung 980 Pro 2TB', specs: '2TB NVMe, 7000MB/s Read', price: 25000, brand: 'samsung', recommended: true },
                    { name: 'WD Black SN850X 2TB', specs: '2TB NVMe, 7300MB/s Read', price: 27000, brand: 'western-digital', recommended: true },
                    { name: 'Samsung 970 EVO Plus 1TB', specs: '1TB NVMe, 3500MB/s Read', price: 12000, brand: 'samsung' },
                    { name: 'Crucial P3 Plus 2TB', specs: '2TB NVMe, 5000MB/s Read', price: 18000, brand: 'crucial' },
                    { name: 'Seagate Barracuda 2TB HDD', specs: '2TB, 7200RPM, SATA', price: 6000, brand: 'seagate' }
                ]
            },
            psu: {
                title: 'Power Supply (PSU)',
                icon: 'fa-plug',
                options: [
                    { name: 'Corsair RM850x 850W', specs: '850W, 80+ Gold, Modular', price: 15000, brand: 'corsair', recommended: true },
                    { name: 'EVGA SuperNOVA 850W', specs: '850W, 80+ Platinum, Modular', price: 14000, brand: 'evga', recommended: true },
                    { name: 'Seasonic Focus GX 750W', specs: '750W, 80+ Gold, Modular', price: 12000, brand: 'seasonic' },
                    { name: 'Cooler Master V850 SFX', specs: '850W, 80+ Gold, SFF', price: 16000, brand: 'coolermaster' },
                    { name: 'Thermaltake Toughpower 650W', specs: '650W, 80+ Bronze, Semi-Modular', price: 8000, brand: 'thermaltake' }
                ]
            },
            case: {
                title: 'PC Case',
                icon: 'fa-box',
                options: [
                    { name: 'Lian Li O11 Dynamic', specs: 'Mid-Tower, Tempered Glass, RGB', price: 18000, brand: 'lian-li', recommended: true },
                    { name: 'Fractal Define 7', specs: 'Mid-Tower, Sound Dampened', price: 16000, brand: 'fractal', recommended: true },
                    { name: 'NZXT H710i', specs: 'Mid-Tower, Smart Device, RGB', price: 17000, brand: 'nzxt' },
                    { name: 'Corsair 5000D Airflow', specs: 'Mid-Tower, High Airflow', price: 15000, brand: 'corsair' },
                    { name: 'Phanteks P500A', specs: 'Mid-Tower, Mesh Front, RGB', price: 14000, brand: 'phanteks' }
                ]
            },
            cooling: {
                title: 'CPU Cooler',
                icon: 'fa-fan',
                options: [
                    { name: 'NZXT Kraken Z73 360mm', specs: '360mm AIO, LCD Display, RGB', price: 25000, brand: 'nzxt', recommended: true },
                    { name: 'be quiet! Dark Rock Pro 4', specs: 'Air Cooler, Dual Tower, Silent', price: 9000, brand: 'bequiet', recommended: true },
                    { name: 'Corsair iCUE H150i Elite', specs: '360mm AIO, LCD Display', price: 22000, brand: 'corsair' },
                    { name: 'Noctua NH-D15', specs: 'Air Cooler, Dual Tower, Premium', price: 11000, brand: 'noctua' },
                    { name: 'Arctic Liquid Freezer II 280', specs: '280mm AIO, High Performance', price: 13000, brand: 'arctic' }
                ]
            }
        };

        const config = componentConfig[component];

        // Update modal title
        modalTitle.innerHTML = `<i class="fas ${config.icon}"></i> Select ${config.title}`;

        // Get currently selected component
        const currentSelection = buildState.components[component];

        // Default fallback images per component type
        const defaultImages = {
            cpu: 'https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_UF894,1000_QL80_.jpg',
            motherboard: 'https://m.media-amazon.com/images/I/81P9RJO+VBL._AC_UF894,1000_QL80_.jpg',
            gpu: 'https://m.media-amazon.com/images/I/81jz0Z+ELOL._AC_UF894,1000_QL80_.jpg',
            ram: 'https://m.media-amazon.com/images/I/71F6E8bJVyL._AC_UF894,1000_QL80_.jpg',
            storage: 'https://m.media-amazon.com/images/I/71ae3zm3kRL._AC_UF894,1000_QL80_.jpg',
            psu: 'https://m.media-amazon.com/images/I/71jnWHgu8fL._AC_UF894,1000_QL80_.jpg',
            case: 'https://m.media-amazon.com/images/I/71VrvMYd3yL._AC_UF894,1000_QL80_.jpg',
            cooling: 'https://m.media-amazon.com/images/I/71hAzQG8HjL._AC_UF894,1000_QL80_.jpg'
        };

        // Image mapping for components
        const componentImages = {
            cpu: {
                'Intel Core i9-13900K': 'https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_UF894,1000_QL80_.jpg',
                'AMD Ryzen 9 7950X': 'https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_UF894,1000_QL80_.jpg',
                'Intel Core i7-13700K': 'https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_UF894,1000_QL80_.jpg',
                'AMD Ryzen 7 7800X3D': 'https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_UF894,1000_QL80_.jpg',
                'Intel Core i5-13600K': 'https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_UF894,1000_QL80_.jpg',
                'AMD Ryzen 5 7600X': 'https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_UF894,1000_QL80_.jpg'
            },
            motherboard: {
                'ASUS ROG STRIX Z790-E': 'assets/images/motherboard.png',
                'MSI X670E Carbon': 'assets/images/motherboard2.png',
                'Gigabyte Z790 AORUS': 'assets/images/motherboard3.png',
                'ASRock X670E Taichi': 'assets/images/motherboard4.png',
                'ASUS TUF B760M-PLUS': 'assets/images/motherboard.png'
            },
            gpu: {
                'RTX 4080 16GB': 'https://m.media-amazon.com/images/I/81jz0Z+ELOL._AC_UF894,1000_QL80_.jpg',
                'RTX 4070 Ti 12GB': 'https://m.media-amazon.com/images/I/81jz0Z+ELOL._AC_UF894,1000_QL80_.jpg',
                'AMD RX 7900 XTX': 'https://m.media-amazon.com/images/I/81fE9im7VPL._AC_UF894,1000_QL80_.jpg',
                'RTX 4070 12GB': 'https://m.media-amazon.com/images/I/81jz0Z+ELOL._AC_UF894,1000_QL80_.jpg',
                'AMD RX 7800 XT': 'https://m.media-amazon.com/images/I/81fE9im7VPL._AC_UF894,1000_QL80_.jpg',
                'RTX 4060 Ti 8GB': 'https://m.media-amazon.com/images/I/81jz0Z+ELOL._AC_UF894,1000_QL80_.jpg'
            },
            ram: {
                'G.Skill Trident Z5 DDR5 32GB': 'https://m.media-amazon.com/images/I/61aJt7ZEAFL._AC_UF894,1000_QL80_.jpg',
                'Corsair Vengeance DDR5 64GB': 'https://m.media-amazon.com/images/I/71F6E8bJVyL._AC_UF894,1000_QL80_.jpg',
                'Kingston Fury DDR5 32GB': 'https://m.media-amazon.com/images/I/71rAUN0SYVL._AC_UF894,1000_QL80_.jpg',
                'G.Skill Ripjaws DDR4 32GB': 'https://m.media-amazon.com/images/I/61aJt7ZEAFL._AC_UF894,1000_QL80_.jpg',
                'Corsair Vengeance DDR4 16GB': 'https://m.media-amazon.com/images/I/71F6E8bJVyL._AC_UF894,1000_QL80_.jpg'
            },
            storage: {
                'Samsung 980 Pro 2TB': 'https://m.media-amazon.com/images/I/71ae3zm3kRL._AC_UF894,1000_QL80_.jpg',
                'WD Black SN850X 2TB': 'https://m.media-amazon.com/images/I/71CZ7LlqJtL._AC_UF894,1000_QL80_.jpg',
                'Samsung 970 EVO Plus 1TB': 'https://m.media-amazon.com/images/I/71ae3zm3kRL._AC_UF894,1000_QL80_.jpg',
                'Crucial P3 Plus 2TB': 'https://m.media-amazon.com/images/I/71vJrTaClPL._AC_UF894,1000_QL80_.jpg',
                'Seagate Barracuda 2TB HDD': 'https://m.media-amazon.com/images/I/71jbp6qUiBL._AC_UF894,1000_QL80_.jpg'
            },
            psu: {
                'Corsair RM850x 850W': 'https://m.media-amazon.com/images/I/71jnWHgu8fL._AC_UF894,1000_QL80_.jpg',
                'EVGA SuperNOVA 850W': 'https://m.media-amazon.com/images/I/71TqrYKWzYL._AC_UF894,1000_QL80_.jpg',
                'Seasonic Focus GX 750W': 'https://m.media-amazon.com/images/I/71mN2q-BbpL._AC_UF894,1000_QL80_.jpg',
                'Cooler Master V850 SFX': 'https://m.media-amazon.com/images/I/71-IHX9aPVL._AC_UF894,1000_QL80_.jpg',
                'Thermaltake Toughpower 650W': 'https://m.media-amazon.com/images/I/71eG7p+gB0L._AC_UF894,1000_QL80_.jpg'
            },
            case: {
                'Lian Li O11 Dynamic': 'https://m.media-amazon.com/images/I/71VrvMYd3yL._AC_UF894,1000_QL80_.jpg',
                'Fractal Define 7': 'https://m.media-amazon.com/images/I/81xKu6yCNLL._AC_UF894,1000_QL80_.jpg',
                'NZXT H710i': 'https://m.media-amazon.com/images/I/71UKj3zWVzL._AC_UF894,1000_QL80_.jpg',
                'Corsair 5000D Airflow': 'https://m.media-amazon.com/images/I/81Jvd16mYyL._AC_UF894,1000_QL80_.jpg',
                'Phanteks P500A': 'https://m.media-amazon.com/images/I/71a8vp9BZNL._AC_UF894,1000_QL80_.jpg'
            },
            cooling: {
                'NZXT Kraken Z73 360mm': 'https://m.media-amazon.com/images/I/71hAzQG8HjL._AC_UF894,1000_QL80_.jpg',
                'be quiet! Dark Rock Pro 4': 'https://m.media-amazon.com/images/I/71kFlR4KoTL._AC_UF894,1000_QL80_.jpg',
                'Corsair iCUE H150i Elite': 'https://m.media-amazon.com/images/I/71wOgJvU89L._AC_UF894,1000_QL80_.jpg',
                'Noctua NH-D15': 'https://m.media-amazon.com/images/I/71vJ3F-Y5hL._AC_UF894,1000_QL80_.jpg',
                'Arctic Liquid Freezer II 280': 'https://m.media-amazon.com/images/I/71h5lFWvrbL._AC_UF894,1000_QL80_.jpg'
            }
        };

        // Populate component options
        optionsGrid.innerHTML = config.options.map(option => {
            const isSelected = currentSelection && currentSelection.name === option.name;

            // Get image URL with fallback to default
            let imageUrl = '';
            if (componentImages[component] && componentImages[component][option.name]) {
                imageUrl = componentImages[component][option.name];
            } else if (defaultImages[component]) {
                imageUrl = defaultImages[component];
            }

            const buttonHTML = isSelected
                ? `<button class="btn-select-component selected-btn" style="background: rgba(39, 174, 96, 0.1); border-color: rgb(39, 174, 96); border-style: solid; color: rgb(39, 174, 96);">
                    <i class="fas fa-check-circle"></i> Selected
                   </button>`
                : `<button class="btn-select-component">
                    <i class="fas fa-check"></i> Select
                   </button>`;

            return `
            <div class="component-option-card ${option.recommended ? 'recommended' : ''} ${isSelected ? 'selected' : ''}" data-component="${component}" data-name="${option.name}" data-price="${option.price}">
                <div class="component-option-card__image">
                    ${imageUrl ? `<img src="${imageUrl}" alt="${option.name}">` : `<i class="fas ${config.icon}"></i>`}
                </div>
                <div class="component-option-card__info">
                    <h4>${option.name}</h4>
                    <div class="specs">
                        ${option.specs.split(',').map(spec => `<span>${spec.trim()}</span>`).join('')}
                    </div>
                </div>
                <div class="component-option-card__footer">
                    <div class="price">${formatPrice(option.price)}</div>
                    ${buttonHTML}
                </div>
            </div>
            `;
        }).join('');

        // Show modal
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);

        // Prevent body scroll - save scroll position
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.dataset.scrollY = scrollY;

        // Initialize filter chips and price slider
        setTimeout(() => {
            initializeFilterChips();
            initializePriceRange();
        }, 50);

        // Attach selection handlers
        attachComponentSelectionHandlers(component);
    }

    function attachComponentSelectionHandlers(component) {
        const selectButtons = document.querySelectorAll('.btn-select-component');

        selectButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();

                const card = this.closest('.component-option-card');
                const name = card.dataset.name;
                const price = parseInt(card.dataset.price);

                // Select component
                selectComponent(component, { name, price });

                // Close modal
                closeComponentModal();

                // Show success toast
                showToast('Component Selected', `${name} added to your build!`, 'success');
            });
        });
    }

    function closeComponentModal() {
        const modal = document.getElementById('componentModalV2');
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);

        // Re-enable body scroll and restore scroll position
        const scrollY = document.body.dataset.scrollY || '0';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY));
        delete document.body.dataset.scrollY;
    }

    // Modal close button handler
    const modalCloseBtn = document.querySelector('.component-modal-v2__close');
    const modalOverlay = document.querySelector('.component-modal-v2__overlay');

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeComponentModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeComponentModal);
    }

    function processAIQuery(query) {
        console.log('Processing AI query:', query);
        showToast('AI Processing', 'Analyzing your requirements...', 'info');

        setTimeout(() => {
            showToast('AI Response', 'I can help you build that! Let me create a build for you.', 'success');
        }, 1500);
    }

    function formatPrice(price) {
        return `NPR ${price.toLocaleString()}`;
    }

    function showToast(title, message, type = 'success') {
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

        setTimeout(() => toast.classList.add('show'), 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // ============================================
    // Add ripple animation CSS
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(30);
                opacity: 0;
            }
        }

        @keyframes iconPop {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // Cursor Trail Effect (Optional)
    // ============================================
    document.addEventListener('mousemove', function(e) {
        // Only on desktop
        if (window.innerWidth < 768) return;

        // Create trail element occasionally
        if (Math.random() > 0.95) {
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(237, 50, 55, 0.5);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                animation: fadeOut 0.8s ease-out;
            `;
            document.body.appendChild(trail);

            setTimeout(() => trail.remove(), 800);
        }
    });

    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(fadeOutStyle);

});

    // ============================================
    // Real-Time Component Preview Updates (V3)
    // ============================================

    function updateComponentPreview(componentType, componentData) {
        const componentPosition = document.querySelector(`.component-position[data-component="${componentType}"]`);
        if (!componentPosition) return;

        // Add selected class
        componentPosition.classList.add('selected');

        // Update icon color
        const iconWrapper = componentPosition.querySelector('.component-icon-wrapper');
        if (iconWrapper) {
            iconWrapper.style.borderColor = '#27ae60';
            iconWrapper.style.background = 'linear-gradient(135deg, rgba(39, 174, 96, 0.2), rgba(39, 174, 96, 0.1))';
            const icon = iconWrapper.querySelector('i');
            if (icon) {
                icon.style.color = '#27ae60';
            }
        }

        // If component has image, display it
        // Note: This is a placeholder - in production, you'd fetch actual component images
        const componentImage = document.getElementById(`${componentType}Image`);
        if (componentImage && componentData.image) {
            componentImage.src = componentData.image;
            componentImage.style.display = 'block';
        }

        // Hide icon wrapper when image is shown
        const iconWrapperEl = componentPosition.querySelector('.component-icon-wrapper');
        if (componentImage && componentData.image && iconWrapperEl) {
            iconWrapperEl.style.opacity = '0.3';
        }

        console.log(`Updated preview for ${componentType}:`, componentData);
    }

    function checkCompatibilityWarnings() {
        // Check for common compatibility issues
        const warnings = [];

        // Example: Check PSU wattage
        if (buildState.components.gpu && buildState.components.psu) {
            // This would be replaced with actual logic
            const gpuPower = 350; // Example
            const psuWattage = 650; // Example
            if (psuWattage < gpuPower + 200) {
                showWarningBadge('psu', 'Low wattage for this GPU');
                warnings.push('PSU may not provide enough power');
            }
        }

        // Example: Check CPU cooling
        if (buildState.components.cpu && !buildState.components.cooling) {
            showWarningBadge('cooling', 'Cooling required');
            warnings.push('High-end CPU requires aftermarket cooling');
        }

        return warnings;
    }

    function showWarningBadge(componentType, message) {
        const componentPosition = document.querySelector(`.component-position[data-component="${componentType}"]`);
        if (!componentPosition) return;

        const warningBadge = componentPosition.querySelector('.warning-badge');
        if (warningBadge) {
            warningBadge.style.display = 'flex';
            warningBadge.title = message;
        }
    }

    function hideWarningBadge(componentType) {
        const componentPosition = document.querySelector(`.component-position[data-component="${componentType}"]`);
        if (!componentPosition) return;

        const warningBadge = componentPosition.querySelector('.warning-badge');
        if (warningBadge) {
            warningBadge.style.display = 'none';
        }
    }

    // Override selectComponent to include preview updates
    const originalSelectComponent = selectComponent;
    selectComponent = function(componentType, data) {
        // Call original function
        originalSelectComponent(componentType, data);

        // Update real-time preview
        updateComponentPreview(componentType, data);

        // Check compatibility
        checkCompatibilityWarnings();
    };

    // ============================================
    // Component Preview Interactions
    // ============================================

    const componentPositions = document.querySelectorAll('.component-position');
    componentPositions.forEach(position => {
        position.addEventListener('click', function() {
            const componentType = this.dataset.component;
            if (componentType) {
                // Find and click the corresponding component card
                const componentCard = document.querySelector(`.component-card[data-component="${componentType}"]`);
                if (componentCard) {
                    const selectBtn = componentCard.querySelector('.component-select-action');
                    if (selectBtn) {
                        selectBtn.click();
                    }
                }
            }
        });
    });

    // ============================================
    // Filter Chips Toggle (Radio Buttons)
    // ============================================
    function initializeFilterChips() {
        const filterChips = document.querySelectorAll('.filter-chip');

        filterChips.forEach(chip => {
            const radio = chip.querySelector('input[type="radio"]');

            if (radio) {
                // Remove any existing listeners by cloning
                const newRadio = radio.cloneNode(true);
                radio.parentNode.replaceChild(newRadio, radio);

                // Handle radio button change event
                newRadio.addEventListener('change', function() {
                    const chipLabel = this.closest('.filter-chip');
                    const filterGroup = chipLabel.parentElement;
                    const allRadios = filterGroup.querySelectorAll('input[type="radio"]');

                    // Remove active class from all chips in this group
                    allRadios.forEach(r => {
                        const label = r.closest('.filter-chip');
                        if (label) {
                            label.classList.remove('filter-chip--active');
                        }
                    });

                    // Add active class only to the selected chip
                    if (this.checked) {
                        chipLabel.classList.add('filter-chip--active');
                    }

                    // Log selected filter
                    console.log('Selected filter:', this.value);
                });
            }
        });
    }

    // Initialize filter chips on page load
    initializeFilterChips();

    // ============================================
    // Min/Max Price Range with Dual Slider
    // ============================================
    function initializePriceRange() {
        const minInput = document.getElementById('minPriceInput');
        const maxInput = document.getElementById('maxPriceInput');
        const minSlider = document.getElementById('minSlider');
        const maxSlider = document.getElementById('maxSlider');
        const sliderRange = document.getElementById('sliderRange');

        if (!minInput || !maxInput || !minSlider || !maxSlider || !sliderRange) {
            return;
        }

        const minPrice = 0;
        const maxPrice = 150000;

        // Update slider range visual
        function updateSliderRange() {
            const minVal = parseInt(minSlider.value);
            const maxVal = parseInt(maxSlider.value);
            const minPercent = (minVal / maxPrice) * 100;
            const maxPercent = (maxVal / maxPrice) * 100;

            sliderRange.style.left = minPercent + '%';
            sliderRange.style.width = (maxPercent - minPercent) + '%';
        }

        // Min slider changes
        minSlider.addEventListener('input', function() {
            const minVal = parseInt(this.value);
            const maxVal = parseInt(maxSlider.value);

            if (minVal > maxVal - 1000) {
                this.value = maxVal - 1000;
            }

            minInput.value = this.value;
            updateSliderRange();
        });

        // Max slider changes
        maxSlider.addEventListener('input', function() {
            const minVal = parseInt(minSlider.value);
            const maxVal = parseInt(this.value);

            if (maxVal < minVal + 1000) {
                this.value = minVal + 1000;
            }

            maxInput.value = this.value;
            updateSliderRange();
        });

        // Min input changes
        minInput.addEventListener('input', function() {
            const minVal = parseInt(this.value) || 0;
            const maxVal = parseInt(maxInput.value) || maxPrice;

            if (minVal > maxVal) {
                this.value = maxVal;
            }

            minSlider.value = this.value;
            updateSliderRange();
        });

        // Max input changes
        maxInput.addEventListener('input', function() {
            const minVal = parseInt(minInput.value) || 0;
            const maxVal = parseInt(this.value) || maxPrice;

            if (maxVal < minVal) {
                this.value = minVal;
            }

            maxSlider.value = this.value;
            updateSliderRange();
        });

        // Filter on change
        minInput.addEventListener('change', filterComponents);
        maxInput.addEventListener('change', filterComponents);
        minSlider.addEventListener('change', filterComponents);
        maxSlider.addEventListener('change', filterComponents);

        // Initialize
        updateSliderRange();
    }

    // Initialize price range on page load
    initializePriceRange();

