import { fundoModalAlerta, detectarTeclaEsc, alternarModalAlerta, percorrerElementos, detectarCliqueSemPropagacao } from './utilitarios.js';

const botaoFecharModalAlerta = document.querySelector('#botaoFecharModalAlerta');

document.addEventListener('DOMContentLoaded', () => {
    detectarTeclaEsc(document, () => {
        alternarModalAlerta(false);
    });

    percorrerElementos([fundoModalAlerta, botaoFecharModalAlerta], (elemento) => {
        detectarCliqueSemPropagacao(elemento, () => {
            alternarModalAlerta(false);
        });
    });
});