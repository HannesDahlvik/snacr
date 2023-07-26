/// <reference types="lucia" />
declare namespace Lucia {
    type Auth = import('./src/auth/lucia').Auth
    type DatabaseUserAttributes = {
        email: string
        email_verified: nubmer
        username: string
        photo: string
    }
    type DatabaseSessionAttributes = {}
}
