// Administration Page
import { i18n } from '../i18n.js';

export async function render() {
    const serverInfo = window.app?.getServerInfo();
    const admins = serverInfo?.administration || [];

    const owners = admins.filter(a => a.rank.includes('Владелец'));
    const administrators = admins.filter(a => a.rank.includes('Администрация'));

    return `
        <div class="admin-page">
            <div class="container">
                <h1 class="heading-1 text-center">${i18n.t('admin.title')}</h1>

                <section class="section">
                    <h2 class="heading-2 text-center">${i18n.t('admin.owners')}</h2>
                    <div class="grid grid-2 mt-2">
                        ${owners.map(owner => `
                            <div class="card observe-fade">
                                <div class="card-header">
                                    <h3 class="card-title">${owner.nickname}</h3>
                                    <span class="badge">${owner.rank}</span>
                                </div>
                                <div class="card-body">
                                    <p><strong>Имя:</strong> ${owner.name}</p>
                                    <p><strong>Telegram:</strong> <a href="https://t.me/${owner.telegram.replace('@', '')}" target="_blank">${owner.telegram}</a></p>
                                    <a href="https://t.me/${owner.telegram.replace('@', '')}" class="btn btn-secondary mt-1" target="_blank">${i18n.t('admin.contact')}</a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <section class="section">
                    <h2 class="heading-2 text-center">${i18n.t('admin.admins')}</h2>
                    <div class="grid grid-3 mt-2">
                        ${administrators.map(admin => `
                            <div class="card observe-fade">
                                <div class="card-header">
                                    <h3 class="card-title">${admin.nickname}</h3>
                                    <span class="badge">${admin.rank}</span>
                                </div>
                                <div class="card-body">
                                    <p><strong>Имя:</strong> ${admin.name}</p>
                                    <p><strong>Telegram:</strong> <a href="https://t.me/${admin.telegram.replace('@', '')}" target="_blank">${admin.telegram}</a></p>
                                    <a href="https://t.me/${admin.telegram.replace('@', '')}" class="btn btn-secondary mt-1" target="_blank">${i18n.t('admin.contact')}</a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </div>
        </div>
    `;
}

export async function init() {
    // Initialize any admin page specific functionality
}

