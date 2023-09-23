export function createURL(str: string) {
    const word = str.replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')
    const newUrl = word.replace(/ /g, '')
    return newUrl
}
