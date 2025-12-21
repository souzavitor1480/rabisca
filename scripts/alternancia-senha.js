import { senha, alternarIcones } from './utilitarios.js';

const botaoAlternarSenha = document.querySelector('#botao-alternar-senha');
const iconeAlternarSenha = document.querySelector('#icone-alternar-senha');

botaoAlternarSenha.addEventListener('click', function () {
    senha.type = senha.type === 'password' ? 'text' : 'password';
    alternarIcones(senha.type !== 'password', iconeAlternarSenha, 'bi-eye', 'bi-eye-slash');
});