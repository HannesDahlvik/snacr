import { SnacrRouter } from '@snacr/api'

import { createTRPCReact } from '@trpc/react-query'

export const api = createTRPCReact<SnacrRouter>()
