//-- Style
import "./App.css";

//-- CONFIG
import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

//-- import des pages
import Home from "./pages/home";

//-- import des composants
import Header from "./components/header";
import Dataform from "./components/dataform";

//--START
function App() {
  // const [isLoading, setIsLoading] = useState(true);
  //-- détermine l'authentification d'un Player
  const [token, setToken] = useState(Cookies.get("TGtoken") || null);
  //-- détérmine la présence d'un formulaire et son type
  const [formType, setFormType] = useState("none");
  //-- enregistre les données publiques d'un player
  const [playerData, setPlayerData] = useState(null);

  //--useEffect
  useEffect(() => {
    //--envoie une requete pour authentifier un Player si celui-ci possède un token
    const autoLogger = async (token) => {
      const response = await axios.post(
        `http://localhost:3000/player/autologin`,
        {
          token: `${token}`,
        }
      );
      setPlayerData(response.data.playerData);
    };
    if (token !== null) {
      autoLogger(token);
    }
  }, [token, formType]);

  //--RENDER
  return (
    <section className="App">
      <Router>
        <Header
          token={token}
          setToken={setToken}
          playerData={playerData}
          setPlayerData={setPlayerData}
          setFormType={setFormType}
        />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {/* décide de la présence d'un formulaire */}
        {formType !== "none" && (
          <Dataform
            formType={formType}
            setFormType={setFormType}
            playerData={playerData}
            setPlayerData={setPlayerData}
            setToken={setToken}
          />
        )}
      </Router>
    </section>
  );
}

export default App;
