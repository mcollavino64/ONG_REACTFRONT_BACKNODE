import { createSlice } from '@reduxjs/toolkit';
import { addNewReducers } from './addNewThunk';
import { deleteNewReducers } from './deleteNewThunk';
import { editNew } from './editNewThunk';
import { fetchNewReducers } from './fetchNewThunk';

const newSlice = createSlice({
	name: 'new',
	initialState: {
		news: [{}],
		currentRequestId: '',
		loading: 'pending',
		error: '',
  	},
  	reducers: {},
 	extraReducers: {
		...fetchNewReducers,
		...addNewReducers,
		...editNew,
		...deleteNewReducers
	},
});

export default newSlice.reducer;
export const isLoading = (state) => state.new.loading === 'pending';
export const getNews = (state) => state.new.news;