import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    data: "dark",
  },
  reducers: {
    change: (state) => {
      state.data = state.data == "dark" ? "light" : "dark";
    },
  },
});

export const { change } = themeSlice.actions;

export default themeSlice.reducer;