import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from 'react-native-linear-gradient'; 

import Home from "./src/components/Home";
import Perfil from "./src/components/Perfil";
import Agentes from "./src/components/Agentes";
import Chat from "./src/components/Chat";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Perfil") {
              iconName = "person-outline";
            } else if (route.name === "Chat") {
              iconName = "chatbubbles-outline";
            } else if (route.name === "Agentes") {
              iconName = "person";
            } else if (route.name === "Home") {
              iconName = "home-outline";
            }

            return (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={iconName}
                  size={size}
                  color={focused ? "#26a3ff" : "gray"}
                  style={focused ? styles.activeIcon : {}}
                />
                {focused && <View style={styles.activeGlow} />}
              </View>
            );
          },
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Perfil" component={Perfil} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Agentes" component={Agentes} />
        <Tab.Screen name="Home" component={Home} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    position: "absolute",
    borderRadius: 20,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#26a3ff", 
    elevation: 5,
    shadowColor: "#26a3ff",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeIcon: {
    textShadowColor: "#26a3ff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  activeGlow: {
    position: "absolute",
    bottom: -5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#26a3ff",
    // backgroundColor: "linear-gradient(207deg, rgba(252,130,255,1) 13%, rgba(145,130,255,1) 51%, rgba(146,255,255,1) 91%);", 
  },
  gradientTabBar: {
    flex: 1,
    borderRadius: 20,
  },
});
