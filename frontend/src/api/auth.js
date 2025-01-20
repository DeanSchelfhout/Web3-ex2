import Axios from "axios";

const BASE_URL = "http://localhost:3000";

export const signIn = (email, password) => {
  return Axios.post(
    `${BASE_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
};

export const verifyUser = () => {
  return Axios.get(`${BASE_URL}/verify`, { withCredentials: true });
};

export const resetPassword = (password) => {
  return Axios.put(
    `${BASE_URL}/password`,
    { password },
    { withCredentials: true }
  );
};

export const signOut = () => {
  return Axios.get(`${BASE_URL}/logout`, { withCredentials: true });
};
