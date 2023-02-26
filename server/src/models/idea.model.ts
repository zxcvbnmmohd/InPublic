import { Document, Model, model } from 'mongoose'
import { Schema } from 'mongoose'

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
    Ideas: Schema.Types.ObjectId[]
    createdAt: Date
    updatedAt: Date
}

interface IdeaMethods {}

interface IdeaModel extends Model<IdeaDocument, {}, IdeaMethods> {}

const IdeaSchema: Schema<IdeaDocument, IdeaModel, IdeaMethods> = new Schema<IdeaDocument, IdeaModel, IdeaMethods>(
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
        Ideas: {
            ref: 'Idea',
            type: [Schema.Types.ObjectId],
            default: [],
        },
    },
    { timestamps: true },
)

const Idea = model<IdeaDocument, IdeaModel>('Idea', IdeaSchema)

export default Idea

export type { IdeaDocument, IdeaMethods, IdeaModel }

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
