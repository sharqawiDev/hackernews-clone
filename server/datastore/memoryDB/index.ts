import { DataStore } from "../"
import { User, Post, Like, Comment } from "../../models";

export class InMemoryDataStore implements DataStore {
    private users: User[] = [];
    private posts: Post[] = [];
    private likes: Like[] = [];
    private comments: Comment[] = [];
    createUser(user: User): Promise<void> {
        this.users.push(user);
        return Promise.resolve();
    }
    getUserByEmail(email: string): Promise<User | undefined> {

        return Promise.resolve(this.users.find(user => user.email === email));
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.username === username))
    }
    listPosts(): Promise<Post[]> {
        return Promise.resolve(this.posts);
    }
    createPost(post: Post): Promise<void> {
        this.posts.push(post);
        return Promise.resolve();
    }
    getPost(id: string): Promise<Post | undefined> {
        return Promise.resolve(this.posts.find(post => post.id === id));
    }
    deletePost(id: string): Promise<void> {
        this.posts = this.posts.filter(post => post.id !== id);
        return Promise.resolve();
    }
    createLike(like: Like): Promise<void> {
        this.likes.push(like);
        return Promise.resolve();
    }
    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve();
    }
    listComments(postId: string): Promise<Comment[]> {
        return Promise.resolve(this.comments);
    }
    deleteComment(id: string): Promise<void> {
        this.comments = this.comments.filter(comment => comment.id !== id);
        return Promise.resolve();
    }

}