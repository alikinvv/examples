import { baseApi } from 'store/api/baseApi'
import {
    FeedGetMaterialDiscrepancyCausesProps,
    FeedGetMaterialDiscrepancyConditionsProps,
} from './types'

const apiWithTags = baseApi.enhanceEndpoints({
    addTagTypes: ['DiscrepancyTypes', 'DiscrepancyCauses'],
})

export const feedbackDictionaryApi = apiWithTags.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getMaterialDiscrepancyConditions: query<
            FeedGetMaterialDiscrepancyConditionsProps[],
            void
        >({
            query: () =>
                `/v1/feedback/material/dictionary/discrepancy/conditions`,
        }),
        getMaterialDictionaryDiscrepancyCauses: query<
            FeedGetMaterialDiscrepancyCausesProps[],
            void
        >({
            query: () => `/v1/feedback/material/dictionary/discrepancy/causes`,
        }),
        getMaterialDiscrepancyUndertakingConditions: query<
            FeedGetMaterialDiscrepancyConditionsProps[],
            void
        >({
            query: () =>
                `/v1/feedback/material/dictionary/discrepancy/undertaking/conditions`,
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetMaterialDiscrepancyConditionsQuery,
    useGetMaterialDictionaryDiscrepancyCausesQuery,
    useGetMaterialDiscrepancyUndertakingConditionsQuery,
} = feedbackDictionaryApi
