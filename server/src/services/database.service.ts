import mongoose from 'mongoose'

import { ENV } from '@/configs'
import { LoggerUtility } from '@/utilities'

export default class DatabaseService {
    loggerUtility: LoggerUtility = new LoggerUtility('DatabaseService')

    async initializeDatabase() {
        mongoose.set('strictQuery', false)

        return mongoose.connect(ENV.MONGODB_URL!, () => {
            this.loggerUtility.log('📀 Connected to MongoDB')
        })
    }

    async closeConnection() {
        return mongoose.connection.close(true)
    }
}
