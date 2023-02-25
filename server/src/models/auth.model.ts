import type { Document } from 'mongoose'
import { model, Schema } from 'mongoose'
import validator from 'validator'

import { ERRORS } from '@/configs'
import { HashUtility } from '@/utilities'

interface AuthDocument extends Document {
    id: Schema.Types.ObjectId
    email: string
    username: string
    password: string
    tokens: string[]
    isActive: boolean
    lastLogin: Date
}

const AuthSchema: Schema<AuthDocument> = new Schema<AuthDocument>(
    {
        id: {
            type: Schema.Types.ObjectId,
        },
        username: {
            type: String,
            trim: true,
            minlength: 4,
            unique: true,
            required: true,
            validate(value: string) {
                if (!validator.isAlphanumeric(value)) {
                    throw new Error(ERRORS.INVALID_USERNAME)
                }
            },
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            required: true,
            validate(value: string) {
                if (!validator.isEmail(value)) {
                    throw new Error(ERRORS.INVALID_EMAIL)
                }
            },
        },
        password: {
            type: String,
            trim: true,
            minlength: 8,
            required: true,
            validate(value: string) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error(ERRORS.INVALID_PASSWORD)
                }
            },
        },
        tokens: {
            type: [String],
            default: [],
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true,
        },
        lastLogin: {
            type: Date,
            default: Date.now,
            required: true,
        },
    },
    { timestamps: true },
)

const AuthModel = model<AuthDocument>('Auth', AuthSchema)

AuthSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        try {
            user.password = await HashUtility.hash(user.password)

            return next()
        } catch (error: any) {
            return next(error)
        }
    }

    next()
})

AuthSchema.methods.toResources = function () {
    return {
        _id: this.id,
        username: this.username,
        email: this.email,
    }
}

AuthSchema.statics.loginByEmail = async (email: string, password: string): Promise<AuthDocument> => {
    const user = await AuthModel.findOne({ email })

    if (!user) {
        throw new Error(ERRORS.USER_NOT_FOUND)
    }

    const validPassword = await HashUtility.compare(password, user.password)

    if (!validPassword) {
        throw new Error(ERRORS.INVALID_PASSWORD)
    }

    return user
}

AuthSchema.statics.loginByUsername = async (username: string, password: string): Promise<AuthDocument> => {
    const user = await AuthModel.findOne({ username })

    if (!user) {
        throw new Error(ERRORS.USER_NOT_FOUND)
    }

    const validPassword = await HashUtility.compare(password, user.password)

    if (!validPassword) {
        throw new Error(ERRORS.INVALID_PASSWORD)
    }

    return user
}

export default AuthModel

export type { AuthDocument }
