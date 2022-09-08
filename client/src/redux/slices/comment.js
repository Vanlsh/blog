import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  comments: [],
  loading: "loading",
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (params) => {
    try {
      const { data } = await axios.post(`/comment`, params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchPostComments = createAsyncThunk(
  "posts/fetchComments",
  async (id) => {
    try {
      const { data } = await axios.get(`/post/comment/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async () => {
    try {
      const { data } = await axios.get(`/comments`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    //create comments
    [createComment.pending]: (state) => {
      state.loading = "loading";
    },
    [createComment.fulfilled]: (state, action) => {
      state.comments = [...state.comments, action.payload];
      state.loading = "loaded";
    },
    [createComment.rejected]: (state) => {
      state.loading = "error";
    },
    // Get posts` comments
    [fetchPostComments.pending]: (state) => {
      state.comments = [];
      state.loading = "loading";
    },
    [fetchPostComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.loading = "loaded";
    },
    [fetchPostComments.rejected]: (state) => {
      state.comments = [];
      state.loading = "error";
    },
    // Get 5 last comments
    [fetchComments.pending]: (state) => {
      state.comments = [];
      state.loading = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.loading = "loaded";
    },
    [fetchComments.rejected]: (state) => {
      state.comments = [];
      state.loading = "error";
    },
  },
});

export default commentSlice.reducer;
