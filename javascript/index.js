const fundoModal = document.querySelector('#fundoModal');
const modal = document.querySelector('#modal');
const textoModal = document.querySelector('#textoModal');
const botaoFechamentoModal = document.querySelector('#botaoFechamentoModal');

function alternarModal(exibir, mensagem = '') {
    [fundoModal, modal].forEach(function (elemento) {
        elemento.classList.toggle('ativo', exibir);
    });

    if (mensagem) {
        textoModal.textContent = mensagem;
    }
}

window.addEventListener('pageshow', async function () {
    try {
        await axiosCustomizado.post('encerramento-sessao.php', { acao: 'encerrar-sessao' });
    } catch (error) {
        console.error(`Algo deu errado ao processar sua solicitação. Tente novamente mais tarde. Código de erro: ${error.status}.`);
    }
});

window.addEventListener('load', function () {
    const mensagemRedirecionamento = this.localStorage.getItem('mensagem-redirecionamento');

    if (!mensagemRedirecionamento) {
        console.warn('A mensagem de redirecionamento não foi definida. Pode ter ocorrido um erro.');
        return;
    }

    alternarModal(true, mensagemRedirecionamento);
    this.localStorage.removeItem('mensagem-redirecionamento');
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        alternarModal(false);
    }
});

[fundoModal, botaoFechamentoModal].forEach(function (elemento) {
    elemento.addEventListener('click', function () {
        alternarModal(false);
    });
});