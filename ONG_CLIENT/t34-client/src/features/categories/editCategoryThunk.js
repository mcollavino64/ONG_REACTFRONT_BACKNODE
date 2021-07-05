import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Alert from '../../components/alertService/AlertService';
import { API_BASE_URL } from './../../app/config';
import { fetchCategoryData } from './fetchCategoryThunk';

export const editCategory = createAsyncThunk('category/addCategory', async ({token, values, id}, {dispatch}) => {
	try {
		const result = await axios.put(`${API_BASE_URL}/categories/${id}`, {
			...values
		}, {
			'headers': {
				'Authorization': 'Bearer ' + token
			}
		});
		if(result.data?.success){
			Alert.success('Hecho', 'La categoria ha sido modificada');
			dispatch(fetchCategoryData());
		} else
			Alert.error('Error', 'Hubo un problema al intentar modificar la categoría');
		return result.data;
	} catch (err) {
		Alert.error("Error", "Hubo un problema al intentar modificar la categoría");
		throw err;
	}
});

export const editCategoryReducers = {
	[editCategory.fulfilled]: (state, action) => {
		if (action.meta.requestId === state.currentRequestId.requestId) {
			state.loading = 'idle';
			state.error = '';
			state.currentRequestId = '';
		  }
	},
	[editCategory.pending]: (state, action) => {
		state.currentRequestId = action.meta;
		state.loading = 'pending';
	},
	[editCategory.rejected]: (state, action) => {
		if (action.meta.requestId === state.currentRequestId.requestId) {
			state.currentRequestId = action.meta;
			state.loading = 'idle';
			state.error = action.error;
		}
	}
}