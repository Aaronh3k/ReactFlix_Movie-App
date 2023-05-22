import axios from "axios";
import { ApiClient } from "./api-client-types";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { Authorization: `${sessionStorage.getItem('token')}` },
}) as ApiClient;

instance.baseImageUrl = "https://image.tmdb.org/t/p/";

export default instance;