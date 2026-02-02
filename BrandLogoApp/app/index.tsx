import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Auth from "../components/Auth";
import { useAuth } from "../components/AuthProvider";

export default function Index() {
  const router = useRouter();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (session?.user) {
      // Replace prevents going "back" to login screen
      router.replace("/(tabs)");
    }
  }, [router, session]);

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (session?.user) {
    // Redirecting — nothing to render
    return null;
  }


  return (
    <View style={{ flex: 1 }}>
    
      <Auth/>
    </View>
  );
}


