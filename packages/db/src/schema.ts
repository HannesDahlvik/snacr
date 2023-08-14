import type { ColumnType } from 'kysely'

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export type Key = {
    id: string
    hashed_password: string | null
    user_id: string
}
export type Session = {
    id: string
    user_id: string
    active_expires: string
    idle_expires: string
}
export type User = {
    id: string
    username: string
    email: string
    email_verified: number
    photo: string
}
export type DB = {
    Key: Key
    Session: Session
    User: User
}
