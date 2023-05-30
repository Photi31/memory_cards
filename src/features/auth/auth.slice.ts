import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ArgLoginType,
  ArgRegisterType,
  authApi,
  ProfileType,
} from "features/auth/auth.api";
import { AppDispatch, RootState } from "app/store";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";

const register = createAsyncThunk("auth/register", (arg: ArgRegisterType) => {
  authApi.register(arg).then((res) => {});
});
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>(
  "auth/login",
  async (arg: ArgLoginType) => {
    const res = await authApi.login(arg);
    return { profile: res.data };
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
  },
  reducers: {
    // setProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
    //   state.profile = action.payload.profile;
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login };
