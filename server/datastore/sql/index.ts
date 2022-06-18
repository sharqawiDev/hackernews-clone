import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import path from "path"
import { DataStore } from "..";
import { User, Post, Like, Comment } from "../../models";

export class SqlDataStore implements DataStore {
    private db!: Database<sqlite3.Database, sqlite3.Statement>;
    public async openDB() {
        this.db = await open({
            filename: path.join(__dirname, 'hacker-news.sqlite'),
            driver: sqlite3.Database
        });

        await this.db.run('PRAGMA foreign_keys = ON;');

        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations')
        })

        return this;
    }
    createUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    listPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('SELECT * from posts');
    }
    async createPost(post: Post): Promise<void> {
        await this.db.run(
            'INSERT INTO posts(id, postedAt, tags, title, url, userId) VALUES (?,?,?,?,?,?)'
            ,
            post.id,
            post.postedAt,
            post.tags.toString(),
            post.title,
            post.url,
            post.userId
        )
    }
    getPost(id: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listComments(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}