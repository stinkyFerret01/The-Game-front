import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

//-- START
const MoveExperiment = ({ setDisplayGame }) => {
  //-0- variables de config
  // const location = useLocation();

  //-- STATES
  //-1- détermine l'état de la grid
  const [grid, setGrid] = useState("");
  //-2- détermine la position du joueur sur la grid
  const [playerPositionX, setPlayerPositionX] = useState(17);
  const [playerPositionY, setPlayerPositionY] = useState(2);

  //-test-
  // const [isListen, setIsListen] = useState(false);

  //-- FONCTION
  const nivCharger = (niv) => {
    let nivToCharge = [];
    for (let i = 0; i < niv.length; i++) {
      let lignToCharge = [];
      for (let j = 0; j < niv[0].length; j++) {
        lignToCharge.push(niv[i][j]);
      }
      nivToCharge.push(lignToCharge);
    }
    return nivToCharge;
  };

  const styleMaker = (col) => {
    if (col === "🐔") {
      return { color: "orange" };
    }
    if (col === ".") {
      return { bottom: "0.125rem" };
    }
    if (col === "W") {
      return { backgroundColor: "gray" };
    }
  };

  const playerMover = (dir) => {
    let newPos = { x: playerPositionX, y: playerPositionY };
    if (dir === "L") {
      console.log(dir);
      newPos.x--;
    }
    if (dir === "R") {
      console.log(dir);
      newPos.x++;
    }
    if (dir === "U") {
      console.log(dir);
      newPos.y--;
    }
    if (dir === "D") {
      console.log(dir);
      newPos.y++;
    }
    let compare = grid[newPos.y][newPos.x];
    if (compare === " " || compare === "e") {
      console.log("ok");
      setPlayerPositionX(newPos.x);
      setPlayerPositionY(newPos.y);
    }
  };

  //-- USEEFFECT
  useEffect(() => {
    const niv1 = [
      "                                   ",
      "                                   ",
      "    Bienvenue joueur               ",
      "                                   ",
      "  trouve la sorti de cette page    ",
      "                                   ",
      "  si tu y arrives                  ",
      "                                   ",
      "                                   ",
      "                                   ",
      "                                   ",
      "                                   ",
      "  crois en toi, tu es la clef      ",
      "                                   ",
      "                                   ",
      "                                   ",
      "  sortie   |  |                    ",
      "           |  |                    ",
      "           |  |                    ",
    ];
    const base = nivCharger(niv1);
    console.log("useEffect");
    const gridMaker = () => {
      const newGrid = [];
      for (let gy = 0; gy < base.length; gy++) {
        const newLign = [];
        for (let gx = 0; gx < base[0].length; gx++) {
          const char = base[gy][gx];
          if (gy === playerPositionY && gx === playerPositionX) {
            newLign.push("🐔");
          } else {
            newLign.push(char);
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
                      {column === "🐔" ? "e" : column}
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
