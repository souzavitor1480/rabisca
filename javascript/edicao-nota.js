import { formulario, campoTitulo, campoTexto, enviarFormulario, gerenciarNota, redirecionar } from './utilitarios.js';

const campoID = document.querySelector('#campo-id');

document.addEventListener('DOMContentLoaded', function () {
    const valores = new URLSearchParams(window.location.search);
    const id = valores.get('id');
    const titulo = valores.get('titulo');
    const texto = valores.get('texto');

    if (!id || !titulo || !texto) {
        redirecionar('Erro: Valores inválidos. Por favor, tente novamente.', 'consulta-notas.html');
        return;
    }

    campoID.value = id;
    campoTitulo.value = titulo;
    campoTexto.value = texto;
});

formulario.addEventListener('submit', function (event) {
    enviarFormulario(event, function () {
        gerenciarNota({
            metodo: 'PUT',
            urlEnvio: 'edicao-nota.php',
            acao: 'editar-nota',
            campos: [campoID, campoTitulo, campoTexto],
            urlRedirecionamento: 'consulta-notas.html'
        });
    });
});