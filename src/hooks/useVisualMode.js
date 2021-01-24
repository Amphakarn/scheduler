import { useEffect, useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode); // set mode
    if (replace) {
        setHistory(history.slice(0,-1), newMode); // replace last history with new mode
    } 
    else {
      setHistory(prev => ([...prev, newMode])); // add new mode to history      
    }
  }

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length-2]);
      setHistory(prev => (history.slice(0, -1)));
    } 
    else {
      setMode(history[0]);
      setHistory(mode);
    }
  }

  return { mode, transition, back };
}
