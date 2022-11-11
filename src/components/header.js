//-- CONFIG
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//-- START
const Header = ({
  token,
  setToken,
  playerData,
  setPlayerData,
  setFormType,
  setDisplayLeaderBoard,
}) => {
  //-- détermine l'affichage étendu de la playerCard
  const [displayLargePlayerCard, setDisplayLargePlayerCard] = useState(false);

  //-- variables de configuration
  const navigate = useNavigate();
  const location = useLocation();

  //-- RENDER
  return (
    <header className="header">
      {/* LEFT */}
      <div className="headerLeft">
        {/* logo/acceuil */}
        <div>
          <h1 className="logo">THE 🎮 GAME</h1>
        </div>
        {/* acces au leaderBoard */}
        <button
          className="leaderBoardBA"
          onClick={() => setDisplayLeaderBoard(true)}
        >
          🏆 LEADER-BOARD
        </button>
      </div>
      {/* RIGHT */}
      <div className="headerRight">
        {/* inscription, connection */}
        {token === null && (
          <button className="dataformBA" onClick={() => setFormType("signup")}>
            <h3>se connecter / s'inscrire</h3>
          </button>
        )}
        {playerData !== null && (
          //-- playerCard
          <article className="playerCard">
            <div className="playerCardAccessLevel">
              {playerData.accessLevel}
            </div>
            <button
              onClick={() => {
                if (!displayLargePlayerCard) {
                  setDisplayLargePlayerCard(true);
                } else {
                  setDisplayLargePlayerCard(false);
                }
              }}
            >
              <div className="playerInfo">
                <div className="playerAvatar"></div>
                <div className="playerNameAndStats">
                  <div className="playerName">
                    <h2>{playerData.name}</h2>
                  </div>
                  <div className="playerStats">
                    <h3>scr: {playerData.score.score}</h3>
                    <h3>lvl: {playerData.score.level}</h3>
                  </div>
                </div>
              </div>
            </button>
            {/* //-- playerCard étendue */}
            <div className="enlargedPC">
              <button className="enlargedPCButtons" onClick={() => {}}>
                <h3>Game Chat</h3>
              </button>
              <button className="enlargedPCButtons" onClick={() => {}}>
                <h3>Private Chat</h3>
              </button>
              {playerData.accessLevel > 0 && (
                <button
                  className="enlargedPCButtonsBorder"
                  onClick={() => {
                    if (location.pathname === "/") {
                      navigate("/admin");
                    } else if (location.pathname === "/admin") {
                      navigate("/");
                    }
                  }}
                >
                  {location.pathname === "/" && <h3>Zone Admin</h3>}
                  {location.pathname === "/admin" && <h3>Game Zone</h3>}
                </button>
              )}
              <button className="enlargedPCButtonsBorder" onClick={() => {}}>
                <h3>⚙ Settings</h3>
              </button>
              {/* //-- déconnection du joueur */}
              <button
                className="playerCardDisconect"
                onClick={() => {
                  setToken(null);
                  setPlayerData(null);
                  Cookies.remove("TGtoken");
                  Cookies.remove("TGplayer");
                }}
              >
                <h3>se deconnecter</h3>
              </button>
            </div>
          </article>
        )}
      </div>
    </header>
  );
};

export default Header;
