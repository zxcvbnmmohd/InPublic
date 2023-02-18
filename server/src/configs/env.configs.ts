// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY
const ACCESS_TOKEN_PUBLIC_KEY = process.env.ACCESS_TOKEN_PUBLIC_KEY

const MONGDB_DATABASE = process.env.MONGDB_DATABASE
const MONGDB_PASSWORD = process.env.MONGDB_PASSWORD
const MONGDB_USERNAME = process.env.MONGDB_USERNAME
const MONGODB_URL = process.env.MONGODB_URL

const PORT = process.env.PORT

const REDIS_URL = process.env.REDIS_URL

export {
    ACCESS_TOKEN_PRIVATE_KEY,
    ACCESS_TOKEN_PUBLIC_KEY,
    MONGDB_DATABASE,
    MONGDB_PASSWORD,
    MONGDB_USERNAME,
    MONGODB_URL,
    PORT,
    REDIS_URL,
}
