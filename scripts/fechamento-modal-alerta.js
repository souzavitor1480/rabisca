import { fundoModalAlerta, detectarTeclaEsc, alternarModalAlerta } from './utilitarios.js';

const botaoFecharModalAlerta = document.querySelector('#botao-fechar-modal-alerta');

document.addEventListener('keydown', function (event) {
    detectarTeclaEsc(event, function () {
        alternarModalAlerta(false);
    });
});

[fundoModalAlerta, botaoFecharModalAlerta].forEach(function (elemento) {
    elemento.addEventListener('click', function () {
        alternarModalAlerta(false);
    });
});