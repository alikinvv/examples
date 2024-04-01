import { PaginationChangeConfigProps } from 'react_component'
import { GetVideoAnalyticCamerasParamsProps } from 'store/api'

export interface GridViewProps {
    filters: GetVideoAnalyticCamerasParamsProps
    paginationChangeHandler: (
        paginationConfig: PaginationChangeConfigProps,
    ) => void
}
