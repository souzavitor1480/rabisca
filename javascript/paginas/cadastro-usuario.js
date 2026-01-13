import {
    formulario, campoNome, campoSenha, campoPerguntaSeguranca, campoResposta, detectarEnvioPararSubmissao, validarDados, gerenciarDados
} from '../modulos/utilitarios.js';

document.addEventListener('DOMContentLoaded', () => {
    detectarEnvioPararSubmissao(formulario, () => {
        const dados = {
            nome: [campoNome, campoNome.value.trim()],
            senha: [campoSenha, campoSenha.value.trim()],
            perguntaSeguranca: [campoPerguntaSeguranca, campoPerguntaSeguranca.value.trim()],
            resposta: [campoResposta, campoResposta.value.trim()]
        };

        validarDados(Object.entries(dados), () => {
            gerenciarDados('POST', 'cadastrar-usuario.php', { acao: 'criar-conta' }, dados, 'Conta criada com sucesso.', 'login.html');
        });
    });
});