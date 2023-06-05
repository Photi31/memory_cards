import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ArgForgotType,
  ArgLoginType,
  ArgRegisterType,
  ArgSetNameType,
  ArgSetPasswordType,
  authApi,
  ProfileType,
} from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils";
import { thunkTryCatch } from "common/utils";
import { toast } from "react-toastify";

// const createThunkAction = <A, R, T>(
//     promise: (arg: A) => Promise<R>,
//     transformPromise: (arg: R) => T,
// ) => {
//   return (arg: A, thunkAPI: any) => {
//     return thunkTryCatch(thunkAPI, () => promise(arg).then(transformPromise))
//   }
// }
const register = createAsyncThunk(
  "auth/register",
  async (arg: ArgRegisterType, thunkAPI: any) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        await authApi.register(arg);
      },
      { showGlobalError: true }
    );
  }
);

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>(
  "auth/login",
  async (arg: ArgLoginType, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.login(arg);
      console.log(res);
      return { profile: res.data };
    });
  }
);
const me = createAppAsyncThunk<{ profile: ProfileType }, void>(
  "auth/me",
  async (thunkAPI: any) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.me();
      return { profile: res.data };
    });
  }
);
const logout = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
  return;
});

const forgotPassword = createAsyncThunk(
  "auth/forgot",
  async (arg: ArgForgotType, thunkAPI: any) => {
    return thunkTryCatch(thunkAPI, async () => {
      await authApi.forgotPassword(arg);
      return { email: arg.email };
    });
  }
);
const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async (arg: ArgSetPasswordType, thunkAPI: any) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.setNewPassword(arg);
      return res;
    });
  }
);
const setName = createAsyncThunk(
  "auth/setName",
  async (arg: ArgSetNameType, thunkAPI: any) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.setName(arg);
      return { profile: res.data.updatedUser };
    });
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    checkedEmail: null as string | null,
    setNewPassword: false,
  },
  reducers: {
    // setProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
    //   state.profile = action.payload.profile;
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      toast.success("Вы успешно зарегистрировались!");
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
    builder.addCase(me.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.profile = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.checkedEmail = action.payload.email;
      state.setNewPassword = false;
    });
    builder.addCase(setNewPassword.fulfilled, (state, action) => {
      //TODO
      state.setNewPassword = true;
    });
    builder.addCase(setName.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
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
  setName,
};
