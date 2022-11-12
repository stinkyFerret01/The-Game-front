//-- CONFIG
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

//-- START
const Dataform = ({
  gameConst,
  formType,
  setFormType,
  setPlayerData,
  setToken,
}) => {
  //-- STATES
  // data nécéssaire pour l'inscription ou la connection
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  //-- FONCTIONS
  //-- envoie une requete pour enregistrer un Player en BDD et l'authentifier
  const signer = async () => {
    const response = await axios.post(`${gameConst.backend}/player/signup`, {
      mail: `${mail}`,
      name: `${name}`,
      password: `${password}`,
    });
    console.log(response.data.message);
    const newToken = response.data.playerData.token;
    const cookedName = response.data.playerData.name;
    Cookies.set("TGtoken", newToken);
    Cookies.set("TGplayer", cookedName);
    setPlayerData(response.data.playerData);
    setFormType("none");
    setToken(newToken);
  };

  //-- envoie une requete pour authentifier un Player
  const logger = async () => {
    const response = await axios.post(`${gameConst.backend}/player/login`, {
      mail: `${mail}`,
      password: `${password}`,
    });
    const newToken = response.data.playerData.token;
    const cookedName = response.data.playerData.name;
    console.log(response.data.message);
    Cookies.set("TGtoken", newToken);
    Cookies.set("TGplayer", cookedName);
    setPlayerData(response.data.playerData);
    setFormType("none");
    setToken(newToken);
  };

  //-- RENDER
  return (
    <main className="overallContainer">
      <section className="dataform">
        {/* Dataform Header */}
        <div className="dataformTop">
          {/* message discret */}
          <div className="dataformTopLeft">
            <h6>
              * nous ne conservons aucun mot de passe dans nos bases de données
            </h6>
          </div>

          {/* femer le formulaire */}
          <button className="closingBox" onClick={() => setFormType("none")}>
            X
          </button>
        </div>
        <div className="form">
          {/* choix du type de formulaire */}
          <div className="chooseForm">
            {/* s'inscrire */}
            <button
              className="chooseFormBA"
              onClick={() => setFormType("signup")}
            >
              s'inscrire
            </button>
            {/* se connecter */}
            <button
              className="chooseFormBA"
              onClick={() => setFormType("login")}
            >
              J'ai déja un compte
            </button>
          </div>
          <h1 className="formTitle">{formType}</h1>

          {/* type SIGNUP */}
          {formType === "signup" && (
            <div className="formInputsWrapper">
              {/* NAME */}
              <input
                className="formInputs"
                type="name"
                placeholder="Your Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <br />
              {/* MAIL */}
              <input
                className="formInputs"
                type="email"
                placeholder="Your Email"
                value={mail}
                onChange={(event) => {
                  setMail(event.target.value);
                }}
              />
              <br />
              {/* PASSWORD */}
              <input
                className="formInputs"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <br />
              {/* SUBMIT */}
              <div className="formSubmitContainer">
                <input
                  className="formSubmit"
                  type="submit"
                  value="Valider !"
                  onClick={() => signer()}
                />
              </div>
            </div>
          )}
          {/* type LOGIN */}
          {formType === "login" && (
            <div className="formInputsWrapper">
              {/* NAME */}
              <input
                className="formInputs"
                type="email"
                placeholder="Your Email"
                value={mail}
                onChange={(event) => {
                  setMail(event.target.value);
                }}
              />
              <br />
              {/* PASSWORD */}
              <input
                className="formInputs"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <br />
              {/* BLANK */}
              <div className="formInputsBlank"></div>
              <br />
              {/* SUBMIT */}
              <div className="formSubmitContainer">
                <input
                  className="formSubmit"
                  type="submit"
                  value="Valider !"
                  onClick={() => logger()}
                />
              </div>
            </div>
          )}
          <div className="dataformFooter">FORMFOOTER</div>
        </div>
      </section>
    </main>
  );
};

export default Dataform;
