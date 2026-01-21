// Router Module - SPA Navigation
import { i18n } from './i18n.js';

class Router {
    constructor() {
        this.routes = {
            '/': 'home',
            '/wiki': 'wiki',
            '/admin': 'admin',
            '/gallery': 'gallery',
            '/support': 'support',
            '/vote': 'vote'
        };
        this.currentRoute = null;
    }

    init() {
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            this.navigate(window.location.pathname, false);
        });

        // Handle initial load
        this.navigate(window.location.pathname, false);
    }

    async navigate(path, pushState = true) {
        // Normalize path
        if (path === '/' || path === '') {
            path = '/';
        } else if (!path.startsWith('/')) {
            path = '/' + path;
        }

        // Get page name
        const pageName = this.routes[path] || 'home';
        
        // Update URL
        if (pushState) {
            window.history.pushState({ page: pageName }, '', path);
        }

        // Update active nav link
        this.updateActiveNavLink(pageName);

        // Load page
        await this.loadPage(pageName);
    }

    updateActiveNavLink(pageName) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            }
        });
    }

    async loadPage(pageName) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        // Add loading state
        mainContent.classList.add('loading');
        mainContent.innerHTML = '<div class="spinner"></div>';

        try {
            // CRITICAL: Ensure translations are loaded before rendering
            // Wait for translations to be fully loaded (max 5 seconds)
            let attempts = 0;
            const maxAttempts = 50; // 5 seconds max wait
            while (!i18n.isReady() && attempts < maxAttempts) {
                if (!i18n.translations || Object.keys(i18n.translations).length === 0) {
                    await i18n.init();
                }
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (!i18n.isReady()) {
                console.error('Failed to load translations after multiple attempts');
            }
            
            // Load page module
            const pageModule = await import(`./pages/${pageName}.js`);
            
            // Wait for render to complete (it's async)
            const pageContent = await pageModule.render();
            
            // Update content with fade animation
            mainContent.classList.remove('loading');
            mainContent.classList.add('page-transition');
            mainContent.innerHTML = pageContent;
            
            // Initialize page if it has init method
            if (pageModule.init) {
                await pageModule.init();
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Remove animation class after animation completes
            setTimeout(() => {
                mainContent.classList.remove('page-transition');
            }, 300);
        } catch (error) {
            console.error(`Failed to load page ${pageName}:`, error);
            mainContent.innerHTML = `
                <div class="container text-center">
                    <h1 class="heading-1">Ошибка загрузки</h1>
                    <p>${error.message}</p>
                    <a href="${window.location.pathname.includes('/Zoobastiks/') ? '/Zoobastiks/' : '/'}" class="btn mt-2">На главную</a>
                </div>
            `;
        }
    }
}

export const router = new Router();
// Make router available globally for i18n
window.router = router;

