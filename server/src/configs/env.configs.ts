// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

export const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY
export const ACCESS_TOKEN_PUBLIC_KEY = process.env.ACCESS_TOKEN_PUBLIC_KEY

export const MONGDB_DATABASE = process.env.MONGDB_DATABASE
export const MONGDB_PASSWORD = process.env.MONGDB_PASSWORD
export const MONGDB_USERNAME = process.env.MONGDB_USERNAME
export const MONGODB_URL = process.env.MONGODB_URL

export const PORT = process.env.PORT

export const REDIS_URL = process.env.REDIS_URL