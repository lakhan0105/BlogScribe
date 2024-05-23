import axios from "axios";
import constants from "./constants";

const custFetch = axios.create({
  baseURL: constants.supabaseBaseUrl,
  headers: {
    apiKey: constants.supabaseApiKey,
    "Content-Type": "application/json",
  },
});

export default custFetch;
