import Axios from "axios";

const BASE_URL = "http://localhost:3000/categories";

export const getAllCategories = () => {
  return Axios.get(`${BASE_URL}`, { withCredentials: true });
};

export const removeCategory = (id) => {
  return Axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
};
