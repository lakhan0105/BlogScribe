const constants = {
  supabaseBaseUrl: import.meta.env.VITE_SUPABASE_BASE_URL,
  supabaseApiKey: import.meta.env.VITE_SUPABASE_API_KEY,
  tinymceApiKey: import.meta.env.VITE_TINYMCE_API_KEY,
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteEndpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteUsersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  appwriteBlogsCollectionId: import.meta.env.VITE_APPWRITE_BLOGS_COLLECTION_ID,
  appwriteBlogImagesBucketId: import.meta.env
    .VITE_APPWRITE_BLOG_IMAGES_BUCKET_ID,
};

export default constants;
