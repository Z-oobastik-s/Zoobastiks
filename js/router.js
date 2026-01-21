// Router Module - SIMPLIFIED
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
    }

    init() {
        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname, false);
        });
        // Don't navigate here - let core.js do it after translations are loaded
    }

    async navigate(path, pushState = true) {
        if (path === '/' || path === '') {
            path = '/';
        } else if (!path.startsWith('/')) {
            path = '/' + path;
        }

        const pageName = this.routes[path] || 'home';
        
        if (pushState) {
            window.history.pushState({ page: pageName }, '', path);
        }

        this.updateActiveNavLink(pageName);
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

        mainContent.classList.add('loading');
        mainContent.innerHTML = '<div class="spinner"></div>';

        try {
            // Ensure translations are loaded
            if (!i18n.translations || Object.keys(i18n.translations).length === 0) {
                await i18n.init();
            }
            
            // Load page module
            const pageModule = await import(`./pages/${pageName}.js`);
            const pageContent = await pageModule.render();
            
            mainContent.classList.remove('loading');
            mainContent.classList.add('page-transition');
            mainContent.innerHTML = pageContent;
            
            if (pageModule.init) {
                await pageModule.init();
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });

            setTimeout(() => {
                mainContent.classList.remove('page-transition');
            }, 300);
        } catch (error) {
            console.error(`Failed to load page ${pageName}:`, error);
            mainContent.innerHTML = `
                <div class="container text-center">
                    <h1 class="heading-1">Ошибка загрузки</h1>
                    <p>${error.message}</p>
                    <a href="/" class="btn mt-2">На главную</a>
                </div>
            `;
        }
    }
}

export const router = new Router();
window.router = router;
