import { alternarModalAlerta } from './utils.js';

window.addEventListener('load', () => {
    const mensagemRedirecionamento = localStorage.getItem('mensagem-redirecionamento');

    if (!mensagemRedirecionamento) {
        console.warn('Aviso: A mensagem de redirecionamento não foi definida. Isso pode indicar um erro.');
        return;
    }

    alternarModalAlerta(true, mensagemRedirecionamento);
    localStorage.removeItem('mensagem-redirecionamento');
});