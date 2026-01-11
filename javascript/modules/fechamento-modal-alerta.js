import { fundoModalAlerta, detectarTeclaEsc, alternarModalAlerta } from "./utils.js";

const botaoFecharModalAlerta = document.querySelector('#botaoFecharModalAlerta');

document.addEventListener('keydown', (event) => {
    detectarTeclaEsc(event, () => {
        alternarModalAlerta(false);
    });
});

[fundoModalAlerta, botaoFecharModalAlerta].forEach((elemento) => {
    elemento.addEventListener('click', () => {
        alternarModalAlerta(false);
    });
});