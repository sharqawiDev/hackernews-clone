import { db } from "../datastore";
import { ExpressHandler, Post } from "../models";
import crypto from "crypto"
import { CreatePostRequest, CreatePostResponse, ListPostRequest, ListPostResponse } from "../API";


export const listPostsHandler: ExpressHandler<ListPostRequest, ListPostResponse> = async (req, res) => {

    return res.send({ posts: await db.listPosts() })
}

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (req, res) => {
    if (!req.body.title || !req.body.url)
        return res.sendStatus(400)
    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: res.locals.userId,
        tags: req.body.tags || []
    }
    await db.createPost(post)
    // you must send status 200 ok
    res.sendStatus(200)
}