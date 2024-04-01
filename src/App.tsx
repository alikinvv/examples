import { Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAuth } from 'hooks'
import { routes } from 'routes'

import { Layout } from 'layouts/Layout'

import { Preloader } from 'react_component'
import { PrivateRoute } from 'components/templates'
import Logon from 'pages/user/LogonInterface'
import { closeInitLoading, getAuth } from 'store/auth'

export const App = () => {
    const dispatch = useAppDispatch()
    const { isInitLoading, cookieAccessToken } = useAuth()

    useEffect(() => {
        cookieAccessToken ? dispatch(getAuth()) : dispatch(closeInitLoading())
    }, [])

    if (isInitLoading) {
        return <Preloader />
    }

    return (
        <Routes>
            <Route
                path="/user/logon"
                element={
                    <PrivateRoute forLogin>
                        <Logon />
                    </PrivateRoute>
                }
            />
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                }
            >
                {routes.map((route, i) => (
                    <Route
                        key={i}
                        path={route.path}
                        element={
                            <Suspense fallback={null}>
                                <route.element />
                            </Suspense>
                        }
                    />
                ))}
            </Route>
        </Routes>
    )
}
