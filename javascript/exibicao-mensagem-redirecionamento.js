// Importações
import { mensagemRedirecionamento, alternaExibicaoModalAlerta } from "./utilitarios.js";

// Eventos

// Dispara a função quando a página é carregada, incluindo CSS e arquivos importados
window.addEventListener("load", function () {
    if (!mensagemRedirecionamento) {
        console.warn("Aviso: a mensagem de redirecionamento não foi definida. Isso pode indicar um erro.");
        return;
    }

    alternaExibicaoModalAlerta(true, mensagemRedirecionamento);
    this.localStorage.removeItem("mensagem-redirecionamento");
});