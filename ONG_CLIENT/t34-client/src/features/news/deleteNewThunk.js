import { createAsyncThunk }  from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../app/config';


export const deleteNew = createAsyncThunk('new/deleteNew', async({ id, token })=> {
    try {
        const { data } = await axios.delete(`${API_BASE_URL}/news/${id}`, {
			'headers': {
				'Authorization': 'Bearer ' + token
			}
        });
        return data
    } catch (err) {
        throw err;
    }
});

export const deleteNewReducers = {
    [deleteNew.fulfilled]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.loading = 'idle';
            state.error = '';
            state.currentRequestId = '';
        }
    },
    [deleteNew.pending]: (state, action) => {
        state.currentRequestId = action.meta;
        state.loading = 'pending';
    },
    [deleteNew.rejected]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.currentRequestId = action.meta;
            state.loading = 'idle';
            state.error = action.error;
        }
    }
}