import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";

export default function AppHeader() {
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/images/icon.png")}
        ></Image>
        <Text style={styles.headerText}> Taco 'Bout It</Text>
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
    width: 60,
    height: 60,
    marginLeft: 30,
    alignSelf: "flex-end",
  },

  headerText: {
    fontSize: 28,
    marginTop: 38,
    color: colors.textondark,
    fontWeight: "bold",
    fontFamily: "Georgia",
  },
});
