// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT

export { MONGODB_URL, PORT }
