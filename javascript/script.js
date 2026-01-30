const html = document.documentElement;
const botaoAlternanciaMenuNavegacao = document.querySelector('#botao-alternancia-menu-navegacao');
const iconeAlternanciaMenuNavegacoao = document.querySelector('#botao-alternancia-menu-navegacao i');
const areaLinksMenuNavegacao = document.querySelector('#area-links-menu-navegacao');
const botaoAlternanciaBotoesAcessibilidade = document.querySelector('#botao-alternancia-botoes-acessibilidade');
const areaBotoesAcessibilidade = document.querySelector('#area-botoes-acessibilidade');
const botaoAumentarFonte = document.querySelector('#botao-aumentar-fonte');
const botaoDiminuirFonte = document.querySelector('#botao-diminuir-fonte');
const botaoRedefinirFonte = document.querySelector('#botao-redefinir-fonte');
const areaAnoAtual = document.querySelector('#area-ano-atual');

function alternarFonte(acao) {
    let tamanhoFonte = Number(window.getComputedStyle(html).fontSize.replace('px', ''));

    if (acao === 'definir') {
        const tamanhoFontePreferido = localStorage.getItem('tamanho-fonte-preferido');

        if (!tamanhoFontePreferido) {
            return;
        }

        html.style.fontSize = tamanhoFontePreferido;
        return;
    }

    if (acao === 'aumentar' && tamanhoFonte < 12) {
        tamanhoFonte++;
    }

    if (acao === 'diminuir' && tamanhoFonte > 8) {
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

function detectarCliquePararPropagacao(elemento, callback) {
    elemento.addEventListener('click', function (event) {
        event.stopPropagation();
        callback();
    });
}

function alternarMenuNavegacao(mostrar) {
    alternarAlturaElemento(mostrar, areaLinksMenuNavegacao);
    iconeAlternanciaMenuNavegacoao.classList.toggle('bi-list', !mostrar);
    iconeAlternanciaMenuNavegacoao.classList.toggle('bi-x-lg', mostrar);
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

async function consultarAnoAtual() {
    try {
        const resposta = await axiosCustomizado.get('consulta-ano-atual.php', { acao: 'consultar-ano-atual' });
        const { anoAtual } = resposta.data;
        areaAnoAtual.textContent = anoAtual;
    } catch (error) {
        const { mensagem = 'Algo deu errado ao concluir sua solicitação. Por favor, tente novamente mais tarde.' } = error.response?.data || {};
        console.error(mensagem);
    }
}

alternarFonte('definir');

detectarCliquePararPropagacao(botaoAlternanciaMenuNavegacao, function () {
    alternarMenuNavegacao(!areaLinksMenuNavegacao.classList.contains('ativo'));
});

detectarCliquePararPropagacao(botaoAlternanciaBotoesAcessibilidade, function () {
    alternarAlturaElemento(!areaBotoesAcessibilidade.classList.contains('ativo'), areaBotoesAcessibilidade);
});

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