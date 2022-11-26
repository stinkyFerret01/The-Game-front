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
  //-3- détermine l'activité (direction) du joueur sur la grid
  const [playerActivity, setPlayerActivity] = useState([
    playerPositionY,
    playerPositionX,
    "none",
  ]);

  //-4- détermine les conditions du jeu
  const [start, setStart] = useState("Start");
  const [endGame, setEndGame] = useState("tie");
  //-5- détermine les options du jeu
  const [key, setKey] = useState([2, 32, false]);
  const [box, setBox] = useState([12, 2, false]);
  const [press, setPress] = useState([1, 1, false]);
  const [cops, setCops] = useState([
    [28, 3],
    [28, 11],
    [32, 3],
    [32, 11],
  ]);
  const [doors, setDoors] = useState([
    [7, 21, "D"],
    [7, 25, "D"],
    [2, 6, "d"],
    [12, 4, "L"],
  ]);

  //-- FONCTION
  const restarter = (start) => {
    console.log(start);
    if (start === "Start") {
      setStart("Abandon");
    } else if (start === "Abandon") {
      setStart("Reset");
    } else if (start === "Reset") {
      setCops([
        [28, 3],
        [28, 11],
        [32, 3],
        [32, 11],
      ]);
      setDoors([
        [7, 21, "D"],
        [7, 25, "D"],
        [2, 6, "d"],
        [12, 4, "L"],
      ]);
      setBox([12, 2, false]);
      setKey([2, 32, false]);
      setPlayerPositionY(7);
      setPlayerPositionX(2);
      setPlayerActivity([7, 2]);
      setStart("Start");
      setEndGame("tie");
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

  const spePos = [{ y: 13, x: 22 }];
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
    if (col === "p" && press[2] === true) {
      setPress([press[0], press[1], false]);
    } else if ((col === "🐔p" || col === "Bp") && press[2] === false) {
      setPress([press[0], press[1], true]);
    }
    const hard = col.slice(0, 1);
    let styleToReturn = {};
    if (col === "🐔" || col === "🐔p") {
      if (
        cops.findIndex(
          (cop) => cop[0] === playerPositionX && cop[1] === playerPositionY
        ) >= 0
      ) {
        styleToReturn = {
          zIndex: "1",
          color: "red",
          animation: "pulseDeadP infinite 1.3s",
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
    if (hard === "w") {
      if (press[2] === false) {
        styleToReturn = { backgroundColor: "gray" };
      } else {
        styleToReturn = { backgroundColor: "blue" };
      }
    }
    if (hard === "p") {
      styleToReturn = {
        borderRadius: "50%",
        color: "blue",
        border: "solid black 3px",
        backgroundColor: "aqua",
      };
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
    if (hard === "L") {
      styleToReturn = {
        backgroundColor: "gold",
        borderLeft: "solid black 6px",
        borderRight: "solid black 6px",
        color: "brown",
      };
    }
    if (hard === "B" || col.slice(0, 2) === "Bp") {
      styleToReturn = {
        backgroundColor: "green",
        border: "solid black 1px",
        color: "brown",
      };
    }
    if (col.slice(1, 2) === "a") {
      styleToReturn["animation"] = "pulseMoveP infinite 1.3s";
      styleToReturn.zIndex = "1";
      styleToReturn.color = "red";
    }
    return styleToReturn;
  };

  const okToMoveChecker = (char) => {
    if (char !== "🐔") {
      char = char.slice(0, 1);
    }
    let okToMove = [" ", "C", "d", "a", "🐔", "p"];
    if (press[2] === true) {
      okToMove.push("w");
    }
    if (box[2] === true) {
      okToMove.push("B");
    }
    if (okToMove.indexOf(char) > -1) {
      return true;
    } else {
      return false;
    }
  };

  const possibleActivity = (char, keyboard) => {
    if (char === "Da" || char === "da" || char === "La") {
      const openDoor = () => {
        let doorToChange = doors.find(
          (door) =>
            door[0] === playerActivity[0] && door[1] === playerActivity[1]
        );
        let doorIndex = doors.findIndex(
          (door) =>
            door[0] === playerActivity[0] && door[1] === playerActivity[1]
        );
        if (char === "Da") {
          doorToChange.splice(2, 1, "d");
        } else if (char === "da") {
          doorToChange.splice(2, 1, "D");
        } else if (char === "La" && key[2] === true) {
          doorToChange.splice(2, 1, "d");
          setKey([-1, -1, false]);
        }
        let newDoors = [...doors];
        newDoors.splice(doorIndex, 1, doorToChange);
        setDoors(newDoors);
      };
      if (keyboard) {
        openDoor();
      }
      if (char === "La") {
        return ["porte vérrouillée", openDoor];
      } else {
        return ["porte", openDoor];
      }
    } else if (char === "🗝") {
      const takeKey = () => {
        let newKey = [0, 0, true];
        setKey(newKey);
      };
      if (keyboard) {
        takeKey();
      }
      return ["clef", takeKey];
    } else if (char === "Ba" || char === "Bp") {
      const treatBox = () => {
        if (box[2] === false) {
          let newBox = [playerActivity[0], playerActivity[1], true];
          setBox(newBox);
        } else {
          let newBox = [playerActivity[0], playerActivity[1], false];
          setBox(newBox);
        }
      };
      if (keyboard) {
        treatBox();
      }
      return ["box", treatBox];
    } else {
      return ["none"];
    }
  };

  const playerMover = (dir) => {
    console.log(dir);
    if (start === "Abandon") {
      let newPosX = playerPositionX;
      let newPosY = playerPositionY;
      if (dir === "ArrowLeft") {
        if (
          okToMoveChecker(grid[newPosY][newPosX - 1]) === true &&
          ((okToMoveChecker(grid[newPosY][newPosX - 2]) === true &&
            box[2] === true) ||
            box[2] === false)
        ) {
          setPlayerPositionX(newPosX - 1);
          setPlayerActivity([playerPositionY, newPosX - 2]);
        } else if (
          box[2] === true &&
          okToMoveChecker(grid[newPosY][newPosX - 1]) === true
        ) {
          setPlayerActivity([playerPositionY, newPosX - 1]);
        } else {
          if (box[2] === false) {
            setPlayerActivity([playerPositionY, newPosX - 1]);
          }
        }
      }
      if (dir === "ArrowRight") {
        if (
          okToMoveChecker(grid[newPosY][newPosX + 1]) === true &&
          ((okToMoveChecker(grid[newPosY][newPosX + 2]) === true &&
            box[2] === true) ||
            box[2] === false)
        ) {
          setPlayerPositionX(newPosX + 1);
          setPlayerActivity([playerPositionY, newPosX + 2]);
        } else if (
          box[2] === true &&
          okToMoveChecker(grid[newPosY][newPosX + 1]) === true
        ) {
          setPlayerActivity([playerPositionY, newPosX + 1]);
        } else {
          if (box[2] === false) {
            setPlayerActivity([playerPositionY, newPosX + 1]);
          }
        }
      }
      if (dir === "ArrowUp") {
        if (
          okToMoveChecker(grid[newPosY - 1][newPosX]) === true &&
          grid[newPosY - 2] &&
          ((okToMoveChecker(grid[newPosY - 2][newPosX]) === true &&
            box[2] === true) ||
            box[2] === false)
        ) {
          setPlayerPositionY(newPosY - 1);
          setPlayerActivity([newPosY - 2, playerPositionX]);
        } else if (
          box[2] === true &&
          okToMoveChecker(grid[newPosY - 1][newPosX]) === true
        ) {
          setPlayerActivity([newPosY - 1, playerPositionX]);
        } else if (
          grid[newPosY - 1][newPosX] === "wa" ||
          grid[newPosY - 1][newPosX] === "w"
        ) {
          setPlayerActivity([newPosY - 1, playerPositionX]);
          setPlayerPositionX(newPosX);
          setPlayerPositionY(newPosY - 1);
          setEndGame("won");
          setStart("Reset");
        } else if (box[2] === false) {
          setPlayerActivity([newPosY - 1, playerPositionX]);
        }
      }
      if (dir === "ArrowDown") {
        if (
          okToMoveChecker(grid[newPosY + 1][newPosX]) === true &&
          grid[newPosY + 2] &&
          ((okToMoveChecker(grid[newPosY + 2][newPosX]) === true &&
            box[2] === true) ||
            box[2] === false)
        ) {
          setPlayerPositionY(newPosY + 1);
          setPlayerActivity([newPosY + 2, playerPositionX]);
        } else if (
          box[2] === true &&
          okToMoveChecker(grid[newPosY + 1][newPosX]) === true
        ) {
          setPlayerActivity([newPosY + 1, playerPositionX]);
        } else {
          if (box[2] === false) {
            setPlayerActivity([newPosY + 1, playerPositionX]);
          }
        }
      }
      if (dir === "a") {
        console.log(dir);
        let char = grid[playerActivity[0]][playerActivity[1]];
        possibleActivity(char, true);
      }
    }
  };

  const handleKeyDown = (event) => {
    console.log(event.key);
    playerMover(event.key);
  };

  //-- USEEFFECT
  useEffect(() => {
    console.log("useEffect 0");
    let interval;
    if (start === "Abandon") {
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
          cops.find((cop) => cop[0] === newCop[0] && cop[1] === newCop[1]) ||
          newCops.find((cop) => cop[0] === newCop[0] && cop[1] === newCop[1]) ||
          okToMoveChecker(grid[newCop[1]][newCop[0]]) === false
        ) {
          console.log(grid[newCop[1]][newCop[0]]);
          if (
            cops.find((cop) => cop[0] === oldCop[0] && cop[1] === newCop[1]) ===
              undefined &&
            newCops.find(
              (cop) => cop[0] === oldCop[0] && cop[1] === newCop[1]
            ) === undefined &&
            okToMoveChecker(grid[newCop[1]][oldCop[0]]) === true
          ) {
            let newCopB = [oldCop[0], newCop[1]];
            newCops.push(newCopB);
          } else if (
            cops.find((cop) => cop[0] === newCop[0] && cop[1] === oldCop[1]) ===
              undefined &&
            newCops.find(
              (cop) => cop[0] === newCop[0] && cop[1] === oldCop[1]
            ) === undefined &&
            okToMoveChecker(grid[oldCop[1]][newCop[0]]) === true
          ) {
            let newCopA = [newCop[0], oldCop[1]];
            newCops.push(newCopA);
          } else {
            newCops.push(oldCop);
          }
        } else {
          newCops.push(newCop);
        }
      }
      const checkStart = () => {
        if (start === "Abandon") {
          setCops(newCops);
          clearTimeout(interval);
        } else {
          clearTimeout(interval);
        }
      };
      interval = setTimeout(checkStart, 600);
    };
    if (start === "Abandon") {
      copsMover();
      // interval = setTimeout(copsMover, 1000);
    }
    //-- PROBLEMO
    // eslint-disable-next-line
  }, [start, cops]);

  useEffect(() => {
    console.log("useEffect 1");

    const niv2 = [
      "WWWWwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W W   W                  W        W",
      "W W                      W        W",
      "W W   W                  W        W",
      "W WWWWW                  W        W",
      "W                    WWWWW        W",
      "W                    W   W        W",
      "W                                 W",
      "W                    W   W        W",
      "W                    WWWWW        W",
      "WWWWW                W            W",
      "W   W                W            W",
      "W                    W            W",
      "W   W                W            W",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    ];

    const base = nivCharger(niv2);

    const activityChecker = (gy, gx, char) => {
      if (gy === playerActivity[0] && gx === playerActivity[1]) {
        return `${char}a`;
      } else {
        return char;
      }
    };

    const gridMaker = () => {
      const newGrid = [];
      for (let gy = 0; gy < base.length; gy++) {
        const newLign = [];
        for (let gx = 0; gx < base[0].length; gx++) {
          let char = base[gy][gx];
          let doorIndex = doors.findIndex(
            (door) => door[0] === gy && door[1] === gx
          );
          if (gy === press[0] && gx === press[1]) {
            if (gy === playerPositionY && gx === playerPositionX) {
              newLign.push("🐔p");
            } else if (
              (gy === playerActivity[0] &&
                gx === playerActivity[1] &&
                box[2] === true) ||
              (gy === box[0] && gx === box[1] && box[2] === false)
            ) {
              newLign.push("Bp");
            } else {
              newLign.push(activityChecker(gy, gx, "p"));
            }
          } else if (gy === playerPositionY && gx === playerPositionX) {
            newLign.push("🐔");
          } else if (gy === key[0] && gx === key[1] && key[2] === false) {
            newLign.push("🗝");
          } else if (gy === box[0] && gx === box[1] && box[2] === false) {
            newLign.push(activityChecker(gy, gx, "B"));
          } else if (
            gy === playerActivity[0] &&
            gx === playerActivity[1] &&
            box[2] === true
          ) {
            newLign.push(activityChecker(gy, gx, "B"));
          } else if (
            cops.findIndex((cop) => cop[0] === gx && cop[1] === gy) >= 0
          ) {
            let index = cops.findIndex((cop) => cop[0] === gx && cop[1] === gy);
            newLign.push(`C${index}`);
          } else if (doorIndex >= 0) {
            char = doors[doorIndex][2];
            newLign.push(activityChecker(gy, gx, char));
          } else {
            newLign.push(activityChecker(gy, gx, char));
          }
        }
        newGrid.push(newLign);
      }
      setGrid(newGrid);
    };
    gridMaker();

    if (
      cops.find(
        (cop) => cop[0] === playerPositionX && cop[1] === playerPositionY
      )
    ) {
      setStart("Reset");
      setEndGame("lost");
    }
  }, [
    start,
    playerPositionX,
    playerPositionY,
    playerActivity,
    press,
    cops,
    doors,
    key,
    box,
  ]);

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
  }, [grid, playerPositionX, playerPositionY, doors, start]);

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
                      {column === "🗝" && column}
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
                        {/* {column === "🐔" ? "e" : column} */}
                      </button>
                    )
                  );
                })}
              </div>
            );
          })}
      </div>
      {endGame === "won" ? (
        <div className="meResult">
          <h2>vous avez gagné!</h2>
        </div>
      ) : (
        endGame === "lost" && (
          <div className="meResult">
            <h2>vous avez perdu!</h2>
          </div>
        )
      )}
      <section className="mePlayerBoard">
        <div className="mePlayerBoardSide">
          <p>
            déplacement: <span style={{ color: "aqua" }}>flèches</span>{" "}
          </p>
          <p>
            interaction: touche <span style={{ color: "aqua" }}>a</span>
          </p>
        </div>
        <article className="meCommand">
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
              {grid.length > 0 &&
              possibleActivity(grid[playerActivity[0]][playerActivity[1]])
                .length > 1 ? (
                <button
                  className="playerActivity"
                  style={box[2] === true ? { backgroundColor: "red" } : {}}
                  onClick={
                    possibleActivity(
                      grid[playerActivity[0]][playerActivity[1]]
                    )[1]
                  }
                >
                  {possibleActivity(grid[playerActivity[0]][playerActivity[1]])}
                </button>
              ) : (
                <></>
              )}
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
        </article>
        <div className="mePlayerBoardSide">{key[2] === true && "🗝"}</div>
      </section>
      <div className="meTitleContainer">
        <button className="restarter" onClick={() => restarter(start)}>
          {start}
        </button>
      </div>
    </section>
  );
};

export default MoveExperiment;
