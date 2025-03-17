import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/components/Home'; 
import Perfil from './src/components/Perfil';
import Chat from './src/components/Chat';
import Agentes from './src/components/Agentes';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Perfil') {
              iconName = 'person';
            } else if (route.name === 'Chat') {
              iconName = 'chatbubbles-outline';
            } else if (route.name === 'Agentes') {
              iconName = 'agent';
            } else if (route.name === 'Home') {
              iconName = 'home';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'White',
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
