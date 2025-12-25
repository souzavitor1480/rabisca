import { enviarDados, redirecionar } from './utilitarios';

const containerNome = document.querySelector('#container-nome');

document.addEventListener('DOMContentLoaded', async function () {
    const { sucesso, dados, mensagem } = await enviarDados('GET', 'consulta-nome', { acao: 'consultar-nome' });

    if (!sucesso) {
        console.error(mensagem);
        return;
    }

    const { encerrouSessao } = dados;

    if (encerrouSessao) {
        redirecionar(mensagem, 'index.html');
        return;
    }

    const { nome } = dados;
    containerNome.textContent = nome;
});