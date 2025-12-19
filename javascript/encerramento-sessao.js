// Importações
import { enviaDados } from "./utilitarios.js";

// Eventos

// Dispara a função quando a página é carregada, incluindo quando ela vem do cache do navegador
window.addEventListener("pageshow", async function () {
    const { sucesso, mensagem } = await enviaDados("POST", "encerramento-sessao.php", { acao: "encerrar-sessao" });

    if (!sucesso) {
        console.error(mensagem);
        return;
    }

    console.log(mensagem);
});