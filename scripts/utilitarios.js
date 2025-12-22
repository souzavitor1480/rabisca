import { axiosCustomizado } from './customizacoes.js';

export const formulario = document.querySelector('#formulario');
export const campoNome = document.querySelector('#campo-nome');
export const campoSenha = document.querySelector('#campo-senha');
export const campoPerguntaSeguranca = document.querySelector('#campo-pergunta-seguranca');
export const campoResposta = document.querySelector('#campo-resposta');
export const fundoModalAlerta = document.querySelector('#fundo-modal-alerta');
const modalAlerta = document.querySelector('#modal-alerta');
const textoModalAlerta = document.querySelector('#texto-modal-alerta');

export function alternarIcones(alternar, elemento, iconePadrao, iconeAlternativo) {
    elemento.classList.toggle(iconePadrao, !alternar);
    elemento.classList.toggle(iconeAlternativo, alternar);
}

export async function enviarDados(metodo, url, parametros) {
    try {
        let resposta = null;

        switch (metodo) {
            case 'GET':
                resposta = await axiosCustomizado.get(url, { params: parametros });
                break;
            case 'POST':
                resposta = await axiosCustomizado.post(url, parametros);
                break;
            case 'PATCH':
                resposta = await axiosCustomizado.patch(url, parametros);
                break;
            case 'PUT':
                resposta = await axiosCustomizado.put(url, parametros);
                break;
            case 'DELETE':
                resposta = await axiosCustomizado.delete(url, { data: parametros });
                break;
            default:
                return desestruturarResposta({
                    sucesso: false,
                    dados: [],
                    mensagem: 'Erro: Método de requisição inválido. Por favor, tente novamente mais tarde.'
                });
        }

        return desestruturarResposta(resposta.data);
    } catch (error) {
        return desestruturarResposta(error.response?.data || {});
    }
}

function desestruturarResposta(resposta) {
    const { sucesso, dados, mensagem } = resposta;

    return {
        sucesso: sucesso || false,
        dados: dados || [],
        mensagem: mensagem || 'Erro: Não foi possível concluir sua requisição. Por favor, tente novamente mais tarde.'
    };
}

export function detectarCliqueSemPropagacao(event, callback) {
    event.stopPropagation();
    callback();
}

export function detectarTeclaEsc(event, callback) {
    if (event.key === 'Escape') {
        callback();
    }
}

export function alternarModalAlerta(exibir, mensagem) {
    alternarElementos(exibir, [fundoModalAlerta, modalAlerta]);

    if (exibir) {
        textoModalAlerta.textContent = mensagem;
    }
}

export function alternarElementos(exibir, elementos) {
    elementos.forEach(function (elemento) {
        elemento.classList.toggle('ativo', exibir);
    });
}

export function enviarFormulario(event, callback) {
    event.preventDefault();
    callback();
}

export async function gerenciarUsuario(dadosUsuario) {
    const { metodo, urlEnvio, acao, campos, urlRedirecionamento } = dadosUsuario;
    let parametros = {};
    parametros.acao = acao;

    for (const campo of campos) {
        const valorCampo = campo.value.trim();

        switch (campo.id) {
            case 'campo-nome':
                if (!validarCampoObrigatorio(campo, valorCampo, 30)) {
                    exibirErro('Erro: O nome de usuário é obrigatório e deve conter até 30 caracteres. Por favor, tente novamente.', campo);
                    return;
                }

                parametros.nome = valorCampo;
                break;
            case 'campo-senha':
                if (!campo.checkValidity() || !new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,30}$/).test(valorCampo)) {
                    exibirErro('Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um caractere especial. Por favor, tente novamente.', campo);

                    return;
                }

                parametros.senha = valorCampo;
                break;
            case 'campo-pergunta-seguranca':
                if (!campo.checkValidity() || !['0', '1', '2'].includes(valorCampo)) {
                    exibirErro('Erro: A pergunta de segurança é obrigatória e deve ser válida. Por favor, tente novamente.', campo);
                    return;
                }

                parametros.perguntaSeguranca = valorCampo;
                break;
            case 'campo-resposta':
                if (!validarCampoObrigatorio(campo, valorCampo, 40)) {
                    exibirErro('Erro: A resposta é obrigatória e deve conter até 40 caracteres. Por favor, tente novamente.', campo);
                    return;
                }

                parametros.resposta = valorCampo;
                break;
            default:
                alternarModalAlerta(true, 'Erro: Campo inválido. Por favor, tente novamente mais tarde.');
                return;
        }
    }

    const { sucesso, dados, mensagem } = await enviarDados(metodo, urlEnvio, parametros);

    if (!sucesso) {
        const { campoErro } = dados;
        let encontrouCampoErro = false;
        alternarModalAlerta(true, mensagem);

        for (const campo of campos) {
            if (campoErro === campo.name) {
                limparCampo(campo);
                encontrouCampoErro = true;
            }
        }

        if (!encontrouCampoErro) {
            limparCampos(campos);
        }

        return;
    }

    redirecionar(mensagem, urlRedirecionamento);
}

function validarCampoObrigatorio(campo, valorCampo, quantidadeMaximaCaracteres) {
    return campo.checkValidity() && valorCampo && valorCampo.length <= quantidadeMaximaCaracteres;
}

function exibirErro(mensagemErro, campoErro) {
    alternarModalAlerta(true, mensagemErro);
    limparCampo(campoErro);
}

function limparCampo(campo) {
    campo.value = '';
    campo.blur();
}

function limparCampos(campos) {
    campos.forEach(function (elemento) {
        limparCampo(elemento);
    });
}

function redirecionar(mensagemRedirecionamento, urlRedirecionamento) {
    localStorage.setItem('mensagem-redirecionamento', mensagemRedirecionamento);
    window.location.href = urlRedirecionamento;
}