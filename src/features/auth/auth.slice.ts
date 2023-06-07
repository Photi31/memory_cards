import { createSlice } from "@reduxjs/toolkit";
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
const register = createAppAsyncThunk<void, ArgRegisterType>(
  "auth/register",
  async (arg: ArgRegisterType, thunkAPI) => {
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
      return { profile: res.data };
    });
  }
);
const me = createAppAsyncThunk<{ profile: ProfileType }, {}>(
  "auth/me",
  async (arg: {}, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.me(arg);
      return { profile: res.data };
    });
  }
);
const logout = createAppAsyncThunk<void, void>("auth/logout", async () => {
  const res = await authApi.logout();
  return;
});

const forgotPassword = createAppAsyncThunk<{ email: string }, ArgForgotType>(
  "auth/forgot",
  async (arg: ArgForgotType, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await authApi.forgotPassword(arg);
      return { email: arg.email };
    });
  }
);
const setNewPassword = createAppAsyncThunk<void, ArgSetPasswordType>(
  "auth/setNewPassword",
  async (arg: ArgSetPasswordType, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await authApi.setNewPassword(arg);
      return;
    });
  }
);
const setName = createAppAsyncThunk<{ profile: ProfileType }, ArgSetNameType>(
  "auth/setName",
  async (arg: ArgSetNameType, thunkAPI) => {
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
