import type { Express } from 'express'
import express from 'express'

import { UserController } from '@/controllers'

const router = express.Router()

const UserRoutes = (app: Express) => {
    router.route('/create').post(UserController.createUser)
    router.route('/read').post(UserController.readUser)
    router.route('/update').post(UserController.updateUser)
    router.route('/delete').post(UserController.deleteUser)

    return app.use('/api/v1/', router)
}

export default UserRoutes
