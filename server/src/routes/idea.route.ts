import type { Express } from 'express'
import express from 'express'

const router = express.Router()

const IdeaRoutes = (app: Express) => {
    return app.use('/api/v1/', router)
}

export default IdeaRoutes
