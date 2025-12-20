// Importações
import { formulario, nome, senha, perguntaSeguranca, resposta, enviaFormulario, gerenciaUsuario, limpaCampos } from "./utilitarios.js";

// Eventos

// Dispara a função quando a página é carregada, incluindo quando ela vem do cache do navegador
window.addEventListener("pageshow", function () {
    limpaCampos([nome, senha, perguntaSeguranca, resposta]);
});

// Dispara a função quando o formulário é enviado
formulario.addEventListener("submit", function (event) {
    enviaFormulario(event, {
        metodo: "POST",
        urlEnvio: "cadastrar-usuario.php",
        acao: "cadastrar-usuario",
        campos: [nome, senha, perguntaSeguranca, resposta],
        urlRedirecionamento: "login.html"
    }, gerenciaUsuario);
});