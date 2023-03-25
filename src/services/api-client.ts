import axios from "axios";
import { ApiClient } from "./api-client-types";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_KEY,
  },
}) as ApiClient;

instance.baseImageUrl = "https://image.tmdb.org/t/p/";

export default instance;