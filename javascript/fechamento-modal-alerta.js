// Importações
import { fundoModalAlerta, mensagemRedirecionamento, alternaExibicaoModalAlerta, detectaTeclaEsc } from "./utilitarios.js";

// Elementos DOM e variáveis globais
const botaoFechaModalAlerta = document.querySelector("#modalAlerta button");

// Eventos

// Dispara a função quando a página é carregada, incluindo quando ela vem do cache do navegador
window.addEventListener("pageshow", function () {
    if (!mensagemRedirecionamento) {
        alternaExibicaoModalAlerta(false);
    }
});

// Dispara a função quando uma tecla é pressionada no documento
document.addEventListener("keydown", (event) => {
    detectaTeclaEsc(event, function () {
        alternaExibicaoModalAlerta(false);
    });
});

// Dispara a função quando um clique é dado no fundo do modal de alerta ou no botão que fecha o modal de alerta
[fundoModalAlerta, botaoFechaModalAlerta].forEach(function (elemento) {
    elemento.addEventListener("click", function () {
        alternaExibicaoModalAlerta(false);
    });
});