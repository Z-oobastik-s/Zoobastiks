// Internationalization Module
class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('lang') || 'ru';
        this.translations = {};
        this.observers = [];
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        this.updatePage();
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`/data/locales/${lang}.json`);
            this.translations = await response.json();
            this.currentLang = lang;
            localStorage.setItem('lang', lang);
            this.notifyObservers();
        } catch (error) {
            console.error(`Failed to load translations for ${lang}:`, error);
            // Fallback to Russian
            if (lang !== 'ru') {
                await this.loadTranslations('ru');
            }
        }
    }

    async setLanguage(lang) {
        if (lang === this.currentLang) return;
        await this.loadTranslations(lang);
        this.updatePage();
    }

    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
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

