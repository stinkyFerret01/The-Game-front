//-- CONFIG
import { useEffect, useState } from "react";
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertToDisplay, setAlertToDisplay] = useState("");

  //-- FONCTIONS
  //-- envoie une requete pour enregistrer un Player en BDD et l'authentifier
  const signer = async () => {
    try {
      const response = await axios.post(`${gameConst.backend}/player/signup`, {
        mail: `${mail}`,
        name: `${name}`,
        password: `${password}`,
        confirmPassword: `${confirmPassword}`,
      });
      if (response.data.message !== undefined) {
        console.log(response.data.message);
        const newToken = response.data.playerData.token;
        const cookedName = response.data.playerData.name;
        Cookies.set("TGtoken", newToken);
        Cookies.set("TGplayer", cookedName);
        setPlayerData(response.data.playerData);
        setFormType("none");
        setToken(newToken);
      } else {
        setAlertToDisplay(response.data.alert);
        console.log(response.data.alert);
      }
    } catch (error) {}
  };

  //-- envoie une requete pour authentifier un Player
  const logger = async () => {
    const response = await axios.post(`${gameConst.backend}/player/login`, {
      mail: `${mail}`,
      password: `${password}`,
    });
    if (response.data.message !== undefined) {
      const newToken = response.data.playerData.token;
      const cookedName = response.data.playerData.name;
      console.log(response.data.message);
      Cookies.set("TGtoken", newToken);
      Cookies.set("TGplayer", cookedName);
      setPlayerData(response.data.playerData);
      setFormType("none");
      setToken(newToken);
    } else {
      setAlertToDisplay(response.data.alert);
      console.log(response.data.alert);
    }
  };

  //-- USEEFFECT
  useEffect(() => {}, []);

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
              style={
                formType === "login"
                  ? { backgroundColor: "rgb(140, 183, 244)" }
                  : {}
              }
              onClick={() => {
                setFormType("signup");
                setAlertToDisplay("");
              }}
            >
              s'inscrire
            </button>
            {/* se connecter */}
            <button
              className="chooseFormBA"
              style={
                formType === "signup"
                  ? { backgroundColor: "rgb(140, 183, 244)" }
                  : {}
              }
              onClick={() => {
                setFormType("login");
                setAlertToDisplay("");
              }}
            >
              J'ai déja un compte
            </button>
          </div>
          <div
            className="formWrapper"
            // style={
            //   formType === "signup"
            //     ? { animation: "commandmove 0.4s" }
            //     : { animation: "commandmoveback 0.4s" }
            // }
          >
            <h1 className="formTitle">{formType}</h1>
            {/* type SIGNUP */}
            {formType === "signup" && (
              <div
                className="formInputsWrapper"
                style={{ animation: "commandmove 0.4s" }}
              >
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
                {/* CONFIRM PASSWORD */}
                <input
                  className="formInputs"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                />
                <br />
                <div className="alertDisplayer">
                  {alertToDisplay !== "" && <h6>* {alertToDisplay}</h6>}
                </div>
              </div>
            )}
            {/* type LOGIN */}
            {formType === "login" && (
              <div
                className="formInputsWrapper"
                style={{ animation: "commandmoveback 0.4s" }}
              >
                {/* BLANK */}
                <div className="formInputsBlank"></div>
                <br />
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
                <div className="alertDisplayer">
                  {alertToDisplay !== "" && <h6>* {alertToDisplay}</h6>}
                </div>
              </div>
            )}
            <br />
            {/* SUBMIT */}
            <div className="formSubmitContainer">
              <input
                className="formSubmit"
                type="submit"
                value="Valider !"
                onClick={() =>
                  formType === "signup"
                    ? signer()
                    : formType === "login" && logger()
                }
              />
            </div>
          </div>
          <div className="dataformFooter">FORMFOOTER</div>
        </div>
      </section>
    </main>
  );
};

export default Dataform;
