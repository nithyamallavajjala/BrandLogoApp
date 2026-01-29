import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../components/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* Status bar appearance */}
      
      <StatusBar style="light"/>
      <Slot />
    </AuthProvider>
  );
}

