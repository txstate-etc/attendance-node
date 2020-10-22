import db from 'mysql2-async/db'
import { DataLoaderFactoryContext } from '../dataloaderfactory/dataloadedservice'
import { UserFilters, User } from './users.models'

export async function getUsers (filters: UserFilters, ctx: DataLoaderFactoryContext) {
  const binds = []
  const users = await db.getall(`SELECT * FROM users WHERE id IN (${db.in(binds, filters.ids)})`, binds)
  return users.map(m => new User(m))
}
