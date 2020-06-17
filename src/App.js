import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const STARTING_TIME = 10;

  const [timeLeft, setTimeLeft] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [text, setText] = useState("");
  const [totalWords, setTotalWords] = useState(0);
  const textareaRef = useRef(null);

  function handleChange(event) {
    const { value } = event.target;
    setText(value);
  }

  function countWords(text) {
    const wordsArr = text.trim().split(" ");
    return wordsArr.filter((word) => word !== "").length;
  }

  function startGame() {
    setIsTimeRunning(true);
    setTimeLeft(STARTING_TIME);
    setText("");
    textareaRef.current.disabled = false;
    textareaRef.current.focus();
    setTotalWords(0);
  }

  function endGame() {
    setIsTimeRunning(false);
    setTotalWords(countWords(text));
  }

  useEffect(() => {
    if (isTimeRunning && timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, isTimeRunning]);

  return (
    <div className="App">
      <h1>How fast can you type?</h1>
      <textarea
        ref={textareaRef}
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}
      />
      <h3>Time left: {timeLeft} seconds </h3>
      <button onClick={startGame} disabled={isTimeRunning}>
        Start
      </button>
      <h3>Total words: {totalWords}</h3>
    </div>
  );
}

export default App;
