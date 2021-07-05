import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "./config";

// Token de prueba
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdE5hbWUiOiJwZXJybyIsImxhc3ROYW1lIjoibG9jbyIsImVtYWlsIjoicGVycm9AbG9jby5jb20iLCJpbWFnZSI6bnVsbCwicm9sZUlkIjpudWxsLCJkZWxldGVkQXQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMDYtMDJUMDE6MzQ6MjYuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMDJUMDE6MzQ6MjYuMDAwWiJ9LCJpYXQiOjE2MjMwMTYzMjcsImV4cCI6MTYyMzAxOTkyN30.XTtfCRk1DD_aeHnemlYo_KrGOK48m_jYHM5wWj2TqFg";

//creo petición Axios con createAsyncThunk para manejar más facilmente peticiones asincrónicas y la exporto para utilizarla en otro componente
export const fetchUsersData = createAsyncThunk(
  "usersInfo/fetchUsersData",
  async (_, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("org_token"))
      const { data } = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const usersInfoSlice = createSlice({
  name: "usersInfo",
  initialState: {
    data: [
      {
        id: 1,
        firstName: "usuarioEjemplo",
        lastName: "apellidoEjemplo",
        email: "email@ejemplo.com",
        image: "",
        password: "",
        roleId: [],
        deletedAt: "",
        createdAt: "",
        updatedAt: "",
      },
    ],
    status: null,
  },
  //las peticiones con createAsyncThunk se manejan con el objeto extraReducers
  extraReducers: {
    [fetchUsersData.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUsersData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [fetchUsersData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default usersInfoSlice.reducer;

export const usersInfoData = (state) => state.usersInfo.data;
