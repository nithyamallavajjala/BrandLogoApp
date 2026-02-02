// AppHeader.tsx  (replace the contents of your current AppHeader with this)
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


import colors from "@/styles/colors";
import { supabase } from "@/utils/supabase";

function getTitleFromPath(pathname: string) {
  if (pathname === "/") return "Welcome";
  if (pathname.includes("index")) return "Taco Builder";
  if (pathname.includes("cart")) return "Cart";
  if (pathname.includes("menu")) return "Menu";
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
    } catch (err: any) {
      Alert.alert("Logout failed", err?.message ?? String(err));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/icon.png")}
        />
        <Text style={styles.headerText}>{title}</Text>
      </View>

      {/* Right side: name image + logout button */}
      <View style={styles.rightContainer}>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Log out"
        >
          <Ionicons name="log-out-outline" size={24} color={ colors.primarylight} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 container: { height: 120, backgroundColor: colors.secondarydark, alignItems: "center", justifyContent: "space-between", paddingTop: 20, flexDirection: "row", paddingBottom: 10, },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: { width: 85, height: 60, marginLeft: 30, alignSelf: "flex-end", borderRadius: 6, marginTop: 20},
  headerText: { fontSize: 28, marginTop: 28, color: colors.primarylight, fontWeight: "bold", fontFamily: "Georgia", marginLeft: 20 },
  logoutButton: {
    marginTop: 30,
    padding: 6,
    borderRadius: 6,
  },
});