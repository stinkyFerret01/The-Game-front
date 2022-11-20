//-- CONFIG
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//-- import des composants
//-- none

//-- START
//-- Header permet de s'inscrire/se connecter et d'acceder a la PlayerCard et ses options
const Header = ({ token, playerData, setFormType, setDisplayLeaderBoard }) => {
  //-- STATES
  //-- none

  //-- variables de configuration
  const location = useLocation();

  //-- USEEFFECT
  useEffect(() => {}, [playerData]);

  //-- RENDER
  return (
    <header className="header">
      <div className="headerSizer">
        {/* LEFT */}
        <div className="headerLeft">
          {/* logo/acceuil */}
          <div>
            <h1 className="logo">C-N-D</h1>
          </div>
          {/* acces au leaderBoard */}
          {location.pathname !== "/" && (
            <button
              className="leaderBoardBA"
              onClick={() => setDisplayLeaderBoard(true)}
            >
              ⭐
            </button>
          )}
        </div>
        {/* RIGHT */}
        <div className="headerRight">
          {/* inscription, connection */}
          {token === null && location.pathname !== "/" && (
            <button
              className="headerDataformBA"
              onClick={() => setFormType("signup")}
            >
              🔌
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
