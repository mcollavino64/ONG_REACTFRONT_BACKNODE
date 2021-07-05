import { createSlice } from '@reduxjs/toolkit'

export const activitySlice = createSlice({
  name: "activity",
  initialState: {
    id:1,
  },
  reducers: {
    
    setId: (state, action) => {
      state.id += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setId } = activitySlice.actions

export default activitySlice.reducer