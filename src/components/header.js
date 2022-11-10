//-- CONFIG

import Cookies from "js-cookie";
import { useState } from "react";

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
            {/* //-- déconnection du joueur */}
            {displayLargePlayerCard === true && (
              <div className="enlargedPC">
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
            )}
          </article>
        )}
      </div>
    </header>
  );
};

export default Header;
