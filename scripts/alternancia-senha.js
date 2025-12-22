import { campoSenha, alternarIcones } from './utilitarios.js';

const botaoAlternarSenha = document.querySelector('#botao-alternar-senha');
const iconeAlternarSenha = document.querySelector('#icone-alternar-senha');

botaoAlternarSenha.addEventListener('click', function () {
    campoSenha.type = campoSenha.type === 'password' ? 'text' : 'password';
    alternarIcones(campoSenha.type !== 'password', iconeAlternarSenha, 'bi-eye', 'bi-eye-slash');
});