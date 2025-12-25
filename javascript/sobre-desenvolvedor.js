import { enviarDados } from './utilitarios.js';

const containerIdade = document.querySelector('#container-idade');

window.addEventListener('pageshow', async function () {
    const { sucesso, dados, mensagem } = await enviarDados('GET', 'sobre-desenvolvedor.php', { acao: 'consultar-idade' });

    if (!sucesso) {
        console.error(mensagem);
        return;
    }

    const { idade } = dados;
    containerIdade.textContent = idade;
});