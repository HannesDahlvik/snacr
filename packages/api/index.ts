import { SnacrRouter } from './src/root'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'

export { snacrRouter, type SnacrRouter } from './src/root'
export { createContext } from './src/context'
export { type Auth, auth, getPageSession } from './src/auth/lucia'
export { type Session, type User } from 'lucia'

export type RouterInputs = inferRouterInputs<SnacrRouter>

export type RouterOutputs = inferRouterOutputs<SnacrRouter>
