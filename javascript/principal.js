// Importações
import { alternaIcones, enviaDados, detectaCliqueSemPropagacao } from "./utilitarios.js";

// Elementos DOM e variáveis
const html = document.documentElement;
const botaoAlternaExibicaoMenuNavegacao = document.querySelector("#botaoAlternaExibicaoMenuNavegacao");
const iconeAlternaExibicaoMenuNavegacao = document.querySelector("#botaoAlternaExibicaoMenuNavegacao i");
const menuNavegacao = document.querySelector("#menuNavegacao");

const botaoAlternaExibicaoListaBotoesAcessibilidade = document.querySelector("#botaoAlternaExibicaoListaBotoesAcessibilidade");

const listaBotoesAcessibilidade = document.querySelector("#listaBotoesAcessibilidade");
const botaoAumentaTamanhoFonte = document.querySelector("#botaoAumentaTamanhoFonte");
const botaoDiminuiTamanhoFonte = document.querySelector("#botaoDiminuiTamanhoFonte");
const botaoRedefineTamanhoFonte = document.querySelector("#botaoRedefineTamanhoFonte");
const areaAnoAtual = document.querySelector("#creditos span");

// Funções

// Função que alterna a exibição do menu de navegação
function alternaExibicaoMenuNavegacao(exibir) {
    alternaAlturaElemento(exibir, menuNavegacao);
    alternaIcones(exibir, iconeAlternaExibicaoMenuNavegacao, "bi-list", "bi-x-lg");
}

// Função que alterna a altura de um elemento
function alternaAlturaElemento(aumentar, elemento) {
    if (!aumentar) {
        elemento.style.removeProperty("height");
        elemento.classList.remove("ativo");
        return;
    }

    elemento.style.height = `${elemento.scrollHeight}px`;
    elemento.classList.add("ativo");
}

// Função que consulta o ano atual vindo do back-end
async function consultaAnoAtual() {
    const { sucesso, dados, mensagem } = await enviaDados("GET", "consulta-ano-atual.php", { acao: "consultar-ano-atual" });

    if (!sucesso) {
        console.error(mensagem);
        return;
    }

    const { anoAtual } = dados;
    areaAnoAtual.textContent = anoAtual;
}

// Função que alterna o tamanho da fonte
function alternaTamanhoFonte(acao) {
    let tamanhoFonte = Number.parseInt(window.getComputedStyle(html).fontSize.replace("px", ""));

    if (acao === "aumentar" && tamanhoFonte < 15) {
        tamanhoFonte++;
    }

    if (acao === "diminuir" && tamanhoFonte > 5) {
        tamanhoFonte--;
    }

    if (acao === "redefinir") {
        html.style.removeProperty("font-size");
        localStorage.removeItem("tamanho-fonte-preferido");
        return;
    }

    tamanhoFonte = `${tamanhoFonte}px`;
    html.style.fontSize = tamanhoFonte;
    localStorage.setItem("tamanho-fonte-preferido", tamanhoFonte);
}

// Eventos

// Dispara a função quando a página é carregada, incluindo quando ela vem do cache do navegador
window.addEventListener("pageshow", function () {
    alternaExibicaoMenuNavegacao(false);
    alternaAlturaElemento(false, listaBotoesAcessibilidade);
    consultaAnoAtual();
});

// Dispara a função quando a janela do navegador é redimensionada
window.addEventListener("resize", function () {
    if (this.innerWidth >= 1200) {
        alternaExibicaoMenuNavegacao(false);
    }
});

// Dispara a função quando o DOM é totalmente carregado
document.addEventListener("DOMContentLoaded", function () {
    html.style.fontSize = localStorage.getItem("tamanho-fonte-preferido");
});

// Dispara a função quando um clique é dado no documento
document.addEventListener("click", function (event) {
    const elementoAlvo = event.target;

    if (elementoAlvo !== menuNavegacao) {
        alternaExibicaoMenuNavegacao(false);
    }

    if (elementoAlvo !== listaBotoesAcessibilidade) {
        alternaAlturaElemento(false, listaBotoesAcessibilidade);
    }
});

// Dispara a função quando um clique é dado no botão que alterna a exibição do menu de navegação
botaoAlternaExibicaoMenuNavegacao.addEventListener("click", function (event) {
    detectaCliqueSemPropagacao(event, function () {
        alternaExibicaoMenuNavegacao(!menuNavegacao.classList.contains("ativo"));
    });
});

// Dispara a função quando um clique é dado no botão que alterna a exibição da lista dos botões de acessibilidade
botaoAlternaExibicaoListaBotoesAcessibilidade.addEventListener("click", function (event) {
    detectaCliqueSemPropagacao(event, function () {
        alternaAlturaElemento(!listaBotoesAcessibilidade.classList.contains("ativo"), listaBotoesAcessibilidade);
    });
});

// Dispara a função quando um clique é dado no botão que aumenta o tamanho da fonte
botaoAumentaTamanhoFonte.addEventListener("click", function () {
    alternaTamanhoFonte("aumentar");
});

// Dispara a função quando um clique é dado no botão que diminui o tamanho da fonte
botaoDiminuiTamanhoFonte.addEventListener("click", function () {
    alternaTamanhoFonte("diminuir");
});

// Dispara a função quando um clique é dado no botão que redefine o tamanho da fonte
botaoRedefineTamanhoFonte.addEventListener("click", function () {
    alternaTamanhoFonte("redefinir");
});