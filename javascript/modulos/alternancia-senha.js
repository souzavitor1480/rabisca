import { campoSenha, alternarIcone } from './utilitarios.js';
const botaoAlternarSenha = document.querySelector('#botaoAlternarSenha');
const iconeAlternarSenha = document.querySelector('#iconeAlternarSenha');

botaoAlternarSenha.addEventListener('click', () => {
    campoSenha.type = campoSenha.type === 'password' ? 'text' : 'password';
    alternarIcone(campoSenha.type !== 'password', iconeAlternarSenha, 'bi-eye', 'bi-eye-slash');
});