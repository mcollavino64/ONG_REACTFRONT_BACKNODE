import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Alert from '../../components/alertService/AlertService';
import { API_BASE_URL } from './../../app/config';
import { fetchCategoryData } from './fetchCategoryThunk';

export const addCategory = createAsyncThunk('category/addCategory', async ({token, values}, {dispatch}) => {
	try {
		const result = await axios.post(`${API_BASE_URL}/categories`, {
			...values
		}, {
			'headers': {
				'Authorization': 'Bearer ' + token
			}
		});
		if(result.data?.success){
			Alert.success('Hecho', 'La categoria ha sido creada');
			dispatch(fetchCategoryData());
		} else
			Alert.error('Error', 'Hubo un problema al intentar crear la categoría');
		return result.data;
	} catch (err) {
		Alert.error("Error", "Hubo un problema al intentar crear la categoría");
		throw err;
	}
});

export const addCategoryReducers = {
    [addCategory.fulfilled]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.loading = 'idle';
            state.error = '';
            state.currentRequestId = '';
        }
    },
    [addCategory.pending]: (state, action) => {
        state.currentRequestId = action.meta;
        state.loading = 'pending';
    },
    [addCategory.rejected]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.currentRequestId = action.meta;
            state.loading = 'idle';
            state.error = action.error;
        }
    },
}