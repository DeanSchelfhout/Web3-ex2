import Axios from "axios";

const BASE_URL = "http://localhost:3000/transactions";

export const getAllTransactions = () => {
  return Axios.get(`${BASE_URL}`, { withCredentials: true });
};

export const addTransaction = (type, amount, description, date, categoryId) => {
  return Axios.post(
    `${BASE_URL}`,
    { type, amount, description, date, categoryId },
    { withCredentials: true }
  );
};
