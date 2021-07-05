import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Alert from '../../components/alertService/AlertService';
import { API_BASE_URL } from './../../app/config';

export const fetchCategoryData = createAsyncThunk('category/fetchData', async (_, thunkAPI) => {
  	try {
		const { data } = await axios.get(`${API_BASE_URL}/categories`);
		return data;
	} catch (err) {
		Alert.error("Error", "Hubo un problema al intentar obtener las categorías");
		throw err;
  	}
});
export const fetchCategoryReducers = {
    [fetchCategoryData.fulfilled]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.categories = action.payload;
            state.loading = 'idle';
            state.error = '';
            state.currentRequestId = '';
        }
    },
    [fetchCategoryData.pending]: (state, action) => {
        state.currentRequestId = action.meta;
        state.loading = 'pending';
    },
    [fetchCategoryData.rejected]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.currentRequestId = action.meta;
            state.loading = 'idle';
            state.error = action.error;
        }
    }
}