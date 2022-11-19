import Cookies from "js-cookie";
import { useEffect, useState } from "react";
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
  const [avatarUrl, setAvatarUrl] = useState(null);
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

  //-- USEEFFECT
  useEffect(() => {
    playerData !== null && setAvatarUrl(playerData.avatar);
  }, [newAvatarUrl, playerData]);

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
        {/* SELECT AVATAR */}
        {/* select avatar Top */}
        {displayAvatar && (
          <section className="chooseAvatar">
            <button
              className="closingBox"
              onClick={() => setDisplayAvatar(false)}
            >
              X
            </button>
            <h2 style={{ color: "red" }}>Ne fonctionne pas encore</h2>
            <div>
              <select
                value={avatarGender}
                onChange={(event) => {
                  setAvatarGender(event.target.value);
                  const newUrl = `https://avatars.dicebear.com/api/${event.target.value}/john.svg?${avatarBackground}`;
                  setNewAvatarUrl(newUrl);
                }}
              >
                <option value="male">boy</option>
                <option value="female">girl</option>
              </select>
              <select
                value={avatarBackground}
                onChange={(event) => {
                  setAvatarBackground(event.target.value);
                  const newUrl = `https://avatars.dicebear.com/api/${avatarGender}/john.svg?${event.target.value}`;
                  setNewAvatarUrl(newUrl);
                }}
              >
                <option value="background=%230000ff">blue</option>
                <option value="background=%23ac00ff">purple</option>
                <option value="background=%2300acff">lightblue</option>
                <option value="background=%231200">white</option>
              </select>
            </div>
            <div>
              <img
                className="selectAvatarImg"
                src={newAvatarUrl}
                alt="nouvel avatar"
              ></img>
            </div>
            <h4>{newAvatarUrl}</h4>
            <h4>{avatarUrl}</h4>
            <h2 style={{ color: "red" }}>Ne fonctionne pas encore</h2>
            <button
              className="formSubmit"
              onClick={() => {
                setAvatarUrl(`${newAvatarUrl}`);
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
