// Gallery Page
import { i18n } from '../i18n.js';

export async function render() {
    return `
        <div class="gallery-page">
            <div class="container">
                <h1 class="heading-1 text-center">${i18n.t('gallery.title')}</h1>
                
                <div class="gallery-filters mt-2 text-center">
                    <button class="btn btn-secondary" data-filter="all">Все</button>
                    <button class="btn btn-secondary" data-filter="builds">Постройки</button>
                    <button class="btn btn-secondary" data-filter="events">События</button>
                    <button class="btn btn-secondary" data-filter="players">Игроки</button>
                </div>

                <div class="gallery-grid grid grid-4 mt-3" id="gallery-grid">
                    <div class="gallery-placeholder text-center observe-fade">
                        <p class="heading-3">${i18n.t('gallery.empty')}</p>
                        <p class="mt-1">Фотографии будут добавлены позже</p>
                        <p class="mt-1 text-muted">Загрузите фотографии в папку <code>assets/gallery/</code></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export async function init() {
    // Lazy load images when implemented
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Setup filters
    const filterButtons = document.querySelectorAll('.gallery-filters button');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            // Filter logic would go here
        });
    });

    // Virtual scrolling for large galleries would be implemented here
}

