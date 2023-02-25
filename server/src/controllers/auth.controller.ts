import { AuthModel } from '@/models'
import { JwtUtility } from '@/utilities'
import type { NextFunction, Request, Response } from 'express'

// @desc      Login a user
// @route     POST /api/login
// @access    Public
const login = async (req: Request, __: Response, ___: NextFunction) => {
    let code = 500
    let response = {}

    try {
        const { username, email, password } = req.body

        if (!username && !email && !password) {
            code = 400
            response = {
                message: 'Please fill in all fields',
            }
        }

        if (username) {
            const user = await AuthModel.loginByUsername(email, password)

        }

        if (email) {
            const user = await AuthModel.loginByEmail(email, password)

        }

    } catch (e) {
        code = 500
        response = {
            message: 'Server error',
            error: e,
        }
    }
}

// @desc      Register a user
// @route     POST /api/register
// @access    Public
const register = async (req: Request, res: Response, ___: NextFunction) => {
    let code = 500
    let response = {}

    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            code = 400
            response = {
                message: 'Please fill in all fields',
            }
        } else {
            const isExist = await AuthModel.findOne({ email })

            if (isExist) {
                code = 400
                response = {
                    message: 'User already exists',
                }
            } else {
                const authUser = await AuthModel.create(req.body)
                const token: string = JwtUtility.sign(authUser.toJSON())

                authUser.tokens.push(token)

                await authUser.save()

                code = 200
                response = {
                    message: 'User created',
                    data: authUser.toJSON,
                    token,
                }
            }
        }

        return res.status(code).json(response)
    } catch (error) {
        code = 500
        response = {
            message: 'Server error',
            error,
        }

        return res.status(code).json(response)
    }
}

export { login, register }

// Sample User Data JSON
// {
//     "firstName": "Mohamed",
//     "lastName": "Mohamed",
//     "email": "mohd@mohd.ca",
//     "username": "mohd",
//     "password": "mohamed1",
//     "location": "Toronto, ON",
//     "website": "mohd.ca",
//     "bio": "Hello World!"
// }
