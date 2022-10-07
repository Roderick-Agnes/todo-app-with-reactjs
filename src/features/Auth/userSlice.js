import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import StorageKeys from "constants/storage-keys";

// First, create the thunk
export const register = createAsyncThunk(
  "user/register",
  async (payload, thunkAPI) => {
    const response = await userApi.register(payload);

    // save data to local storage
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.user));
    localStorage.setItem(StorageKeys.TOKEN, JSON.stringify(response.jwt));

    return response.user;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    const response = await userApi.login(payload);

    // save data to local storage
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.user));
    localStorage.setItem(StorageKeys.TOKEN, JSON.stringify(response.jwt));

    return response.user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
  },
  reducers: {
    logout(state, action) {
      // reset local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      // reset user information
      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      // set new state to redux store
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      // set new state to redux store
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;

export default reducer;
