import { RequestHandler } from "express";

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export interface Post {
    id: string;
    title: string;
    url: string;
    userId: string;
    postedAt: number;
    tags: string[]
}

export interface Like {
    userId: string;
    postId: string;
}

export interface Comment {
    id: string;
    userId: string;
    postId: string;
    comment: string;
    postedAt: number
}

type WithError<T> = T & { error: string };

export type ExpressHandler<req, res> = RequestHandler<
    string,
    Partial<WithError<res>>,
    Partial<req>,
    any
>;

export type JWTObject = {
    userId: string
}