// Wiki Page
import { i18n } from '../i18n.js';

export async function render() {
    return `
        <div class="wiki-page">
            <div class="container">
                <h1 class="heading-1 text-center">${i18n.t('wiki.title')}</h1>
                
                <div class="wiki-search mt-2">
                    <input type="text" class="input" id="wiki-search" placeholder="${i18n.t('wiki.search')}">
                </div>

                <div class="wiki-categories grid grid-3 mt-3">
                    <div class="card observe-fade">
                        <div class="card-header">
                            <h3 class="card-title">${i18n.t('wiki.categories.getting-started')}</h3>
                        </div>
                        <div class="card-body">
                            <p>Начните играть на сервере. Узнайте основные команды и механики.</p>
                            <a href="#" class="btn btn-secondary mt-1">Читать</a>
                        </div>
                    </div>

                    <div class="card observe-fade">
                        <div class="card-header">
                            <h3 class="card-title">${i18n.t('wiki.categories.clans')}</h3>
                        </div>
                        <div class="card-body">
                            <p>Создание кланов, управление участниками, клановые войны.</p>
                            <a href="#" class="btn btn-secondary mt-1">Читать</a>
                        </div>
                    </div>

                    <div class="card observe-fade">
                        <div class="card-header">
                            <h3 class="card-title">${i18n.t('wiki.categories.jobs')}</h3>
                        </div>
                        <div class="card-body">
                            <p>Система работ, выполнение заданий, получение наград.</p>
                            <a href="#" class="btn btn-secondary mt-1">Читать</a>
                        </div>
                    </div>

                    <div class="card observe-fade">
                        <div class="card-header">
                            <h3 class="card-title">${i18n.t('wiki.categories.economy')}</h3>
                        </div>
                        <div class="card-body">
                            <p>Экономика сервера, магазины, аукционы, торговля.</p>
                            <a href="#" class="btn btn-secondary mt-1">Читать</a>
                        </div>
                    </div>

                    <div class="card observe-fade">
                        <div class="card-header">
                            <h3 class="card-title">${i18n.t('wiki.categories.commands')}</h3>
                        </div>
                        <div class="card-body">
                            <p>Список всех команд сервера с описаниями.</p>
                            <a href="#" class="btn btn-secondary mt-1">Читать</a>
                        </div>
                    </div>

                    <div class="card observe-fade">
                        <div class="card-header">
                            <h3 class="card-title">${i18n.t('wiki.categories.plugins')}</h3>
                        </div>
                        <div class="card-body">
                            <p>Описание плагинов сервера и их возможностей.</p>
                            <a href="#" class="btn btn-secondary mt-1">Читать</a>
                        </div>
                    </div>

                    <div class="card observe-fade">
                        <div class="card-header">
                            <h3 class="card-title">${i18n.t('wiki.categories.worlds')}</h3>
                        </div>
                        <div class="card-body">
                            <p>Информация о мирах сервера и их особенностях.</p>
                            <a href="#" class="btn btn-secondary mt-1">Читать</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export async function init() {
    const searchInput = document.getElementById('wiki-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            // Search functionality would go here
            console.log('Search:', e.target.value);
        });
    }
}

