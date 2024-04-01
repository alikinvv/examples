export interface ApprovePerformProps {
    editableExecution: boolean
    executor?: string
    executionDate?: string
    whatToDelete?: string
    isLoading: boolean
    onApproveClick: () => any
    onRemoveClick: () => any
}

export type ModalTypes = 'confirm' | 'delete' | null
