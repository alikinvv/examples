import axios from 'axios'
import Cookies from 'js-cookie'
import { store } from 'store'
import { refreshAccessToken } from 'store/auth'

export const API_URL = process.env.REACT_APP_API_URL
export const BASE_URL = `${API_URL}:8090/iso_gateway/api`
export const JWT_TOKEN_NAME = 'token_iso'
export const JWT_REFRESH_TOKEN_NAME = 'refreshToken_iso'

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const jwt = Cookies.get(JWT_TOKEN_NAME)

    if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry &&
            error.config.url !== '/v1/auth/signin'
        ) {
            request._isRetry = true
            try {
                await store.dispatch(refreshAccessToken())
                return api.request(request)
            } catch (error) {}
        }
        throw error
    },
)

export default api
