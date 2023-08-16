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
