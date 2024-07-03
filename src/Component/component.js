import { useState, useEffect, useRef } from "react";

export default function StopWatch() {
  const [time, setTime] = useState({ sec: 0, min: 0 });
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newSec = prevTime.sec + 1;
          const newMin = prevTime.min + Math.floor(newSec / 60);
          return { sec: newSec % 60, min: newMin };
        });
      }, 1000);
    } else if (!isActive && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime({ sec: 0, min: 0 });
    clearInterval(intervalRef.current);
  };

  return (
    <>
      <h1>Stopwatch</h1>
      <div>
        Time:  {time.min.toString()}:
        {time.sec.toString().padStart(2, '0')}
      </div>
      {isActive &&(
      <button onClick={handleStartStop}>
        Stop
      </button>
       )}
      {!isActive&&(
       <button onClick={handleStartStop}>Start</button>
      )}
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
