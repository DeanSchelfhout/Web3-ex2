import { useFormik } from "formik";
import React from "react";
import TitleLabel from "../components/TitleLabel";
import StyledInput from "../components/StyledInput";
import StyledButton from "../components/StyledButton";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { addTransaction } from "../api/transactions";
import { getAllCategories } from "../api/categories";

const types = [
  { id: 1, label: "Uitgave", value: "EXPENSE" },
  { id: 2, label: "Inkomsten", value: "INCOME" },
];

const validationSchema = Yup.object().shape({
  type: Yup.string().oneOf(
    ["EXPENSE", "INCOME"],
    "Type moet ofwel EXPENSE zijn ofwel INCOME"
  ),
  description: Yup.string().required("Beschrijving is verplicht"),
  amount: Yup.number().required("Bedrag is verplicht in te vullen!"),
});

const AddTransactionPage = () => {
  const [categories,setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await getAllCategories();
          setCategories(response.data);
        }
        catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
  
      fetchCategories();
    }, []);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      type: types[0].value,
      amount: "",
      description: "",
      date: "",
      categoryId: "",
    },
    onSubmit: async ({ type, amount, description, date, categoryId }) => {
      const newCategoryId = categoryId !== "" ? categoryId : categories[0].id;

      try {
        addTransaction(type, amount*100, description, date, newCategoryId)
        navigate("/")
      } 
      catch (error) {
        console.error("An error occured while adding a transaction")
      }
    },
    validationSchema,
  });

  return (
    <div>
      <TitleLabel>Nieuwe transactie</TitleLabel>
      <div className="relative w-full my-4">
        <input
          type="date"
          className="bg-zinc-900 rounded-lg px-4 py-2 text-xl  block w-full focus:outline-none dark:[color-scheme:dark]"
          placeholder="Datum"
          name="date"
          value={values.date}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <select
        className="bg-zinc-900 px-4 py-2 rounded-lg w-full focus:outline-none text-xl mb-4"
        name="type"
        value={values.type}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {types.map((type)=>(
          <option value={type.value} key={type.id}>
            {type.label}
          </option>
        ))}
      </select>
      <select
        className="bg-zinc-900 px-4 py-2 rounded-lg w-full focus:outline-none text-xl"
        name="categoryId"
        value={values.categoryId}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {categories.map((category)=>(
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <StyledInput
        type="number"
        placeholder="Bedrag"
        name="amount"
        value={values.amount}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.amount !== undefined}
        errorLabel={errors.amount}
      />
      <StyledInput
        type="text"
        placeholder="Beschrijving"
        name="description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.description !== undefined}
        errorLabel={errors.description}
      />
      <StyledButton
        type="submit"
        onClick={handleSubmit}
      >
        Maak aan
      </StyledButton>
    </div>
  );
};

export default AddTransactionPage;
