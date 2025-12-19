// Instância personalizada do Axios
export const axiosCustomizado = axios.create({
    baseURL: "php/",
    headers: {
        Accept: "application/json; charset=UTF-8",
        "Content-Type": "application/json; charset=UTF-8"
    }
});