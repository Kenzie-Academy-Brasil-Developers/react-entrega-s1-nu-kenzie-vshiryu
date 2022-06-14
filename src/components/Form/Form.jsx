import { useState } from "react";
import "./Form.css";

function Form({ listTransaction, setListTransaction }) {
  const [description, setDescription] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const [transactionType, setTransactionType] = useState("Entrada");

  function newTransaction() {
    const transaction = {
      description,
      transactionValue: Number(transactionValue),
      transactionType,
    };
    setListTransaction([...listTransaction, transaction]);
  }
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        newTransaction();
        event.target.reset();
        setTransactionType("Entrada");
      }}
    >
      <input
        className="description"
        type="text"
        placeholder="descrição"
        required
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      ></input>
      <input
        type="number"
        placeholder="valor"
        required
        onChange={(event) => {
          setTransactionValue(event.target.value);
        }}
      ></input>
      <select
        onChange={(event) => {
          setTransactionType(event.target.value);
        }}
      >
        <option>Entrada</option>
        <option>Despesa</option>
      </select>
      <button type="submit" id="send-button">
        Inserir valor
      </button>
    </form>
  );
}

export default Form;
