import {
    ConditionProps,
    ExecutionProps,
    InspectionProps,
    PaginationParamsProps,
    ResponsibleProps,
} from 'types'

export interface FeedGetMaterialDiscrepanciesParamsProps
    extends PaginationParamsProps {
    companyId?: number
    orgUnitId?: number
    conditionId?: number
    materialId?: string
    material?: string
    discrepancyNum?: string
    startDate?: string
    endDate?: string
    creatorTabNum?: string
    creatorFullName?: string
    description?: string
    causeId?: number
}

export interface FeedGetMaterialDiscrepanciesProps {
    companyId: number
    company: string
    discrepancyId: number
    discrepancyNum: string
    discrepancy: string
    description: string
    discrepancyDate: string
    orgUnitId: number
    orgUnit: string
    materialId: string
    material: string
    editable: boolean
    editableChange: boolean
    editablePhoto: boolean
    creator: ResponsibleProps
    condition: ConditionProps
    rejection: FeedGetMaterialDiscrepanciesRejectionProps
    files: FeedGetMaterialDiscrepanciesFileProps[]
    undertakings: FeedGetMaterialDiscrepanciesUndertakingProps[]
    causes: FeedGetMaterialDiscrepanciesCauseProps[]
}

export interface FeedGetMaterialDiscrepanciesRejectionProps {
    cause: string
    fullName: string
    rejectionDate: string
}

export interface FeedGetMaterialDiscrepancyPassportProps {
    generalInfo: FeedGetMaterialDiscrepancyPassportGeneralInfoProps
    undertakings: FeedGetMaterialDiscrepancyUndertakingsProps[]
}

interface FeedGetMaterialDiscrepancyPassportGeneralInfoProps {
    companyId: number
    discrepancyId: number
    discrepancyNum: string
    discrepancy: string
    description: string
    discrepancyDate: string
    orgUnitId: number
    orgUnit: string
    materialId: string
    material: string
    editable: boolean
    editableChange: boolean
    editablePhoto: boolean
    creator: ResponsibleProps
    condition: ConditionProps
    rejection: FeedCreateMaterialDiscrepancyRejectionParamsProps
    files: FeedGetMaterialDiscrepancyPassportUndertakingFileProps[]
    undertakings: FeedGetMaterialDiscrepanciesUndertakingProps
    causes: FeedGetMaterialDiscrepancyPassportGeneralInfoCauseProps[]
}

interface FeedGetMaterialDiscrepancyPassportGeneralInfoCauseProps {
    causeSeq: number
    causeId: number
    cause: string
    discrepancyCause: string
}

interface FeedGetMaterialDiscrepancyPassportUndertakingFileProps {
    fileId: number
    url: string
    urlSmall: string
    fileName: string
}

export interface FeedGetMaterialDiscrepancyUndertakingsProps {
    companyId: number
    company: string
    discrepancyId: number
    discrepancyNum: string
    discrepancy: string
    discrepancyDate: string
    insertDate: string
    orgUnitId: number
    orgUnit: string
    materialId: string
    material: string
    undertakingId: number
    undertaking: string
    undertakingDate: string
    responsible: ResponsibleProps
    redirectResponsible: ResponsibleProps
    execution?: FeedGetMaterialDiscrepancyPassportUndertakingExecutionProps
    inspection?: InspectionProps
    condition: ConditionProps
    creator: ResponsibleProps
    files?: FeedGetMaterialDiscrepancyPassportUndertakingFileProps[]
    discrepancyFiles?: FeedGetMaterialDiscrepancyPassportUndertakingFileProps[]
    editable: boolean
    editableExecution: boolean
    editablePhoto: boolean
}

export interface FeedGetMaterialDiscrepancyPassportUndertakingExecutionProps
    extends ExecutionProps {
    note?: string
}

export interface FeedCreateMaterialDiscrepancyUndertakingExecutionParamsProps {
    undertakingId: number
    currentUser?: ResponsibleProps
    note: string
    files?: FeedCreateMaterialDiscrepancyUndertakingExecutionParamsFileProps[]
}

interface FeedCreateMaterialDiscrepancyUndertakingExecutionParamsFileProps {
    fileName?: string
    mimeType: string
    file: string
}

export interface FeedCreateMaterialDiscrepancyUndertakingParamsProps {
    undertakingId?: number
    discrepancyId: number
    undertaking: string
    undertakingDate: string
    responsible: ResponsibleProps
}

export interface FeedGetMaterialDiscrepancCausesProps {
    discrepancyId: number
    discrepancy: string
    description: string
    causes: FeedGetMaterialDiscrepancCausesCauseProps[]
}

export interface FeedCreateMaterialDiscrepancyCausesParamsProps {
    discrepancyId: number
    causes: FeedCreateMaterialDiscrepancyCausesParamsCauseProps[]
}

interface FeedCreateMaterialDiscrepancyCausesParamsCauseProps {
    causeId?: number
    discrepancyCause?: string
}

export interface FeedGetMaterialDiscrepanciesUndertakingsProps {
    companyId: number
    discrepancyId: number
    discrepancyNum: string
    discrepancy: string
    discrepancyDate: string
    orgUnitId: number
    orgUnit: string
    materialId: string
    material: string
    undertakingId: number
    undertaking: string
    undertakingDate: string
    responsible: ResponsibleProps
    execution: ExecutionProps
    inspection: InspectionProps
    condition: ConditionProps
    creator: ResponsibleProps
    editable: boolean
    editableExecution: boolean
    editablePhoto: boolean
}

interface FeedGetMaterialDiscrepancCausesCauseProps {
    causeSeq: number
    causeId: number
    cause: string
    discrepancyCause: string
}

export interface FeedCreateMaterialDiscrepancyUndertakingInspectionParamsProps {
    executionId: number
    agreed: boolean
}

export interface FeedGetMaterialDiscrepancyUndertakingsParamsProps
    extends PaginationParamsProps {
    companyId?: number
    orgUnitId?: number
    conditionId?: number
    materialId?: string
    material?: string
    discrepancyNum?: string
    startDate?: string
    endDate?: string
    responsibleName?: string
}

interface FeedGetMaterialDiscrepanciesCauseProps {
    causeSeq: number
    causeId: number
    cause: string
    discrepancyCause: string
}

export interface FeedCreateMaterialDiscrepancyRejectionParamsProps {
    discrepancyId: number
    cause: string
}

export interface FeedCreateMaterialDiscrepancyFileParamsProps {
    discrepancyId: number
    mimeType: string
    file: string
    fileName: string
}

interface FeedGetMaterialDiscrepanciesUndertakingProps {
    companyId: number
    discrepancyId: number
    discrepancyNum: string
    discrepancy: string
    discrepancyDate: string
    orgUnitId: number
    orgUnit: string
    materialId: string
    material: string
    undertakingId: number
    undertaking: string
    undertakingDate: string
    responsible: ResponsibleProps
    redirectResponsible?: ResponsibleProps
    execution: ExecutionProps
    inspection: InspectionProps
    condition: ConditionProps
    creator: ResponsibleProps
    editable: boolean
    editableExecution: boolean
    editablePhoto: boolean
    files: FeedGetMaterialDiscrepancyPassportUndertakingFileProps[]
}

interface FeedGetMaterialDiscrepanciesFileProps {
    fileId: number
    url: string
    urlSmall: string
    fileName: string
}

export interface CreateFeedbackMaterialDiscrepancyUndertakingsFileParamsProps {
    undertakingId: number
    currentUser?: ResponsibleProps
    files: FeedCreateMaterialDiscrepancyUndertakingExecutionParamsFileProps[]
}
