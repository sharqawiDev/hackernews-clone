import { DataStore } from "../"
import { User, Post, Like, Comment } from "../../models";

export class InMemoryDataStore implements DataStore {
    private users: User[] = [];
    private posts: Post[] = [];
    private likes: Like[] = [];
    private comments: Comment[] = [];
    createUser(user: User): void {
        this.users.push(user);
    }
    getUserByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }
    getUserByUsername(username: string): User | undefined {
        return this.users.find(user => user.username === username);
    }
    listPosts(): Post[] {
        return this.posts;
    }
    createPost(post: Post): void {
        this.posts.push(post)
    }
    getPost(id: string): Post | undefined {
        return this.posts.find(post => post.id === id)
    }
    deletePost(id: string): void {
        this.posts = this.posts.filter(post => post.id !== id)
    }
    createLike(like: Like): void {
        this.likes.push(like)
    }
    createComment(comment: Comment): void {
        this.comments.push(comment)
    }
    listComments(postId: string): Comment[] {
        return this.comments;
    }
    deleteComment(id: string): void {
        this.comments = this.comments.filter(comment => comment.id !== id)
    }

}