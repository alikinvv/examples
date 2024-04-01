import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SidebarConditionProps, SettingsInitialStateProps } from './types'
import { ManagGetUserSettingsProps, ManagementService } from 'services'
import { TypesMessageProps } from 'types'
import { ThemeColorProps } from 'react_component'

export const getUserSettings = createAsyncThunk<ManagGetUserSettingsProps>(
    'settings/getUserSettings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await ManagementService.getUserSettings()
            return response.data
        } catch (err) {
            return rejectWithValue(err)
        }
    },
)

export const createUserSettings = createAsyncThunk<
    TypesMessageProps,
    Partial<ManagGetUserSettingsProps>
>('settings/createUserSettings', async (data, { rejectWithValue }) => {
    try {
        const response = await ManagementService.createUserSettings(data)
        return response.data
    } catch (err) {
        return rejectWithValue(err)
    }
})

const initialState: SettingsInitialStateProps = {
    themeColor: 'default',
    sidebarCondition: 'close',
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSidebarCondition: (
            state,
            action: PayloadAction<SidebarConditionProps>,
        ) => {
            state.sidebarCondition = action.payload
        },
        setThemeColor: (state, action: PayloadAction<ThemeColorProps>) => {
            state.themeColor = action.payload
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(getUserSettings.fulfilled, (state, { payload }) => {
            state.themeColor = payload.themeColor
            state.sidebarCondition = payload.sidebarCondition
        })
    },
})

export const { setSidebarCondition, setThemeColor } = settingsSlice.actions
export default settingsSlice.reducer
