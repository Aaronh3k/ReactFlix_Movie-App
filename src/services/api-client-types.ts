import { AxiosInstance } from "axios";

export interface ApiClient extends AxiosInstance {
  baseImageUrl: string;
}