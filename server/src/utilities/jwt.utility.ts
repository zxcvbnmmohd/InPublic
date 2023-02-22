import { ENV } from '@/configs'
import type { SignOptions } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

export default class JwtUtility {
    static sign = (payload: object, options: SignOptions = {}): string => {
        const privateKey = Buffer.from(ENV.ACCESS_TOKEN_PRIVATE_KEY!, 'base64').toString('ascii')

        return jwt.sign(payload, privateKey, {
            ...(options && options),
            algorithm: 'RS256',
        })
    }

    static verify = <T>(token: string): T | null => {
        try {
            const publicKey = Buffer.from(ENV.ACCESS_TOKEN_PUBLIC_KEY!, 'base64').toString('ascii')

            return jwt.verify(token, publicKey) as T
        } catch (error) {
            return null
        }
    }
}
