import { useEffect, useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode); // set mode
    if (replace) {
        setHistory(history.slice(0,-1), newMode); // replace last history with new mode
        // console.log("MODE in transition = ", mode)
        // console.log("HISTORY in transition = ", history)

    } 
    else {
      setHistory(prev => ([...prev, newMode])); // add new mode to history
        // console.log("MODE in (else) transition = ", mode)
        // console.log("HISTORY in (else) transition = ", history)
      
    }
  }

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length-2]);
        // console.log("MODE in if back= ", mode);

      setHistory(prev => (history.slice(0, -1)));
        // console.log("HISTORY in if back= ", history);

    } 
    else {
      setMode(history[0]);
        // console.log("MODE in else back= ", mode);
      setHistory(mode);
        // console.log("HISTORY in else back= ", history);

    }
  }

  return { mode, transition, back };
}
