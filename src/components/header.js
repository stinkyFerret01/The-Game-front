//-- CONFIG

import Cookies from "js-cookie";

//-- START
const Header = ({
  token,
  setToken,
  playerData,
  setPlayerData,
  setFormType,
}) => {
  //-- RENDER
  return (
    <header className="header">
      {/* logo/acceuil */}
      <div>THE GAME</div>
      {/* inscription, connection */}
      {token === null ? (
        <button onClick={() => setFormType("signup")}>se connecter</button>
      ) : (
        //-- déconnection
        <button
          onClick={() => {
            setToken(null);
            setPlayerData(null);
            Cookies.remove("TGtoken");
          }}
        >
          <div> {playerData.name}</div>
          <h1>se deconnecter</h1>
        </button>
      )}
    </header>
  );
};

export default Header;
