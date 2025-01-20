import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import StyledInput from "../components/StyledInput";
import StyledButton from "../components/StyledButton";
import { useFormik } from "formik";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const { values, errors, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }) => {
      login(email, password);
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 p-8 justify-center items-center">
      <div className=" bg-zinc-950 rounded-3xl p-8 text-white w-3/4">
        <h1 className="font-black text-3xl text-center mb-8">Inloggen</h1>
        <StyledInput
          type="text"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email !== undefined}
          errorLabel={errors.email}
        />
        <StyledInput
          type="password"
          placeholder="Wachtwoord"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password !== undefined}
          errorLabel={errors.password}
        />
        <StyledButton
          type="submit"
          onClick={handleSubmit}
        >
          Inloggen
        </StyledButton>
      </div>
    </div>
  );
};

export default LoginPage;
