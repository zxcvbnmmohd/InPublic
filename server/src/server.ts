import 'module-alias/register'

import type { Express, Request, Response } from 'express'
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

server.get('/', (_: Request, res: Response) => {
    res.send('InPublic Server')
})

server.listen(ENV.PORT, async () => {
    loggerUtility.log(`⚡️ Server is running @ http://localhost:${ENV.PORT}`)
    await databaseService.initializeDatabase()
})
