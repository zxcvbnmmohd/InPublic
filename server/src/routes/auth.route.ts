import type { Express } from 'express'
import express from 'express'

import { AuthController } from '@/controllers'

const router = express.Router()

const UserRoutes = (app: Express) => {
    router.route('/register').post(AuthController.register)
    router.route('/login').post(AuthController.login)

    return app.use('/api/v1/auth', router)
}

export default UserRoutes
