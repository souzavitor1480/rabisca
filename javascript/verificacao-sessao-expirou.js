import { controlarSessaoUsuario } from './utilitarios.js';

window.addEventListener('pageshow', async function () {
    controlarSessaoUsuario('verificar-sessao-expirou', 'verificar-sessao-expirou.php');
});