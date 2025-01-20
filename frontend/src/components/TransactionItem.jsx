import React from "react";

const TransactionItem = (props) => {
  const transaction = props.transaction

  return (
    <div
      className={`${
        transaction.type==="EXPENSE"?"bg-red-500":"bg-green-500"
      } p-4 my-4 rounded-lg flex justify-between items-center`}>
      <div className="flex gap-4 items-center">
        <p className="text-white">
          {new Date(
            transaction.date
          ).toLocaleDateString()}
        </p>
        <p className="font-bold text-xl"> {
          transaction.description
          }</p>
      </div>
      <div>
        <p className="font-bold text-xl text-right">
          {(
            transaction.amount
            / 100).toFixed(2).replace(".", ",")} &euro;
        </p>
        <p className="text-right text-sm font-thin">
          {
            transaction.category.name
          }
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
