import { getUser } from "@/apis/userApis";
import { AuthState, IAuth } from "@/types/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: IAuth;
  status: AuthState;
};

// 로그인 되지 않은 상태
const initialState = {
  value: {
    id: 0,
    username: "",
    email: "",
    isAdmin: false,
    isStaff: false,
    isLogin: false,
  } as IAuth,
  status: "initial",
} as InitialState;

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    const res = await getUser({ email: email, password: password });
    // console.log(res);
    return {
      id: res.data.id,
      username: res.data.username,
      email: res.data.email,
      isAdmin: res.data.isAdmin,
      isStaff: res.data.isStaff,
      isLogin: true,
    } as IAuth;
  }
);

export const auth = createSlice({
  name: "auth", // slice name
  initialState, // initial state
  reducers: {
    logOut: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.value = action.payload;
      if (state.value.email === action.payload.email) {
        state.status = "complete";
      }
    });
    builder.addCase(logIn.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { logOut } = auth.actions;
export default auth.reducer;
