//-- CONFIG
import { useEffect, useState } from "react";
import axios from "axios";

//-- import des composants
import CndSquare from "./cnd-square";

//-- START
const ChickNDuck = ({
  gameConst,
  token,
  playerData,
  setPlayerData,
  setDisplayCnd,
}) => {
  //-- STATES
  //-1- enregistre les valeurs de la grille
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  //-2- enregistre le tour du joueur
  const [playerTurn, setPlayerTurn] = useState("🐔");
  //-3- tours de jeu
  const [cndTurn, setCndTurn] = useState(0);
  //-4- gagnant
  const [cndWinner, setCndWinner] = useState("none");
  //-5- fight
  const [displayFight, setDisplayFight] = useState(false);

  //-- FONCTIONS
  //-1- changePlayer
  const changePlayer = () => {
    if (playerTurn === "🦆") {
      setPlayerTurn("🐔");
    } else {
      setPlayerTurn("🦆");
    }
  };

  //-2- chooseSquare
  const chooseSquare = (square) => {
    if (cndWinner === "none" && playerTurn === "🐔") {
      setBoard(
        board.map((val, index) => {
          if (index === square && val === "") {
            setCndTurn(cndTurn + 1);
            changePlayer();
            return playerTurn;
          }
          return val;
        })
      );
    }
  };

  //-- USEEFFECT
  useEffect(() => {
    //-1- changePlayer
    const changePlayer = () => {
      if (playerTurn === "🦆") {
        setPlayerTurn("🐔");
      } else {
        setPlayerTurn("🦆");
      }
    };
    //-2- saveScore
    const saveScore = async (score) => {
      //-- la fonction saveScore envoie une requete pour enregistrer le score en BDD
      const response = await axios.post(`${gameConst.backend}/game/score`, {
        playerId: `${playerData.id}`,
        playerToken: `${token}`,
        newScore: score,
      });
      console.log(response.data.score);
      const copyData = { ...playerData };
      copyData.score = response.data.score;
    };
    //-3- winCondition
    const winConditon = () => {
      //-- condition de victoire
      let score = 0;
      const conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      let gotWinner = false;
      conditions.forEach((cond) => {
        if (
          board[cond[0]] !== "" &&
          board[cond[0]] === board[cond[1]] &&
          board[cond[0]] === board[cond[2]]
        ) {
          gotWinner = true;
          setCndWinner(board[cond[0]]);
          if (board[cond[0]] === "🐔") {
            score = score + 1;
          }
          if (board[cond[0]] === "🦆") {
            score = score - 1;
          }
        }
      });
      if (score !== 0) {
        saveScore(score);
      }
      if (
        board.filter((val) => val === "").length === 0 &&
        gotWinner === false
      ) {
        setCndWinner("tie");
      }
    };
    if (cndWinner === "none") {
      winConditon();
    }
    //-4- autoplay
    const autoplay = () => {
      setBoard(
        board.map((val) => {
          const prob = Math.floor(Math.random() * (8 - cndTurn));
          if (val === "" && prob < 1) {
            setCndTurn(cndTurn + 1);
            return playerTurn;
          }
          return val;
        })
      );
      changePlayer();
    };
    if (playerTurn === "🦆" && cndWinner === "none") {
      setTimeout(autoplay, 1000);
    }
    const fightDisplayer = () => {
      setDisplayFight(false);
    };
    if (displayFight === true) {
      setTimeout(fightDisplayer, 600);
    }
  }, [
    gameConst,
    token,
    playerData,
    setPlayerData,
    board,
    cndTurn,
    cndWinner,
    playerTurn,
    displayFight,
  ]);

  //-- RENDER
  return (
    <section className="chickNDuckContainer">
      <div className="cndTitleContainer">
        <h1 className="cndTitle">Chick-Duck-Luck</h1>
        <button className="closingBox" onClick={() => setDisplayCnd(false)}>
          X
        </button>
      </div>
      {displayFight && <div className="cndFight">FIGHT</div>}
      <div className="cndBoardContainer">
        <div
          className="cndPlayerTurn"
          style={
            playerTurn === "🐔"
              ? {
                  borderColor: "gold",
                  backgroundColor: "yellow",
                }
              : {}
          }
        >
          🐔
        </div>
        <div className="cndBoard">
          <div className="cndBoardLine">
            <CndSquare
              val={board[0]}
              chooseSquare={() => {
                chooseSquare(0);
              }}
            />
            <CndSquare
              val={board[1]}
              chooseSquare={() => {
                chooseSquare(1);
              }}
            />
            <CndSquare
              val={board[2]}
              chooseSquare={() => {
                chooseSquare(2);
              }}
            />
          </div>
          <div className="cndBoardLine">
            <CndSquare
              val={board[3]}
              chooseSquare={() => {
                chooseSquare(3);
              }}
            />
            <CndSquare
              val={board[4]}
              chooseSquare={() => {
                chooseSquare(4);
              }}
            />
            <CndSquare
              val={board[5]}
              chooseSquare={() => {
                chooseSquare(5);
              }}
            />
          </div>
          <div className="cndBoardLine">
            <CndSquare
              val={board[6]}
              chooseSquare={() => {
                chooseSquare(6);
              }}
            />
            <CndSquare
              val={board[7]}
              chooseSquare={() => {
                chooseSquare(7);
              }}
            />
            <CndSquare
              val={board[8]}
              chooseSquare={() => {
                chooseSquare(8);
              }}
            />
          </div>
        </div>
        <div
          className="cndPlayerTurn"
          style={
            playerTurn === "🦆"
              ? {
                  borderColor: "gold",
                  backgroundColor: "yellow",
                }
              : {}
          }
        >
          🦆
        </div>
      </div>
      <div className="cndBottom">
        {cndWinner !== "none" && cndWinner !== "tie" && (
          <h1>{cndWinner} à gagné!</h1>
        )}
        {cndWinner === "none" && <h1>Battez-vous!</h1>}
        {cndWinner === "tie" && <h1>Match trop nul!</h1>}
      </div>
      <div className="cndTitleContainer">
        <button
          className="cndRestarter"
          onClick={() => {
            setCndWinner("none");
            setBoard(["", "", "", "", "", "", "", "", ""]);
            setPlayerTurn("🐔");
            setCndTurn(0);
            setDisplayFight(true);
          }}
        >
          RESTART
        </button>
      </div>
    </section>
  );
};

export default ChickNDuck;
