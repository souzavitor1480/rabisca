import { formulario, campoPerguntaSeguranca, campoResposta, enviarFormulario, gerenciarUsuario } from './utilitarios.js';

formulario.addEventListener('submit', function (event) {
    enviarFormulario(event, function () {
        gerenciarUsuario({
            metodo: 'DELETE',
            urlEnvio: 'delecao-usuario.php',
            acao: 'deletar-conta',
            campos: [campoPerguntaSeguranca, campoResposta],
            urlRedirecionamento: 'index.html'
        });
    });
});