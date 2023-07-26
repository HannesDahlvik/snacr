import { snacrRouter } from '@snacr/api'

export const createCaller = async () => {
    const caller = snacrRouter.createCaller({
        type: 'rsc'
    })
    return caller
}
