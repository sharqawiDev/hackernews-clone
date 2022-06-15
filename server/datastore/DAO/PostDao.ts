import { Post } from "../../models";

export interface PostDao {
    listPosts(): Promise<Post[]>;
    createPost(post: Post): Promise<void>;
    getPost(id: string): Promise<Post | undefined>;
    deletePost(id: string): Promise<void>;
}