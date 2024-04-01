import { FC, useState } from 'react'

import { Grid, Pagination, PaginationItemsNum } from 'react_component'
import GridItem from '../GridItem'
import ViewModal from '../ViewModal'

import { GridViewProps } from './types'

import {
    GetVideoAnalyticCamerasProps,
    useGetVideoAnalyticCamerasQuery,
} from 'store/api'

const GridView: FC<GridViewProps> = ({ filters, paginationChangeHandler }) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [camera, setCamera] = useState<GetVideoAnalyticCamerasProps | null>(
        null,
    )
    const { data: cameras } = useGetVideoAnalyticCamerasQuery(filters)

    return (
        <>
            {!!cameras?.items.length && (
                <PaginationItemsNum
                    config={cameras.pagination}
                    onPageChange={paginationChangeHandler}
                    nums={[20, 40, 60]}
                />
            )}
            <Grid template="repeat(5, 1fr)" gap="32px 32px" alignItems="normal">
                {!!cameras?.items?.length &&
                    cameras.items.map((camera) => (
                        <GridItem
                            key={camera.cameraId}
                            {...{ camera, setCamera, setShowModal }}
                        />
                    ))}
            </Grid>
            {cameras?.pagination && (
                <Pagination
                    style={{ marginBottom: 0 }}
                    config={cameras.pagination}
                    onPageChange={paginationChangeHandler}
                />
            )}

            {camera && showModal && (
                <ViewModal {...{ showModal, setShowModal, camera }} />
            )}
        </>
    )
}

export default GridView
