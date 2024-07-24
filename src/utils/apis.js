import axios from "axios";
import { BASEURL } from "./constant";

const api = axios.create({
  baseURL: BASEURL,
});

export const registerUser = (payload) => api.post("/user/register", payload);
export const getUser = () => api.get("/user");
export const deleteUser = (userId) => api.delete(`/user/delete/${userId}`);
export const updateUser = (userId, payload) => api.patch(`/user/edit/${userId}`, payload);
