import { createSlice } from '@reduxjs/toolkit';
import { addCategoryReducers } from './addCategoryThunk';
import { deleteCategoryReducers } from './deleteCategoryThunk';
import { editCategory } from './editCategoryThunk';
import { fetchCategoryReducers } from './fetchCategoryThunk';

const categorySlice = createSlice({
	name: 'category',
	initialState: {
		categories: [{}],
		currentRequestId: '',
		loading: 'idle',
		error: '',
  	},
  	reducers: {},
 	extraReducers: {
		...fetchCategoryReducers,
		...addCategoryReducers,
		...editCategory,
		...deleteCategoryReducers
	},
});

export default categorySlice.reducer;
export const isLoading = (state) => state.category.loading === 'pending';
export const getCategories = (state) => state.category.categories;