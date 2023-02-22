import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

interface CommentDocument extends Document {
    id: Schema.Types.ObjectId
    ownerId: Schema.Types.ObjectId
    text: String
    replies: Comment[]
}

const CommentSchema: Schema<CommentDocument> = new Schema<CommentDocument>(
    {
        id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        replies: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Comment',
                },
            ],
            default: [],
        },
    },
    { timestamps: true },
)

const CommentModel = mongoose.model('Comment', CommentSchema)

export default CommentModel

export type { CommentDocument }
