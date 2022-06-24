import { SignInRequest, SignUpRequest, SignUpResponse } from "../API";
import { db } from "../datastore";
import { ExpressHandler, User } from "../models";
import crypto from "crypto"
export const signInHandler: ExpressHandler<SignInRequest, SignUpResponse> = async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password)
        return res.status(400).send('All fields are required!')

    const existing = await db.getUserByEmail(login) || await db.getUserByUsername(login);

    if (!existing || existing.password !== password)
        return res.sendStatus(403);

    return res.status(200).send({
        id: existing.id,
        email: existing.email,
        username: existing.username,
        firstName: existing.firstName,
        lastName: existing.lastName,
    })

}

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    const { email, firstName, lastName, username, password } = req.body;
    if (!email || !firstName || !lastName || !username || !password)
        return res.status(400).send('All fields are required!')

    const existing = await db.getUserByEmail(email) || await db.getUserByUsername(username);

    if (existing)
        return res.status(403).send('User already exists!')

    const user: User = {
        id: crypto.randomUUID(),
        email,
        username,
        password,
        firstName,
        lastName,
    }

    await db.createUser(user)
    return res.sendStatus(200)

}