// Core Application Module - SIMPLIFIED
import { i18n } from './i18n.js';
import { router } from './router.js';
import { initEffects } from './effects.js';

class App {
    constructor() {
        this.currentPage = 'home';
        this.serverInfo = null;
    }

    async init() {
        // CRITICAL: Load translations FIRST and wait for them
        await i18n.init();
        
        // Verify translations are loaded
        if (!i18n.translations || Object.keys(i18n.translations).length === 0) {
            console.error('Translations failed to load!');
            // Try one more time
            await i18n.init();
        }
        
        // Load server info
        await this.loadServerInfo();
        
        // Setup language selector BEFORE router init
        this.setupLanguageSelector();
        
        // Initialize router
        router.init();
        
        // Initialize effects
        initEffects();
        
        // Setup navigation
        this.setupNavigation();
        
        // Load initial page
        await router.navigate(window.location.pathname || '/');
    }

    async loadServerInfo() {
        try {
            const basePath = window.location.pathname.includes('/Zoobastiks/') ? '/Zoobastiks' : '';
            const paths = [
                `${basePath}/data/server-info.json`,
                `./data/server-info.json`,
                `data/server-info.json`,
                `/data/server-info.json`
            ];
            
            for (const path of paths) {
                try {
                    const response = await fetch(path);
                    if (response && response.ok) {
                        this.serverInfo = await response.json();
                        return;
                    }
                } catch (e) {
                    continue;
                }
            }
            
            throw new Error('Failed to load server info');
        } catch (error) {
            console.error('Failed to load server info:', error);
            this.serverInfo = {
                server: { ip: 'Zoobastiks.20tps.name', port: 20054 },
                worlds: []
            };
        }
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const navToggle = document.getElementById('nav-toggle');
        const navLinksContainer = document.querySelector('.nav-links');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                router.navigate(`/${page === 'home' ? '' : page}`);
            });
        });

        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navLinksContainer.classList.toggle('active');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
            });
        });
    }

    setupLanguageSelector() {
        const langSelector = document.getElementById('lang-selector');
        if (langSelector) {
            langSelector.value = i18n.currentLang;
            langSelector.addEventListener('change', async (e) => {
                await i18n.setLanguage(e.target.value);
            });
        }
    }

    getServerInfo() {
        return this.serverInfo;
    }
}

// Initialize app
(async () => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.app = new App();
            window.app.init();
        });
    } else {
        window.app = new App();
        await window.app.init();
    }
})();

export default App;
