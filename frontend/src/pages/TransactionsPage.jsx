import React, { useState, useEffect } from "react";
import TitleLabel from "../components/TitleLabel";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAllTransactions } from "../api/transactions";
import TransactionItem from "../components/TransactionItem";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getAllTransactions();
        setTransactions(response.data);
      } 
      catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <TitleLabel>Transacties</TitleLabel>
        <button
          className="text-2xl rounded-full bg-teal-500 hover:bg-teal-600 p-4"
          onClick={() => navigate("/add")}
        >
          <MdAdd />
        </button>
      </div>
      {transactions.length === 0 ? (
        <p className="text-center uppercase font-thin">
          Geen transacties gevonden
        </p>
      ) : (
        transactions.map((transaction) => (
          <TransactionItem transaction={transaction} key={transaction.id} />
        ))
      )}
    </div>
  );
};

export default TransactionsPage;
