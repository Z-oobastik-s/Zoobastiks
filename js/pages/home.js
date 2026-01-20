// Home Page
import { i18n } from '../i18n.js';

export async function render() {
    const serverInfo = window.app?.getServerInfo();
    
    return `
        <div class="home-page">
            <!-- Hero Section -->
            <section class="hero-section section">
                <div class="container">
                    <div class="hero-content text-center observe-fade">
                        <h1 class="heading-1 text-gradient">${i18n.t('home.title')}</h1>
                        <p class="heading-2">${i18n.t('home.subtitle')}</p>
                        <div class="hero-stats mt-3">
                            <div class="stat-card card">
                                <div class="stat-value">${serverInfo?.server?.ip || 'Zoobastiks.20tps.name'}</div>
                                <div class="stat-label">${i18n.t('home.ip')}</div>
                            </div>
                            <div class="stat-card card">
                                <div class="stat-value" id="online-players">-</div>
                                <div class="stat-label">${i18n.t('home.players')}</div>
                            </div>
                        </div>
                        <a href="#" class="btn btn-accent mt-2" id="join-btn">${i18n.t('home.join')}</a>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="features-section section">
                <div class="container">
                    <h2 class="section-title heading-2">${i18n.t('home.features.title')}</h2>
                    <div class="grid grid-3">
                        <div class="card observe-fade stagger-item">
                            <div class="card-header">
                                <h3 class="card-title">${i18n.t('home.features.clans')}</h3>
                            </div>
                            <div class="card-body">
                                <p>Создавайте кланы, объединяйтесь с друзьями, защищайте свои территории и участвуйте в клановых войнах.</p>
                            </div>
                        </div>
                        <div class="card observe-fade stagger-item">
                            <div class="card-header">
                                <h3 class="card-title">${i18n.t('home.features.jobs')}</h3>
                            </div>
                            <div class="card-body">
                                <p>Выполняйте задания, повышайте уровень и получайте награды. До 3 работ одновременно!</p>
                            </div>
                        </div>
                        <div class="card observe-fade stagger-item">
                            <div class="card-header">
                                <h3 class="card-title">${i18n.t('home.features.economy')}</h3>
                            </div>
                            <div class="card-body">
                                <p>Торгуйте, продавайте ресурсы, участвуйте в аукционах и развивайте свою экономику.</p>
                            </div>
                        </div>
                        <div class="card observe-fade stagger-item">
                            <div class="card-header">
                                <h3 class="card-title">${i18n.t('home.features.protection')}</h3>
                            </div>
                            <div class="card-body">
                                <p>Защищайте свои постройки с помощью Protection Stones и WorldGuard регионов.</p>
                            </div>
                        </div>
                        <div class="card observe-fade stagger-item">
                            <div class="card-header">
                                <h3 class="card-title">${i18n.t('home.features.telegram')}</h3>
                            </div>
                            <div class="card-body">
                                <p>Интеграция с Telegram для связи с сервером, получения уведомлений и управления.</p>
                            </div>
                        </div>
                        <div class="card observe-fade stagger-item">
                            <div class="card-header">
                                <h3 class="card-title">${i18n.t('home.features.voice')}</h3>
                            </div>
                            <div class="card-body">
                                <p>Голосовой чат для общения с игроками в реальном времени. Версия 2.6.11.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Worlds Section -->
            <section class="worlds-section section">
                <div class="container">
                    <h2 class="section-title heading-2">Миры сервера</h2>
                    <div class="grid grid-2">
                        ${serverInfo?.worlds?.map(world => `
                            <div class="card observe-fade">
                                <div class="card-header">
                                    <h3 class="card-title">${world.displayName}</h3>
                                </div>
                                <div class="card-body">
                                    <p><strong>Тип:</strong> ${world.type}</p>
                                    <p><strong>Сложность:</strong> ${world.difficulty}</p>
                                    <p><strong>PvP:</strong> ${world.pvp ? 'Включен' : 'Выключен'}</p>
                                </div>
                            </div>
                        `).join('') || ''}
                    </div>
                </div>
            </section>
        </div>
    `;
}

export async function init() {
    // Setup join button
    const joinBtn = document.getElementById('join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const serverInfo = window.app?.getServerInfo();
            const ip = serverInfo?.server?.ip || 'Zoobastiks.20tps.name';
            // Copy IP to clipboard
            navigator.clipboard.writeText(ip).then(() => {
                joinBtn.textContent = 'IP скопирован!';
                setTimeout(() => {
                    joinBtn.textContent = i18n.t('home.join');
                }, 2000);
            });
        });
    }

    // Try to fetch online players (if API available)
    // For now, just show placeholder
    const onlinePlayersEl = document.getElementById('online-players');
    if (onlinePlayersEl) {
        // In future, this could fetch from server API
        onlinePlayersEl.textContent = '?';
    }
}

