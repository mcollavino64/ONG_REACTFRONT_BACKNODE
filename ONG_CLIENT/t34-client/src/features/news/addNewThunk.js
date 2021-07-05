import { createAsyncThunk }  from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../app/config';

export const addNew = createAsyncThunk('new/addNew', async({ values, token })=> {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/news`, values, {
			'headers': {
				'Authorization': 'Bearer ' + token
			}
        });
        return data;
    } catch (err) {
        throw err;
    }
});

export const addNewReducers = {
    [addNew.fulfilled]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.loading = 'idle';
            state.error = '';
            state.currentRequestId = '';
        }
    },
    [addNew.pending]: (state, action) => {
        state.currentRequestId = action.meta;
        state.loading = 'pending';
    },
    [addNew.rejected]: (state, action) => {
        if (action.meta.requestId === state.currentRequestId.requestId) {
            state.currentRequestId = action.meta;
            state.loading = 'idle';
            state.error = action.error;
        }
    }
}