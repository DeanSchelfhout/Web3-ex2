import React from "react";
import StyledButton from "../components/StyledButton";
import StyledInput from "../components/StyledInput";
import TitleLabel from "../components/TitleLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Wachtwoord is verplicht!").min(8),
});

const ProfilePage = () => {
  const {logout,changePassword,user} = useAuth()
  const navigate = useNavigate()

  const { values, errors, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (values) => {
      try {
        changePassword(password)
        navigate(0)
      } 
      catch (error) {
        console.log("An error occured while changing password:",error)
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="text-white flex flex-col justify-between h-full">
      <div>
        <h1 className="font-black text-2xl">{user.name}</h1>
        <TitleLabel>Wachtwoord</TitleLabel>
        <StyledInput
          type="password"
          placeholder="Nieuw wachtwoord"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password !== undefined}
          errorLabel={errors.password}
        />
        <StyledButton type="submit" 
           onClick={handleSubmit}
        >
          Verander wachtwoord
        </StyledButton>
      </div>
      <StyledButton
        onClick={()=>{
          logout()
        }}>
        Uitloggen
      </StyledButton>
    </div>
  );
};

export default ProfilePage;
