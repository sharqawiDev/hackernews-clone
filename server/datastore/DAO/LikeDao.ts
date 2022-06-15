import { Like } from "../../models";

export interface LikeDao {
    createLike(like: Like): Promise<void>;
}