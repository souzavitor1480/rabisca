import { alternarIcones, enviarDados, detectarCliqueSemPropagacao } from './utilitarios.js';

const html = document.documentElement;
const botaoAlternarBarraNavegacao = document.querySelector('#botao-alternar-barra-navegacao');
const iconeAlternarBarraNavegacao = document.querySelector('#icone-alternar-barra-navegacao');
const barraNavegacao = document.querySelector('#barra-navegacao');
const botaoAlternarContainerBotoesAcessibilidade = document.querySelector('#botao-alternar-container-botoes-acessibilidade');
const containerBotoesAcessibilidade = document.querySelector('#container-botoes-acessibilidade');
const botaoAumentarFonte = document.querySelector('#botao-aumentar-fonte');
const botaoDiminuirFonte = document.querySelector('#botao-diminuir-fonte');
const botaoRedefinirFonte = document.querySelector('#botao-redefinir-fonte');
const containerAnoAtual = document.querySelector('#container-ano-atual');

function alternarBarraNavegacao(exibir) {
    alternarAlturaElemento(exibir, barraNavegacao);
    alternarIcones(exibir, iconeAlternarBarraNavegacao, 'bi-list', 'bi-x-lg');
}

function alternarAlturaElemento(aumentar, elemento) {
    if (!aumentar) {
        elemento.style.removeProperty('height');
        elemento.classList.remove('ativo');
        return;
    }

    elemento.style.height = `${elemento.scrollHeight}px`;
    elemento.classList.add('ativo');
}

function carregarTamanhoFontePreferido() {
    const tamanhoFontePreferido = localStorage.getItem('tamanho-fonte-preferido');

    if (tamanhoFontePreferido) {
        html.style.fontSize = tamanhoFontePreferido;
    }
}

async function consultarAnoAtual() {
    const { sucesso, dados, mensagem } = await enviarDados('GET', 'consulta-ano-atua.php', { acao: 'consultar-ano-atual' });

    if (!sucesso) {
        console.error(mensagem);
        return;
    }

    const { anoAtual } = dados;
    containerAnoAtual.textContent = anoAtual;
}

function alternarFonte(acao) {
    let tamanhoFonte = Number(window.getComputedStyle(html).fontSize.replace('px', '')) * 100 / 16;

    if (acao === 'aumentar' && tamanhoFonte < 72.5) {
        tamanhoFonte++;
    }

    if (acao === 'diminuir' && tamanhoFonte > 52.5) {
        tamanhoFonte--;
    }

    if (acao === 'redefinir') {
        html.style.removeProperty('font-size');
        localStorage.removeItem('tamanho-fonte-preferido');
        return;
    }

    tamanhoFonte = `${tamanhoFonte}%`;
    html.style.fontSize = tamanhoFonte;
    localStorage.setItem('tamanho-fonte-preferido', tamanhoFonte);
}

window.addEventListener('resize', function () {
    if (this.innerWidth >= 1200) {
        alternarBarraNavegacao(false);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    carregarTamanhoFontePreferido();
    consultarAnoAtual();
});

document.addEventListener('click', function (event) {
    const elementoAlvo = event.target;

    if (elementoAlvo !== barraNavegacao) {
        alternarBarraNavegacao(false);
    }

    if (elementoAlvo !== containerBotoesAcessibilidade) {
        alternarAlturaElemento(false, containerBotoesAcessibilidade);
    }
});

botaoAlternarBarraNavegacao.addEventListener('click', function (event) {
    detectarCliqueSemPropagacao(event, function () {
        alternarBarraNavegacao(!barraNavegacao.classList.contains('ativo'));
    });
});

botaoAlternarContainerBotoesAcessibilidade.addEventListener('click', function (event) {
    detectarCliqueSemPropagacao(event, function () {
        alternarAlturaElemento(!containerBotoesAcessibilidade.classList.contains('ativo'), containerBotoesAcessibilidade);
    });
});

botaoAumentarFonte.addEventListener('click', function () {
    alternarFonte('aumentar');
});

botaoDiminuirFonte.addEventListener('click', function () {
    alternarFonte('diminuir');
});

botaoRedefinirFonte.addEventListener('click', function () {
    alternarFonte('redefinir');
});