// Internationalization Module
class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('lang') || 'ru';
        this.translations = {};
        this.observers = [];
        this.basePath = this.getBasePath();
    }

    getBasePath() {
        // Get base path for GitHub Pages
        const path = window.location.pathname;
        if (path.includes('/Zoobastiks/')) {
            return '/Zoobastiks';
        }
        return '';
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        this.updatePage();
    }

    async loadTranslations(lang) {
        try {
            // Try multiple paths for GitHub Pages compatibility
            const paths = [
                `${this.basePath}/data/locales/${lang}.json`,
                `data/locales/${lang}.json`,
                `/data/locales/${lang}.json`
            ];
            
            let response = null;
            for (const path of paths) {
                try {
                    response = await fetch(path);
                    if (response.ok) break;
                } catch (e) {
                    continue;
                }
            }
            
            if (!response || !response.ok) {
                throw new Error(`HTTP ${response?.status || 'Network error'}`);
            }
            
            this.translations = await response.json();
            this.currentLang = lang;
            localStorage.setItem('lang', lang);
            this.notifyObservers();
        } catch (error) {
            console.error(`Failed to load translations for ${lang}:`, error);
            // Fallback to Russian
            if (lang !== 'ru') {
                await this.loadTranslations('ru');
            } else {
                // If Russian also fails, use empty translations
                this.translations = {};
                console.error('Failed to load any translations');
            }
        }
    }

    async setLanguage(lang) {
        if (lang === this.currentLang) return;
        await this.loadTranslations(lang);
        this.updatePage();
        // Reload current page to apply translations
        if (window.router) {
            await window.router.navigate(window.location.pathname, false);
        }
    }

    t(key, params = {}) {
        // If translations not loaded, return key
        if (!this.translations || Object.keys(this.translations).length === 0) {
            console.warn(`Translations not loaded yet, returning key: ${key}`);
            return key;
        }
        
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation not found for key: ${key}`);
                return key; // Return key if translation not found
            }
        }
        
        // Replace parameters
        if (typeof value === 'string' && Object.keys(params).length > 0) {
            return value.replace(/\{(\w+)\}/g, (match, param) => {
                return params[param] !== undefined ? params[param] : match;
            });
        }
        
        return value || key;
    }
    
    isReady() {
        return this.translations && Object.keys(this.translations).length > 0;
    }

    updatePage() {
        // Update meta tags
        document.title = this.t('meta.title');
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = this.t('meta.description');
        }
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.content = this.t('meta.keywords');
        }

        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const page = link.dataset.page;
            if (page) {
                const text = this.t(`nav.${page}`);
                if (text && !text.startsWith('nav.')) {
                    link.textContent = text;
                }
            }
        });

        // Update footer
        const footerLinks = document.querySelectorAll('.footer-section a');
        // Footer links are usually external, so we don't translate them
    }

    subscribe(callback) {
        this.observers.push(callback);
    }

    unsubscribe(callback) {
        this.observers = this.observers.filter(obs => obs !== callback);
    }

    notifyObservers() {
        this.observers.forEach(callback => callback(this.currentLang));
    }
}

export const i18n = new I18n();

