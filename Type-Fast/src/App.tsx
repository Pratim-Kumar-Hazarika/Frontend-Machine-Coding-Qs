import React, { useEffect, useState } from "react";
import { paragraph } from "txtgen";

const pg = paragraph([1]);

const callWPM = (pg, startTime, endTime) => {
  const timeInMinuts = (endTime - startTime) / 1000 / 60;

  if (timeInMinuts === 0) return 0;
  const wordCount = pg.trim().split(/\s+/).length;

  return Math.round(wordCount / timeInMinuts);
};

const paraGraph = (pg, str = []) => {
  const letters = pg.split("");
  return letters.map((item, i) => {
    const currentChar = str[i];
    let className = "";
    if (currentChar) {
      const isValid = item?.toLowerCase() === currentChar?.toLowerCase();
      className = isValid ? "valid" : "invalid";
    }
    const showBlink = i == str.length;
    return (
      <span className={showBlink ? className + "blink" : className}>
        {item}
      </span>
    );
  });
};

function App() {
  const [str, setStr] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const mismatchedChars = str.some((e, i) => {
    return e?.toLowerCase() != pg[i]?.toLowerCase();
  });
  const completedTyping = str.length === pg.length && !mismatchedChars;

  useEffect(() => {
    if (completedTyping) {
      setEndTime(Date.now());
    }
  }, [completedTyping]);

  useEffect(() => {
    const keyDown = (e) => {
      if (!startTime || completedTyping) {
        return;
      }
      if (e.key === "Backspace") {
        setStr((prev) => {
          prev.pop();
          return [...prev];
        });
      } else {
        setStr((prev) => {
          return [...prev, e.key];
        });
      }
    };

    window.addEventListener("keydown", keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [startTime, completedTyping]);

  function startHandler() {
    if (!endTime) {
      setStartTime(Date.now());
    } else {
      setStartTime(null);
      setEndTime(null);
      setStr([]);
    }
  }
  return (
    <div className="app">
      <button onClick={startHandler}>{startTime ? "Started" : "Start"}</button>
      <div> {paraGraph(pg, str)}</div>
      <div>{completedTyping && callWPM(pg, startTime, endTime)}</div>
    </div>
  );
}

export default App;
