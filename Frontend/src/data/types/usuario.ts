import { Role } from "./role"

export type Usuario = {
    user_id: number
    user_name: string
    user_email: string
    user_password: string
    user_role: Role
}