//-- CONFIG
import { useState, useEffect } from "react";
import axios from "axios";

// import des composants
import AdminSpace from "../components/adminspace";

//-- START
//-- Admin est un composant (page) reservé aux administrateurs
//-- il permet de mettre a jour les BDD en fonction du niveau d'acces de l'administrateur
const Admin = ({ gameConst, token, playerData }) => {
  //-- STATES
  //-1- enregistre les données sensibles des Players
  const [playersSensData, setPlayersSensData] = useState([]);
  //-- FONCTIONS
  const playersSensDataFetcher = async (AL) => {
    //-- la fonction playersDataFetcher envoie une requete pour récupérer la liste des joueurs
    //-- elle récupère aussi des données sensibles (mail)
    if (AL > 0) {
      const response = await axios.post(`${gameConst.backend}/admin/players`, {
        playerId: `${playerData.id}`,
        playerToken: `${token}`,
      });
      console.log(response.data.message);
      setPlayersSensData(response.data.playersList);
    }
  };

  //-- USEEFFECT
  useEffect(() => {}, [playersSensData]);

  //-- RENDER
  return (
    <main>
      {playerData !== null && (
        <div className="adminMain">
          {/* menu, coté gauche */}
          <section className="adminMenu">
            <h1 style={{ color: "white" }}>ADMIN</h1>
            <button
              className="adminMenuBA"
              onClick={() => {
                playersSensDataFetcher(playerData.accessLevel);
              }}
            >
              liste des joueurs
            </button>
          </section>
          {/* espace administration (acces à la supression des profils et des messages) */}
          <section className="adminWorkSpace">
            {playerData.accessLevel >= gameConst.aLR.admin && (
              <AdminSpace
                gameConst={gameConst}
                token={token}
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
