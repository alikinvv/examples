import styled from 'styled-components'
import { CSSProperties } from 'react'
import { CustomSelectEventProps } from './types'
import { colors } from '../../colorPalette'

export const customStyles: any = {
    container: (styles: CSSProperties) => ({
        ...styles,
        width: '100%',
    }),
    indicatorSeparator: () => ({
        visibility: 'none',
    }),
    control: (
        styles: CSSProperties,
        { selectProps, isFocused, isDisabled }: CustomSelectEventProps,
    ) => {
        return {
            ...styles,
            border: `1px solid ${
                selectProps?.hasError
                    ? colors.red
                    : isFocused
                    ? colors.gray
                    : colors.grayLight
            }`,
            borderRadius: '0px',
            boxShadow: 'none',
            minHeight: '32px',
            maxHeight: '110px',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: isDisabled ? colors.grayExtraLight : colors.white,
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: colors.grayExtraLight,

            '&::-webkit-scrollbar': {
                width: '4px',
                height: '4px',
            },

            '&::-webkit-scrollbar-track': {
                backgroundColor: colors.grayExtraLight,
            },

            '&::-webkit-scrollbar-thumb': {
                background: colors.gray,
            },

            '&:hover': {
                border: `1px solid ${
                    selectProps?.hasError
                        ? colors.red
                        : isFocused
                        ? colors.gray
                        : colors.grayLight
                } !important`,
            },
        }
    },
    placeholder: (
        styles: CSSProperties,
        { selectProps }: CustomSelectEventProps,
    ) => {
        return {
            ...styles,
            color: selectProps?.hasError ? colors.red : colors.grayDark,
            marginLeft: 0,
        }
    },
    dropdownIndicator: (
        styles: CSSProperties,
        { selectProps, isFocused }: CustomSelectEventProps,
    ) => ({
        ...styles,
        padding: '0 4px 0 0',
        path: {
            transition: 'all 100ms',
            fill: selectProps?.hasError
                ? colors.red
                : isFocused
                ? colors.gray
                : colors.grayLight,
        },
    }),
    indicatorsContainer: (styles: CSSProperties) => ({
        ...styles,
        alignItems: 'center',

        '& > div:not([class$=indicatorContainer])': {
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',

            '&:hover path': {
                fill: colors.grayDark,
            },

            svg: {
                width: '16px',
                height: '16px',
                fill: 'none',

                path: {
                    transition: 'all 100ms',
                    fill: colors.gray,
                },
            },
        },
    }),
    clearIndicator: (
        styles: CSSProperties,
        { isFocused }: CustomSelectEventProps,
    ) => ({
        ...styles,
        padding: 0,
        transition: 'all 100ms',
        color: colors.white,
        position: 'relative',
        width: '20px',
        height: '20px',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    option: (
        styles: CSSProperties,
        { isSelected }: CustomSelectEventProps,
    ) => ({
        ...styles,
        background: isSelected ? colors.gray : colors.white,
        color: colors.blackLight,
        cursor: 'pointer',
        width: '100%',
        wordWrap: 'break-word',

        '&:hover': {
            background: isSelected ? colors.gray : colors.grayLight,
        },
    }),
    valueContainer: (styles: CSSProperties) => ({
        ...styles,
        padding: '2px 7px',
    }),
    input: (styles: CSSProperties) => ({
        ...styles,
        margin: 0,
    }),
    menu: (styles: CSSProperties) => ({
        ...styles,
        borderRadius: '0px',
        paddingTop: '4px',
        paddingBottom: '4px',
    }),
    menuPortal: (styles: CSSProperties) => ({
        ...styles,
        zIndex: 10,
    }),
    menuList: (styles: CSSProperties) => ({
        ...styles,
        scrollbarWidth: 'thin',
        scrollbarColor: colors.grayExtraLight,
        padding: 0,

        '&::-webkit-scrollbar': {
            width: '4px',
        },

        '&::-webkit-scrollbar-track': {
            backgroundColor: colors.grayExtraLight,
        },

        '&::-webkit-scrollbar-thumb': {
            background: colors.gray,
        },
    }),
    singleValue: (styles: CSSProperties) => ({
        ...styles,
        marginLeft: 0,
    }),
    multiValue: (styles: CSSProperties) => ({
        ...styles,
        height: '22px',
        alignItems: 'center',
        background: colors.grayLight,
        color: colors.blackLight,
        overflow: 'hidden',

        '& > div': {
            fontSize: '14px',
        },

        '[role="button"]': {
            height: '100%',
            color: colors.grayExtraDark,

            '&:hover': {
                background: colors.gray,
                color: colors.blackLight,
            },
        },
    }),
}

export const OptionWrapperStyled = styled.div<{
    unitLevel: number
    isSelected?: CustomSelectEventProps
    orgUnitTreeView?: boolean
}>`
    & > div {
        padding-left: ${({ unitLevel, orgUnitTreeView = false }) =>
            orgUnitTreeView && unitLevel > 1
                ? `${unitLevel === 3 ? (unitLevel + 1) * 15 : unitLevel * 15}px`
                : '10px'};
        font-weight: ${({ unitLevel, orgUnitTreeView }) =>
            orgUnitTreeView && (unitLevel === 0 || unitLevel) === 1
                ? `bold`
                : 'inherit'};
    }
`
