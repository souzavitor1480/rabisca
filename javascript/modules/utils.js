import { axiosCustomizado } from '../customs/custom.js';

export const fundoModalAlerta = document.querySelector('#fundoModalAlerta');
const modalAlerta = document.querySelector('#modalAlerta');
const textoModalAlerta = document.querySelector('#textoModalAlerta');

export const alternarIcone = (voltarPadrao, elemento, iconePadrao, iconeAlternativo) => {
    elemento.classList.toggle(iconePadrao, !voltarPadrao);
    elemento.classList.toggle(iconeAlternativo, voltarPadrao);
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
                    mensagem: 'Erro: Método de requisição inválido. Por favor, tente novamente mais tarde.'
                });
        }

        return desestruturarResposta(resposta.data);
    } catch (error) {
        return desestruturarResposta(error.response.data);
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

export const detectarCliquePararPropagacao = (event, callback) => {
    event.stopPropagation();
    callback();
};

export const alternarModalAlerta = (exibir, mensagem = '') => {
    alternarElementos(exibir, [fundoModalAlerta, modalAlerta]);

    if (mensagem) {
        textoModalAlerta.textContent = mensagem;
    }
};

export const alternarElementos = (exibir, elementos) => {
    elementos.forEach((elemento) => {
        elemento.classList.toggle('ativo', exibir);
    });
};

export const detectarTeclaEsc = (event, callback) => {
    if (event.key === 'Escape') {
        callback();
    }
};