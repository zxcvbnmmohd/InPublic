import type { Express } from 'express'
import express from 'express'

const router = express.Router()

const UserRoutes = (app: Express) => {
    // API ENDPOINT CODE WILL GO HERE
    return app.use('/api/v1/', router)
}

export default UserRoutes
