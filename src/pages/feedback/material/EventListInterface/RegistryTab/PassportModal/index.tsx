import { FC } from 'react'

import {
    Description,
    Execution,
    FileViewer,
    Flex,
    Grid,
    Inspection,
    Modal,
    Table,
    Td,
    Texter,
    Tr,
} from 'components'

import { ModalProps } from './types'

import { useGetMaterialDiscrepancyPassportQuery } from 'store/api'

const PassportModal: FC<ModalProps> = ({
    showPassportModal,
    setShowPassportModal,
    discrepancyId,
}) => {
    const {
        data: discrepancy,
        isLoading,
        isFetching,
    } = useGetMaterialDiscrepancyPassportQuery(discrepancyId)

    return (
        <Modal
            isOpen={showPassportModal}
            handleConfirm={() => {}}
            handleClose={() => setShowPassportModal(false)}
            title={`Обращение ${discrepancy?.generalInfo?.discrepancyNum}`}
            size="extraLarge"
            marginBottom
            hideOk
            isLoading={isLoading || isFetching}
        >
            <Grid template="1fr 1fr" gap="32px">
                <Grid gap="20px" marginBottom>
                    <Texter asTitle>Общая информация</Texter>
                    <Description template="140px auto" label="Дата">
                        {discrepancy?.generalInfo?.discrepancyDate}
                    </Description>
                    <Description template="140px auto" label="Подразделение">
                        {discrepancy?.generalInfo?.orgUnit}
                    </Description>
                    <Description template="140px auto" label="Обращение">
                        {discrepancy?.generalInfo?.discrepancy}
                    </Description>
                    <Description template="140px auto" label="МТР / Услуга">
                        {discrepancy?.generalInfo?.materialId} /{' '}
                        {discrepancy?.generalInfo?.material}
                    </Description>
                    <Description template="140px auto" label="Группа причины">
                        {discrepancy?.generalInfo?.causes
                            ?.map((cause) => cause.cause)
                            .join(', ')}
                    </Description>
                    <Description template="140px auto" label="Причина">
                        {discrepancy?.generalInfo?.causes
                            ?.filter((cause) => cause.discrepancyCause)
                            .map((cause) => cause.discrepancyCause)
                            .join(', ')}
                    </Description>
                    <Description template="140px auto" label="Зарегистрировал">
                        {discrepancy?.generalInfo?.creator?.fullName}
                    </Description>
                </Grid>
                <Grid template="1fr 1fr">
                    <div></div>
                    <div>
                        <Texter asTitle marginBottom="8px">
                            Фото до
                        </Texter>
                        {!!discrepancy?.generalInfo?.files?.length && (
                            <FileViewer
                                view="img"
                                imgWidth="280px"
                                imgHeight="280px"
                                files={[
                                    {
                                        fileUrl:
                                            discrepancy.generalInfo.files[0]
                                                .url,
                                    },
                                ]}
                            />
                        )}
                    </div>
                </Grid>
            </Grid>

            {!!discrepancy?.undertakings?.length && (
                <>
                    <Texter asTitle marginBottom="16px">
                        Мероприятия
                    </Texter>
                    <Table
                        header={[
                            { title: 'Мероприятие' },
                            { title: 'Ответственный' },
                            { title: 'Срок выполнения' },
                            { title: 'Выполнил' },
                            { title: 'Проверил' },
                            { title: 'Подтвержд. документ' },
                        ]}
                        rows={discrepancy.undertakings}
                        withoutPoints
                        renderRow={(row) => (
                            <Tr key={row.undertakingId}>
                                <Td>{row.undertaking}</Td>
                                <Td>
                                    {row.responsible?.fullName}

                                    {row.redirectResponsible && (
                                        <div
                                            style={{
                                                marginTop: 16,
                                            }}
                                        >
                                            <Texter fontWeight="600">
                                                Переадресовано
                                            </Texter>
                                            {row.redirectResponsible.fullName}
                                        </div>
                                    )}
                                </Td>
                                <Td>{row.undertakingDate}</Td>
                                <Td>
                                    <Flex flexDirection="column" gap="24px">
                                        <Execution execution={row.execution} />
                                        {row.execution?.note && (
                                            <div>
                                                <Texter
                                                    fontWeight="600"
                                                    display="inline"
                                                >
                                                    Комментарий:
                                                </Texter>{' '}
                                                {row.execution.note}
                                            </div>
                                        )}
                                    </Flex>
                                </Td>
                                <Td>
                                    <Inspection inspection={row.inspection} />
                                </Td>
                                <Td>
                                    {!!row.files?.length && (
                                        <FileViewer
                                            view="files"
                                            files={row.files.map((file) => {
                                                return {
                                                    fileUrl: file.url,
                                                }
                                            })}
                                        />
                                    )}
                                </Td>
                            </Tr>
                        )}
                    />
                </>
            )}
        </Modal>
    )
}

export default PassportModal
