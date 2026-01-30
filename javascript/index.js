const fundoModal = document.querySelector('#fundo-modal');
const modal = document.querySelector('#modal');
const textoModal = document.querySelector('#modal p');
const botaoFechamentoModal = document.querySelector('#modal button');

function alternarModal(mostrar, mensagem = '') {
    [fundoModal, modal].forEach(function (elemento) {
        elemento.classList.toggle('ativo', mostrar);
    });

    if (mensagem) {
        textoModal.textContent = mensagem;
    }
}

window.addEventListener('pageshow', async function () {
    try {
        await axiosCustomizado.post('encerramento-sessao.php', { acao: 'encerrar-sessao' });
    } catch (error) {
        const { mensagem = 'Algo deu errado ao concluir sua solicitação. Por favor, tente novamente mais tarde.' } = error.response?.data || {};
        console.error(mensagem);
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