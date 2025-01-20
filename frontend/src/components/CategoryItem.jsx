import React from "react";
import { MdRemoveCircleOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { removeCategory } from "../api/categories";


const CategoryItem = (props) => {
  const category = props.category
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-zinc-900 my-4 rounded-lg flex justify-between items-center">
      <p className="text-white font-bold text-xl">
        {
          category.name
        }
      </p>

      <button
        onClick={()=>{
          removeCategory(category.id)
          navigate(0)
        }
        }
      >
        <MdRemoveCircleOutline className="text-2xl text-red-500" />
      </button>
    </div>
  );
};

export default CategoryItem;
