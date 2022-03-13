import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AppState } from 'state'
import fetchFarms from './fetchFarms'

import { SerializedFarmsState } from '../types'

const initialState: SerializedFarmsState = {
  data: [],
  userDataLoaded: false,
}
interface FarmUserDataResponse {
  pid: number
  allowance: string
  tokenBalance: string
  stakedBalance: string
  earnings: string
}

export const fetchFarmUserDataAsync = createAsyncThunk<
  FarmUserDataResponse[],
  { account: string },
  {
    state: AppState
  }
>('farms/fetchFarmUserDataAsync', async ({ account }) => {
  const farms = await fetchFarms(account)
  return farms
})

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update farms with user data
    builder.addCase(fetchFarmUserDataAsync.fulfilled, (state, { payload }) => {
      state.data = payload._listPools
      state.userDataLoaded = false
    })
  },
})

export default farmsSlice.reducer
