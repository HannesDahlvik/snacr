import { User } from '@snacr/db'

import { hookstate } from '@hookstate/core'

interface AuthStore {
    sessionId: string | null
    user: User | null
}

export const authStore = hookstate<AuthStore>({
    sessionId: null,
    user: null
})
