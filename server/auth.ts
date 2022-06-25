import { JWTObject } from "./models";
import jwt from "jsonwebtoken"

export function signJWT(obj: JWTObject): string {

    return jwt.sign(obj, getJWTSecret(), { expiresIn: '10d' })
}

export const verifyJWT = (token: string): JWTObject => {
    return jwt.verify(token, getJWTSecret()) as JWTObject
}

const getJWTSecret = (): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.log("Can't get JWT secret");
        process.exit(1)
    }
    else return secret
}