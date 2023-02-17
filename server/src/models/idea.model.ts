import mongoose from 'mongoose'

const IdeaSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: Buffer,
        },
        likes: {
            type: Array,
            default: [],
        },
        comments: [
            {
                text: String,
                createdAt: { type: Date, default: Date.now },
                postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            },
        ],
    },
    {
        timestamps: true,
    },
)

const IdeaModel = mongoose.model('Idea', IdeaSchema)

export default IdeaModel
