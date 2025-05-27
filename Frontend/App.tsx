import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Home from './src/components/Home';
import Perfil from './src/components/Perfil';
import Agentes from './src/components/Agentes';
import Chat from './src/components/Chat';
import Admin from './src/components/Admin';
import Curador from './src/components/Curador';
import Login from './src/components/Login';
import ChatScreen from './src/components/ChatScreen'; 
import { ChatHistoryProvider } from './src/data/context/ChatHistoryContext';

import HomeIcon from './assets/icons/home.svg';
import PerfilIcon from './assets/icons/profile.svg';
import AgentesIcon from './assets/icons/bots.svg';
import ChatIcon from './assets/icons/chat.svg';
import AdminIcon from './assets/icons/admin.svg';
import CuradorIcon from './assets/icons/curador.svg';
import useAuth from './src/Hooks/useAuth'; 
import { ChatMessageProvider } from './src/data/context/ChatMessageContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'JetBrainsMono': require('./assets/fonts/JetBrainsMono.ttf'),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <ChatHistoryProvider>
      <ChatMessageProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ChatScreen" 
            component={ChatScreen as React.FC} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Perfil" 
            component={Perfil as React.FC} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Curador" 
            component={Curador as React.FC} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Admin" 
            component={Admin as React.FC} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ChatMessageProvider>
    </ChatHistoryProvider>
  );
}

function MainTabs() {
  const { user: currentUser } = useAuth(); // Obtendo a role do usuário logado

  // Função para retornar as abas conforme a role do usuário
  const getTabScreens = () => {
    const tabs = [
      { name: "Perfil", component: Perfil },
      { name: "Chat", component: Chat },
      { name: "Agentes", component: Agentes },
      { name: "Home", component: Home },
    ];

    // Adiciona abas específicas dependendo da role
    if (currentUser?.user_role === 1) {
      tabs.push({ name: "Curador", component: Curador });
    }
    if (currentUser?.user_role === 2) {
      tabs.push({ name: "Curador", component: Curador });
      tabs.push({ name: "Admin", component: Admin });
    }

    return tabs;
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        const borderColor = {
          Perfil: '#92FFFF',
          Chat: '#FC82FF',
          Agentes: '#9182FF',
          Home: '#92FFFF',
          Admin: '#FF5733', // Example color for Admin
          Curador: '#FFC300', // Example color for Curador
        }[route.name] || 'white';

        return {
          tabBarIcon: ({ focused, size }) => {
            const IconComponent = {
              Perfil: PerfilIcon,
              Agentes: AgentesIcon,
              Chat: ChatIcon,
              Home: HomeIcon,
              Admin: AdminIcon,
              Curador: CuradorIcon,
            }[route.name];

            return (
              <View style={styles.iconContainer}>
                <IconComponent
                  width={size + 10}
                  height={size + 10}
                  style={{ color: focused ? borderColor : 'white' }} // Ensure consistent color application
                />
              </View>
            );
          },
          tabBarStyle: [styles.tabBar, { borderColor }],
          tabBarShowLabel: false,
          headerShown: false,
          animationEnabled: true,
        };
      }}
    >
      {getTabScreens().map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderRadius: 8,
    backgroundColor: '#121212',
    borderWidth: 2,
    borderTopWidth: 2,
    elevation: 5,
    shadowColor: '#26a3ff',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
