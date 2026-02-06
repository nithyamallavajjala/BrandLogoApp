import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { View } from "react-native";

import AppHeader from "@/components/AppHeader";
import Auth from "@/components/Auth";
import { useAuth } from "@/components/AuthProvider";
import colors from "../../styles/colors";

export default function TabsLayout() {
  const { session } = useAuth();

  if (session === null) {
    return (
      <View style={{ flex: 1 }}>
        <Auth />
      </View>
    );
  }
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
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={"taco"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerTitle: "Profile",
            tabBarIcon: ({ focused, color }) => (
              <MaterialIcons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="leaderboard"
          options={{
            headerTitle: "Leaderboard",
            tabBarIcon: ({ focused, color }) => (
              <Feather
                name={focused ? "award" : "award"}
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
