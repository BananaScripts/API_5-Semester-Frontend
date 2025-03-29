import { Role } from "./role"

export type Usuario = {
    Id: number
    Name: string
    Email: string
    Password: string
    Role: Role
}