import { SnacrRouter } from './src/root'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'

export { snacrRouter as appRouter, type SnacrRouter as AppRouter } from './src/root'
export { createContext } from './src/context'

export type RouterInputs = inferRouterInputs<SnacrRouter>

export type RouterOutputs = inferRouterOutputs<SnacrRouter>
