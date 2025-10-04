// PixelWerx Website JavaScript

// Global Variables
let panelData = [];
let currentConfig = {
    width: 3,
    height: 2,
    preferredBatch: '',
    panels: []
};

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadPanelData();
    initializeConfigurator();
    initializeContactForm();
    showLoadingState();
});

// Navigation Functions
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
        });
    });
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.classList.add('fade-in');
    }
}

// Data Loading and Processing
async function loadPanelData() {
    try {
        // Simulate loading panel data from CSV
        // In a real implementation, you would fetch this from the server
        panelData = await simulatePanelDataLoad();
        
        updateDashboardStats();
        populateBatchOverview();
        populatePanelInventory();
        populateFilterOptions();
        hideLoadingState();
        
    } catch (error) {
        console.error('Error loading panel data:', error);
        showError('Failed to load panel data');
    }
}

function simulatePanelDataLoad() {
    return new Promise((resolve) => {
        // Simulated panel data based on the CSV structure
        const data = [
            // Batch 1 - Brown
            ...Array.from({length: 6}, (_, i) => ({
                panelNo: i + 1,
                batchIndex: i + 1,
                boxId: 'P.391-011-01',
                batch: 1,
                batchColor: 'Brown',
                panelId: `P.391-011-01.${i + 1}`,
                panelsPerBatch: 6
            })),
            // Batch 2 - Red (12 panels)
            ...Array.from({length: 12}, (_, i) => ({
                panelNo: i + 7,
                batchIndex: i + 1,
                boxId: i < 6 ? 'P.391-021-02' : 'P.391-022-03',
                batch: 2,
                batchColor: 'Red',
                panelId: i < 6 ? `P.391-021-02.${i + 1}` : `P.391-022-03.${i - 5}`,
                panelsPerBatch: 12
            })),
            // Batch 3 - Orange (18 panels)
            ...Array.from({length: 18}, (_, i) => ({
                panelNo: i + 19,
                batchIndex: i + 1,
                boxId: 'P.391-031-04',
                batch: 3,
                batchColor: 'Orange',
                panelId: `P.391-031-04.${i + 1}`,
                panelsPerBatch: 18
            }))
        ];
        
        setTimeout(() => resolve(data), 500);
    });
}

// Dashboard Functions
function updateDashboardStats() {
    const totalPanels = panelData.length;
    const totalBatches = [...new Set(panelData.map(p => p.batch))].length;
    const colorVariants = [...new Set(panelData.map(p => p.batchColor))].length;
    
    document.getElementById('total-panels').textContent = totalPanels;
    document.getElementById('total-batches').textContent = totalBatches;
    document.getElementById('color-variants').textContent = colorVariants;
}

function populateBatchOverview() {
    const batchContainer = document.getElementById('batch-cards');
    const batches = groupPanelsByBatch();
    
    batchContainer.innerHTML = '';
    
    Object.keys(batches).forEach(batchKey => {
        const batch = batches[batchKey];
        const batchCard = createBatchCard(batch);
        batchContainer.appendChild(batchCard);
    });
}

function groupPanelsByBatch() {
    const batches = {};
    
    panelData.forEach(panel => {
        const key = `${panel.batch}-${panel.batchColor}`;
        if (!batches[key]) {
            batches[key] = {
                batch: panel.batch,
                color: panel.batchColor,
                panels: [],
                boxIds: new Set()
            };
        }
        batches[key].panels.push(panel);
        batches[key].boxIds.add(panel.boxId);
    });
    
    return batches;
}

