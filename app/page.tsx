'use client'

import { useEffect, useState } from "react";
import TimeEntry from "./models/TimeEntry";

export default function Home() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [timeEntries, setTimeEntries] = useState(Array<TimeEntry>)
  const [timeEntry, setTimeEntry] = useState(new TimeEntry(new Date(), "", "", 0,0,0))
  const [totalHours, setTotalHours] = useState(0)
  const [totalMinutes, setTotalMinutes] = useState(0)

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;
  const currentDate = new Date().toLocaleDateString();
  // const currentTime = new Date().toLocaleTimeString();

  useEffect(() => {
    let intervalId

    if(isRunning) {
      setTimeEntry({...timeEntry, start: new Date().toLocaleTimeString()})
      setTime(0)
      intervalId = setInterval(() => {
        setTime(time => time + 1);
      }, 10);
    } else {
      if (timeEntry.start) {
        timeEntry.end = new Date().toLocaleTimeString()
        timeEntry.durationHours = hours
        timeEntry.durationMinutes = minutes
        timeEntry.durationSeconds = seconds
        
        const currentTimeEntries = [...timeEntries, timeEntry]

        let hrs = timeEntry.durationHours + totalHours
        let min = timeEntry.durationMinutes + totalMinutes

        if(min > 60) {
          let prevMin = min
          min = min % 60
          hrs = hrs + Math.trunc(prevMin / 60)
        }

        setTimeEntries(currentTimeEntries)
        setTotalHours(hrs)
        setTotalMinutes(min)
      }
    }
    
    return () => clearInterval(intervalId);
  }, [isRunning]);


  function handleStartStop() {
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
      <div>
        Total: {totalHours} hrs {totalMinutes} min
      </div>
    </div>
  );
}
