// Internationalization Module - SIMPLIFIED VERSION
class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('lang') || 'ru';
        this.translations = window.__TRANSLATIONS__ || {};
        this.observers = [];
    }

    async init() {
        // If translations already loaded from inline script, use them
        if (window.__TRANSLATIONS__ && Object.keys(window.__TRANSLATIONS__).length > 0) {
            this.translations = window.__TRANSLATIONS__;
            this.updatePage();
            return;
        }
        
        // Otherwise load them
        await this.loadTranslations(this.currentLang);
        this.updatePage();
    }

    async loadTranslations(lang) {
        try {
            // Determine base path
            const basePath = window.location.pathname.includes('/Zoobastiks/') ? '/Zoobastiks' : '';
            
            // Try paths in order
            const paths = [
                `${basePath}/data/locales/${lang}.json`,
                `./data/locales/${lang}.json`,
                `data/locales/${lang}.json`,
                `/data/locales/${lang}.json`
            ];
            
            let response = null;
            for (const path of paths) {
                try {
                    response = await fetch(path);
                    if (response && response.ok) {
                        this.translations = await response.json();
                        window.__TRANSLATIONS__ = this.translations; // Cache
                        this.currentLang = lang;
                        localStorage.setItem('lang', lang);
                        this.notifyObservers();
                        return;
                    }
                } catch (e) {
                    continue;
                }
            }
            
            throw new Error('Failed to load translations from all paths');
        } catch (error) {
            console.error(`Failed to load translations for ${lang}:`, error);
            // Fallback to Russian
            if (lang !== 'ru') {
                await this.loadTranslations('ru');
            } else {
                // Last resort - use empty object
                this.translations = {};
                console.error('Failed to load any translations');
            }
        }
    }

    async setLanguage(lang) {
        if (lang === this.currentLang && this.translations && Object.keys(this.translations).length > 0) return;
        await this.loadTranslations(lang);
        this.updatePage();
        // Reload current page to apply translations
        if (window.router) {
            await window.router.navigate(window.location.pathname, false);
        }
    }

    t(key, params = {}) {
        if (!this.translations || Object.keys(this.translations).length === 0) {
            return key;
        }
        
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }
        
        if (typeof value === 'string' && Object.keys(params).length > 0) {
            return value.replace(/\{(\w+)\}/g, (match, param) => {
                return params[param] !== undefined ? params[param] : match;
            });
        }
        
        return value || key;
    }

    updatePage() {
        document.title = this.t('meta.title') || 'Zoobastiks - Minecraft Сервер';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = this.t('meta.description') || metaDescription.content;
        }

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
