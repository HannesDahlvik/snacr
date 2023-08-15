import { DB, Place } from '@snacr/db'

import { ExpressionBuilder } from 'kysely'
import { jsonObjectFrom } from 'kysely/helpers/postgres'

export function withPlace(eb: ExpressionBuilder<DB, 'Post'>) {
    return jsonObjectFrom(
        eb.selectFrom('Place').selectAll('Place').whereRef('Post.placeId', '=', 'Place.id')
    )
        .$castTo<Place>()
        .as('place')
}
