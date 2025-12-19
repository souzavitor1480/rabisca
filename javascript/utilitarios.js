// Importações
import { axiosCustomizado } from "./customizacoes.js";

// Elementos DOM e variáveis globais
export const fundoModalAlerta = document.querySelector("#fundoModalAlerta");
const modalAlerta = document.querySelector("#modalAlerta");
const textoModalAlerta = document.querySelector("#modalAlerta p");
export const mensagemRedirecionamento = localStorage.getItem("mensagem-redirecionamento");

// Funções

// Função que alterna ícones
export function alternaIcones(alternar, elemento, iconePadrao, iconeAlternativo) {
    elemento.classList.toggle(iconePadrao, !alternar);
    elemento.classList.toggle(iconeAlternativo, alternar);
}

// Função que envia os dados para o back-end
export async function enviaDados(metodo, url, params) {
    try {
        let resposta;

        switch (metodo) {
            case "GET":
                resposta = await axiosCustomizado.get(url, { params: params });
                break;
            case "POST":
                resposta = await axiosCustomizado.post(url, params);
                break;
            case "PATCH":
                resposta = await axiosCustomizado.patch(url, params);
                break;
            case "PUT":
                resposta = await axiosCustomizado.put(url, params);
                break;
            case "DELETE":
                resposta = await axiosCustomizado.delete(url, { data: params });
                break;
            default:
                return desestruturaResposta({
                    sucesso: false,
                    dados: [],
                    mensagem: "Erro: método de requisição inválido. Por favor, tente novamente mais tarde."
                });
        }

        return desestruturaResposta(resposta.data);
    } catch (error) {
        return desestruturaResposta(error.response?.data || {});
    }
}

// Função que desestrutura a resposta vinda do back-end
function desestruturaResposta(resposta) {
    const { sucesso, dados, mensagem } = resposta;

    return {
        sucesso: sucesso || false,
        dados: dados || [],
        mensagem: mensagem || "Erro: não foi possível concluir sua requisição. Por favor, tente novamente mais tarde."
    };
}

// Função que detecta um clique e para a propagação do evento
export function detectaCliqueSemPropagacao(event, callback) {
    event.stopPropagation();
    callback();
}

// Função que alterna a exibição do modal de alerta
export function alternaExibicaoModalAlerta(exibir, mensagem) {
    alternaExibicaoElementos(exibir, [fundoModalAlerta, modalAlerta]);
    textoModalAlerta.textContent = exibir ? mensagem : "";
}

// Função que alterna a exibição de elementos
export function alternaExibicaoElementos(exibir, elementos) {
    elementos.forEach(function (elemento) {
        elemento.classList.toggle("ativo", exibir);
    });
}

// Função que detecta se a tecla "Esc" foi pressionada
export function detectaTeclaEsc(event, callback) {
    if (event.key === "Escape") {
        callback();
    }
}