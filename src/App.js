//-- Style
import "./App.css";

//-- CONFIG
import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

//-- import des pages
import Home from "./pages/home";
import Admin from "./pages/admin";

//-- import des composants
import Header from "./components/header";
import Dataform from "./components/dataform";
import LeaderBoard from "./components/leaderboard";

//-- START
function App() {
  //-1- détermine l'acces au backend en ligne ou en local (test)
  const online = "https://the-game-backend.herokuapp.com";
  const local = "http://localhost:3000";
  const [backend, setBackend] = useState(online);

  //-2- détermine l'authentification d'un Player
  const [token, setToken] = useState(Cookies.get("TGtoken") || null);
  //-3- détérmine l'affichage d'un formulaire et son type
  const [formType, setFormType] = useState("none");
  //-4- enregistre les données publiques d'un player
  const [playerData, setPlayerData] = useState(null);
  //-5- détermine l'affichage du leaderBoard
  const [displayLeaderBoard, setDisplayLeaderBoard] = useState(false);

  //-- FONCTIONS

  //-- USEEFFECT
  useEffect(() => {
    const autoLogger = async (token) => {
      //-- la fonction autologger envoie une requete pour authentifier un joueur si celui-ci possède un token
      //-- l'autoLogger utilise 2 cookies pour procéder: le nom d'un joueur et son token
      const name = Cookies.get("TGplayer");
      const response = await axios.post(`${backend}/player/autologin`, {
        name: `${name}`,
        token: `${token}`,
      });
      const autoFetchedData = response.data.playerData;
      setPlayerData(autoFetchedData);
    };
    if (token !== null && playerData === null) {
      autoLogger(token);
      console.log(token);
    }
  }, [backend, token, playerData, formType, displayLeaderBoard]);

  //-- RENDER
  return (
    <section className="App">
      {online === local && (console.log("problemo!"), setBackend(local))}
      <Router>
        <Header
          backend={backend}
          token={token}
          setToken={setToken}
          playerData={playerData}
          setPlayerData={setPlayerData}
          setFormType={setFormType}
          setDisplayLeaderBoard={setDisplayLeaderBoard}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={<Admin backend={backend} playerData={playerData} />}
          />
        </Routes>
        {/* décide de la présence d'un formulaire */}
        {formType !== "none" && (
          <Dataform
            backend={backend}
            formType={formType}
            setFormType={setFormType}
            playerData={playerData}
            setPlayerData={setPlayerData}
            setToken={setToken}
          />
        )}
        {/* décide de la présence du leaderBoard */}
        {displayLeaderBoard === true && (
          <LeaderBoard
            backend={backend}
            setDisplayLeaderBoard={setDisplayLeaderBoard}
          />
        )}
      </Router>
    </section>
  );
}

export default App;
