"use client"
import React, { useRef, useState } from 'react';

function Home() {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const lapSectionRef = useRef(null); // Ref for lap-section

  const startStopwatch = () => {
    startTime.current = Date.now() - currentTime;

    intervalRef.current = setInterval(() => {
      const newTime = Date.now() - startTime.current;
      setCurrentTime(newTime);
    }, 10);
  };

  const stopStopwatch = () => {
    clearInterval(intervalRef.current);
  };

  const lapStopwatch = () => {
    setLaps((prevLaps) => [...prevLaps, currentTime.toFixed(3)]);
    lapSectionRef.current.style.display = 'block'; // Show lap-section
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setCurrentTime(0);
    setLaps([]);
    lapSectionRef.current.style.display = 'none'; // Hide lap-section
  };

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{currentTime.toFixed(3)}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={startStopwatch}>
            START
          </button>
          <button className="stop-btn" onClick={stopStopwatch}>
            STOP
          </button>
          <button className="lap-btn" onClick={lapStopwatch}>
            LAP
          </button>
          <button className="reset-btn" onClick={resetStopwatch}>
            RESET
          </button>
        </section>
      </section>
      <section className='lap-section' ref={lapSectionRef}>
        <h2>Laps</h2>
        <section className='laps'>
          {laps.map((lap, index) => (
            <p key={index}>{lap}</p>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Home;
