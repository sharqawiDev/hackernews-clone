import { db } from "../datastore";
import { ExpressHandler, Post } from "../models";
import crypto from "crypto"
import { CreatePostReq, CreatePostRes, ListPostReq, ListPostRes } from "../API";


export const listPostsHandler: ExpressHandler<ListPostReq, ListPostRes> = (req, res) => {
    res.send({ posts: db.listPosts() })
}

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