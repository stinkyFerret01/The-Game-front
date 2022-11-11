//-- CONFIG
import { useState } from "react";
import axios from "axios";

// import des composants
import AdminSpace from "../components/adminspace";
import LordSpace from "../components/lordspace";

//-- START
const Admin = ({ backend, playerData }) => {
  //-- enregistre les données sensibles des Players
  const [playersSensData, setPlayersSensData] = useState([]);

  //-- FONCTIONS
  const playersSensDataFetcher = async (AL) => {
    //-- la fonction playersDataFetcher envoie une requete pour récupérer la liste des joueurs
    //-- elle récupère aussi des données sensibles (mail)
    if (AL > 0) {
      const response = await axios.post(`${backend}/admin/players`, {
        id: `${playerData.id}`,
      });
      setPlayersSensData(response.data.playersList);
      console.log(response.data.playersList);
    }
  };

  //-- RENDER
  return (
    <main>
      {playerData !== null && (
        <div className="adminMain">
          {/* menu, coté gauche */}
          <section className="adminMenu">
            {playerData.accessLevel === 1 && <h1>ADMINSPACE</h1>}
            {playerData.accessLevel === 2 && <h1>LORDSPACE</h1>}
            <button
              onClick={() => {
                playersSensDataFetcher(playerData.accessLevel);
              }}
            >
              liste des joueurs
            </button>
          </section>
          {/* espace administration (acces à la supression des profils et des messages) */}
          <section className="adminWorkSpace">
            {playerData.accessLevel === 1 && (
              <AdminSpace
                backend={backend}
                playerData={playerData}
                playersSensData={playersSensData}
                setPlayersSensData={setPlayersSensData}
              />
            )}
            {playerData.accessLevel === 2 && (
              <LordSpace
                backend={backend}
                playerData={playerData}
                playersSensData={playersSensData}
                setPlayersSensData={setPlayersSensData}
              />
            )}
          </section>
        </div>
      )}
    </main>
  );
};

export default Admin;
