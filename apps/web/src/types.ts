import { Place, Post } from '@snacr/db'

export interface ErrorPage {
    error: Error
    reset: () => void
}

export type PlaceParamsProps = {
    params: {
        url: string
    }
}

export type PlacePostParamsProps = {
    params: {
        id: string
    }
} & PlaceParamsProps

export type PostWithPlace = Post & {
    place: Place
}
