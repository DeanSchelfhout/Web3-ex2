import React from "react";

const TitleLabel = (props) => {
  return (
    <h3 className="text-gray-300 text-sm font-thin my-2">
      {props.children}
    </h3>
  );
};

export default TitleLabel;
