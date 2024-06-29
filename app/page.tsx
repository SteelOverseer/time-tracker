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

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined

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

  function submitTime() {
    console.log(`I am submitting ${totalHours} hours and ${totalMinutes} minutes`)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-between text-3xl mt-5">
        Next Report Day: 1/1/2024
      </div>
      <div>
        <button 
          className="border rounded-xl text-3xl p-5 m-5" 
          onClick={handleStartStop}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button 
          className="border rounded-xl text-3xl p-5 m-5 disabled:opacity-75" 
          onClick={submitTime}
          disabled={totalHours == 0 && totalMinutes == 0}
        >
          Submit
        </button>
      </div>
      <div className="text-3xl mb-5">{hours}.{minutes}.{seconds}.{milliseconds}</div>
      <table className="border border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Start</th>
            <th className="border p-2">Stop</th>
            <th className="border p-2">Hours</th>
            <th className="border p-2">Minutes</th>
          </tr>
        </thead>
        <tbody>
          {
            timeEntries.map((t, index) => (
              <tr key={index}>
                <td className="border p-2">{t.date.toDateString()}</td>
                <td className="border p-2">{t.start}</td>
                <td className="border p-2">{t.end}</td>
                <td className="border p-2 text-center">{t.durationHours}</td>
                <td className="border p-2 text-center">{t.durationMinutes}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="text-3xl m-5">
        Total: {totalHours} hrs {totalMinutes} min
      </div>
    </div>
  );
}
