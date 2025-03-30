import { Role } from "../data/types/role"

export interface UserLogin{
    user_id: number,
    user_name: string,
    user_email: string,
    user_role: number
}