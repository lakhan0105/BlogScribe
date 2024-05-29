import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import custFetch from "../../utils/custFetch";
import constants from "../../utils/constants";

import { Client, Databases, ID, Query, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(constants.appwriteEndpoint) // Your API Endpoint
  .setProject(constants.appwriteProjectId); // Your project ID

const databases = new Databases(client);
const storage = new Storage(client);

const initialState = {
  isLoading: false,
  allBlogs: null,
  totalAllBlogs: null,
  featuredBlogs: null,
  categories: null,
  blogImages: {},
};

// getAllBlogs
export const getAllBlogs = createAsyncThunk(
  "blog/getAllBlogs",
  async (_, thunkAPI) => {
    try {
      const resp = await databases.listDocuments(
        constants.appwriteDatabaseId,
        constants.appwriteBlogsCollectionId
      );
      return resp; // returns {documents,total}
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// getFeaturedBlogs
export const getFeaturedBlogs = createAsyncThunk(
  "blog/getFeaturedBlogs",
  async (_, thunkAPI) => {
    try {
      const resp = await databases.listDocuments(
        constants.appwriteDatabaseId,
        constants.appwriteBlogsCollectionId,
        [Query.equal("is_featured", [true])]
      );
      return resp;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// createBlog
export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (obj, thunkAPI) => {
    console.log(obj);
    try {
      const resp = await databases.createDocument(
        constants.appwriteDatabaseId,
        constants.appwriteBlogsCollectionId,
        ID.unique(),
        obj
      );
      return resp;
    } catch (error) {
      console.log(error);

      if (error.response.code === 409) {
        console.log(
          "blog with same id already exists. refresh the page and create a new blog!"
        );
        return;
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// createBlogImg
export const createBlogImg = createAsyncThunk(
  "blog/createBlogSlice",
  async (fileId, thunkAPI) => {
    try {
      const resp = await storage.createFile(
        constants.appwriteBlogImagesBucketId,
        fileId,
        document.getElementById("uploader").files[0]
      );
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// getBlogImg
export const getBlogImg = createAsyncThunk(
  "blog/getBlogImg",
  async (fileId, thunkAPI) => {
    try {
      const resp = await storage.getFile(
        constants.appwriteBlogImagesBucketId,
        fileId
      );
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// getBlogImgPreview
export const getBlogImgPreview = (fileId) => {
  try {
    return storage.getFilePreview(constants.appwriteBlogImagesBucketId, fileId);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const { documents, total } = payload;
        state.allBlogs = documents;
        state.totalAllBlogs = total;
      })
      .addCase(getAllBlogs.rejected, (state, { payload }) => {
        state.isLoading = true;
        console.log("error from getAllBlogs", payload);
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.allBlogs = payload;
        alert("blog created successfully!");
      })
      .addCase(createBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        alert("error from createBlog!");
      })
      .addCase(getFeaturedBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeaturedBlogs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // console.log(payload);
        const { documents, total } = payload;
        state.featuredBlogs = documents;
      })
      .addCase(getFeaturedBlogs.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert("error from getFeatured", payload);
      })
      .addCase(createBlogImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogImg.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createBlogImg.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert("error from createBlogImg", payload);
      })
      .addCase(getBlogImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogImg.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        console.log(payload);
      })
      .addCase(getBlogImg.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert("error from getBlogImg", payload);
      });
  },
});

export default blogSlice.reducer;
