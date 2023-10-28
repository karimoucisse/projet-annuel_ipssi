import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressInfo: {
      address: "",
      postalCode: "",
      region: "",
      state: "",
      city: "",
      country: "",
    },
  },

  reducers: {
    updateAddress: (state, action) => {
      state.addressInfo = action.payload;
    },
  },
});

export const { updateAddress } = addressSlice.actions;
export default addressSlice.reducer;
