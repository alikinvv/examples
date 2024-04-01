import { FC } from 'react'
import {
    ContainerStyled,
    ColorsStyled,
    ListStyled,
    ListItemStyled,
    IconCrossWrapperStyled,
    IconCrossStyled,
} from './styles'
import { useAppDispatch } from 'hooks'
import { createUserSettings, setThemeColor } from 'store/settings'
import {
    BackgroundsProps,
    ChangeColorClickHandlerProps,
    PanelProps,
} from './types'

export const backgrounds: BackgroundsProps[] = [
    {
        value: 'default',
        title: 'Default',
        bg: '#333438',
    },
    {
        value: 'darkblue',
        title: 'Dark Blue',
        bg: '#2b3643',
    },
    {
        value: 'blue',
        title: 'Blue',
        bg: '#2D5F8B',
    },
    {
        value: 'grey',
        title: 'Grey',
        bg: '#697380',
    },
    {
        value: 'light',
        title: 'Light',
        bg: '#F9FAFD',
    },
    {
        value: 'light2',
        title: 'Light 2',
        bg: '#F1F1F1',
    },
]

export const Panel: FC<PanelProps> = ({ isOpen, handleClose, settings }) => {
    const dispatch = useAppDispatch()
    const { themeColor } = settings

    const changeColorClickHandler: ChangeColorClickHandlerProps = (color) => {
        const data = {
            ...settings,
            themeColor: color,
        }
        dispatch(setThemeColor(color))
        dispatch(createUserSettings(data))
    }

    return (
        <ContainerStyled isOpen={isOpen}>
            <ColorsStyled>
                <ListStyled>
                    {backgrounds.map((item, index) => {
                        return (
                            <ListItemStyled
                                key={`${item.value}_${index + 1}`}
                                background={item.bg}
                                isActive={item.value === themeColor}
                                onClick={() =>
                                    changeColorClickHandler(item.value)
                                }
                            />
                        )
                    })}
                </ListStyled>
            </ColorsStyled>
            <IconCrossWrapperStyled onClick={handleClose}>
                <IconCrossStyled />
            </IconCrossWrapperStyled>
        </ContainerStyled>
    )
}
