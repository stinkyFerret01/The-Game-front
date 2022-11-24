//-- CONFIG
import { useState, useEffect } from "react";

//-- START
const MoveExperiment = ({ setDisplayGame }) => {
  //-- STATES
  //-1- détermine l'état de la grid
  const [grid, setGrid] = useState("");
  //-2- détermine la position du joueur sur la grid
  const [playerPositionY, setPlayerPositionY] = useState(7);
  const [playerPositionX, setPlayerPositionX] = useState(2);
  const [playerActivity, setPlayerActivity] = useState([
    playerPositionY,
    playerPositionX,
  ]);

  //-test-
  const [key, setKey] = useState(false);
  const [start, setStart] = useState(false);
  const [cops, setCops] = useState([
    [28, 3],
    [28, 11],
    [30, 11],
    [30, 3],
    [32, 3],
    [32, 11],
  ]);

  //-- FONCTION
  const restarter = () => {
    if (start === true) {
      setStart(false);
      setPlayerPositionX(2);
      setPlayerPositionY(7);
      setCops([28, 3]);
    } else {
      setStart(true);
    }
  };

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

  const spePos = [{ y: 27, x: 12 }];
  const spePosChecker = (x, y) => {
    let s = false;
    for (let i = 0; i < spePos.length; i++) {
      if (spePos[i].y === y && spePos[i].x === x) {
        s = true;
      }
    }
    return s;
  };

  const styleMaker = (col) => {
    const hard = col.slice(0, 1);
    let styleToReturn = {};
    if (col === "🐔") {
      if (
        cops.findIndex(
          (cop) => cop[0] === playerPositionX && cop[1] === playerPositionY
        ) >= 0
      ) {
        styleToReturn = {
          zIndex: "1",
          color: "red",
          animation: "pulseMoveP infinite 1.3s",
          borderRadius: "50%",
          backgroundColor: "red",
        };
      } else if (spePosChecker(playerPositionY, playerPositionX) === true) {
        styleToReturn = {
          zIndex: "1",
          color: "orange",
          animation: "pulseMoveP infinite 1.3s",
          borderRadius: "50%",
          backgroundColor: "orange",
        };
      } else {
        styleToReturn = {
          borderRadius: "50%",
          color: "orange",
          backgroundColor: "orange",
        };
      }
    }
    if (hard === ".") {
      styleToReturn = { bottom: "0.125rem" };
    }
    if (hard === "W") {
      styleToReturn = { backgroundColor: "gray" };
    }
    if (hard === "🗝") {
      styleToReturn = { overflow: "inherit" };
    }
    if (hard === "C") {
      styleToReturn = {
        borderRadius: "50%",
        color: "blue",
        backgroundColor: "aqua",
      };
    }
    if (hard === "D") {
      styleToReturn = {
        backgroundColor: "brown",
        borderLeft: "solid black 6px",
        borderRight: "solid black 6px",
        color: "brown",
      };
    }
    if (col.slice(1, 2) === "a") {
      styleToReturn["animation"] = "pulseMoveP infinite 1.3s";
      styleToReturn.zIndex = "1";
      console.log(styleToReturn);
    }
    return styleToReturn;
  };

  const okToMoveChecker = (char) => {
    char = char.slice(0, 1);
    const okToMove = [" ", "C", "d", "a"];
    if (okToMove.indexOf(char) > -1) {
      return true;
    } else {
      return false;
    }
  };

  const playerMover = (dir) => {
    if (start === true) {
      let newPosX = playerPositionX;
      let newPosY = playerPositionY;
      if (dir === "ArrowLeft") {
        if (okToMoveChecker(grid[newPosY][newPosX - 1]) === true) {
          setPlayerPositionX(newPosX - 1);
          setPlayerActivity([playerPositionY, newPosX - 2]);
        } else {
          setPlayerActivity([playerPositionY, newPosX - 1]);
        }
      }
      if (dir === "ArrowRight") {
        if (okToMoveChecker(grid[newPosY][newPosX + 1]) === true) {
          setPlayerPositionX(newPosX + 1);
          setPlayerActivity([playerPositionY, newPosX + 2]);
        } else {
          setPlayerActivity([playerPositionY, newPosX + 1]);
        }
      }
      if (dir === "ArrowUp") {
        if (okToMoveChecker(grid[newPosY - 1][newPosX]) === true) {
          setPlayerPositionY(newPosY - 1);
          setPlayerActivity([newPosY - 2, playerPositionX]);
        } else {
          setPlayerActivity([newPosY - 1, playerPositionX]);
        }
      }
      if (dir === "ArrowDown") {
        if (okToMoveChecker(grid[newPosY + 1][newPosX]) === true) {
          setPlayerPositionY(newPosY + 1);
          setPlayerActivity([newPosY + 2, playerPositionX]);
        } else {
          setPlayerActivity([newPosY + 1, playerPositionX]);
        }
      }
    }
  };

  const handleKeyDown = (event) => {
    playerMover(event.key);
  };

  //-- USEEFFECT
  useEffect(() => {
    console.log("useEffect 0");
    let interval;
    if (start === false) {
      clearTimeout(interval);
    }
    const copsMover = () => {
      let newCops = [];
      for (let c = 0; c < cops.length; c++) {
        let oldCop = [cops[c][0], cops[c][1]];
        let newCop = [];
        if (oldCop[0] > playerPositionX) {
          newCop.push(oldCop[0] - 1);
        } else if (oldCop[0] < playerPositionX) {
          newCop.push(oldCop[0] + 1);
        } else {
          newCop.push(oldCop[0]);
        }
        if (oldCop[1] > playerPositionY) {
          newCop.push(oldCop[1] - 1);
        } else if (oldCop[1] < playerPositionY) {
          newCop.push(oldCop[1] + 1);
        } else {
          newCop.push(oldCop[1]);
        }
        if (
          newCops.find((cop) => cop[0] === newCop[0] && cop[1] === newCop[1]) ||
          okToMoveChecker(grid[newCop[1]][newCop[0]]) === false
        ) {
          newCops.push(oldCop);
        } else {
          newCops.push(newCop);
        }
      }
      // if (cops[0] > playerPositionX) {
      //   newCops.push(cops[0] - 1);
      // } else if (cops[0] < playerPositionX) {
      //   newCops.push(cops[0] + 1);
      // } else {
      //   newCops.push(cops[0]);
      // }
      // if (cops[1] > playerPositionY) {
      //   newCops.push(cops[1] - 1);
      // } else if (cops[1] < playerPositionY) {
      //   newCops.push(cops[1] + 1);
      // } else {
      //   newCops.push(cops[1]);
      // }
      const checkStart = () => {
        if (start === true) {
          setCops(newCops);
          clearTimeout(interval);
        } else {
          clearTimeout(interval);
        }
      };
      interval = setTimeout(checkStart, 600);
    };
    if (start === true) {
      copsMover();
      // interval = setTimeout(copsMover, 1000);
    }
    // eslint-disable-next-line
  }, [start, cops]);

  useEffect(() => {
    console.log("useEffect 1");
    // const niv1 = [
    //   "                                   ",
    //   "                                   ",
    //   "    Bienvenue joueur               ",
    //   "                                   ",
    //   "  trouve la sorti de cette page    ",
    //   "                                   ",
    //   "  si tu y arrives                  ",
    //   "                                   ",
    //   "                                   ",
    //   "                                   ",
    //   "                                   ",
    //   "                                   ",
    //   "  crois en toi, tu es la clef      ",
    //   "                                   ",
    //   "                                   ",
    //   "                                   ",
    //   "  sortie   |  |                    ",
    //   "           |  |                    ",
    //   "           |  |                    ",
    // ];

    const niv2 = [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                    W            W",
      "W                    W            W",
      "W                    W            W",
      "W                    W            W",
      "W                    W            W",
      "W                    W            W",
      "W                    D            W",
      "W                    W            W",
      "W                    W            W",
      "W                    W            W",
      "W                    W            W",
      "W                    W            W",
      "W                    W            W",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    ];

    const base = nivCharger(niv2);
    const gridMaker = () => {
      const newGrid = [];
      for (let gy = 0; gy < base.length; gy++) {
        const newLign = [];
        for (let gx = 0; gx < base[0].length; gx++) {
          const char = base[gy][gx];
          if (gy === playerPositionY && gx === playerPositionX) {
            newLign.push("🐔");
          } else if (gy === 7 && gx === 32 && key === true) {
            newLign.push("🗝");
          } else if (
            cops.findIndex((cop) => cop[0] === gx && cop[1] === gy) >= 0
          ) {
            let index = cops.findIndex((cop) => cop[0] === gx && cop[1] === gy);
            newLign.push(`C${index}`);
          } else if (gy === playerActivity[0] && gx === playerActivity[1]) {
            newLign.push(char + "a");
          } else {
            newLign.push(char);
          }
        }
        newGrid.push(newLign);
      }
      setGrid(newGrid);
    };
    console.log();
    gridMaker();
    if (
      cops.find(
        (cop) => cop[0] === playerPositionX && cop[1] === playerPositionY
      )
    ) {
      setStart(false);
    }
  }, [start, playerPositionX, playerPositionY, cops, key, playerActivity]);

  useEffect(() => {
    console.log("useEffect 2");
    //-- Add event listener on keydown
    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, [grid, playerPositionX, playerPositionY, start]);

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
                  return spePosChecker(index, indexc) === false ||
                    column !== "🐔" ? (
                    <div
                      className="meColumns"
                      style={styleMaker(column)}
                      key={indexc}
                    >
                      {column === "🐔" ? "e" : column}
                    </div>
                  ) : (
                    column === "🐔" && (
                      <button
                        className="meColumns"
                        onClick={() => {
                          setKey(true);
                        }}
                        style={styleMaker(column)}
                        key={indexc}
                      >
                        {column === "🐔" ? "e" : column}
                      </button>
                    )
                  );
                })}
              </div>
            );
          })}
      </div>
      <article className="moveControl">
        <div className="moveControl1">
          <button
            className="moveButton"
            onClick={() => {
              playerMover("ArrowUp");
            }}
          >
            ⬆
          </button>
        </div>
        <div className="moveControl2">
          <button
            className="moveButton"
            onClick={() => {
              playerMover("ArrowLeft");
            }}
          >
            ⬅
          </button>
          <button
            className="moveButton"
            onClick={() => {
              playerMover("ArrowRight");
            }}
          >
            ➡
          </button>
        </div>
        <div className="moveControl1">
          <button
            className="moveButton"
            onClick={() => {
              playerMover("ArrowDown");
            }}
          >
            ⬇
          </button>
        </div>
      </article>
      <div className="meTitleContainer">
        <button
          className="restarter"
          style={start === false ? { backgroundColor: "red" } : {}}
          onClick={() => restarter()}
        >
          restart
        </button>
      </div>
    </section>
  );
};

export default MoveExperiment;
