import { PropsWithChildren, useState } from 'react'

import { env } from '@snacr/env'

import { api } from '../lib/api'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getFetch, httpBatchLink, loggerLink } from '@trpc/client'
import Constants from 'expo-constants'
import superjson from 'superjson'

function getBaseUrl() {
    const debuggerHost = Constants.expoConfig?.hostUri
    const localhost = debuggerHost?.split(':')[0]

    if (!localhost) {
        return 'prod api url'
    }
    return `http://${localhost}:3000`
}

export default function TrpcProvider({ children }: PropsWithChildren) {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        api.createClient({
            transformer: superjson,
            links: [
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === 'development' ||
                        (opts.direction === 'down' && opts.result instanceof Error)
                }),
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                    fetch: async (input, init?) => {
                        const fetch = getFetch()
                        return fetch(input, {
                            ...init,
                            credentials: 'include'
                        })
                    }
                })
            ]
        })
    )

    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <>{children}</>
            </QueryClientProvider>
        </api.Provider>
    )
}
