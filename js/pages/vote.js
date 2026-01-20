// Vote Page
import { i18n } from '../i18n.js';

export async function render() {
    const serverInfo = window.app?.getServerInfo();
    const voteSites = serverInfo?.voting?.sites || [];

    return `
        <div class="vote-page">
            <div class="container">
                <h1 class="heading-1 text-center">${i18n.t('vote.title')}</h1>
                <p class="text-center heading-3 mt-1">${i18n.t('vote.description')}</p>

                <div class="vote-sites grid grid-2 mt-3">
                    ${voteSites.map((site, index) => `
                        <div class="card observe-fade stagger-item">
                            <div class="card-header">
                                <h3 class="card-title">${site.name}</h3>
                            </div>
                            <div class="card-body">
                                <p>Голосуйте за сервер и получайте награды!</p>
                                <a href="${site.url}" target="_blank" rel="noopener noreferrer" class="btn btn-accent mt-2">
                                    ${i18n.t('vote.vote')}
                                </a>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="vote-rewards card mt-3 observe-fade">
                    <div class="card-header">
                        <h3 class="card-title">${i18n.t('vote.rewards')}</h3>
                    </div>
                    <div class="card-body">
                        <p>За каждое голосование вы получаете награды на сервере!</p>
                        <ul class="mt-1">
                            <li>Монеты</li>
                            <li>Опыт</li>
                            <li>Редкие предметы</li>
                        </ul>
                        <p class="mt-1 text-muted">Награды выдаются автоматически после голосования.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export async function init() {
    // Vote page initialization
    const voteLinks = document.querySelectorAll('.vote-sites a');
    voteLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Track vote clicks (analytics would go here)
            console.log('Vote clicked:', link.href);
        });
    });
}