function createBatchCard(batch) {
    const card = document.createElement('div');
    card.className = 'batch-card fade-in';
    
    const colorClass = batch.color.toLowerCase();
    
    card.innerHTML = `
        <div class="batch-header ${colorClass}">
            <h3>Batch ${batch.batch}</h3>
            <p>${batch.color} Series</p>
        </div>
        <div class="batch-content">
            <p>High-quality video wall panels optimized for professional installations.</p>
            <div class="batch-stats">
                <div class="batch-stat">
                    <h4>${batch.panels.length}</h4>
                    <p>Total Panels</p>
                </div>
                <div class="batch-stat">
                    <h4>${batch.boxIds.size}</h4>
                    <p>Box IDs</p>
                </div>
                <div class="batch-stat">
                    <h4>Active</h4>
                    <p>Status</p>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Panel Inventory Functions
function populatePanelInventory() {
    const panelsGrid = document.getElementById('panels-grid');
    panelsGrid.innerHTML = '';
    
    panelData.forEach(panel => {
        const panelCard = createPanelCard(panel);
        panelsGrid.appendChild(panelCard);
    });
}

function createPanelCard(panel) {
    const card = document.createElement('div');
    card.className = 'panel-card fade-in';
    card.dataset.batch = panel.batch;
    card.dataset.color = panel.batchColor.toLowerCase();
    
    const colorClass = panel.batchColor.toLowerCase();
    
    card.innerHTML = `
        <div class="panel-header ${colorClass}">
            <h3>${panel.panelId}</h3>
            <p>Panel #${panel.panelNo}</p>
        </div>
        <div class="panel-content">
            <div class="panel-info">
                <h4>Panel Details</h4>
                <span class="status-badge">Active</span>
            </div>
            <div class="panel-detail">
                <strong>Batch:</strong>
                <span>${panel.batch} (${panel.batchColor})</span>
            </div>
            <div class="panel-detail">
                <strong>Box ID:</strong>
                <span>${panel.boxId}</span>
            </div>
            <div class="panel-detail">
                <strong>Batch Index:</strong>
                <span>${panel.batchIndex}</span>
            </div>
            <div class="panel-detail">
                <strong>Resolution:</strong>
                <span>1920×1080</span>
            </div>
            <div class="panel-detail">
                <strong>Size:</strong>
                <span>55" Diagonal</span>
            </div>
        </div>
    `;
    
    return card;
}

function populateFilterOptions() {
    const batchFilter = document.getElementById('batch-filter');
    const colorFilter = document.getElementById('color-filter');
    const preferredBatchSelect = document.getElementById('preferred-batch');
    
    // Get unique values
    const uniqueBatches = [...new Set(panelData.map(p => p.batch))];
    const uniqueColors = [...new Set(panelData.map(p => p.batchColor))];
    
    // Populate batch filter
    uniqueBatches.forEach(batch => {
        const option = document.createElement('option');
        option.value = batch;
        option.textContent = `Batch ${batch}`;
        batchFilter.appendChild(option);
        
        // Also populate configurator batch select
        const configOption = option.cloneNode(true);
        preferredBatchSelect.appendChild(configOption);
    });
    
    // Populate color filter
    uniqueColors.forEach(color => {
        const option = document.createElement('option');
        option.value = color.toLowerCase();
        option.textContent = color;
        colorFilter.appendChild(option);
    });
    
    // Add filter event listeners
    batchFilter.addEventListener('change', filterPanels);
    colorFilter.addEventListener('change', filterPanels);
    document.getElementById('search-input').addEventListener('input', filterPanels);
}

function filterPanels() {
    const batchFilter = document.getElementById('batch-filter').value;
    const colorFilter = document.getElementById('color-filter').value;
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    
    const panelCards = document.querySelectorAll('.panel-card');
    
    panelCards.forEach(card => {
        const matchesBatch = !batchFilter || card.dataset.batch === batchFilter;
        const matchesColor = !colorFilter || card.dataset.color === colorFilter;
        const matchesSearch = !searchInput || 
            card.textContent.toLowerCase().includes(searchInput);
        
        if (matchesBatch && matchesColor && matchesSearch) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

// Configurator Functions
function initializeConfigurator() {
    const widthSlider = document.getElementById('wall-width');
    const heightSlider = document.getElementById('wall-height');
    const generateBtn = document.getElementById('generate-config');
    const saveBtn = document.getElementById('save-config');
    const exportBtn = document.getElementById('export-config');
    
    // Slider event listeners
    widthSlider.addEventListener('input', function() {
        document.getElementById('width-value').textContent = this.value;
        currentConfig.width = parseInt(this.value);
        updateConfigDetails();
    });
    
    heightSlider.addEventListener('input', function() {
        document.getElementById('height-value').textContent = this.value;
        currentConfig.height = parseInt(this.value);
        updateConfigDetails();
    });
    
    // Button event listeners
    generateBtn.addEventListener('click', generateWallConfiguration);
    saveBtn.addEventListener('click', saveConfiguration);
    exportBtn.addEventListener('click', exportConfiguration);
    
    // Initialize with default values
    updateConfigDetails();
}

function updateConfigDetails() {
    const panelsRequired = currentConfig.width * currentConfig.height;
    document.getElementById('panels-required').textContent = panelsRequired;
    
    // Estimate installation time based on panel count
    const baseTime = 1;
    const timePerPanel = 0.25;
    const estimatedHours = baseTime + (panelsRequired * timePerPanel);
    const timeRange = `${Math.floor(estimatedHours)}-${Math.ceil(estimatedHours + 1)} hours`;
    document.getElementById('install-time').textContent = timeRange;
}

function generateWallConfiguration() {
    const panelsRequired = currentConfig.width * currentConfig.height;
    const preferredBatch = document.getElementById('preferred-batch').value;
    
    // Generate panel assignment
    let availablePanels = [...panelData];
    
    // Filter by preferred batch if specified
    if (preferredBatch) {
        availablePanels = availablePanels.filter(p => p.batch.toString() === preferredBatch);
    }
    
    // Check if enough panels are available
    if (availablePanels.length < panelsRequired) {
        showError(`Not enough panels available. Required: ${panelsRequired}, Available: ${availablePanels.length}`);
        return;
    }
    
    // Assign panels to wall positions
    currentConfig.panels = availablePanels.slice(0, panelsRequired);
    
    // Render wall preview
    renderWallPreview();
    
    showSuccess('Wall configuration generated successfully!');
}

function renderWallPreview() {
    const preview = document.getElementById('wall-preview');
    const wallGrid = document.createElement('div');
    wallGrid.className = 'wall-grid fade-in';
    wallGrid.style.gridTemplateColumns = `repeat(${currentConfig.width}, 1fr)`;
    
    currentConfig.panels.forEach((panel, index) => {
        const panelElement = document.createElement('div');
        panelElement.className = `wall-panel ${panel.batchColor.toLowerCase()}`;
        panelElement.style.backgroundColor = getBatchColor(panel.batchColor);
        panelElement.textContent = panel.panelNo;
        panelElement.title = `Panel ${panel.panelId} - Batch ${panel.batch}`;
        
        wallGrid.appendChild(panelElement);
    });
    
    preview.innerHTML = '';
    preview.appendChild(wallGrid);
}

function getBatchColor(colorName) {
    const colors = {
        'Brown': '#8b4513',
        'Red': '#dc2626',
        'Orange': '#ea580c'
    };
    return colors[colorName] || '#6b7280';
}

function saveConfiguration() {
    if (currentConfig.panels.length === 0) {
        showError('Please generate a configuration first');
        return;
    }
    
    // In a real application, this would save to a database
    const configData = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        dimensions: {
            width: currentConfig.width,
            height: currentConfig.height
        },
        panels: currentConfig.panels,
        totalPanels: currentConfig.panels.length
    };
    
    // Save to localStorage for demo purposes
    const savedConfigs = JSON.parse(localStorage.getItem('pixelwerx-configs') || '[]');
    savedConfigs.push(configData);
    localStorage.setItem('pixelwerx-configs', JSON.stringify(savedConfigs));
    
    showSuccess('Configuration saved successfully!');
}

function exportConfiguration() {
    if (currentConfig.panels.length === 0) {
        showError('Please generate a configuration first');
        return;
    }
    
    const exportData = {
        projectName: 'PixelWerx Video Wall Configuration',
        generatedOn: new Date().toISOString(),
        dimensions: {
            width: currentConfig.width,
            height: currentConfig.height,
            totalPanels: currentConfig.panels.length
        },
        panelDetails: currentConfig.panels.map(panel => ({
            panelId: panel.panelId,
            batch: panel.batch,
            batchColor: panel.batchColor,
            boxId: panel.boxId
        })),
        installationNotes: [
            'Ensure proper electrical connections for each panel',
            'Test each panel before final installation',
            'Maintain proper ventilation around panels',
            'Use recommended mounting hardware'
        ]
    };
    
    // Create and download JSON file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixelwerx-config-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccess('Configuration exported successfully!');
}

// Contact Form Functions
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = {
            name: formData.get('name') || document.getElementById('name').value,
            email: formData.get('email') || document.getElementById('email').value,
            projectType: formData.get('project-type') || document.getElementById('project-type').value,
            message: formData.get('message') || document.getElementById('message').value
        };
        
        // Validate form data
        if (!data.name || !data.email || !data.message) {
            showError('Please fill in all required fields');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        submitContactForm(data);
    });
}

function submitContactForm(data) {
    // Show loading state
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // In a real application, this would send data to a server
        console.log('Contact form submitted:', data);
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        showSuccess('Message sent successfully! We\'ll get back to you soon.');
    }, 2000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility Functions
function showLoadingState() {
    const loadingElements = document.querySelectorAll('.stat-card, .batch-card, .panel-card');
    loadingElements.forEach(el => el.classList.add('loading'));
}

function hideLoadingState() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => el.classList.remove('loading'));
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
    
    // Arrow keys for section navigation
    if (e.ctrlKey) {
        const currentIndex = Array.from(sections).findIndex(s => s.classList.contains('active'));
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            const prevSection = sections[currentIndex - 1];
            const prevLink = document.querySelector(`[href="#${prevSection.id}"]`);
            if (prevLink) prevLink.click();
        } else if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            const nextSection = sections[currentIndex + 1];
            const nextLink = document.querySelector(`[href="#${nextSection.id}"]`);
            if (nextLink) nextLink.click();
        }
    }
});

// Performance Optimization
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

// Debounce the filter function for better performance
const debouncedFilterPanels = debounce(filterPanels, 300);

// Update search input to use debounced function
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debouncedFilterPanels);
    }
});

// Export functions for potential external use
window.PixelWerx = {
    showSection,
    generateWallConfiguration,
    saveConfiguration,
    exportConfiguration,
    showNotification
};
