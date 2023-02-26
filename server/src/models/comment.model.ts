import { Document, Model, model } from 'mongoose'
import { Schema } from 'mongoose'

interface CommentDocument extends Document {
    id: Schema.Types.ObjectId
    ownerId: Schema.Types.ObjectId
    text: String
    replies: Comment[]
}

interface CommentMethods {
}

interface CommentModel extends Model<CommentDocument, {}, CommentMethods> {
}

const CommentSchema: Schema<CommentDocument, CommentModel, CommentMethods> = new Schema<
    CommentDocument,
    CommentModel,
    CommentMethods
>(
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

const Comment = model<CommentDocument, CommentModel>('Comment', CommentSchema)

export default Comment

export type { CommentDocument, CommentMethods, CommentModel }
