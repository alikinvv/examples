import { FileProps, PaginatedResponse, TypesMessageProps } from 'types'
import { baseApi } from 'store/api/baseApi'
import {
    FeedCreateMaterialDiscrepancyUndertakingParamsProps,
    FeedCreateMaterialDiscrepancyCausesParamsProps,
    FeedCreateMaterialDiscrepancyFileParamsProps,
    FeedCreateMaterialDiscrepancyRejectionParamsProps,
    FeedCreateMaterialDiscrepancyUndertakingExecutionParamsProps,
    FeedCreateMaterialDiscrepancyUndertakingInspectionParamsProps,
    FeedGetMaterialDiscrepancCausesProps,
    FeedGetMaterialDiscrepanciesParamsProps,
    FeedGetMaterialDiscrepanciesProps,
    FeedGetMaterialDiscrepanciesUndertakingsProps,
    FeedGetMaterialDiscrepancyPassportProps,
    FeedGetMaterialDiscrepancyUndertakingsParamsProps,
    FeedGetMaterialDiscrepancyUndertakingsProps,
    CreateFeedbackMaterialDiscrepancyUndertakingsFileParamsProps,
} from './types'

const apiWithTags = baseApi.enhanceEndpoints({
    addTagTypes: ['EventList'],
})

export const feedbackApi = apiWithTags.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getMaterialDiscrepancies: query<
            PaginatedResponse<FeedGetMaterialDiscrepanciesProps[]>,
            FeedGetMaterialDiscrepanciesParamsProps | undefined
        >({
            query: (params) => ({
                url: `/v1/feedback/material/discrepancies`,
                params,
            }),
            providesTags: ['EventList'],
        }),
        getMaterialDiscrepancy: query<
            FeedGetMaterialDiscrepanciesProps,
            number
        >({
            query: (discrepancyId) => ({
                url: `/v1/feedback/material/discrepancies/${discrepancyId}`,
            }),
            providesTags: ['EventList'],
        }),
        getMaterialDiscrepancyUndertakings: query<
            PaginatedResponse<FeedGetMaterialDiscrepancyUndertakingsProps[]>,
            FeedGetMaterialDiscrepancyUndertakingsParamsProps | undefined
        >({
            query: (params) => ({
                url: `/v1/feedback/material/discrepancy/undertakings`,
                params,
            }),
            providesTags: ['EventList'],
        }),
        getMaterialDiscrepancyUndertaking: query<
            FeedGetMaterialDiscrepancyUndertakingsProps,
            number
        >({
            query: (undertakingId) => ({
                url: `/v1/feedback/material/discrepancy/undertakings/${undertakingId}`,
            }),
            providesTags: ['EventList'],
        }),
        getMaterialDiscrepancyPassport: query<
            FeedGetMaterialDiscrepancyPassportProps,
            number
        >({
            query: (discrepancyId) => ({
                url: `/v1/feedback/material/discrepancies/${discrepancyId}/passport`,
            }),
            providesTags: ['EventList'],
        }),
        getMaterialDiscrepanciesUndertakings: query<
            FeedGetMaterialDiscrepanciesUndertakingsProps[],
            number
        >({
            query: (discrepancyId) => ({
                url: `/v1/feedback/material/discrepancies/${discrepancyId}/undertakings`,
            }),
            providesTags: ['EventList'],
        }),
        getMaterialDiscrepancyCauses: query<
            FeedGetMaterialDiscrepancCausesProps,
            number
        >({
            query: (discrepancyId) => ({
                url: `/v1/feedback/material/discrepancies/${discrepancyId}/causes`,
            }),
            providesTags: ['EventList'],
        }),
        deleteMaterialDiscrepancy: mutation<TypesMessageProps, number>({
            query: (discrepancyId) => ({
                url: `/v1/feedback/material/discrepancies/${discrepancyId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['EventList'],
        }),
        deleteMaterialDiscrepancyUndertakingExecution: mutation<
            TypesMessageProps,
            number
        >({
            query: (executionId) => ({
                url: `/v1/feedback/material/discrepancy/undertaking/executions/${executionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['EventList'],
        }),
        deleteMaterialDiscrepancyUndertakingInspection: mutation<
            TypesMessageProps,
            number
        >({
            query: (inspectionId) => ({
                url: `/v1/feedback/material/discrepancy/undertaking/inspections/${inspectionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['EventList'],
        }),
        deleteMaterialDiscrepancyUndertaking: mutation<
            TypesMessageProps,
            number
        >({
            query: (undertakingId) => ({
                url: `/v1/feedback/material/discrepancy/undertakings/${undertakingId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['EventList'],
        }),
        createMaterialDiscrepancyFile: mutation<
            TypesMessageProps,
            FeedCreateMaterialDiscrepancyFileParamsProps
        >({
            query: (body) => ({
                url: `/v1/feedback/material/discrepancies/${body.discrepancyId}/files`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['EventList'],
        }),
        updateMaterialDiscrepancyUndertaking: mutation<
            TypesMessageProps,
            FeedCreateMaterialDiscrepancyUndertakingParamsProps
        >({
            query: (body) => ({
                url: `/v1/feedback/material/discrepancy/undertakings`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['EventList'],
        }),
        createMaterialDiscrepancyUndertaking: mutation<
            TypesMessageProps,
            FeedCreateMaterialDiscrepancyUndertakingParamsProps
        >({
            query: (body) => ({
                url: `/v1/feedback/material/discrepancy/undertakings`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['EventList'],
        }),
        createMaterialDiscrepancyRejection: mutation<
            TypesMessageProps,
            FeedCreateMaterialDiscrepancyRejectionParamsProps
        >({
            query: (body) => ({
                url: `/v1/feedback/material/discrepancies/${body.discrepancyId}/rejections`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['EventList'],
        }),
        createMaterialDiscrepancyUndertakingExecution: mutation<
            TypesMessageProps,
            FeedCreateMaterialDiscrepancyUndertakingExecutionParamsProps
        >({
            query: (body) => ({
                url: `/v1/feedback/material/discrepancy/undertaking/executions`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['EventList'],
        }),
        createMaterialDiscrepancyUndertakingInspection: mutation<
            TypesMessageProps,
            FeedCreateMaterialDiscrepancyUndertakingInspectionParamsProps
        >({
            query: (body) => ({
                url: `/v1/feedback/material/discrepancy/undertaking/inspections`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['EventList'],
        }),
        createMaterialDiscrepancyCauses: mutation<
            TypesMessageProps,
            FeedCreateMaterialDiscrepancyCausesParamsProps
        >({
            query: (body) => ({
                url: `/v1/feedback/material/discrepancy/causes`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['EventList'],
        }),

        createFeedbackMaterialDiscrepancyUndertakingsFile: mutation<
            FileProps,
            CreateFeedbackMaterialDiscrepancyUndertakingsFileParamsProps
        >({
            query: (body) => ({
                url: `/v1/feedback/material/discrepancy/undertakings/${body.undertakingId}/files`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['EventList'],
        }),
        deleteFeedbackMaterialDiscrepancyUndertakingFile: mutation<
            TypesMessageProps,
            number
        >({
            query: (fileId) => ({
                url: `/v1/feedback/material/discrepancy/undertaking/files/${fileId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['EventList'],
        }),
    }),
})

export const {
    useGetMaterialDiscrepanciesQuery,
    useDeleteMaterialDiscrepancyMutation,
    useCreateMaterialDiscrepancyFileMutation,
    useCreateMaterialDiscrepancyRejectionMutation,
    useGetMaterialDiscrepancyPassportQuery,
    useGetMaterialDiscrepancyUndertakingsQuery,
    useDeleteMaterialDiscrepancyUndertakingMutation,
    useDeleteMaterialDiscrepancyUndertakingExecutionMutation,
    useDeleteMaterialDiscrepancyUndertakingInspectionMutation,
    useCreateMaterialDiscrepancyUndertakingExecutionMutation,
    useCreateMaterialDiscrepancyUndertakingInspectionMutation,
    useGetMaterialDiscrepancyUndertakingQuery,
    useUpdateMaterialDiscrepancyUndertakingMutation,
    useCreateMaterialDiscrepancyUndertakingMutation,
    useGetMaterialDiscrepancyCausesQuery,
    useCreateMaterialDiscrepancyCausesMutation,
    useGetMaterialDiscrepanciesUndertakingsQuery,
    useGetMaterialDiscrepancyQuery,
    useCreateFeedbackMaterialDiscrepancyUndertakingsFileMutation,
    useDeleteFeedbackMaterialDiscrepancyUndertakingFileMutation,
} = feedbackApi
