import { lazy } from 'react'

const user_list = lazy(() => import('pages/user/ListInterface'))

export const routes = [
    {
        path: 'pages/user/list',
        element: user_list,
    },
    
]
