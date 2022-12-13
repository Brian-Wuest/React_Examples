import React, { useEffect, useState } from "react";
import "./App.css";

const StarsDisplay = (props: { count: number }) => {
  return (
    <>
      {utils.range(1, props.count).map((starId) => {
        return <div key={starId} className="star" />;
      })}
    </>
  );
};

const NumberKey = (props: {
  numberValue: number;
  status: string;
  onClick: (numberValue: number, status: string) => void;
}) => {
  const color = (colors as any)[props.status];
  return (
    <button
      className="number"
      style={{ backgroundColor: color }}
      onClick={() => props.onClick(props.numberValue, props.status)}
    >
      {props.numberValue}
    </button>
  );
};

const PlayAgain = (props: { onClick: () => void; gameStatus: string }) => {
  return (
    <div className="game-done">
      <div
        className="message"
        style={{ color: props.gameStatus === "lost" ? "red" : "green" }}
      >
        {props.gameStatus === "lost" ? "Game Over" : "Nice"}
      </div>
      <button onClick={props.onClick}>Play Again?</button>
    </div>
  );
};

// Custom Hook
// Common nomenclature is to prefix with "use" for any custom hooks.
// DO NOT call hooks inside loops or conditions.
const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));

  // State values, use minimum amount of information in the state.
  // Don't include things in the state which can be computed from other things in the state.
  // Candidates
  // availableNumbers
  // Creating mock data for intitial values
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
  const [candidateNumbers, setCandidatenumbers] = useState(new Array<number>());
  const [secondsLeft, setSecondsLeft] = useState(15);

  // Can use setTimeout here instead of setInterval since React will call this function
  // Every time the state changes.
  useEffect(() => {
    // Only count down the seconds when there is time left and there are numbers left.
    if (secondsLeft > 0 && availableNumbers.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => {
        // Clean up timer since it's no longer needed.
        clearTimeout(timerId);
      };
    }

    //console.log('Done rendering')

    return () => {
      // This return function will be called to clean up any effects created.
      //console.log('Component is going to rerender');
    };
  });

  const setGameState = (newCandidateNums: Array<number>) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidatenumbers(newCandidateNums);
    } else {
      // Have correct match
      const newAvailableNumbers = availableNumbers.filter(
        (n) => !newCandidateNums.includes(n)
      );
      // Redraw number of stars.
      const newStars = utils.randomSumIn(newAvailableNumbers, 9);
      setStars(newStars);

      setAvailableNumbers(newAvailableNumbers);
      setCandidatenumbers(new Array<number>());
    }
  };

  return {
    stars, availableNumbers, candidateNumbers, secondsLeft, setGameState
  };
};

// Main game component.
function Game(props: { startNewGame: () => void }) {
  // De-construct the object coming from the useGameState function to avoid having
  // to re-write the rest of this function.
  const {
    stars,
    availableNumbers,
    candidateNumbers,
    secondsLeft,
    setGameState
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNumbers) > stars;
  const gameStatus =
    availableNumbers.length === 0
      ? "won"
      : secondsLeft === 0
      ? "lost"
      : "playing";

  const numberStatus = (numberValue: number) => {
    if (!availableNumbers.includes(numberValue)) {
      return "used";
    }

    if (candidateNumbers.includes(numberValue)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }

    return "available";
  };

  const onNumberClick = (numberValue: number, status: string) => {
    // currentStatus => newStatus
    if (status === "used" || gameStatus !== "playing") {
      return;
    }

    // candidateNumbers
    const newCandidateNums =
      status === "available"
        ? candidateNumbers.concat(numberValue)
        : candidateNumbers.filter((cn) => cn !== numberValue);

    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "playing" ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((numberId) => {
            return (
              <NumberKey
                key={numberId}
                numberValue={numberId}
                status={numberStatus(numberId)}
                onClick={onNumberClick}
              />
            );
          })}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
}

// Color Theme
const colors = {
  available: "lightgray",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue",
};

// Math science
const utils = {
  // Sum an array
  sum: (arr: Array<number>) => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min: number, max: number) =>
    Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min: number, max: number) =>
    min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr: Array<number>, max: number) => {
    const sets = new Array<Array<number>>();
    sets.push(new Array<number>());

    const sums = new Array<number>();
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);

        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

const App = () => {
  const [gameId, setGameId] = useState(1);

  // The "key" here can be used to unmount and mount a new element.
  // React uses this key to determine what to render to the user.
  // So when the key changes, the old one goes away and the new one is rendered.
  // This means that side-effects are gone and the state is reset.
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

export default App;
