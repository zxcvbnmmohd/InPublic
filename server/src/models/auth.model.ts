import { HydratedDocument, Model, Schema, model } from 'mongoose'
import validator from 'validator'

import { ERRORS } from '@/configs'
import { HashUtility } from '@/utilities'

interface Address {
    addressLine1: string
    addressLine2: string
    city: string
    state: string
    zip: string
    country: string
}
interface Profile {
    address: Address
    birthdate: Date
    email: string
    firstName: string
    gender: string
    lastName: string
    locale: string
    middleName: string
    name: string
    phoneNumber: string
    selfie: string
    username: String
    website: string
}

interface AuthDocument {
    id: Schema.Types.ObjectId
    email: string
    username: string
    password: string
    tokens: string[]
    isActive: boolean
    loggedInAt: Date
    profile?: Profile | null
}

interface AuthMethods {
    toResources(): object
}

interface AuthModel extends Model<AuthDocument, {}, AuthMethods> {
    loginByEmail(email: string, password: string): Promise<HydratedDocument<AuthDocument, AuthMethods>>
    loginByUsername(username: string, password: string): Promise<HydratedDocument<AuthDocument, AuthMethods>>
}

const schema: Schema<AuthDocument, AuthModel, AuthMethods> = new Schema<AuthDocument, AuthModel, AuthMethods>(
    {
        id: {
            type: Schema.Types.ObjectId,
        },
        username: {
            type: String,
            trim: true,
            minlength: 4,
            unique: true,
            lowercase: true,
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
        loggedInAt: {
            type: Date,
            default: Date.now,
            required: true,
        },
        profile: {
            type: {
                address: {
                    type: {
                        addressLine1: {
                            type: String,
                            trim: true,
                            required: true,
                        },
                        addressLine2: {
                            type: String,
                            trim: true,
                            required: true,
                        },
                        city: {
                            type: String,
                            trim: true,
                            required: true,
                        },
                        state: {
                            type: String,
                            trim: true,
                            required: true,
                        },
                        zip: {
                            type: String,
                            trim: true,
                            required: true,
                        },
                        country: {
                            type: String,
                            trim: true,
                            required: true,
                        },
                    },
                    required: false,
                },
                birthdate: {
                    type: Date,
                    required: false,
                },
                email: {
                    type: String,
                    trim: true,
                    unique: true,
                    lowercase: true,
                    required: false,
                    validate(value: string) {
                        if (!validator.isEmail(value)) {
                            throw new Error(ERRORS.INVALID_EMAIL)
                        }
                    }
                },
                firstName: {
                    type: String,
                    trim: true,
                    minlength: 2,
                    required: false,
                },
                gender: {
                    type: String,
                    trim: true,
                    required: false,
                },
                lastName: {
                    type: String,
                    trim: true,
                    minlength: 2,
                    required: false,
                },
                locale: {
                    type: String,
                    trim: true,
                    required: false,
                },
                middleName: {
                    type: String,
                    trim: true,
                    minlength: 2,
                    required: false,
                },
                name: {
                    type: String,
                    trim: true,
                    minlength: 2,
                    required: false,
                },
                phoneNumber: {
                    type: String,
                    trim: true,
                    required: false,
                    validate(value: string) {
                        if (!validator.isMobilePhone(value)) {
                            throw new Error(ERRORS.INVALID_PHONE_NUMBER)
                        }
                    },
                },
                selfie: {
                    type: String,
                    trim: true,
                    required: false,
                },
                username: {
                    type: String,
                    trim: true,
                    minlength: 4,
                    unique: true,
                    required: false,
                    validate(value: string) {
                        if (!validator.isAlphanumeric(value)) {
                            throw new Error(ERRORS.INVALID_USERNAME)
                        }
                    },
                },
                website: {
                    type: String,
                    trim: true,
                    required: false,
                    validate(value: string) {
                        if (!validator.isURL(value)) {
                            throw new Error(ERRORS.INVALID_USERNAME)
                        }
                    },
                },
            },
            required: false,
        },
    },
    { timestamps: true },
)

schema.pre('save', async function save(next) {
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

schema.method('toResources', function toResources(): object {
    return {
        _id: this.id,
        username: this.username,
        email: this.email,
    }
})

schema.static('loginByEmail', async function loginByEmail(email: string, password: string) {
    const authUser = await Auth.findOne({ email })

    if (!authUser) {
        return null
    }

    const validPassword = await HashUtility.compare(password, authUser.password)

    if (!validPassword) {
        throw new Error(ERRORS.INVALID_PASSWORD)
    }

    return authUser
})

schema.static('loginByUsername', async function loginByUsername(username: string, password: string) {
    const authUser = await Auth.findOne({ username: username })

    if (!authUser) {
        return null
    }

    const validPassword = await HashUtility.compare(password, authUser.password)

    if (!validPassword) {
        throw new Error(ERRORS.INVALID_PASSWORD)
    }

    return authUser
})

const Auth = model<AuthDocument, AuthModel>('Auth', schema)

export default Auth

export type { AuthDocument, AuthMethods, AuthModel }
