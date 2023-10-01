import { dayjs } from '@snacr/dayjs'

export function timeAgo(date: Date) {
    return dayjs(date).fromNow()
}
