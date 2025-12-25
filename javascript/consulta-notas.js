import { formulario, enviarFormulario, validarCampoObrigatorio, exibirErro, alternarElementos, validarID, detectarTeclaEsc, enviarDados, alternarModalAlerta, redirecionar } from './utilitarios.js';

const campoPesquisa = document.querySelector('#campo-pesquisa');
const containerNotas = document.querySelector('#container-notas');
const template = document.querySelector('#template');
const fundoModalConfirmacao = document.querySelector('#fundo-modal-confirmacao');
const modalConfirmacao = document.querySelector('#modal-confirmacao');
const botaoConfirmar = document.querySelector('#botao-confirmar');
const botaoNegar = document.querySelector('#botao-negar');
let idNotaGlobal = null;

function redirecionarPaginaEdicaoNota(botaoEditarNota) {
    const idNota = botaoEditarNota.dataset.id;
    const tituloNota = botaoEditarNota.closest('.nota').querySelector('.titulo-nota').textContent;
    const textoNota = botaoEditarNota.closest('.nota').querySelector('.texto-nota').textContent;

    if (!validarID(idNota)) {
        return;
    }

    window.location.href = `edicao-nota.html?id=${idNota}&titulo=${tituloNota}&texto=${textoNota}`;
}

function prepararDelecaoNota(botaoDeletarNota) {
    const idNota = botaoDeletarNota.dataset.id;
    idNotaGlobal = idNota;
    alternarElementos(true, [fundoModalConfirmacao, modalConfirmacao]);
}

document.addEventListener('DOMContentLoaded', async function () {
    const { sucesso, dados, mensagem } = await enviarDados('GET', 'consulta-notas.php', { acao: 'consultar-notas' });

    if (!sucesso) {
        redirecionar(mensagem, 'painel.html');
        return;
    }

    const { encerrouSessao } = dados;

    if (encerrouSessao) {
        redirecionar(mensagem, 'index.html');
        return;
    }

    const { notas } = dados;

    if (notas.length === 0) {
        redirecionar(mensagem, 'painel.html');
        return;
    }

    notas.forEach(function (elemento) {
        const { idNota, tituloNota, textoNota } = elemento;
        const cloneTemplate = template.content.cloneNode(true);
        const nota = cloneTemplate.querySelector('.nota');
        const containerTituloNota = nota.querySelector('.titulo-nota');
        const containerTextoNota = nota.querySelector('.texto-nota');
        const botaoEditarNota = nota.querySelector('.botao-editar-nota');
        const botaoDeletarNota = nota.querySelector('.botao-deletar-nota');
        nota.id = idNota;
        containerTituloNota.textContent = tituloNota;
        containerTextoNota.textContent = textoNota;
        botaoEditarNota.dataset.id = idNota;
        botaoDeletarNota.dataset.id = idNota;
        containerNotas.appendChild(nota);
    });
});

document.addEventListener('keydown', function (event) {
    detectarTeclaEsc(event, function () {
        alternarElementos(false, [fundoModalConfirmacao, modalConfirmacao]);
    });
});

document.addEventListener('click', function (event) {
    const elementoAlvo = event.target;

    if (elementoAlvo.classList.contains('botao-editar-nota')) {
        redirecionarPaginaEdicaoNota(elementoAlvo);
    }

    if (elementoAlvo.classList.contains('botao-deletar-nota')) {
        prepararDelecaoNota(elementoAlvo);
    }
});

formulario.addEventListener('submit', function (event) {
    enviarFormulario(event, function () {
        const valorPesquisa = campoPesquisa.value.trim();
        const notas = document.querySelectorAll('.nota');
        let encontrouPesquisa = false;

        if (!validarCampoObrigatorio(campoPesquisa, valorPesquisa, 60)) {
            exibirErro('Erro: A pesquisa é obrigatória e deve conter até 60 caracteres. Por favor, tente novamente.', campoPesquisa);
            return;
        }

        notas.forEach(function (elemento) {
            const textoElemento = elemento.textContent;

            if (textoElemento.toLowerCase().includes(valorPesquisa.toLowerCase())) {
                elemento.classList.add('ativo');
                encontrouPesquisa = true;
            } else {
                elemento.classList.remove('ativo');
            }
        });

        if (!encontrouPesquisa) {
            exibirErro('Não foi possível encontrar sua pesquisa. Por favor, tente novamente.', campoPesquisa);
            alternarElementos(true, notas);
        }
    });
});

campoPesquisa.addEventListener('input', function () {
    const notas = document.querySelectorAll('.nota');

    if (campoPesquisa.value === '') {
        alternarElementos(true, notas);
    }
});

[fundoModalConfirmacao, botaoNegar].forEach(function (elemento) {
    elemento.addEventListener('click', function () {
        alternarElementos(false, [fundoModalConfirmacao, modalConfirmacao]);
    });
});

botaoConfirmar.addEventListener('click', async function () {
    const idNota = idNotaGlobal;

    if (!validarID(idNota)) {
        return;
    }

    alternarElementos(false, [fundoModalConfirmacao, modalConfirmacao]);

    const { sucesso, mensagem } = await enviarDados('DELETE', 'deleta-nota.php', {
        acao: 'deletar-nota',
        id: idNota
    });

    if (!sucesso) {
        alternarModalAlerta(true, mensagem);
        return;
    }

    redirecionar(mensagem, 'painel.html');
});