import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

//-- START
const MoveExperiment = ({ setDisplayGame }) => {
  //-0- variables de config
  // const location = useLocation();
  //-0- varibles de jeu
  const columns = 19;
  const ligns = 19;

  //-- STATES
  //-1- détermine l'état de la grid
  const [grid, setGrid] = useState("");
  //-2- détermine la position du joueur sur la grid
  const [playerPositionX, setPlayerPositionX] = useState(9);
  const [playerPositionY, setPlayerPositionY] = useState(9);

  //-test-
  // const [isListen, setIsListen] = useState(false);

  //-- FONCTION
  const styleMaker = (col) => {
    if (col === "@") {
      return { color: "blue" };
    }
    if (col === ".") {
      return { bottom: "0.125rem" };
    }
  };
  const playerMover = (dir) => {
    if (dir === "L") {
      console.log(dir);
      setPlayerPositionX(playerPositionX - 1);
    }
    if (dir === "R") {
      console.log(dir);
      setPlayerPositionX(playerPositionX + 1);
    }
    if (dir === "U") {
      console.log(dir);
      setPlayerPositionY(playerPositionY - 1);
    }
    if (dir === "D") {
      console.log(dir);
      setPlayerPositionY(playerPositionY + 1);
    }
  };

  //-- USEEFFECT
  useEffect(() => {
    console.log("useEffect");
    const gridMaker = () => {
      const newGrid = [];
      const chest = { x: 4, y: 4 };
      for (let gy = 0; gy < columns; gy++) {
        const newLign = [];
        for (let gx = 0; gx < ligns; gx++) {
          if (gy === playerPositionY && gx === playerPositionX) {
            newLign.push("🐔");
          } else if (gy === chest.y && gx === chest.x) {
            newLign.push("M");
          } else {
            newLign.push(".");
          }
        }
        newGrid.push(newLign);
      }
      setGrid(newGrid);
    };
    gridMaker();
  }, [playerPositionX, playerPositionY]);

  // useEffect(() => {
  //   //-- Add event listener on keydown
  //   if (isListen === false) {
  //     document.addEventListener(
  //       // "onkeydown",
  //       "keyup",
  //       (event) => {
  //         var name = event.key;
  //         var code = event.code;
  //         if (location.pathname === "game") {
  //           console.log("game");
  //         }
  //         console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
  //       },
  //       false
  //     );
  //   }
  // }, []);

  //-- RENDER
  return (
    <section id="meGame" className="moveExperimentContainer">
      <div className="meTitleContainer">
        <h1>Move Experiment</h1>
        <button className="closingBox" onClick={() => setDisplayGame(false)}>
          X
        </button>
      </div>
      <div className="moveBox">
        {grid.length > 0 &&
          grid.map((lign, index) => {
            return (
              <div className="meLigns" key={index}>
                {lign.map((column, indexc) => {
                  return (
                    <div
                      className="meColumns"
                      style={styleMaker(column)}
                      key={indexc}
                    >
                      {column !== "." && column}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      <article className="moveControl">
        <div className="moveControl1">
          <button className="moveButton" onClick={() => playerMover("U")}>
            ⬆
          </button>
        </div>
        <div className="moveControl2">
          <button className="moveButton" onClick={() => playerMover("L")}>
            ⬅
          </button>
          <button className="moveButton" onClick={() => playerMover("R")}>
            ➡
          </button>
        </div>
        <div className="moveControl1">
          <button className="moveButton" onClick={() => playerMover("D")}>
            ⬇
          </button>
        </div>
      </article>
      <div className="meTitleContainer"></div>
    </section>
  );
};

export default MoveExperiment;
