import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  loading: false,
};
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
});

export default commentSlice.reducer;
