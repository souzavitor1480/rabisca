import { enviarDados } from './utilitarios.js';

const containerIdade = document.querySelector('#container-idade');

window.addEventListener('pageshow', async function () {
    const { sucesso, dados, mensagem } = await enviarDados('GET', 'consulta-idade.php', { acao: 'consultar-idade' });

    if (!sucesso) {
        console.error(mensagem);
        return;
    }

    const { idade } = dados;
    containerIdade.textContent = idade;
});