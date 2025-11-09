import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { api } from "../api/api";

const initialState = {
  user: null,
  isAdmin: false,
  loader: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.adminLogin.matchFulfilled, (state, action) => {
        state.isAdmin = true;
        toast.success(action.payload.message);
      })
      .addMatcher(api.endpoints.adminLogin.matchRejected, (state, action) => {
        state.isAdmin = false;
        toast.error(action.error.message || "Admin login failed");
      })
      .addMatcher(api.endpoints.getAdmin.matchFulfilled, (state, action) => {
        if (action.payload.admin) {
          state.isAdmin = true;
        } else {
          state.isAdmin = false;
        }
      })
      .addMatcher(api.endpoints.getAdmin.matchRejected, (state, action) => {
        state.isAdmin = false;
      })
      .addMatcher(api.endpoints.adminLogout.matchFulfilled, (state, action) => {
        state.isAdmin = false;
        toast.success(action.payload.message);
      })
      .addMatcher(api.endpoints.adminLogout.matchRejected, (state, action) => {
        state.isAdmin = true;
        toast.error(action.error.message || "Admin logout failed");
      });
  },
});

export const { userExists, userNotExists } = authSlice.actions;
export default authSlice;
