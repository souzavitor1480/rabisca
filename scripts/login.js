import { formulario, campoNome, campoSenha, enviarFormulario, gerenciarUsuario } from './utilitarios.js';

formulario.addEventListener('submit', function (event) {
    enviarFormulario(event, function () {
        gerenciarUsuario({
            metodo: 'POST',
            urlEnvio: 'login.php',
            acao: 'entrar',
            campos: [campoNome, campoSenha],
            urlRedirecionamento: 'painel.html'
        });
    });
});