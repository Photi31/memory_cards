import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ArgForgotType,
  ArgLoginType,
  ArgRegisterType,
  ArgSetPasswordType,
  authApi,
  ProfileType,
} from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";

const register = createAsyncThunk(
  "auth/register",
  async (arg: ArgRegisterType) => {
    try {
      const res = await authApi.register(arg);
      return res;
    } catch (e) {
      console.log(e);
    }
    // return true ;
  }
);
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>(
  "auth/login",
  async (arg: ArgLoginType) => {
    const res = await authApi.login(arg);
    return { profile: res.data };
  }
);
const me = createAppAsyncThunk<{ profile: ProfileType }, void>(
  "auth/me",
  async () => {
    const res = await authApi.me();
    return { profile: res.data };
  }
);
const logout = createAsyncThunk("auth/logout", async () => {
  const res = await authApi.logout();
  return res;
});
const forgotPassword = createAsyncThunk(
  "auth/forgot",
  async (arg: ArgForgotType) => {
    await authApi.forgotPassword(arg);
    return { email: arg.email };
  }
);
const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async (arg: ArgSetPasswordType) => {
    const res = await authApi.setNewPassword(arg);
    return res;
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isAuth: false,
    isRegister: false,
    checkedEmail: null as string | null,
    setNewPassword: false,
  },
  reducers: {
    // setProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
    //   state.profile = action.payload.profile;
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isRegister = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.isAuth = true;
    });
    builder.addCase(me.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.isAuth = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false;
      state.profile = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.checkedEmail = action.payload.email;
      state.setNewPassword = false;
    });
    builder.addCase(setNewPassword.fulfilled, (state, action) => {
      state.setNewPassword = true;
    });
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = {
  register,
  login,
  me,
  logout,
  forgotPassword,
  setNewPassword,
};
