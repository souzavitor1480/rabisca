const axiosCustomizado = axios.create({
    baseURL: 'php/',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json; charset=UTF-8'
    }
});