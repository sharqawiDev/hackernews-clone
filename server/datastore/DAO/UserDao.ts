import { User } from "../../models"
export interface UserDao {
    createUser(user: User): Promise<void>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
}