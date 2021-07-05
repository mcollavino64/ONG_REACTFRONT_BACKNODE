import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from './config';

export const fetchPublicInfoData = createAsyncThunk('publicInfo/fetchData', async (_, thunkAPI) => {
  // TODO: Hacer un modulo para todas las solicitudes API
  try {
    const { data } = await axios.get(`${API_BASE_URL}/organizations/1/public`);
    return data;
  } catch (err) {
    throw err;
  }
});

const publicInfoSlice = createSlice({
  name: 'publicInfo',
  initialState: {
    data: {
      name: 'Somos Más',
      image: '',
      phone: '1160112988',
      address: 'Dirección de Prueba 123',
      welcomeText: 'Texto de bienvenida de prueba',
      orgContact:[{}],
      slides: [{}]
    },
    currentRequestId: '',
    loading: 'pending',
    error: '',
  },
  reducers: {},
  extraReducers: {
    [fetchPublicInfoData.fulfilled]: (state, action) => {
      if (action.meta.requestId === state.currentRequestId.requestId) {
        state.data = action.payload;
        state.data.image = API_BASE_URL + action.payload.image;
        state.loading = 'idle';
        state.error = '';
        state.currentRequestId = '';
      }
    },
    [fetchPublicInfoData.pending]: (state, action) => {
      state.currentRequestId = action.meta;
      state.loading = 'pending';
    },
    [fetchPublicInfoData.rejected]: (state, action) => {
      if (action.meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = action.meta;
        state.loading = 'idle';
        state.error = action.error;
      }
    },
  },
});

export default publicInfoSlice.reducer;
export const publicLoading = (state) => state.publicInfo.loading;
export const publicData = (state) => state.publicInfo.data;
