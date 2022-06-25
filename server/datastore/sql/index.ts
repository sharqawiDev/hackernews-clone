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
    async createUser(user: User): Promise<void> {
        await this.db.run(
            'INSERT INTO users(id, email, username, firstName, lastName, password) VALUES (?,?,?,?,?,?)'
            ,
            user.id,
            user.email,
            user.username,
            user.firstName,
            user.lastName,
            user.password
        )
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * from users WHERE email = ?`, email);
    }

    getUserById(id: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT * from users WHERE id = ?', id)
    }

    getUserByUsername(username: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * from users WHERE username = ?`, username);
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