import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginInput } from "../schemaValidations/AuthSchema";

interface AuthState {
  isAuthenticated: boolean;
  user: LoginInput | null;
  token: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password?: string;  username?: string}>) => {
      state.isAuthenticated = true;
      state.user = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;