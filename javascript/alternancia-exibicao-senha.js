// Importações
import { senha, alternaIcones } from "./utilitarios.js";

// Elementos DOM e variáveis globais
const botaoAlternaExibicaoSenha = document.querySelector("#botaoAlternaExibicaoSenha");
const iconeAlternaExibicaoSenha = document.querySelector("#botaoAlternaExibicaoSenha i");

// Dispara a função quando um clique é dado no botão que alterna a exibição de senha
botaoAlternaExibicaoSenha.addEventListener("click", function () {
    senha.type = senha.type === "password" ? "text" : "password";
    alternaIcones(senha.type !== "password", iconeAlternaExibicaoSenha, "bi-eye", "bi-eye-slash");
});