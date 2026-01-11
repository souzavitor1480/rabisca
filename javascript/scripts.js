import { alternarIcone, enviarDados, detectarCliquePararPropagacao } from './modules/utils.js';

const botaoAlternarMenuNavegacao = document.querySelector('#botaoAlternarMenuNavegacao');
const iconeAlternarMenuNavegacao = document.querySelector('#iconeAlternarMenuNavegacao');
const areaLinksMenuNavegacao = document.querySelector('#areaLinksMenuNavegacao');
const botaoAlternarBotoesAcessibilidade = document.querySelector('#botaoAlternarBotoesAcessibilidade');
const areaBotoesAcessibilidade = document.querySelector('#areaBotoesAcessibilidade');
const botaoAumentarFonte = document.querySelector('#botaoAumentarFonte');
const botaoDiminuirFonte = document.querySelector('#botaoDiminuirFonte');
const botaoRedefinirFonte = document.querySelector('#botaoRedefinirFonte');
const areaAnoAtual = document.querySelector('#areaAnoAtual');

const alternarMenuNavegacao = (exibir) => {
    alternarAlturaElemento(exibir, areaLinksMenuNavegacao);
    alternarIcone(exibir, iconeAlternarMenuNavegacao, 'bi-list', 'bi-x-lg');
};

const alternarAlturaElemento = (expandir, elemento) => {
    if (!expandir) {
        elemento.style.removeProperty('height');
        elemento.classList.remove('ativo');
        return;
    }

    elemento.style.height = `${elemento.scrollHeight}px`;
    elemento.classList.add('ativo');
};

const alternarFonte = (acao) => {
    const html = document.documentElement;
    let tamanhoFonte = Number(window.getComputedStyle(html).fontSize.replace('px', '')) * 100 / 16;

    if (acao === 'definir') {
        const tamanhoFontePreferido = localStorage.getItem('tamanho-fonte-preferido');

        if (!tamanhoFontePreferido) {
            return;
        }

        html.style.fontSize = tamanhoFontePreferido;
        return;
    }

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
};

const consultarAnoAtual = async () => {
    const { sucesso, dados, mensagem } = await enviarDados('GET', 'consultar-ano-atual.php', { acao: 'consultar-ano-atual' });

    if (!sucesso) {
        console.error(mensagem);
        return;
    }

    const { anoAtual } = dados;
    areaAnoAtual.textContent = anoAtual;
};

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1200) {
        alternarMenuNavegacao(false);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    alternarFonte('definir');
    consultarAnoAtual();
});

document.addEventListener('click', (event) => {
    const elementoAlvo = event.target;

    if (elementoAlvo !== areaLinksMenuNavegacao) {
        alternarMenuNavegacao(false);
    }

    if (elementoAlvo !== areaBotoesAcessibilidade) {
        alternarAlturaElemento(false, areaBotoesAcessibilidade);
    }
});

botaoAlternarMenuNavegacao.addEventListener('click', (event) => {
    detectarCliquePararPropagacao(event, () => {
        alternarMenuNavegacao(!areaLinksMenuNavegacao.classList.contains('ativo'));
    });
});

botaoAlternarBotoesAcessibilidade.addEventListener('click', (event) => {
    detectarCliquePararPropagacao(event, () => {
        alternarAlturaElemento(!areaBotoesAcessibilidade.classList.contains('ativo'), areaBotoesAcessibilidade);
    });
});

botaoAumentarFonte.addEventListener('click', () => {
    alternarFonte('aumentar');
});

botaoDiminuirFonte.addEventListener('click', () => {
    alternarFonte('diminuir');
});

botaoRedefinirFonte.addEventListener('click', () => {
    alternarFonte('redefinir');
});