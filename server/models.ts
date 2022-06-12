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

export type ExpressHandler<req, res> = RequestHandler<
    string,
    Partial<res>,
    Partial<req>,
    any
>;