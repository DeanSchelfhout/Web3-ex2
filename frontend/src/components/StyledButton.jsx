import React from "react";

const StyledButton = (props) => {
  return (
    <button
      className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold uppercase w-full my-4"
      onClick={
        props.onClick
      }>
      {props.children}
    </button>
  );
};

export default StyledButton;
