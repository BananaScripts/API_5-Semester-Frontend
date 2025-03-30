import { Role } from "../data/types/role";

export interface UserCreate {
    Name: string;
    Password: string;
    Email: string;
    Role: Role;
}