import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../API";
import { db } from "../datastore";
import { ExpressHandler, User } from "../models";
import crypto from "crypto"
import { signJWT } from "../auth";
export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password)
        return res.sendStatus(400).send({ error: 'All fields are required!' })

    const existing = await db.getUserByEmail(login) || await db.getUserByUsername(login);


    if (!existing || existing.password !== passwordHash(password))
        return res.sendStatus(403);

    const jwt = signJWT({ userId: existing.id })
    return res.status(200).send(
        {
            user: {
                id: existing.id,
                email: existing.email,
                username: existing.username,
                firstName: existing.firstName,
                lastName: existing.lastName,
            },
            jwt
        }
    )

}

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    const { email, firstName, lastName, username, password } = req.body;
    if (!email || !firstName || !lastName || !username || !password)
        return res.status(400).send({ error: 'All fields are required!' })

    const existing = await db.getUserByEmail(email) || await db.getUserByUsername(username);

    if (existing)
        return res.status(403).send({ error: 'User already exists!' })


    passwordHash(password)
    const user: User = {
        id: crypto.randomUUID(),
        email,
        username,
        password: passwordHash(password),
        firstName,
        lastName,
    }

    const jwt = signJWT({ userId: user.id })
    await db.createUser(user)
    return res.status(200).send({ jwt })

}

const passwordHash = (password: string): string => crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT!, 42, 64, 'sha512').toString('hex')