import { alternarModalAlerta } from "./utilitarios.js";

window.addEventListener('load', function () {
    const mensagemRedirecionamento = this.localStorage.getItem('mensagem-redirecionamento');

    if (!mensagemRedirecionamento) {
        console.warn('Aviso: A mensagem de redirecionamento não foi definida. Isso pode indicar um erro.');
        return;
    }

    alternarModalAlerta(true, mensagemRedirecionamento);
    this.localStorage.removeItem('mensagem-redirecionamento');
});