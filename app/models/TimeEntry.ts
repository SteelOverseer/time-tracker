export default class TimeEntry {
  date: Date
  start: string
  end: string
  durationHours: number
  durationMinutes: number

  constructor(date: Date, start: string, end: string, durationHours: number, durationMinutes: number) {
    this.date = date;
    this.start = start
    this.end = end
    this.durationHours = durationHours
    this.durationMinutes = durationMinutes
  }
}