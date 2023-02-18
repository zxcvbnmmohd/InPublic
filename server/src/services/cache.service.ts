import type { SetOptions } from 'redis'
import { createClient } from 'redis'

import { ENV } from '@/configs'
import { LoggerUtility } from '@/utilities'

export default class CacheService {
    loggerUtility = new LoggerUtility('DataCacheServicebaseService')
    redisClient = createClient({ url: ENV.REDIS_URL! })

    initializeCache = async () => {
        try {
            await this.redisClient.connect()
            this.redisClient.on('error', (err) => console.log(err))

            this.loggerUtility.log('Redis client connected...')
        } catch (error: unknown) {
            setTimeout(this.initializeCache, 5000)

            this.loggerUtility.log(error, 'error')
        }
    }

    disconnectCache = async () => {
        await this.redisClient.disconnect()
    }

    setData = async (key: string, value: string, options: SetOptions | undefined) => {
        await this.redisClient.set(key, value, options)
    }

    getData = async (key: string) => {
        const data = await this.redisClient.get(key)

        return data
    }
}
