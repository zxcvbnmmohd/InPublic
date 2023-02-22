import type { Document } from 'mongoose'
import { model, Schema } from 'mongoose'
import validator from 'validator'

import { ERRORS } from '@/configs'
import { HashUtility } from '@/utilities'

interface UserDocument extends Document {
    id: Schema.Types.ObjectId
    selfie?: Buffer
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    location?: string
    website?: string
    bio?: string
    tokens: string[]
    followers: string[]
    following: string[]
    isActive: boolean
}

const UserSchema: Schema<UserDocument> = new Schema<UserDocument>(
    {
        id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        selfie: {
            type: Buffer,
        },
        firstName: {
            type: String,
            trim: true,
            minlength: 2,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            minlength: 2,
            required: true,
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
        location: {
            type: String,
        },
        website: {
            type: String,
        },
        bio: {
            type: String,
        },
        tokens: {
            type: [String],
            default: [],
            required: true,
        },
        followers: {
            type: [String],
            default: [],
        },
        following: {
            type: [String],
            default: [],
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true,
        },
    },
    { timestamps: true },
)

UserSchema.pre('save', async function (next) {
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

UserSchema.methods.toResources = function () {
    return {
        _id: this.id,
        firstname: this.firstName,
        lastname: this.lastName,
        username: this.username,
        email: this.email,
    }
}

const UserModel = model<UserDocument>('User', UserSchema)

export { UserModel }

export type { UserDocument }
