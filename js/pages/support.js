// Support Page
import { i18n } from '../i18n.js';

export async function render() {
    return `
        <div class="support-page">
            <div class="container">
                <h1 class="heading-1 text-center">${i18n.t('support.title')}</h1>
                
                <div class="support-content mt-3">
                    <p class="text-center heading-3">${i18n.t('support.description')}</p>
                    
                    <div class="grid grid-2 mt-3">
                        <div class="card observe-fade">
                            <div class="card-header">
                                <h3 class="card-title">${i18n.t('support.telegram')}</h3>
                            </div>
                            <div class="card-body">
                                <p>Присоединяйтесь к нашему Telegram каналу для получения поддержки, новостей и общения с сообществом.</p>
                                <a href="https://t.me/ReZoobastik" target="_blank" class="btn btn-primary mt-2">Открыть Telegram</a>
                            </div>
                        </div>

                        <div class="card observe-fade">
                            <div class="card-header">
                                <h3 class="card-title">${i18n.t('support.discord')}</h3>
                            </div>
                            <div class="card-body">
                                <p>Присоединяйтесь к нашему Discord серверу для голосового общения и обсуждений.</p>
                                <a href="https://discord.com/invite/g462MJEm3H" target="_blank" class="btn btn-primary mt-2">Открыть Discord</a>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-3 observe-fade">
                        <div class="card-header">
                            <h3 class="card-title">Связь с администрацией</h3>
                        </div>
                        <div class="card-body">
                            <p>Для срочных вопросов или проблем, свяжитесь напрямую с администрацией через Telegram:</p>
                            <ul class="mt-1">
                                <li><a href="https://t.me/Zoobastiks" target="_blank">@Zoobastiks</a> - Владелец сервера</li>
                                <li><a href="https://t.me/yajobs" target="_blank">@yajobs</a> - Владелец сервера</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export async function init() {
    // Support page initialization
}

