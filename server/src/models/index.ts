import type { AuthDocument, AuthMethods, AuthModel } from './auth.model'
import Auth from './auth.model'
import type { CommentDocument, CommentMethods, CommentModel } from './comment.model'
import Comment from './comment.model'
import type { IdeaDocument, IdeaMethods, IdeaModel } from './idea.model'
import Idea from './idea.model'
import type { UserDocument, UserMethods, UserModel } from './user.model'
import User from './user.model'

export { Auth, Comment, Idea, User }

export type {
    AuthDocument,
    AuthMethods,
    AuthModel,
    CommentDocument,
    CommentMethods,
    CommentModel,
    IdeaDocument,
    IdeaMethods,
    IdeaModel,
    UserDocument,
    UserMethods,
    UserModel,
}
