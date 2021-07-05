import { createAsyncThunk }  from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../app/config';

export const editNew = createAsyncThunk('new/editNew', async({ id, values, token })=> {
    try {
        const { data } = await axios.put(`${API_BASE_URL}/news/${id}`, {...values}, {
			'headers': {
				'Authorization': 'Bearer ' + token
			}
        });
        return data
    } catch (err) {
        throw err;
    }
});

export const editCategoryReducers = {
    [editNew.fulfilled]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.loading = 'idle';
            state.error = '';
            state.currentRequestId = '';
        }
    },
    [editNew.pending]: (state, action) => {
        state.currentRequestId = action.meta;
        state.loading = 'pending';
    },
    [editNew.rejected]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.currentRequestId = action.meta;
            state.loading = 'idle';
            state.error = action.error;
        }
    }
}