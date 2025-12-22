import { formulario, campoTitulo, campoTexto, enviarFormulario, gerenciarNota } from './utilitarios.js';

formulario.addEventListener('submit', function (event) {
    enviarFormulario(event, function () {
        gerenciarNota({
            metodo: 'POST',
            urlEnvio: 'cadastro-nota.php',
            acao: 'cadastrar-nota',
            campos: [campoTitulo, campoTexto],
            urlRedirecionamento: 'consulta-notas.html'
        });
    });
});