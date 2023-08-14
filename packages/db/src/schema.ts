import type { ColumnType } from 'kysely'

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export const PostType = {
    text: 'text',
    media: 'media',
    link: 'link'
} as const
export type PostType = (typeof PostType)[keyof typeof PostType]
export const VoteType = {
    UP: 'UP',
    DOWN: 'DOWN'
} as const
export type VoteType = (typeof VoteType)[keyof typeof VoteType]
export type Comment = {
    id: string
    text: string
    createdAt: Generated<Timestamp>
    updatedAt: Timestamp
    authorId: string
    postId: string
    commentId: string | null
    replyToId: string | null
}
export type CommentVote = {
    commentId: string
    userId: string
    type: VoteType
}
export type Key = {
    id: string
    hashed_password: string | null
    user_id: string
}
export type Place = {
    id: string
    name: string
    description: string
    createdAt: Generated<Timestamp>
    creatorId: string
}
export type Post = {
    id: string
    type: PostType
    title: string
    body: string
    createdAt: Generated<Timestamp>
    updatedAt: Timestamp
    authorId: string
    placeId: string
}
export type Session = {
    id: string
    user_id: string
    active_expires: string
    idle_expires: string
}
export type Subscription = {
    placeId: string
    userId: string
}
export type User = {
    id: string
    username: string
    email: string
    email_verified: number
    photo: string
}
export type Vote = {
    postId: string
    userId: string
    type: VoteType
}
export type DB = {
    Comment: Comment
    CommentVote: CommentVote
    Key: Key
    Place: Place
    Post: Post
    Session: Session
    Subscription: Subscription
    User: User
    Vote: Vote
}
