import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

export async function save(key: string, value: string) {
    await setItemAsync(key, value)
}

export async function getValue(key: string) {
    const result = await getItemAsync(key)
    if (result) return result
    else return null
}

export async function remove(key: string) {
    await deleteItemAsync(key)
}

export const SecureStore = {
    save,
    get: getValue,
    remove
}
