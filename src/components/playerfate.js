//-- CONFIG
import { useState, useEffect } from "react";
import axios from "axios";

//-- START
//-- PlayerFate est un article retournant les noms et mails des joueurs
//-- on peut y décider la suppression ou la promotion d'un joueur
const PlayerFate = ({ backend, playerData, setPlayersSensData, player }) => {
  //-- STATES
  //-1- détermine si le joueur a été selectioné pour etre effacer des BDD
  const [playerDelSelection, setPlayerDelSelection] = useState(false);
  const [playerPromSelection, setPlayerPromSelection] = useState(false);

  //-- FONCTIONS
  const playerDeleter = async (bannedId) => {
    //-- efface un joueur des BDD
    if (playerData.accessLevel > 0) {
      const response = await axios.post(`${backend}/admin/ban`, {
        id: `${playerData.id}`,
        bannedId: `${bannedId}`,
      });
      const newList = response.data.newList;
      setPlayersSensData(newList);
      setPlayerDelSelection(false);
      console.log(response.data.message);
    }
  };

  const playerPromoter = async (promotedId, newAL) => {
    //-- promeut un joueur au rang d'administrateur
    if (playerData.accessLevel > 0) {
      const response = await axios.put(`${backend}/lord/promote`, {
        id: `${playerData.id}`,
        promotedId: `${promotedId}`,
        newAL: newAL,
      });
      const newList = response.data.newList;
      setPlayersSensData(newList);
      setPlayerPromSelection(false);
      console.log(response.data.message);
    }
  };

  //-- USEEFFECT
  useEffect(() => {}, [playerDelSelection, setPlayerPromSelection]);

  //-- RENDER
  return (
    <article className="playerFate">
      <h2 className="playerFateName">{player.name}</h2>
      <h2 className="playerFateMail">{player.mail}</h2>
      {/* //-- promotion de joueurs */}
      <div className="playerFatePromote">
        {/* //-- checkbox de promotion */}
        {playerData.accessLevel > 1 && (
          <div>
            {" "}
            <input
              className="checkbox"
              checked={playerPromSelection}
              type="checkbox"
              onChange={() =>
                playerPromSelection
                  ? setPlayerPromSelection(false)
                  : setPlayerPromSelection(true)
              }
            />
            {/* //-- confirmation de promotion (dépend de la checkbox) */}
            <button
              className={
                playerPromSelection
                  ? "playerPromSelected"
                  : "playerPromUnSelected"
              }
              onClick={() => {
                playerPromSelection === true
                  ? playerPromoter(player.id, 5)
                  : alert(
                      "vous devez selectionez un joueur pour en faire un administrateur!"
                    );
              }}
            >
              {/* <i class="fa-solid fa-trash-can"></i> */}
              <h3>upGrader</h3>
            </button>
          </div>
        )}
      </div>
      {/* //-- supression de joueurs */}
      <div className="playerFateDelete">
        {/* //-- checkbox de suppression */}
        <input
          className="checkbox"
          checked={playerDelSelection}
          type="checkbox"
          onChange={() =>
            playerDelSelection
              ? setPlayerDelSelection(false)
              : setPlayerDelSelection(true)
          }
        />
        {/* //-- confirmation de supression (dépend de la checkbox) */}
        <button
          className={
            playerDelSelection ? "playerDelSelected" : "playerDelUnSelected"
          }
          onClick={() => {
            playerDelSelection === true
              ? playerDeleter(player.id)
              : alert(
                  "vous devez selectionez un joueur pour l'effacer des bases de données!"
                );
          }}
        >
          {/* <i class="fa-solid fa-trash-can"></i> */}
          <h3>effacer</h3>
        </button>
      </div>
    </article>
  );
};

export default PlayerFate;
