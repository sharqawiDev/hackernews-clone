import { verifyJWT } from "../auth";
import { db } from "../datastore";
import { ExpressHandler } from "../models";

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.sendStatus(401);

    try {
        const payload = verifyJWT(token)
        const user = await db.getUserById(payload.userId)
        if (!user) throw 'Not Found'

        next();
    } catch (error) {
        res.status(401).send({ error: 'Bad token' })
    }
}