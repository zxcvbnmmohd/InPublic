import type { Logger } from 'logging'
import createLogger from 'logging'

type LogType = 'debug' | 'error' | 'info' | 'warn'

export default class LoggerUtility {
    private logger: Logger

    constructor(fileName: string) {
        this.logger = createLogger(fileName)
    }

    log = (data: unknown, type: LogType = 'info') => {
        switch (type) {
            case 'debug':
                this.logger.debug(data)
                break
            case 'error':
                this.logger.error(data)
                break
            case 'info':
                this.logger.info(data)
                break
            case 'warn':
                this.logger.warn(data)
                break
            default:
                this.logger.debug(data)
        }
    }
}
