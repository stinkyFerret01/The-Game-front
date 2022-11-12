//-- CONFIG
import { useState } from "react";
import axios from "axios";

// import des composants
import AdminSpace from "../components/adminspace";

//-- START
//-- Admin est un composant (page) reservé aux administrateurs
//-- il permet de mettre a jour les BDD en fonction du niveau d'acces de l'administrateur
const Admin = ({ gameConst, playerData }) => {
  //-- STATES
  //-1- enregistre les données sensibles des Players
  const [playersSensData, setPlayersSensData] = useState([]);
  //-- FONCTIONS
  const playersSensDataFetcher = async (AL) => {
    //-- la fonction playersDataFetcher envoie une requete pour récupérer la liste des joueurs
    //-- elle récupère aussi des données sensibles (mail)
    if (AL > 0) {
      const response = await axios.post(`${gameConst.backend}/admin/players`, {
        id: `${playerData.id}`,
      });
      console.log(response.data.message);
      setPlayersSensData(response.data.playersList);
    }
  };

  //-- RENDER
  return (
    <main>
      {playerData !== null && (
        <div className="adminMain">
          {/* menu, coté gauche */}
          <section className="adminMenu">
            {playerData.accessLevel === 5 && <h1>ADMIN</h1>}
            {playerData.accessLevel === 10 && <h1>LORD</h1>}
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
            {playerData.accessLevel > 0 && (
              <AdminSpace
                gameConst={gameConst}
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
