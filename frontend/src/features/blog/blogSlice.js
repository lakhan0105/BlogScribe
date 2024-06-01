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
  currBlog: null,
  totalAllBlogs: null,
  featuredBlogs: null,
  categories: null,
  blogImages: {},
  filterBtns: [],
  blogsByCategories: [],
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

// getBlog
export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (blogId, thunkAPI) => {
    try {
      const resp = await databases.getDocument(
        constants.appwriteDatabaseId,
        constants.appwriteBlogsCollectionId,
        blogId
      );
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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

// getBlogImgPreview
export const getBlogImgPreview = (fileId) => {
  try {
    return storage.getFilePreview(constants.appwriteBlogImagesBucketId, fileId);
  } catch (error) {
    return;
  }
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    filterByCategories: (state, { payload }) => {
      state.blogsByCategories = state.allBlogs.filter((blog) => {
        if (blog.category.includes(payload.toLowerCase())) {
          return blog;
        }
      });
    },
  },
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

        // create filter buttons from categories array present in documents
        const cat = documents?.reduce(
          (acc, curr) => {
            curr?.category?.forEach((item) => {
              if (!acc.includes(item)) {
                acc.push(item);
              }
            });
            return acc;
          },
          ["all"]
        );
        state.filterBtns = cat;
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
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currBlog = payload;
      })
      .addCase(getBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert("error from getBlogImg", payload);
      });
  },
});

export default blogSlice.reducer;
export const { filterByCategories } = blogSlice.actions;
