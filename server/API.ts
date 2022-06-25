import { Post, User } from "./models";

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

export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'password'>,

export interface SignUpResponse { jwt: string }

export interface SignInRequest {
    login: string // username or email,
    password: string;
}

export type SignInResponse = {
    user: Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'id'>,
    jwt: string
};