import type { Property } from 'csstype'
import { colors } from 'react_component'

interface BaseThemeProps {
    accent: Property.Color
    accentDark: Property.Color
    accentLight: Property.Color
    env: EnvProps
}

export const baseTheme: BaseThemeProps = {
    accent: colors.steelBlue,
    accentDark: colors.steelBlueDark,
    accentLight: colors.steelBlueLight,
    env: process.env,
}

interface EnvProps {
    NODE_ENV?: string
    PUBLIC_URL?: string
    FAST_REFRESH?: boolean
    REACT_APP_API_URL?: string
    REACT_APP_STAGE?: string
}
