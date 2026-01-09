import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import defaultStyles from "../styles/defaultStyles";


export default function AppHeader() {
  return <View style={styles.container}>
    <Image 
    style = {styles.image}
    source = {require("../../assets/images/icon.png")}
    >
    </Image>
    <Text style = {defaultStyles.headerText}> Taco 'Bout It</Text>
  </View>;
}
const styles = StyleSheet.create({
  container: {
    height: 180,
    backgroundColor: colors.secondarydark,
    alignItems: "center",
    paddingTop: 50,

  },
  image: {
    width: 80,
    height: 80,

  }
});
