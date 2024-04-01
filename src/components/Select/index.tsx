import { CSSProperties } from 'react'
import ReactSelect, {
    ClearIndicatorProps,
    components,
    ControlProps,
    MultiValueGenericProps,
    OptionProps,
} from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { customStyles, OptionWrapperStyled } from './styles'
import { Close2Icon } from '../../assets/icons'
import { SelectProps } from './types'
export { SelectProps } from './types'

const NoOptionsMessage = (props: any) => {
    return (
        <components.NoOptionsMessage {...props}>
            <span>Нет информации</span>
        </components.NoOptionsMessage>
    )
}

const ClearIndicator = (props: ClearIndicatorProps & any) => {
    const {
        getStyles,
        innerProps: { ref, ...restInnerProps },
    } = props
    return (
        <div
            {...restInnerProps}
            style={getStyles('clearIndicator', props) as CSSProperties}
        >
            <Close2Icon />
        </div>
    )
}

const Control = (props: ControlProps & any) => {
    const label =
        props.selectProps?.value?.[props.selectProps?.titleByKey] ||
        props.selectProps.getOptionLabel(props.selectProps.value || {})
    return (
        <div title={label}>
            <components.Control {...props} />
        </div>
    )
}

const Option = (props: OptionProps & any) => {
    const label =
        props.data?.[props.selectProps?.titleByKey] ||
        props.data?.description ||
        props.data?.title ||
        props?.label

    return (
        <OptionWrapperStyled
            unitLevel={props.data.unitLevel}
            title={label}
            orgUnitTreeView={props?.selectProps?.orgUnitTreeView || false}
        >
            <components.Option {...props} />
        </OptionWrapperStyled>
    )
}

const MultiValueLabel = (props: MultiValueGenericProps & any) => {
    const label = props.data?.[props.selectProps?.titleByKey] || props?.label
    return (
        <div title={label}>
            <components.MultiValueLabel {...props} />
        </div>
    )
}

export const Select: <T>(
    p: SelectProps<T>,
) => React.ReactElement<SelectProps<T>> = ({
    options,
    placeholder = 'Выберите',
    onChange,
    filterByLabel,
    isClearable = true,
    isCreatable,
    ...props
}) => {
    const { hasError } = props
    return isCreatable ? (
        <CreatableSelect
            placeholder={placeholder}
            options={options}
            isClearable={isClearable}
            styles={customStyles}
            hasError={hasError}
            // @ts-ignore
            onChange={onChange}
            menuPosition="fixed"
            formatCreateLabel={(value) => `Создать "${value}"`}
            {...props}
            components={{
                Control,
                Option,
                NoOptionsMessage,
                ClearIndicator,
            }}
        />
    ) : (
        <ReactSelect
            placeholder={placeholder}
            options={options}
            isClearable={isClearable}
            styles={customStyles}
            hasError={hasError}
            // @ts-ignore
            onChange={onChange}
            menuPosition="fixed"
            classNamePrefix="react-select"
            loadingMessage={() => 'Загрузка...'}
            filterOption={
                filterByLabel
                    ? (option: any, value: string): boolean =>
                          (option.label.toString().match(value) || []).length >
                          0
                    : undefined
            }
            {...props}
            components={{
                Control,
                Option,
                NoOptionsMessage,
                ClearIndicator,
                MultiValueLabel,
            }}
        />
    )
}
