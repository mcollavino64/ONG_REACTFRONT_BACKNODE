import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Alert from '../../components/alertService/AlertService';
import { API_BASE_URL } from './../../app/config';
import { fetchCategoryData } from './fetchCategoryThunk';

export const deleteCategory = createAsyncThunk('category/deleteCategory', async ({token, id}, {dispatch}) => {
	try {
		const result = await axios.delete(`${API_BASE_URL}/categories/${id}`, {
			'headers': {
				'Authorization': 'Bearer ' + token
			}
		});
		if(result.data?.success){
			Alert.success('Hecho', 'La categoria ha sido eliminada');
			dispatch(fetchCategoryData());
		} else
			Alert.error('Error', 'Hubo un problema al intentar eliminar la categoría');
		return result.data;
	} catch (err) {
		Alert.error("Error", "Hubo un problema al intentar eliminar la categoría");
		throw err;
	}
});

export const deleteCategoryReducers = {
    [deleteCategory.fulfilled]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.loading = 'idle';
            state.error = '';
            state.currentRequestId = '';
        }
    },
    [deleteCategory.pending]: (state, action) => {
        state.currentRequestId = action.meta;
        state.loading = 'pending';
    },
    [deleteCategory.rejected]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.currentRequestId = action.meta;
            state.loading = 'idle';
            state.error = action.error;
        }
    }
}