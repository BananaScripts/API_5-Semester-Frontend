import { Role } from "../data/types/role";

export interface DecodedToken {
    Id: number;
    Name: string;
    Email: string;
    Role: Role;
}