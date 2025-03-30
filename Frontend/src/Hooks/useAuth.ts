import { useEffect, useState } from "react";
import { UserLogin } from "../interfaces/userLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuth = () => {
    const [user, setUser] = useState<UserLogin | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadUser = async () => {
        try {
          const userData = await AsyncStorage.getItem('user');
          if (userData) {
            setUser(JSON.parse(userData));
          }
        } catch (error) {
          console.error('Error loading user:', error);
        } finally {
          setLoading(false);
        }
      };
  
      loadUser();
    }, []);
  
    const login = async (userData: UserLogin, token: string) => {
      await AsyncStorage.multiSet([
        ['token', token],
        ['user', JSON.stringify(userData)]
      ]);
      setUser(userData);
    };
  
    const logout = async () => {
      await AsyncStorage.multiRemove(['token', 'user']);
      setUser(null);
    };
  
    return { user, loading, login, logout };
  };
  
  export default useAuth;