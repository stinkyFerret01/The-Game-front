import Cookies from "js-cookie";
import { useState } from "react";
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
  //-- STATES
  //-1- détermine l'affichage du selecteur d'avatar
  const [displayAvatar, setDisplayAvatar] = useState(false);
  //-2- enregistre l'url de l'avatar
  const [avatarUrl, setAvatarUrl] = useState(
    "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff"
  );
  //-3- enregistre l'url de l'avatar dans le selecteur
  const [newAvatarUrl, setNewAvatarUrl] = useState(
    "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff"
  );
  //-4- détermine le genre de l'avatar
  const [avatarGender, setAvatarGender] = useState("male");
  //-5- détermine la couleur du background de l'avatar
  const [avatarBackground, setAvatarBackground] = useState(
    "background=%232300ff"
  );

  //-- variables de configuration
  const navigate = useNavigate();
  const location = useLocation();
  //-- RENDER
  return (
    playerData !== null && (
      <main>
        <section>
          <article className="playerCardContainer">
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
            <button
              className="playerAvatar"
              onClick={() => {
                setDisplayAvatar(true);
              }}
            >
              <img src={avatarUrl} alt="avatar du joueur"></img>
            </button>
          </article>
        </section>
        {displayAvatar && (
          <section className="chooseAvatar">
            <button
              className="closingBox"
              onClick={() => setDisplayAvatar(false)}
            >
              X
            </button>
            <div>
              <select
                value={avatarGender}
                onChange={(event) => {
                  setAvatarGender(event.target.value);
                  setNewAvatarUrl(
                    `https://avatars.dicebear.com/api/${avatarGender}/john.svg?${avatarBackground}`
                  );
                }}
              >
                <option value="male">girl</option>
                <option value="female">boy</option>
              </select>
              <select
                value={avatarBackground}
                onChange={(event) => {
                  setAvatarBackground(event.target.value);
                  setNewAvatarUrl(
                    `https://avatars.dicebear.com/api/${avatarGender}/john.svg?${avatarBackground}`
                  );
                }}
              >
                <option value="background=%230000ff">blue</option>
                <option value="background=%ff0000ff">other</option>
                {/* <option value="background=%120000ff">other2</option>
                <option value="background=%230000ff">other3</option> */}
              </select>
            </div>
            <div>
              <img src={newAvatarUrl} alt="nouvel avatar"></img>
            </div>
            <h4>{newAvatarUrl}</h4>
            <h4>{avatarUrl}</h4>
            <button
              onClick={() => {
                setAvatarUrl({ newAvatarUrl });
              }}
            >
              valider
            </button>
          </section>
        )}
      </main>
    )
  );
};

export default PlayerCard;
