import type { Express } from 'express'
import express from 'express'

import { IdeaController } from '@/controllers'

const router = express.Router()

const IdeaRoutes = (app: Express) => {
    router.route('/create').post(IdeaController.createIdea)
    router.route('/read').post(IdeaController.readIdea)
    router.route('/update').post(IdeaController.updateIdea)
    router.route('/delete').post(IdeaController.deleteIdea)

    return app.use('/api/v1/idea', router)
}

export default IdeaRoutes
