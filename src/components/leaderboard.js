//-- CONFIG
import { useState, useEffect } from "react";
import axios from "axios";

//-- START
//-- LeaderBoard est un composant qui présente le classement des joueurs par score
//-- il est accessible à tous les joueurs
const LeaderBoard = ({ gameConst, setDisplayLeaderBoard }) => {
  //-- enregistre les données du leaderBoard
  const [boardList, setBoardList] = useState([]);

  //-- USEEFFECT
  useEffect(() => {
    const leaderBoardDataFetcher = async () => {
      //-- leaderBoardDataFetcher envoie une requete pour récupérer le classement des joueurs
      const response = await axios.get(`${gameConst.backend}/game/lead`);
      console.log(response.data.message);
      setBoardList(response.data.leaderBoard);
    };
    if (boardList.length === 0) {
      leaderBoardDataFetcher();
    }
  }, [gameConst, boardList]);

  //-- RENDER
  return (
    <main className="overallContainer">
      <section className="leaderboard">
        {/* leaderBoard Header */}
        <div className="dataformTop">
          {/* message discret */}
          <div className="leaderBoardTopLeft">
            <h6>* nous ne conservons aucun sel dans nos bases de données</h6>
          </div>
          {/* femer le leaderBoard */}
          <button
            className="closingBox"
            onClick={() => setDisplayLeaderBoard(false)}
          >
            X
          </button>
        </div>
        {/* Board */}
        {/* Board-Title */}
        <h1 className="leaderBoardTitle">LEADERBOARD</h1>
        {/* Board-List */}
        <div className="boardContainer">
          <div className="board">
            {boardList.length > 0 &&
              boardList.map((player, index) => {
                return (
                  <article key={index} className="playerDisplayer">
                    <div style={{ display: "flex" }}>
                      <div className="leaderScoreDisplay">{index}:</div>
                      <div>{player.name}</div>
                    </div>
                    <div>{player.score}</div>
                  </article>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LeaderBoard;
