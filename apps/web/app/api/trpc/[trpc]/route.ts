import { snacrRouter } from '@snacr/api'

import { FetchCreateContextFnOptions, fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (request: Request) => {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: snacrRouter,
        createContext: function (opts: FetchCreateContextFnOptions) {
            return {
                type: 'api',
                req: opts.req,
                resHeaders: opts.resHeaders
            }
        }
    })
}

export const GET = handler
export const POST = handler
