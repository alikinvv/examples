import { FC, useState } from 'react'
import { useAppDispatch, useAuth } from 'hooks'
import OutsideClickHandler from 'react-outside-click-handler'

import { FactoryIcon, ArrowBottomIcon } from 'react_component'

import { changeUserCompany } from 'store/auth'
import {
    PlantItemStyled,
    PlantListStyled,
    PlantSelectContainerStyled,
    PlantSelectorStyled,
    PlantTitleStyled,
} from './styles'
import { CompaniesDropdownProps } from './types'
import { useGetUserCompaniesQuery } from 'store/api'
import { Preloader } from 'components'

const CompaniesDropdown: FC<CompaniesDropdownProps> = () => {
    const dispatch = useAppDispatch()
    const { user } = useAuth()
    const userCompanyId = user?.companyId
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { data: userCompanies } = useGetUserCompaniesQuery()

    const getLabelById = () => {
        return userCompanies?.find(({ companyId }) => {
            return companyId === userCompanyId
        })?.company
    }

    const checkIsActive = (id: number) => {
        return id === userCompanyId
    }

    const clickItemHandler = (value: number) => {
        if (value !== userCompanyId) {
            setIsLoading(true)
            dispatch(changeUserCompany(value))
                .unwrap()
                .finally(() => {
                    setIsLoading(false)
                    window.location.reload()
                })
        }
        setIsOpen(false)
    }

    return (
        <OutsideClickHandler
            display="contents"
            onOutsideClick={() => setIsOpen(false)}
        >
            {!!userCompanies?.length && (
                <PlantSelectContainerStyled>
                    <PlantSelectorStyled
                        onClick={() => setIsOpen(true)}
                        open={isOpen}
                    >
                        <FactoryIcon style={{ width: '13px' }} />
                        <PlantTitleStyled>
                            {getLabelById() || ''}
                        </PlantTitleStyled>
                        <ArrowBottomIcon className="arrow" />
                    </PlantSelectorStyled>
                    <PlantListStyled open={isOpen}>
                        {userCompanies?.map((company) => (
                            <PlantItemStyled
                                onClick={() =>
                                    clickItemHandler(company.companyId)
                                }
                                value={company.companyId}
                                isActive={checkIsActive(company.companyId)}
                                key={`plant_${company.companyId}`}
                                title={company.companyName}
                            >
                                {company.company}
                            </PlantItemStyled>
                        ))}
                    </PlantListStyled>
                </PlantSelectContainerStyled>
            )}
            {isLoading && <Preloader isGlobal />}
        </OutsideClickHandler>
    )
}

export default CompaniesDropdown
