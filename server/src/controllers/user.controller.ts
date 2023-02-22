import { UserModel } from '@/models'
import { JwtUtility } from '@/utilities'
import type { NextFunction, Request, Response } from 'express'

// @desc      Login a user
// @route     POST /api/login
// @access    Public
const login = async (_: Request, __: Response, ___: NextFunction) => {
    return null
}

// @desc      Register a user
// @route     POST /api/register
// @access    Public
const register = async (req: Request, res: Response, ___: NextFunction) => {
    let code = 500
    let response = {}

    console.log(req.body)
    try {
        const { firstName, lastName, username, email, password } = req.body

        if (!firstName || !lastName || !username || !email || !password) {
            code = 400
            response = {
                message: 'Please fill in all fields',
            }
        } else {
            const isExist = await UserModel.findOne({ email })

            if (isExist) {
                code = 400
                response = {
                    message: 'User already exists',
                }
            } else {
                const user = await UserModel.create(req.body)
                const token: string = JwtUtility.sign(user.toJSON())

                user.tokens.push(token)

                await user.save()

                code = 200
                response = {
                    message: 'User created',
                    data: user.toJSON,
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