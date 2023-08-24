import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../store.ts"; 

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const login =
  (user): AppThunk =>
  async (dispatch) => {
    try {
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        user
      );

      if (response.status === 200) {
        dispatch(loginSuccess(response.data.token));
        
      } else {
        
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      
      console.error("An error occurred:", error);
    }
  };

export const registerUser =
  (user): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        user
      );
      console.log("action.payloadregggg", response);
      if (response.status === 201) {
        const token = response.data.token;
        console.log("token", token);
        dispatch(loginSuccess(token));
      } else {
        console.error("Registration failed:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };


export const logoutUser = (): AppThunk => async (dispatch) => {
  
  dispatch(logout());
};

export default authSlice.reducer;
