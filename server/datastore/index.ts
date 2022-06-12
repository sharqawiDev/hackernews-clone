import { UserDao } from "./UserDao";
import { PostDao } from './PostDao'
import { LikeDao } from './LikeDao'
import { CommentDao } from './CommentDao'
export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao { }