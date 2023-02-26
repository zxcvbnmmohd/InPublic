import { Auth } from '@/models'
import { JwtUtility } from '@/utilities'
import type { NextFunction, Request, Response } from 'express'

// @desc      Login a user
// @route     POST /api/login
// @access    Public
const login = async (req: Request, res: Response, ___: NextFunction) => {
    let code = 500
    let response = {}

    try {
        const { username, email, password } = req.body

        console.log(req.body)

        if (!username && !email && !password) {
            code = 400
            response = {
                message: 'Please fill in all fields',
            }
        }

        if (username) {
            const authUser = await Auth.loginByUsername(username, password)
            const token: string = JwtUtility.sign(authUser.toResources())

            authUser.tokens.concat(token)

            code = 200
            response = {
                message: 'User logged in',
                data: await authUser.save(),
                token,
            }
        } else {
            const authUser = await Auth.loginByEmail(email, password)
            const token: string = JwtUtility.sign(authUser.toResources())

            authUser.tokens = authUser.tokens.concat(token)

            code = 200
            response = {
                message: 'User logged in',
                data: await authUser.save(),
                token,
            }
        }

        return res.status(code).json(response)
    } catch (e) {
        code = 500
        response = {
            message: 'Server error',
            error: e,
        }

        return res.status(code).json(response)
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
            const exists = await Auth.findOne({ email })

            if (exists) {
                code = 400
                response = {
                    message: 'User already exists',
                }
            } else {
                const authUser = await Auth.create(req.body)
                const token: string = JwtUtility.sign(authUser.toResources())

                authUser.tokens = authUser.tokens.concat(token)

                code = 200
                response = {
                    message: 'User created',
                    data: await authUser.save(),
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
