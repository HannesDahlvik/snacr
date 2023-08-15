import { DB } from './schema'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

export const pool = new Pool({
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
})

const dialect = new PostgresDialect({
    pool
})

export const db = new Kysely<DB>({
    dialect
})

export type { DB } from './schema'
export * from './enums'
export * from './types'
