import { formulario, campoNome, campoSenha, campoPerguntaSeguranca, campoResposta, enviarFormulario, gerenciarUsuario } from './utilitarios.js';

formulario.addEventListener('submit', function (event) {
    enviarFormulario(event, function () {
        gerenciarUsuario({
            metodo: 'PATCH',
            urlEnvio: 'recuperacao-senha.php',
            acao: 'recuperar-senha',
            campos: [campoNome, campoSenha, campoPerguntaSeguranca, campoResposta],
            urlRedirecionamento: 'login.html'
        });
    });
});