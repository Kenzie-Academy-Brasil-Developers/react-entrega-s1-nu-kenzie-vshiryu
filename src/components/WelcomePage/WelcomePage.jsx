import welcome from "../../img/welcome.png";
import "./WelcomePage.css";

function WelcomePage({ setPage }) {
  function changePage() {
    setPage(true);
  }
  return (
    <>
      <div>
        <div className="nu-kenzie">
          <span>Nu </span>Kenzie
        </div>
        <p className="p1">Centralize o controle das suas finanças</p>
        <p className="p2">de forma rápida e segura</p>
        <button className="start" onClick={changePage}>
          Iniciar
        </button>
      </div>
      <img src={welcome} alt="welcome" className="welcome" />
    </>
  );
}

export default WelcomePage;
