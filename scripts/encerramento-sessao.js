import { enviarDados } from "./utilitarios.js";

window.addEventListener('pageshow', async function () {
    const { sucesso, dados, mensagem } = await enviarDados('POST', 'encerrar-sessao.php', { acao: 'encerrar-sessao' });

    if (!sucesso) {
        console.error(mensagem);
        return;
    }

    console.log(mensagem);
});