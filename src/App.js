import "./App.css";
import { useEffect, useState } from "react";
import Form from "./components/Form/Form.jsx";
import WelcomePage from "./components/WelcomePage/WelcomePage.jsx";
import example from "./img/example.png";

function App() {
  const [page, setPage] = useState(false);
  const [listTransaction, setListTransaction] = useState(
    localStorage.getItem("transactions")
      ? JSON.parse(localStorage.getItem("transactions"))
      : []
  );
  const [description, setDescription] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const [transactionType, setTransactionType] = useState("Entrada");
  const [total, setTotal] = useState(0);

  function newTransaction() {
    const transaction = {
      description,
      transactionValue: Number(transactionValue),
      transactionType,
    };
    setListTransaction([...listTransaction, transaction]);
  }

  function deleteTransaction(item) {
    setListTransaction(listTransaction.filter((elem) => elem !== item));
  }

  function updateStorage() {
    localStorage.transactions = JSON.stringify(listTransaction);
  }

  useEffect(() => {
    calculateTotal();
    updateStorage();
  });

  function calculateTotal() {
    setTotal(
      listTransaction.reduce(
        (a, b) =>
          b.transactionType === "Entrada" || b.transactionType === "entrada" //JSON.stringify remove letras maiúsculas
            ? a + b.transactionValue
            : a - b.transactionValue,
        0
      )
    );
  }

  return !page ? (
    <div className="App">
      <header className="App-header">
        <WelcomePage setPage={setPage} />
      </header>
    </div>
  ) : (
    <>
      <header>
        <div className="nu-kenzie">
          <span>Nu </span>Kenzie
        </div>
        <button onClick={() => setPage(false)}>Início</button>
      </header>
      <main>
        <Form
          setDescription={setDescription}
          newTransaction={newTransaction}
          setTransactionType={setTransactionType}
          setTransactionValue={setTransactionValue}
        />
        <section>
          <div className="list-header">
            <h2>Resumo financeiro</h2>
            <button>Todos</button>
            <button>Entradas</button>
            <button>Despesas</button>
          </div>
          <div className="list-transactions">
            {!listTransaction.length ? (
              <>
                <div className="no-transactions">
                  Você não possui nenhum lançamento
                </div>
                <img src={example} alt="example" className="example-img" />
                <img src={example} alt="example" className="example-img" />
                <img src={example} alt="example" className="example-img" />
              </>
            ) : (
              <>
                <ul>
                  {listTransaction.map((elem, index) => (
                    <li key={index} className="card">
                      <div>
                        <h3 className="desc">{elem.description}</h3>
                        <p>{elem.transactionType}</p>
                      </div>
                      <div className="price">{`R$ ${elem.transactionValue}`}</div>
                      <button
                        onClick={() => {
                          deleteTransaction(elem);
                        }}
                      >
                        Excluir
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
        <div className="total-price-container">
          <div>Saldo:</div>
          <div className="price">R$ {total}</div>
        </div>
      </main>
    </>
  );
}

export default App;
