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
const register = async (_: Request, __: Response, ___: NextFunction) => {
    return null
}

export { login, register }
