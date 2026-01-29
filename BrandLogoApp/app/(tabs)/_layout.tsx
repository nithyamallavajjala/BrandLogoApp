
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";
import { View } from 'react-native';

import AppHeader from '@/components/AppHeader';
import colors from "../styles/colors";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <AppHeader />

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primarylight,
        tabBarInactiveTintColor: colors.secondary,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerShadowVisible: false,
        headerTintColor: colors.darkbackground,
        tabBarStyle: {
          backgroundColor: colors.secondarydark,
        },
      }}
    >
      <Tabs.Screen
        name="tacoBuilder"
        options={{
          headerTitle: "Taco Builder",
          tabBarIcon: ({ color,focused }) => (
            <MaterialCommunityIcons name={"taco"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          headerTitle: "Menu",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons name={focused ? "menu" : "menu-book"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerTitle: "Cart",
          tabBarIcon: ({ focused, color }) => (
            <Feather name={focused ? "shopping-cart" : "shopping-cart"} size={24} color={color} />
          ),
        }}
      />

    
    
    </Tabs>
    </View>
  );
}
