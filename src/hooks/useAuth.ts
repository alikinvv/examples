import { useAppSelector } from './redux-hooks'
import Cookies from 'js-cookie'
import { JWT_TOKEN_NAME } from 'api'
import { AuthInitialStateProps } from 'store/auth/types'

interface useAuthProps extends AuthInitialStateProps {
    cookieAccessToken?: string
    companyId?: number
}

export const useAuth = (): useAuthProps => {
    const auth = useAppSelector((state) => state.auth)
    const cookieAccessToken = Cookies.get(JWT_TOKEN_NAME)

    return { ...auth, cookieAccessToken, companyId: auth.user?.companyId }
}
