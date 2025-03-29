// Gallery loading functionality
async function loadGallery() {
    try {
        const response = await fetch('/data/gallery.json');
        const data = await response.json();
        
        const galleryContainer = document.getElementById('gallery-container');
        if (!galleryContainer) return; // Only run on portfolio page
        
        data.items.forEach(item => {
            if (!item.sector) return; // Skip empty items
            
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            if (item.exited) {
                galleryItem.classList.add('exited');
            }
            
            galleryItem.innerHTML = `
                ${item.exited ? '<div class="exited-label">EXITED</div>' : ''}
                <img src="${item.iconUrl}" alt="${item.sector}" class="gallery-item-icon">
                <hr class="gallery-item-divider">
                <div class="gallery-item-info">
                    <p class="sector">${item.sector}</p>
                    <p class="partners">Partner(s): ${item.partners}</p>
                </div>
                <div class="gallery-item-overlay">
                    <p class="description">${item.description}</p>
                    <p class="stage">First Invested: <i>${item.stage}</i></p>
                    <a href="${item.link}" class="learn-more" target="_blank" rel="noopener noreferrer">Learn More</a>
                </div>
            `;
            
            galleryContainer.appendChild(galleryItem);
        });
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

// Menu functionality
function setupMenu() {
    const menuButton = document.querySelector('.menu-button');
    const navPanel = document.querySelector('.nav-panel');
    const overlay = document.querySelector('.nav-overlay');

    function toggleMenu() {
        const isOpen = navPanel.classList.contains('open');
        navPanel.classList.toggle('open');
        overlay.classList.toggle('open');
        menuButton.classList.toggle('open');
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
        menuButton.setAttribute('aria-expanded', !isOpen);
    }

    menuButton.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    setupMenu();
});