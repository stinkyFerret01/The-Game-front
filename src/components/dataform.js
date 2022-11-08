//-- CONFIG
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

//--START
const Dataform = ({ formType, setFormType, setPlayerData, setToken }) => {
  //-- STATES
  // data nécéssaire pour l'inscription ou la connection
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  //-- FONCTIONS
  //--envoie une requete pour enregistrer un Player en BDD et l'authentifier
  const signer = async () => {
    console.log("ok");
    const response = await axios.post(`http://localhost:3000/player/signup`, {
      mail: `${mail}`,
      name: `${name}`,
      password: `${password}`,
    });
    const newToken = response.data.playerData.token;
    Cookies.set("TGtoken", newToken);
    setPlayerData(response.data.playerData);
    setFormType("none");
    setToken(newToken);
  };

  //--envoie une requete pour authentifier un Player
  const logger = () => {};

  //--RENDER
  return (
    <main className="dataformContainer">
      <section className="dataform">
        <div className="dataformTop">
          {/* message discret */}
          <div className="dataformTopLeft">
            <h6>
              * nous ne conservons aucun mot de passe dans nos bases de données
            </h6>
          </div>

          {/* femer le formulaire */}
          <button onClick={() => setFormType("none")}>X</button>
        </div>
        <div className="form">
          <h1>Form</h1>

          {/* choix du type de formulaire */}

          <div className="choseForm">
            <button onClick={() => setFormType("signup")}>s'inscrire</button>
            <button onClick={() => setFormType("login")}>
              J'ai déja un compte
            </button>
          </div>
          <h1>{formType}</h1>

          {/* type SIGNUP */}

          {formType === "signup" && (
            <div className="formInputsWrapper">
              <input
                type="name"
                placeholder="Your Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <br />
              <input
                type="email"
                placeholder="Your Email"
                value={mail}
                onChange={(event) => {
                  setMail(event.target.value);
                }}
              />
              <br />
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <br />
              <input type="submit" value="Valider !" onClick={() => signer()} />
            </div>
          )}
          {/* type LOGIN */}
        </div>
      </section>
    </main>
  );
};

export default Dataform;
