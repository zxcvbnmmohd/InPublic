import type { Express } from 'express'
import express from 'express'

import { CommentController } from '@/controllers'

const router = express.Router()

const CommentRoutes = (app: Express) => {
    router.route('/create').post(CommentController.createComment)
    router.route('/read').post(CommentController.readComment)
    router.route('/update').post(CommentController.updateComment)
    router.route('/delete').post(CommentController.deleteComment)

    return app.use('/api/v1/', router)
}

export default CommentRoutes
