const botaoAlternanciaMenuNavegacao = document.querySelector('#botaoAlternanciaMenuNavegacao');
const iconeAlternanciaMenuNavegacao = document.querySelector('#iconeAlternanciaMenuNavegacao');
const areaLinksMenuNavegacao = document.querySelector('#areaLinksMenuNavegacao');
const botaoAlternanciaBotoesAcessibilidade = document.querySelector('#botaoAlternanciaBotoesAcessibilidade');
const areaBotoesAcessibilidade = document.querySelector('#areaBotoesAcessibilidade');
const botaoAumentarFonte = document.querySelector('#botaoAumentarFonte');
const botaoDiminuirFonte = document.querySelector('#botaoDiminuirFonte');
const botaoRedefinirFonte = document.querySelector('#botaoRedefinirFonte');
const areaAnoAtual = document.querySelector('#areaAnoAtual');

function detectarCliquePararPropagacao(elemento, callback) {
    elemento.addEventListener('click', function (event) {
        event.stopPropagation();
        callback();
    });
}

function alternarFonte(acao) {
    const html = document.documentElement;
    let tamanhoFonte = Number(window.getComputedStyle(html).fontSize.replace('px', ''));

    if (acao === 'definir') {
        const tamanhoFontePreferido = localStorage.getItem('tamanho-fonte-preferido');

        if (!tamanhoFontePreferido) {
            return;
        }

        html.style.fontSize = tamanhoFontePreferido;
        return;
    }

    if (acao === 'aumentar' && tamanhoFonte < 14.5) {
        tamanhoFonte++;
    }

    if (acao === 'diminuir' && tamanhoFonte > 6.5) {
        tamanhoFonte--;
    }

    if (acao === 'redefinir') {
        html.style.removeProperty('font-size');
        localStorage.removeItem('tamanho-fonte-preferido');
        return;
    }

    tamanhoFonte = `${tamanhoFonte}px`;
    html.style.fontSize = tamanhoFonte;
    localStorage.setItem('tamanho-fonte-preferido', tamanhoFonte);
}

async function consultarAnoAtual() {
    try {
        const resposta = await axiosCustomizado.get('consultar-ano-atual', { params: { acao: 'consultar-ano-atual' } });
        const { dados } = resposta.data;
        const { anoAtual } = dados;
        areaAnoAtual.textContent = anoAtual;
    } catch (error) {
        console.error(`Algo deu errado ao processar sua solicitação. Tente novamente mais tarde. Código de erro: ${error.status}.`);
    }
}

function alternarMenuNavegacao(exibir) {
    alternarAlturaElemento(exibir, areaLinksMenuNavegacao);
    iconeAlternanciaMenuNavegacao.classList.toggle('bi-list', !exibir);
    iconeAlternanciaMenuNavegacao.classList.toggle('bi-x-lg', exibir);
}

function alternarAlturaElemento(expandir, elemento) {
    if (!expandir) {
        elemento.style.removeProperty('height');
        elemento.classList.remove('ativo');
        return;
    }

    elemento.style.height = `${elemento.scrollHeight}px`;
    elemento.classList.add('ativo');
}

detectarCliquePararPropagacao(botaoAlternanciaMenuNavegacao, function () {
    alternarMenuNavegacao(!areaLinksMenuNavegacao.classList.contains('ativo'));
});

detectarCliquePararPropagacao(botaoAlternanciaBotoesAcessibilidade, function () {
    alternarAlturaElemento(!areaBotoesAcessibilidade.classList.contains('ativo'), areaBotoesAcessibilidade);
});

alternarFonte('definir');
consultarAnoAtual();

window.addEventListener('resize', function () {
    if (this.innerWidth >= 1200) {
        alternarMenuNavegacao(false);
    }
});

document.addEventListener('click', function (event) {
    const elementoAlvo = event.target;

    if (elementoAlvo !== areaLinksMenuNavegacao) {
        alternarMenuNavegacao(false);
    }

    if (elementoAlvo !== areaBotoesAcessibilidade) {
        alternarAlturaElemento(false, areaBotoesAcessibilidade);
    }
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