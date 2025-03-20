import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { View, StyleSheet } from "react-native";

import Home from "./src/components/Home";
import Perfil from "./src/components/Perfil";
import Agentes from "./src/components/Agentes";
import Chat from "./src/components/Chat";
import ChatScreen from "./src/components/ChatScreen/index.tsx"; 

import HomeIcon from './assets/icons/home.svg';
import PerfilIcon from './assets/icons/profile.svg';
import AgentesIcon from './assets/icons/bots.svg';
import ChatIcon from './assets/icons/chat.svg';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const borderColor = {
          "Perfil": "#92FFFF",
          "Chat": "#FC82FF",
          "Agentes": "#9182FF",
          "Home": "#92FFFF",
        }[route.name] || "white";

        return {
          tabBarIcon: ({ focused, size }) => {
            const IconComponent = {
              "Perfil": PerfilIcon,
              "Agentes": ChatIcon,
              "Chat": AgentesIcon, 
              "Home": HomeIcon,
            }[route.name];

            return (
              <View style={styles.iconContainer}>
                <IconComponent
                  width={size + 10}
                  height={size + 10}
                  style={{ color: focused ? borderColor : "white" }} 
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
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Agentes" component={Agentes} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    position: "absolute",
    borderRadius: 8,
    backgroundColor: "#121212",
    borderWidth: 2,
    borderTopWidth: 2, 
    elevation: 5,
    shadowColor: "#26a3ff",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    height: 70,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 10, 
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});