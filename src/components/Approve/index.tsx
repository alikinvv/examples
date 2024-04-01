import { ButtonGroup } from '../ButtonGroup'
import { FC } from 'react'
import { ApproveProps } from './types'
import { ButtonSquare } from '../ButtonSquare'

export * from './ApproveCheck'
export * from './ApprovePerform'

export const Approve: FC<ApproveProps> = ({
    onApproveClick,
    onDisapproveClick,
    hideApprove,
    hideDisapprove,
}) => {
    return (
        <ButtonGroup align="start">
            {onApproveClick && !hideApprove && (
                <ButtonSquare
                    iconColor="green"
                    icon="thumbsUp"
                    width="38px"
                    onClick={onApproveClick}
                />
            )}
            {onDisapproveClick && !hideDisapprove && (
                <ButtonSquare
                    icon="thumbsDown"
                    iconColor="red"
                    width="38px"
                    onClick={onDisapproveClick}
                />
            )}
        </ButtonGroup>
    )
}
