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
