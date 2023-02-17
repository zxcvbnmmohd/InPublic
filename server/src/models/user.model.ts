import type { Document } from 'mongoose'
import { model, Schema } from 'mongoose'

interface UserDocument extends Document {
    firstName: string
    lastName: string
    selfie?: string
    email: string
    tokens: string[]
}

const UserSchema = new Schema<UserDocument>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    selfie: { type: String },
    email: { type: String, required: true },
    tokens: { type: [String], default: [] },
})

const UserModel = model<UserDocument>('User', UserSchema)

export { UserModel }

export type { UserDocument }
