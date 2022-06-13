import { Post } from "./models";

export interface ListPostReq { }
export interface ListPostRes {
    posts: Post[]
}

export type CreatePostReq = Pick<Post, 'title' | 'userId' | 'url' | 'tags'>;
export interface CreatePostRes { }

export interface GetPostReq { }
export interface GetPostRes {
    post: Post
}