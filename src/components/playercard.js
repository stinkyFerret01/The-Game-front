import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

//-- START
const PlayerCard = ({
  gameConst,
  setToken,
  playerData,
  setPlayerData,
  setDisplayGameChat,
  setDisplayPrivateChat,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  //-- RENDER
  return (
    playerData !== null && (
      <main>
        <section>
          <article className="playerCardContainer">
            <div className="playerAvatar"></div>
            <div className="playerCard">
              <div className="playerCardInfo">
                {/* //-- nom du joueur */}
                <div className="playerName">
                  <h2>{playerData.name}</h2>
                </div>
                {/* //-- stats du joueur */}
                <div className="playerStats">
                  <div className="playerScore">
                    <h3>score:</h3>
                    <h3>{playerData.score.score}</h3>
                  </div>
                  <div className="playerLevel">
                    <h3>niveau:</h3>
                    <h3>{playerData.score.level}</h3>
                  </div>
                </div>
              </div>
              {/* //-- playerCard étendue */}
              <div className="enlargedPC">
                {/* //-- chat publique */}
                <button
                  className="enlargedPCButtons"
                  onClick={() => setDisplayGameChat(true)}
                >
                  <h3>Game Chat</h3>
                </button>
                {/* //-- chat privé */}
                <button
                  className="enlargedPCButtons"
                  onClick={() => setDisplayPrivateChat(true)}
                >
                  <h3>Private Chat</h3>
                </button>
                {/* //-- zone admin / game zone */}
                {playerData.accessLevel >= gameConst.aLR.admin && (
                  <button
                    className="enlargedPCButtonsBorder"
                    onClick={() => {
                      if (location.pathname === "/game") {
                        navigate("/admin");
                      } else if (location.pathname === "/admin") {
                        navigate("/game");
                      }
                    }}
                  >
                    {location.pathname === "/game" && <h3>Zone Admin</h3>}
                    {location.pathname === "/admin" && <h3>Game Zone</h3>}
                  </button>
                )}
                {/* //-- settings */}
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
                    navigate("/");
                  }}
                >
                  <h3>se deconnecter</h3>
                </button>
              </div>
            </div>
          </article>
        </section>
      </main>
    )
  );
};

export default PlayerCard;
