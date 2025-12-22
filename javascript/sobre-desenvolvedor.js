import { consultarDados } from './utilitarios.js';

const containerIdade = document.querySelector('#container-idade');

window.addEventListener('pageshow', async function () {
    consultarDados({
        urlEnvio: 'consulta-idade.php',
        acao: 'consultar-idade',
        container: containerIdade
    });
});