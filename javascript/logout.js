import { controlarSessaoUsuario } from './utilitarios.js';

const linkLogout = document.querySelector('#link-logout');

linkLogout.addEventListener('click', function () {
    controlarSessaoUsuario('encerrar-sessao', 'encerrar-sessao.php');
});