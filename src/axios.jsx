import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080'
})

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401 && !error.config.__isRetryRequest) {
        return instance.post("/refresh", {token: localStorage.getItem("refreshToken")}).then(({data}) => {
            localStorage.setItem("accessToken", data.access)
            localStorage.setItem("refreshToken", data.refresh)
            if (localStorage.getItem("accessToken") === data.access) {
            } else {
                setTimeout(30);
            }
            error.config.__isRetryRequest = true;
            return instance(error.config)
        }).catch(error => {
            if (error.response.status === 401) {
                localStorage.setItem("accessToken", "")
                localStorage.setItem("refreshToken", "")
                return Promise.reject(error);
            }
        })
    } else {
        return Promise.reject(error)
    }
});

export default instance