// Core Application Module
import { i18n } from './i18n.js';
import { router } from './router.js';
import { initEffects } from './effects.js';

class App {
    constructor() {
        this.currentPage = 'home';
        this.serverInfo = null;
        this.init();
    }

    async init() {
        // Initialize i18n FIRST (before anything else that needs translations)
        await i18n.init();
        
        // Load server info
        await this.loadServerInfo();
        
        // Initialize router
        router.init();
        
        // Initialize effects
        initEffects();
        
        // Setup navigation
        this.setupNavigation();
        
        // Setup language selector
        this.setupLanguageSelector();
        
        // Load initial page (after translations are loaded)
        await router.navigate(window.location.pathname || '/');
    }

    async loadServerInfo() {
        try {
            // Try relative path first (for GitHub Pages)
            let response = await fetch('data/server-info.json');
            if (!response.ok) {
                // Fallback to absolute path
                response = await fetch('/data/server-info.json');
            }
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            this.serverInfo = await response.json();
        } catch (error) {
            console.error('Failed to load server info:', error);
            // Use default server info
            this.serverInfo = {
                server: {
                    ip: 'Zoobastiks.20tps.name',
                    port: 20054
                },
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

        // Close mobile menu on link click
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
            langSelector.addEventListener('change', (e) => {
                i18n.setLanguage(e.target.value);
            });
        }
    }

    getServerInfo() {
        return this.serverInfo;
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new App();
    });
} else {
    window.app = new App();
}

export default App;

