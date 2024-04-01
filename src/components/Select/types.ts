import { FocusEventHandler, KeyboardEvent } from 'react'
import { ActionMeta, InputActionMeta } from 'react-select'

export interface CustomSelectEventProps {
    selectProps?: { hasError: boolean }
    isFocused: boolean
    isSelected: boolean
    isDisabled: boolean
    titleByKey?: string
}

export interface SelectProps<T> {
    options?: T[]
    value: T | T[] | null | undefined
    isDisabled?: boolean
    placeholder?: string
    titleByKey?: string
    isSearchable?: boolean
    isClearable?: boolean
    isCreatable?: boolean
    isMulti?: boolean
    filterByLabel?: boolean
    name?: string
    inputValue?: string
    onCloseResetsInput?: boolean
    onBlurResetsInput?: boolean
    formatCreateLabel?: (inputValue: string) => string
    onBlur?: FocusEventHandler
    getOptionLabel?(option: T): string | number | null | undefined
    getOptionValue?(option: T): string | number | boolean | null | undefined
    onChange?(option: T, actionMeta: ActionMeta<T>): void
    onInputChange?(newValue: string, actionMeta: InputActionMeta): void
    onInputKeyDown?(e: KeyboardEvent<HTMLElement>): void
    hasError?: boolean
    menuIsOpen?: boolean
    maxMenuHeight?: number
    menuPlacement?: string
    hideSelectedOptions?: boolean
    isLoading?: boolean
    orgUnitTreeView?: boolean
}
