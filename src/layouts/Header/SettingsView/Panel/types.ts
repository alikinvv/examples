import { ThemeColorProps } from 'react_component'
import { SettingsInitialStateProps } from 'store/settings/types'

export interface PanelProps {
    isOpen: boolean
    handleClose: () => void
    settings: SettingsInitialStateProps
}

export interface BackgroundsProps {
    value: ThemeColorProps
    title: string
    bg: string
}

export type ChangeColorClickHandlerProps = (color: ThemeColorProps) => void
