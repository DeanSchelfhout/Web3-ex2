import React, { createContext, useContext, useState, useEffect } from "react";
import { resetPassword, signIn, signOut, verifyUser } from "../api/auth";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await verifyUser();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const userData = await signIn(email, password);
      setUser(userData);
    } 
    catch (error) {
      console.error(error);
    } 
    finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async (newPassword) => {
    try {
      resetPassword(newPassword);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
