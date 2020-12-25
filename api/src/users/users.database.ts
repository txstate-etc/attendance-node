import db from 'mysql2-async/db'
import { UserFilters, User } from './users.models'

export async function getUsers (filters: UserFilters) {
  const binds = []
  const users = await db.getall(`SELECT * FROM users WHERE id IN (${db.in(binds, filters.ids)})`, binds)
  return users.map(m => new User(m))
}
