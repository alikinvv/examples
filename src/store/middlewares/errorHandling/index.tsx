import { isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { Toast } from 'components'

export const errorHandling: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        const requestMethod = action?.meta?.baseQueryMeta?.request?.method

        if (
            isRejectedWithValue(action) &&
            action?.payload?.response?.status !== 401 &&
            action?.payload?.status !== 401
        ) {
            Toast.error(
                <div
                    dangerouslySetInnerHTML={{
                        __html:
                            action?.payload?.data?.message ||
                            'Не удалось загрузить данные',
                    }}
                />,
            )
        }
        if (
            isFulfilled(action) &&
            (requestMethod === 'PUT' ||
                requestMethod === 'POST' ||
                requestMethod === 'DELETE')
        ) {
            requestMethod === 'PUT' &&
                Toast.success(
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                action?.payload?.message ||
                                'Запись успешно обновлена',
                        }}
                    />,
                )
            requestMethod === 'POST' &&
                Toast.success(
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                action?.payload?.message ||
                                'Запись успешно добавлена',
                        }}
                    />,
                )
            requestMethod === 'DELETE' &&
                Toast.success(
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                action?.payload?.message ||
                                'Запись успешно удалена',
                        }}
                    />,
                )
        }

        return next(action)
    }
