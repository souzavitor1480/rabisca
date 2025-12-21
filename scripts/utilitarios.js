import { axiosCustomizado } from './customizacoes.js';

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
    textoModalAlerta.textContent = exibir ? mensagem : '';
}

export function alternarElementos(exibir, elementos) {
    elementos.forEach(function (elemento) {
        elemento.classList.toggle('ativo', exibir);
    });
}