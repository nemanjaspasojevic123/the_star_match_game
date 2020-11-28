import { useEffect, useState } from "react";
import { utils } from "../utils";

export const GameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(15);
  
    useEffect(() => {
      if (secondsLeft > 0 && availableNums.length > 0) {
        const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
        return () => clearTimeout(timerId);
      }
    });
  
    const setGameState = (newCandidateNums) => {
      if (utils.sum(newCandidateNums) !== stars) {
              setCandidateNums(newCandidateNums);
      } else {
        const newAvailableNums = availableNums.filter(
          n => !newCandidateNums.includes(n)
        );
        setStars(utils.randomSumIn(newAvailableNums, 9));
        setAvailableNums(newAvailableNums);
        setCandidateNums([]);
      }
    };
  
    return { stars, availableNums, candidateNums, secondsLeft, setGameState };
  };