import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type Dayjs = dayjs.Dayjs

export { dayjs, Dayjs }
