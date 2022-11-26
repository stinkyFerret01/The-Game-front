//-- CONFIG
import { useNavigate } from "react-router-dom";

// import des composants

//-- START
const Home = ({ playerData, setFormType }) => {
  // const location = useLocation();
  const navigate = useNavigate();

  //-- RENDER
  return (
    <main>
      {playerData !== null && navigate("/game")}
      <section className="homeContainer">
        <h4 className="noLoginInfo">
          ce site est hébergé par un plan gratuit: le backend, lorsqu'il est
          inactif, est mis en veille, ce qui peut provoquer une latence dans le
          chargement des données et de fait, des pages. Nous nous excucons pour
          ce désagrément, cordialement. l'équipe technique.
        </h4>
        <button
          className="dataformBA"
          onClick={() => {
            setFormType("signup");
          }}
        >
          <h3>se connecter / s'inscrire</h3>
        </button>
        <button
          className="noLoginBA"
          onClick={() => {
            navigate("/game");
          }}
        >
          <h3>ignorer et continuer</h3>
        </button>
        <h4 className="noLoginInfo">
          sans authentification, certaines fonctionalités vous seront
          innaccessibles
        </h4>
      </section>
    </main>
  );
};

export default Home;
