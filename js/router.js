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
            // Load page module
            const pageModule = await import(`./pages/${pageName}.js`);
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
                    <h1 class="heading-1">${i18n.t('common.error')}</h1>
                    <p>${error.message}</p>
                    <a href="/" class="btn mt-2">${i18n.t('common.back')}</a>
                </div>
            `;
        }
    }
}

export const router = new Router();

