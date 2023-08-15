import { createContext, snacrRouter } from '@snacr/api'

export const caller = snacrRouter.createCaller(
    await createContext({
        type: 'rsc'
    })
)
