import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, JWT_TOKEN_NAME } from 'api/config'
import Cookies from 'js-cookie'

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const accessToken = Cookies.get(JWT_TOKEN_NAME)
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`)
            }

            return headers
        },
    }),
    endpoints: () => ({}),
})
