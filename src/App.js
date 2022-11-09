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
import LeaderBoard from "./components/leaderboard";

//-- START
function App() {
  //-- détermine l'authentification d'un Player
  const [token, setToken] = useState(Cookies.get("TGtoken") || null);
  //-- détérmine l'affichage d'un formulaire et son type
  const [formType, setFormType] = useState("none");
  //-- enregistre les données publiques d'un player
  const [playerData, setPlayerData] = useState(null);
  //-- détermine l'affichage du leaderBoard
  const [displayLeaderBoard, setDisplayLeaderBoard] = useState(false);

  //-- FONCTIONS
  //-- envoie une requete pour authentifier un joueur si celui-ci possède un token
  const autoLogger = async (token) => {
    //-- l'autoLogger utilise 2 cookies pour procéder: le nom d'un joueur et son token
    const name = Cookies.get("TGplayer");
    const response = await axios.post(
      `http://localhost:3000/player/autologin`,
      {
        name: `${name}`,
        token: `${token}`,
      }
    );
    setPlayerData(response.data.playerData);
  };

  //-- USEEFFECT
  useEffect(() => {
    if (token !== null && playerData === null) {
      autoLogger(token);
      console.log(token);
    }
  }, [token, playerData, formType, displayLeaderBoard]);

  //-- RENDER
  return (
    <section className="App">
      <Router>
        <Header
          token={token}
          setToken={setToken}
          playerData={playerData}
          setPlayerData={setPlayerData}
          setFormType={setFormType}
          setDisplayLeaderBoard={setDisplayLeaderBoard}
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
        {/* décide de la présence du leaderBoard */}
        {displayLeaderBoard === true && (
          <LeaderBoard setDisplayLeaderBoard={setDisplayLeaderBoard} />
        )}
      </Router>
    </section>
  );
}

export default App;
