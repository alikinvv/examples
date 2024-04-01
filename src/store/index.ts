import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import settings from './settings'
import seo from './seo'
import components from './components'
import routes from './routes'
import reports from './reports'
import { baseApi } from './api/baseApi'
import { errorHandling } from './middlewares/errorHandling'

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth,
        settings,
        routes,
        seo,
        components,
        reports,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([baseApi.middleware, errorHandling]),
})
