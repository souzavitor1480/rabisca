import { axiosCustomizado } from '../customizacoes/customizacoes.js';
export const formulario = document.querySelector('#formulario');
export const campoNome = document.querySelector('#campoNome');
export const campoSenha = document.querySelector('#campoSenha');
export const campoPerguntaSeguranca = document.querySelector('#campoPerguntaSeguranca');
export const campoResposta = document.querySelector('#campoResposta');
export const fundoModalAlerta = document.querySelector('#fundoModalAlerta');
const modalAlerta = document.querySelector('#modalAlerta');
const textoModalAlerta = document.querySelector('#textoModalAlerta');

export const alternarIcone = (voltarPadrao, elemento, iconePadrao, iconeAlternativo) => {
    elemento.classList.toggle(iconePadrao, !voltarPadrao);
    elemento.classList.toggle(iconeAlternativo, voltarPadrao);
};

export const detectarCliqueSemPropagacao = (elemento, callback) => {
    elemento.addEventListener('click', (event) => {
        event.stopPropagation();
        callback();
    });
};

export const enviarDados = async (metodo, url, parametros) => {
    try {
        let resposta;

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
                    mensagem: 'Erro: O método de requisição é inválido. Por favor, tente novamente mais tarde.'
                });
        }

        return desestruturarResposta(resposta.data);
    } catch (error) {
        return desestruturarResposta(error.response?.data || {});
    }
};

const desestruturarResposta = (resposta) => {
    const { sucesso, dados, mensagem } = resposta;

    return {
        sucesso: sucesso || false,
        dados: dados || [],
        mensagem: mensagem || 'Erro: Não foi possível concluir a sua requisição. Por favor, tente novamente mais tarde.'
    };
};

export const alternarModalAlerta = (exibir, mensagem = '') => {
    alternarElementos(exibir, [fundoModalAlerta, modalAlerta]);

    if (mensagem) {
        textoModalAlerta.textContent = mensagem;
    }
};

export const alternarElementos = (exibir, elementos) => {
    percorrerElementos(elementos, (elemento) => {
        elemento.classList.toggle('ativo', exibir);
    });
};

export const percorrerElementos = (elementos, callback) => {
    elementos.forEach(callback);
};

export const detectarTeclaEsc = (elemento, callback) => {
    elemento.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            callback();
        }
    });
};

export const detectarEnvioPararSubmissao = (formulario, callback) => {
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        callback();
    });
};

export const validarDados = (dados, callback) => {
    for (const [chave, valor] of dados) {
        const campo = valor[0];
        const valorCampo = valor[1];

        switch (chave) {
            case 'nome':
                if (!validarCampoObrigatorio(campo, valorCampo, 30)) {
                    exibirErro('Erro: O nome de usuário é obrigatório e deve conter até 30 caracteres. Por favor, tente novamente.', campo);

                    return;
                }

                break;
            case 'senha':
                if (!campo.checkValidity() || !new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,30}$/).test(valorCampo)) {
                    exibirErro('Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um caractere especial. Por favor, tente novamente.', campo);

                    return;
                }

                break;
            case 'perguntaSeguranca':
                if (!campo.checkValidity() || !['0', '1', '2'].includes(valorCampo)) {
                    exibirErro('Erro: A pergunta de segurança deve ser selecionada e válida. Por favor, tente novamente.', campo);
                    return;
                }

                break;
            case 'resposta':
                if (!validarCampoObrigatorio(campo, valorCampo, 40)) {
                    exibirErro('Erro: A resposta é obrigatória e deve conter até 40 caracteres. Por favor, tente novamente.', campo);
                    return;
                }

                break;
            case 'titulo':
                if (!validarCampoObrigatorio(campo, valorCampo, 30)) {
                    exibirErro('Erro: O título é obrigatório e deve conter até 30 caracteres. Por favor, tente novamente.', campo);
                    return;
                }

                break;
            case 'texto':
                if (!validarCampoObrigatorio(campo, valorCampo, 30)) {
                    exibirErro('Erro: O texto é obrigatório e deve conter até 200 caracteres. Por favor, tente novamente.', campo);
                    return;
                }

                break;
            case 'id':
                if (!validarID(valorCampo)) {
                    return;
                }

                break;
            default:
                alternarModalAlerta(true, 'Erro: O campo é inválido. Por favor, tente novamente mais tarde.');
        }
    }

    callback();
};

const validarCampoObrigatorio = (campo, valorCampo, quantidadeMaximaCaracteres) => {
    return campo.checkValidity() && valorCampo && valorCampo.length <= quantidadeMaximaCaracteres;
};

const exibirErro = (mensagemErro, campoErro) => {
    alternarModalAlerta(true, mensagemErro);
    limparCampo(campoErro);
};

export const limparCampo = (campo) => {
    campo.value = "";
    campo.blur();
};

export const validarID = (id) => {
    id = Number(id);

    if (!Number.isInteger(id) || id < 1) {
        alternarModalAlerta(true, 'Erro: O ID é obrigatório e deve ser um número maior ou igual a 1. Por favor, tente novamente.');
        return false;
    }

    return true;
};

export const gerenciarDados = async (metodo, urlEnvio, acao, dadosGerenciamento, mensagemRedirecionamento, urlRedirecionamento) => {
    const { sucesso, dados, mensagem } = await enviarDados(metodo, urlEnvio, { ...acao, ...dadosGerenciamento });

    if (!sucesso) {
        const entradasDadosGerenciamento = Object.entries(dadosGerenciamento);
        const { campoErro } = dados;
        let encontrouCampoErro = false;
        alternarModalAlerta(true, mensagem);

        for (const [chave, valor] of entradasDadosGerenciamento) {
            const campo = valor[0];

            if (campoErro === chave) {
                encontrouCampoErro = true;
                limparCampo(campo);
                break;
            }
        }

        if (!encontrouCampoErro) {
            for (const [chave, valor] of entradasDadosGerenciamento) {
                limparCampo(valor[0]);
            }
        }

        return;
    }

    redirecionar(mensagemRedirecionamento, urlRedirecionamento);
};

export const redirecionar = (mensagemRedirecionamento, urlRedirecionamento) => {
    localStorage.setItem('mensagem-redirecionamento', mensagemRedirecionamento);
    window.location.href = urlRedirecionamento;
};