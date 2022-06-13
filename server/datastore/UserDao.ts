import { User } from "../models"
export interface UserDao {
    createUser(user: User): void;
    getUserByEmail(email: string): User | undefined;
    getUserByUsername(username: string): User | undefined;
}