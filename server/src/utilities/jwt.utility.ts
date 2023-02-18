import config from 'config'
import type { SignOptions } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

export default class JwtUtility {
    signJwt = (payload: object, options: SignOptions = {}) => {
        const privateKey = Buffer.from(config.get<string>('accessTokenPrivateKey'), 'base64').toString('ascii')

        return jwt.sign(payload, privateKey, {
            ...(options && options),
            algorithm: 'RS256',
        })
    }

    verifyJwt = <T>(token: string): T | null => {
        try {
            const publicKey = Buffer.from(config.get<string>('accessTokenPublicKey'), 'base64').toString('ascii')

            return jwt.verify(token, publicKey) as T
        } catch (error) {
            return null
        }
    }
}
