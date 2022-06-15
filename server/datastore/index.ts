import { UserDao } from "./DAO/UserDao";
import { PostDao } from './DAO/PostDao'
import { LikeDao } from './DAO/LikeDao'
import { CommentDao } from './DAO/CommentDao'
import { InMemoryDataStore } from "./memoryDB";
export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao { }

export const db = new InMemoryDataStore();