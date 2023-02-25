import 'module-alias/register'

import bodyparser from "body-parser"
import cookieParser from 'cookie-parser'
import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'

import { ENV } from '@/configs'
import { CommentRoutes, IdeaRoutes, UserRoutes } from '@/routes'
import { DatabaseService } from '@/services'
import { LoggerUtility } from '@/utilities'

const server: Express = express()
const databaseService: DatabaseService = new DatabaseService()
const loggerUtility: LoggerUtility = new LoggerUtility('Server')

server.use(bodyparser.urlencoded({extended:true}));
server.use(express.json())
server.use(cookieParser());

CommentRoutes(server)
IdeaRoutes(server)
UserRoutes(server)

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
