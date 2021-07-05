import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from './../../app/config';

export const fetchNewData = createAsyncThunk('new/fetchData', async () => {
  	try {
		const { data } = await axios.get(`${API_BASE_URL}/news`);
		return data;
	} catch (err) {
		throw err;
  	}
});
export const fetchNewReducers = {
    [fetchNewData.fulfilled]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.news = action.payload;
            state.loading = 'idle';
            state.error = '';
            state.currentRequestId = '';
        }
    },
    [fetchNewData.pending]: (state, action) => {
        state.currentRequestId = action.meta;
        state.loading = 'pending';
    },
    [fetchNewData.rejected]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.currentRequestId = action.meta;
            state.loading = 'idle';
            state.error = action.error;
        }
    }
}