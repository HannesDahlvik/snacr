import { dayjs } from '@snacr/dayjs'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function genRandomString(length: number = 10) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let counter = 0
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
        counter += 1
    }
    return result
}

export function getInitials(name: string): string {
    const words = name.split(' ')
    if (words.length === 1) {
        const word = words[0]
        return word[0].toUpperCase() + word[1].toUpperCase()
    }
    const initials = words.map((word) => {
        if (word.length > 0) return word[0].toUpperCase()
        return ''
    })
    return initials.join('')
}

export function createURL(str: string) {
    const word = str.replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')
    const newUrl = word.replace(/ /g, '')
    return 'p/' + newUrl
}

export function timeAgo(date: Date) {
    return dayjs(date).fromNow()
}
