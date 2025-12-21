import { formulario, nome, senha, perguntaSeguranca, resposta, enviarFormulario, gerenciarUsuario } from './utilitarios.js';

formulario.addEventListener('submit', function (event) {
    enviarFormulario(event, function () {
        gerenciarUsuario({
            metodo: 'POST',
            urlEnvio: 'cadastro-usuario.php',
            acao: 'cadastrar-usuario',
            campos: [nome, senha, perguntaSeguranca, resposta],
            urlRedirecionamento: 'login.html'
        });
    });
});