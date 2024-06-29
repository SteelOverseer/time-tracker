export default class TimeEntry {
  date: Date
  start: string
  end: string
  durationHours: number
  durationMinutes: number
  durationSeconds: number

  constructor(date: Date, start: string, end: string, durationHours: number, durationMinutes: number, durationSeconds: number) {
    this.date = date;
    this.start = start
    this.end = end
    this.durationHours = durationHours
    this.durationMinutes = durationMinutes
    this.durationSeconds = durationSeconds
  }
}