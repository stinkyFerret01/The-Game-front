//-- CONFIG
import { useNavigate } from "react-router-dom";

// import des composants

//-- START
const Home = ({ setFormType }) => {
  // const location = useLocation();
  const navigate = useNavigate();

  //-- RENDER
  return (
    <main>
      <section className="homeContainer">
        {/* <h1 className="homeTitle">home</h1> */}
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
