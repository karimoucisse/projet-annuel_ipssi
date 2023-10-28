import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "profile",
  initialState: {
    userInfo: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  },

  reducers: {
    updateUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
