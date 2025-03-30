import AsyncStorage from "@react-native-async-storage/async-storage";
import { DecodedToken } from "../interfaces/decodedToken";
import { jwtDecode } from "jwt-decode";

const getUserRole = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
        const decodedToken: DecodedToken = jwtDecode(token);
        return decodedToken.Role; 
        }
    } catch (error) {
        console.error("Erro ao obter o papel do usuário:", error);
    }
    return null;
    }

export default getUserRole;
