import type { Express } from 'express'
import express from 'express'

import { register, login } from '@/controllers/user.controller'

const router = express.Router()

const UserRoutes = (app: Express) => {
    router.route('/register').post(register)
    router.route('/login').post(login)

    return app.use('/api/v1/', router)
}

export default UserRoutes
