'use client'

import { useEffect, useState } from "react";
import TimeEntry from "./models/TimeEntry";

export default function Home() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [timeEntries, setTimeEntries] = useState(Array<TimeEntry>)
  const [timeEntry, setTimeEntry] = useState(new TimeEntry(new Date(), "", "", 0,0))

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  useEffect(() => {
    let intervalId
    if(isRunning) {
      intervalId = setInterval(() => {
        setTime(time => time + 1);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const currentDate = new Date().toLocaleDateString();
  // const currentTime = new Date().toLocaleTimeString();

  function handleStartStop() {
    // When i stop i want to record times and save
    setTimeEntry({...timeEntry, end: new Date().toLocaleTimeString(), durationHours: hours, durationMinutes: minutes})
    setTimeEntries(timeEntries => [...timeEntries, timeEntry])

    // when i start i want to reset the time and 

    console.log(timeEntry)
    // Reset before new run
    if(!isRunning) {
      setTime(0)
    } else {
      console.log(hours)
      console.log(minutes)
      setTimeEntry({...timeEntry, start: new Date().toLocaleTimeString()})
    }

    setIsRunning(isRunning => !isRunning)
  }

  return (
    <div className="flex flex-col items-center">
      This is my time tracker
      <div className="flex flex-row justify-between ">
        <div>{currentDate}</div>
        -----
        {/* <div>{currentTime}</div> */}
      </div>
      <div>{hours}-{minutes}-{seconds}-{milliseconds}</div>
      <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start</th>
            <th>Stop</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {
            timeEntries.map((t, index) => (
              <tr key={index}>
                <td>{t.date.toDateString()}</td>
                <td>{t.start}</td>
                <td>{t.end}</td>
                <td>{t.durationHours}</td>
                <td>{t.durationMinutes}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
