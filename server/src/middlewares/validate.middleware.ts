import type { NextFunction, Request, Response } from 'express'
import type { AnyZodObject } from 'zod'
import { ZodError } from 'zod'

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            params: req.params,
            query: req.query,
            body: req.body,
        })

        next()
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                status: 'fail',
                error: error.errors,
            })
        }
        next(error)
    }
}

export { validate }
