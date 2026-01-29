
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { supabase } from "@/utils/supabase";
import colors from "../app/styles/colors";

function getTitleFromPath(pathname: string) {
  if (pathname === "/") return "Welcome";
  if (pathname.includes("cart")) return "Cart";
  if (pathname.includes("menu")) return "Menu";
  if (pathname.includes("builder")) return "Taco Builder";
  return "App";
}

export default function AppHeader() {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  // Simplified sign out: intentionally NOT performing any navigation here.
  // Rationale: navigation attempts from inside nested navigators (tabs)
  // were unreliable and caused unmatched route or no-op behavior. The
  // app now uses a global AuthProvider and the tabs layout renders the
  // Auth screen in-place when the session becomes null.
  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        Alert.alert("Logout failed", error.message);
      }
      router.replace("/")
    } catch (err: any) {
      Alert.alert("Logout failed", err?.message ?? String(err));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          style={styles.imageLogo}
          source={require("../assets/images/icon.png")}
        />
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right side: name image + logout button */}
      <View style={styles.rightContainer}>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Log out"
        >
          <Ionicons name="log-out-outline" size={24} color={colors.primarylight} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%", // fill all available space
    height: 90,
    paddingHorizontal: 16,
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.primarylight,
    marginLeft: 10,
  },
  imageLogo: {
    height: 30,
    width: 30,
    marginBottom: 10,
  },
  imageName: {
    height: 30,
    width: 60,
    marginBottom: 2,
    marginRight: 8,
  },
  logoutButton: {
    padding: 6,
    borderRadius: 6,
    // optional: a subtle touch target background when pressed
    // backgroundColor: "rgba(255,255,255,0.03)",
  },
});