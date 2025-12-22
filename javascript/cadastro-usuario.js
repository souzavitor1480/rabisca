import { formulario, campoNome, campoSenha, campoPerguntaSeguranca, campoResposta, enviarFormulario, gerenciarUsuario } from './utilitarios.js';

formulario.addEventListener('submit', function (event) {
    enviarFormulario(event, function () {
        gerenciarUsuario({
            metodo: 'POST',
            urlEnvio: 'cadastro-usuario.php',
            acao: 'criar-conta',
            campos: [campoNome, campoSenha, campoPerguntaSeguranca, campoResposta],
            urlRedirecionamento: 'login.html'
        });
    });
});