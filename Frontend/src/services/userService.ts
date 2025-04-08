import api from "./api";
import { UserCreate } from "../interfaces/userCreate";
import { UserResponse } from "../interfaces/userResponse";
import { PaginatedResponse } from "../interfaces/paginatedResponse";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserUpdate } from "../interfaces/userUpdate";


const UserService = {
  async createUser(userData: UserCreate): Promise<UserResponse> {
    try {
      const response = await api.post<UserResponse>("/user/User", userData);
      return response.data;
    } catch (error) {
      throw new Error("Error creating user: " + error);
    }
  },
  async getUserById(Id: number): Promise<UserResponse> {
    try {
      const response = await api.get<UserResponse>(`/user/User/${Id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching user: " + error);
    }
  },
  async updateUser(Id: number, userData: Partial<UserUpdate>): Promise<UserResponse> {
    try {
        const response = await api.put<UserResponse>(`/user/User/${Id}`, userData);
        return response.data;
    } catch (error: any) {
        console.error("Error updating user:", error.response?.data || error.message);
        throw new Error("Error updating user: " + error);
    }
},

    async deleteUser(Id: number): Promise<void> {
        try {
        await api.delete(`/user/User/${Id}`);
        } catch (error) {
        throw new Error("Error deleting user: " + error);
        }
    },
    async getAllUsers(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<UserResponse>> {
        try {
        const response = await api.get("/user/User", {
            params: {page, pageSize}})
            return response.data;
        } catch (error) {
        throw new Error("Error fetching users: " + error);
        }
    },
}



export default UserService;