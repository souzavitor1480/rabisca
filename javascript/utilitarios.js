// Importações
import { axiosCustomizado } from "./customizacoes.js";

// Elementos DOM e variáveis globais
export const formulario = document.querySelector("#formulario");
export const nome = document.querySelector("#nome");
export const senha = document.querySelector("#senha");
export const perguntaSeguranca = document.querySelector("#perguntaSeguranca");
export const resposta = document.querySelector("#resposta");
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

// Função que envia um formulário
export function enviaFormulario(event, params, callback) {
    event.preventDefault();
    callback(params);
}

// Função que gerencia os dados de um usuário
export async function gerenciaUsuario(paramsUsuario) {
    const { metodo, urlEnvio, acao, campos, urlRedirecionamento } = paramsUsuario;
    let params = {};
    params.acao = acao;
    
    for (const campo of campos) {
        const valorCampo = campo.value.trim();

        switch (campo.id) {
            case "nome":
                if (!validaCampoObrigatorio(campo, valorCampo, 70)) {
                    exibeErro("Erro: o nome de usuário é obrigatório e deve conter até 70 caracteres. Por favor, tente novamente.", campo);
                    return;
                }

                params.nome = valorCampo;
                break;
            case "senha":
                if (!campo.checkValidity() || !new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,30}$/).test(valorCampo)) {
                    exibeErro("Erro: a senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um caractere especial. Por favor, tente novamente.", campo);

                    return;
                }

                params.senha = valorCampo;
                break;
            case "perguntaSeguranca":
                if (!campo.checkValidity() || !["0", "1", "2"].includes(valorCampo)) {
                    exibeErro("Erro: a pergunta de segurança é obrigatória e deve ser válida. Por favor, tente novamente.", campo);
                    return;
                }

                params.perguntaSeguranca = valorCampo;
                break;
            case "resposta":
                if (!validaCampoObrigatorio(campo, valorCampo, 40)) {
                    exibeErro("Erro: a resposta é obrigatória e deve conter até 40 caracteres. Por favor, tente novamente.", campo);
                    return;
                }

                params.resposta = valorCampo;
                break;
            default:
                alternaExibicaoModalAlerta(true, "Erro: campo inválido. Por favor, tente novamente mais tarde.");
                return;
        }
    }

    const { sucesso, dados, mensagem } = await enviaDados(metodo, urlEnvio, params);

    if (!sucesso) {
        const { campoErro } = dados;
        let encontrouCampoErro = false;
        alternaExibicaoModalAlerta(true, mensagem);

        for (const campo of campos) {
            if (campoErro === campo.name) {
                limpaCampo(campo);
                encontrouCampoErro = true;
            }
        }

        if (!encontrouCampoErro) {
            limpaCampos(campos);
        }

        return;
    }

    redireciona(mensagem, urlRedirecionamento);
}

// Função que valida um campo obrigatório
function validaCampoObrigatorio(campo, valorCampo, quantidadeMaximaCaracteres) {
    return campo.checkValidity() && valorCampo && valorCampo.length <= quantidadeMaximaCaracteres;
}

// Função que exibe um erro para o usuário e limpa o campo respectivo
function exibeErro(mensagemErro, campoErro) {
    alternaExibicaoModalAlerta(true, mensagemErro);
    limpaCampo(campoErro);
}

// Função que limpa um campo e remove seu foco
function limpaCampo(campo) {
    campo.value = "";
    campo.blur();
}

// Função que limpa vários campos de uma vez
export function limpaCampos(campos) {
    campos.forEach(function (elemento) {
        limpaCampo(elemento);
    });
}

// Função que redireciona para outra página, enviando também uma mensagem
function redireciona(mensagemRedirecionamento, urlRedirecionamento) {
    localStorage.setItem("mensagem-redirecionamento", mensagemRedirecionamento);
    window.location.href = urlRedirecionamento;
}