import { formulario, campoNome, campoSenha, campoPerguntaSeguranca, campoResposta, enviarFormulario, gerenciarUsuario, enviarDados, redirecionar } from './utilitarios.js';

const opcoesCampoPerguntaSeguranca = campoPerguntaSeguranca.querySelectorAll('option');

document.addEventListener('DOMContentLoaded', async function () {
    const { sucesso, dados, mensagem } = await enviarDados('GET', 'consulta-usuario.php', { acao: 'consultar-usuario' });

    if (!sucesso) {
        redirecionar(mensagem, 'painel.html');
        return;
    }

    const { dadosUsuario } = dados;

    if (dadosUsuario.length === 0) {
        redirecionar(mensagem, 'index.html');
        return;
    }

    dadosUsuario.forEach(function (elemento) {
        const { nomeUsuario, senhaUsuario, perguntaSegurancaUsuario, respostaUsuario } = elemento;
        campoNome.value = nomeUsuario;
        campoSenha.value = senhaUsuario;

        opcoesCampoPerguntaSeguranca.forEach(function (elemento) {
            if (elemento.value.trim() === perguntaSegurancaUsuario.value.trim()) {
                elemento.selected = true;
            }
        });

        campoResposta.value = respostaUsuario;
    });
});

formulario.addEventListener('submit', function (event) {
    enviarFormulario(event, function () {
        gerenciarUsuario({
            metodo: 'PUT',
            urlEnvio: 'edicao-usuario.php',
            acao: 'editar-dados',
            campos: [campoNome, campoSenha, campoPerguntaSeguranca, campoResposta],
            urlRedirecionamento: 'painel.html'
        });
    });
});