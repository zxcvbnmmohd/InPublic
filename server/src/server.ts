import 'module-alias/register'

import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'

import { ENV } from '@/configs'
import { IdeaRoutes, UserRoutes } from '@/routes'
import { DatabaseService } from '@/services'
import { LoggerUtility } from '@/utilities'

const databaseService: DatabaseService = new DatabaseService()
const loggerUtility: LoggerUtility = new LoggerUtility('Serveßr')
const server: Express = express()

IdeaRoutes(server)
UserRoutes(server)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
server.use((error: any, _: Request, res: Response, __: NextFunction) => {
    error.status = error.status || 'error'
    error.statusCode = error.statusCode || 500

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    })
})

server.get('/', (_: Request, res: Response) => {
    res.send('InPublic Server')
})

server.listen(ENV.PORT, async () => {
    loggerUtility.log(`⚡️ Server is running @ http://localhost:${ENV.PORT}`)
    await databaseService.initializeDatabase()
})
