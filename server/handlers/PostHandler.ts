import { RequestHandler } from "express";
import { db } from "../datastore";
import { Post } from "../types";
import crypto from "crypto"
export type ExpressHandler<req, res> = RequestHandler<
    string,
    Partial<res>,
    Partial<req>,
    any
>;

export const listPostsHandler: ExpressHandler<{}, {}> = (req, res) => {
    res.send({ posts: db.listPosts() })
}

type CreatePostReq = Pick<Post, 'title' | 'userId' | 'url' | 'tags'>;

interface CreatePostRes { }

export const createPostHandler: ExpressHandler<CreatePostReq, CreatePostRes> = (req, res) => {
    if (!req.body.title || !req.body.url || !req.body.userId)
        return res.sendStatus(400)
    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: req.body.userId,
        tags: req.body.tags || []
    }
    db.createPost(post)
    // you must send status 200 ok
    res.sendStatus(200)
}