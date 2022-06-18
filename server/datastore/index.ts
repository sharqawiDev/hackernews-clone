import { UserDao } from "./DAO/UserDao";
import { PostDao } from './DAO/PostDao'
import { LikeDao } from './DAO/LikeDao'
import { CommentDao } from './DAO/CommentDao'
import { SqlDataStore } from "./sql";
// import { InMemoryDataStore } from "./memoryDB";
export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao { }

export let db: DataStore;

export async function initDB() {
    // db = new InMemoryDataStore();
    db = await new SqlDataStore().openDB();
}
