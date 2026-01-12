import { usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";

function getTitleFromPath(pathname: string){
    if(pathname.includes("Builder"))
      return "Taco Builder";
    if(pathname.includes("cart"))
      return "Cart";
    if(pathname.includes("menu"))
      return "Menu";

    return "App";
  }

export default function AppHeader() {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname)
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/images/icon.png")}
        ></Image>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: colors.secondarydark,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    flexDirection: "row",
    paddingBottom: 10,
  },

  image: {
    width: 85,
    height: 60,
    marginLeft: 30,
    alignSelf: "flex-end",
    borderRadius: 6,
  },

  headerText: {
    fontSize: 28,
    marginTop: 28,
    color: colors.primarylight,
    fontWeight: "bold",
    fontFamily: "Georgia",
    marginLeft: 20
  },
});
