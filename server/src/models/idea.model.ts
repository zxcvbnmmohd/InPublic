import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

interface Media extends Document {
    data: Buffer
    filename: String
    mimetype: String
    size: Number
}
interface IdeaDocument extends Document {
    id: Schema.Types.ObjectId
    ownerId: Schema.Types.ObjectId
    text: String
    media?: Media | null
    likes: Schema.Types.ObjectId[]
    comments: Schema.Types.ObjectId[]
    createdAt: Date
    updatedAt: Date
}

const IdeaSchema: Schema<IdeaDocument> = new Schema<IdeaDocument>(
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
            trim: true,
        },
        media: {
            type: {
                data: Buffer,
                filename: String,
                mimetype: String,
                size: Number,
            },
        },
        likes: {
            type: [Schema.Types.ObjectId],
            default: [],
        },
        comments: {
            ref: 'Comment',
            type: [Schema.Types.ObjectId],
            default: [],
        },
    },
    { timestamps: true },
)

const IdeaModel = mongoose.model('Idea', IdeaSchema)

export default IdeaModel

export type { IdeaDocument }

// Sample use
// const upload = multer();

// app.post('/upload', upload.single('file'), async (req, res) => {
//   const media = await Media.create({
//     data: req.file.buffer,
//     filename: req.file.originalname,
//     mimetype: req.file.mimetype,
//     size: req.file.size,
//   });
//   res.json(media);
// });
