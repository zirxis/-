// DOM elements
const searchInput = document.getElementById('searchInput');
const unitFilter = document.getElementById('unitFilter');
const unitCards = document.querySelectorAll('.unit-card');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupImageClickHandlers();
});

// Setup image click handlers for lightbox effect
function setupImageClickHandlers() {
    const images = document.querySelectorAll('.summary-image');
    images.forEach(img => {
        img.addEventListener('click', function() {
            if (this.src && this.src !== '') {
                openLightbox(this.src, this.alt);
            }
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', function() {
        filterUnits();
    });
    
    // Filter functionality
    unitFilter.addEventListener('change', function() {
        filterUnits();
    });
}

// Filter units based on search and filter
function filterUnits() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedUnit = unitFilter.value;
    
    unitCards.forEach((card, index) => {
        const unitId = (index + 1).toString();
        const title = card.querySelector('.unit-title').textContent.toLowerCase();
        const subject = card.querySelector('.unit-subject').textContent.toLowerCase();
        
        let showCard = true;
        
        // Filter by selected unit
        if (selectedUnit !== 'all' && selectedUnit !== unitId) {
            showCard = false;
        }
        
        // Filter by search term
        if (searchTerm && !title.includes(searchTerm) && !subject.includes(searchTerm)) {
            showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Lightbox functionality
function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${alt}" class="lightbox-image">
            <div class="lightbox-caption">${alt}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox on click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.className === 'lightbox-close') {
            document.body.removeChild(lightbox);
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        }
    });
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});