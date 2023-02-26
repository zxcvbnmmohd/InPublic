import type { Document, Model } from 'mongoose'
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

interface UserMethods {}

interface UserModel extends Model<UserDocument, {}, UserMethods> {}

const UserSchema: Schema<UserDocument, UserModel, UserMethods> = new Schema<UserDocument, UserModel, UserMethods>(
    {
        id: {
            type: Schema.Types.ObjectId,
        },
        selfie: {
            type: Buffer,
            required: false,
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
        location: {
            type: String,
            trim: true,
            required: false,
        },
        website: {
            type: String,
            trim: true,
            required: false,
            validate(value: string) {
                if (!validator.isURL(value)) {
                    throw new Error(ERRORS.INVALID_URL)
                }
            },
        },
        bio: {
            type: String,
            trim: true,
            required: false,
        },
        followers: {
            type: [String],
            default: [],
            required: true,
        },
        following: {
            type: [String],
            default: [],
            required: true,
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

const User = model<UserDocument, UserModel>('User', UserSchema)

export default User

export type { UserDocument, UserMethods, UserModel }
