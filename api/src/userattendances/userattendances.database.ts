import db from 'mysql2-async/db'
import { UserAttendance, UserAttendanceFilters } from './userattendances.models'

export async function getUserAttendances (filters: UserAttendanceFilters) {
  const binds = []
  const where = []
  if (filters.ids?.length) {
    where.push(`id IN (${db.in(binds, filters.ids)})`)
  }
  if (filters.meetingIds?.length) {
    where.push(`meeting_id IN (${db.in(binds, filters.meetingIds)})`)
  }
  if (!where.length) throw new Error('Tried to fetch on userattendances table with no filters, that is too much data to retrieve.')
  const userattendances = await db.getall(`SELECT * FROM userattendances WHERE (${where.join(') AND (')})`, binds)
  return userattendances.map(ua => new UserAttendance(ua))
}
