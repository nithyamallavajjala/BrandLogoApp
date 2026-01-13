import { StyleSheet } from "react-native";
import colors from "./colors";

const defaultStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.lightbackground,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyText: {
    fontSize: 20,
    color: colors.error,
    fontWeight: "bold",
    fontFamily: "Georgia"
    
  },

  headerText: {
    fontSize: 50,
    color: colors.error,
    fontWeight: "bold",
    fontFamily: "Georgia",
    marginBottom: 40,
    marginLeft: 40
  },
   button: {
    height: 50,
    width: 100,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.secondarydark,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    color: colors.darkbackground,
  
  },
textInputBox: {
    width: 250,
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    borderColor: colors.secondarydark,
    flexDirection: "row",
},
image: {
  width: 70,
  height: 70
}
});

export default defaultStyles;
