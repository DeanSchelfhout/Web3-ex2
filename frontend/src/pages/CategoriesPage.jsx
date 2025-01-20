import React from "react";
import TitleLabel from "../components/TitleLabel";
import { useState,useEffect } from "react";
import CategoryItem from "../components/CategoryItem"
import { getAllCategories } from "../api/categories";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])

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

  return (
    <div>
      <TitleLabel>Categorieën</TitleLabel>
      {categories.length === 0 ? (
        <p className="text-center uppercase font-thin">
          Geen categories gevonden
        </p>
      ) : (
        categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))
      )}
    </div>
  );
};

export default CategoriesPage;
