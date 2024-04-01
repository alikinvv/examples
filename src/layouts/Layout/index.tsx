import { Outlet, useLocation } from 'react-router-dom'
import { LayoutStyled } from './styles'
import { Sidebar } from 'layouts/Sidebar'
import { Main } from 'layouts/Main'
import { Header } from 'layouts/Header'
import { Content } from 'layouts/Content'
import { useAppDispatch, useAppSelector, useAuth, useUserSettings } from 'hooks'
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react'
import { getAuth } from 'store/auth'
import { getMenus } from 'store/routes'
import { setSeo } from 'store/seo'
import { UserGetMenusProps } from 'services'
import { WritableDraft } from 'immer/dist/internal'
import { HelmetSEO, ScrollTopArrow } from 'components'
import { getUserSettings } from 'store/settings'
import { ThemeProvider } from 'styled-components'
import {
    BreadcrumbsBlock,
    Providers,
    ThemeColorProps,
    colorSchemes,
} from 'react_component'
import { baseTheme } from 'theme.config'

export const Layout = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const { user } = useAuth()
    const { isSidebarOpen, themeColor } = useUserSettings()
    const { paths } = useAppSelector((state) => state.routes)
    const { sectionTitle, pageTitle } = useAppSelector((state) => state.seo)
    const settings = useMemo(
        () => ({
            '0': 'Главная',
            '1': sectionTitle as string,
            '2': pageTitle as string,
        }),
        [sectionTitle, pageTitle],
    )

    /**
     * Получаем данные для SEO учитывая текущий url
     */
    const getSEO = (paths: WritableDraft<UserGetMenusProps>[]) => {
        if (paths) {
            return paths.reduce((result, menuItem) => {
                const res =
                    location.pathname.search(`${menuItem.url}(/|$)`) !== -1
                        ? menuItem
                        : menuItem?.tabs?.find(
                              (subMenuItem) =>
                                  location.pathname.search(
                                      `${subMenuItem.url}(/|$)`,
                                  ) !== -1,
                          )
                if (res)
                    result = {
                        sectionTitle: menuItem.title,
                        sectionDescription: menuItem.description,
                        sectionUrl: menuItem.url,
                        pageTitle: res.title,
                        pageDescription: res.description,
                        pageUrl: res.url,
                    }
                return result
            }, {})
        }
        return {}
    }

    useEffect(() => {
        !user && dispatch(getAuth())
        dispatch(getMenus())
        dispatch(getUserSettings())
    }, [])

    useLayoutEffect(() => {
        if (!!paths.length) {
            const res = getSEO(paths)
            dispatch(setSeo(res))
        }
    }, [location, paths])

    const generateTheme = useCallback((themeColor: ThemeColorProps) => {
        const currentScheme = colorSchemes[themeColor || 'default']
        const {
            primaryBg,
            primaryColor,
            headerColor,
            headerHoverBg,
            sidebarActiveBg,
            sidebarHoverBg,
            sidebarSecondaryHoverBg,
            sidebarBorderColor,
            dropdownColor,
            dropdownBg,
            dropdownHoverBg,
            dropdownDividerColor,
            iconColor,
            headerBg,
            footerColor,
            burgerColor,
        } = currentScheme

        return {
            header: {
                bg: headerBg,
                hoverBg: headerHoverBg,
                color: headerColor,
                burgerColor,
            },
            sidebar: {
                bg: primaryBg,
                color: primaryColor,
                iconColor,
                hoverBg: sidebarHoverBg,
                secondaryHoverBg: sidebarSecondaryHoverBg,
                activeBg: sidebarActiveBg,
                borderColor: sidebarBorderColor,
            },
            footer: {
                bg: primaryBg,
                color: footerColor,
            },
            dropdown: {
                bg: dropdownBg,
                hoverBg: dropdownHoverBg,
                dividerColor: dropdownDividerColor,
                color: dropdownColor,
            },
        }
    }, [])

    const [currentTheme, setCurrentTheme] = useState(generateTheme(themeColor))

    useEffect(() => {
        setCurrentTheme(generateTheme(themeColor))
    }, [generateTheme, themeColor])

    return (
        <ThemeProvider theme={{ ...currentTheme, ...baseTheme }}>
            <LayoutStyled isSidebarOpen={isSidebarOpen}>
                <HelmetSEO />
                <Sidebar />
                <Main>
                    <Header />
                    <Providers>
                        <BreadcrumbsBlock settings={settings} />
                        <Content>
                            <Outlet />
                        </Content>
                    </Providers>
                </Main>
                <ScrollTopArrow />
            </LayoutStyled>
        </ThemeProvider>
    )
}
