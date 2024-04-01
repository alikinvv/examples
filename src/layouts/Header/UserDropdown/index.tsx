import { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

import {
    UserSelectorStyled,
    UserTitleStyled,
    UserSelectorContainerStyled,
    UserMenuStyled,
    UserMenuItemStyled,
    ItemTitleStyled,
} from './styles'
import { useAppDispatch, useAuth } from 'hooks'
import {
    ArrowBottomIcon,
    AvatarFillIcon,
    AvatarOutlineIcon,
    EyeOutlineIcon,
    LogoutIcon,
} from 'react_component'
import { useNavigate } from 'react-router-dom'
import { logout } from 'store/auth'
import Cookies from 'js-cookie'
import { baseApi } from 'store/api/baseApi'
import { JWT_REFRESH_TOKEN_NAME, JWT_TOKEN_NAME } from 'api/config'

export const UserDropdown = () => {
    const { user } = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const logoutHandler = () => {
        dispatch(logout())
        Cookies.remove(JWT_TOKEN_NAME)
        Cookies.remove(JWT_REFRESH_TOKEN_NAME)
        navigate('/user/logon', {
            replace: true,
        })
        dispatch(baseApi.util.resetApiState())
    }

    return (
        <OutsideClickHandler
            display="contents"
            onOutsideClick={() => setIsMenuOpen(false)}
        >
            <UserSelectorContainerStyled>
                <UserSelectorStyled
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    open={isMenuOpen}
                >
                    <AvatarFillIcon className="avatar" />
                    <UserTitleStyled>{user?.fullName || ''}</UserTitleStyled>
                    <ArrowBottomIcon className="arrow" />
                </UserSelectorStyled>
                {isMenuOpen && (
                    <UserMenuStyled open={isMenuOpen}>
                        <li>
                            <UserMenuItemStyled
                                onClick={() => {
                                    navigate('/pages/user/cabinet', {
                                        replace: true,
                                    })
                                    setIsMenuOpen(false)
                                }}
                            >
                                <AvatarOutlineIcon />
                                <ItemTitleStyled>Мой профиль</ItemTitleStyled>
                            </UserMenuItemStyled>
                        </li>
                        <li>
                            <UserMenuItemStyled href={`/iso/view`}>
                                <EyeOutlineIcon />
                                <ItemTitleStyled>
                                    Просмотр данных
                                </ItemTitleStyled>
                            </UserMenuItemStyled>
                        </li>
                        <li>
                            <UserMenuItemStyled
                                as="div"
                                onClick={logoutHandler}
                            >
                                <LogoutIcon />
                                <ItemTitleStyled>Выход</ItemTitleStyled>
                            </UserMenuItemStyled>
                        </li>
                    </UserMenuStyled>
                )}
            </UserSelectorContainerStyled>
        </OutsideClickHandler>
    )
}
