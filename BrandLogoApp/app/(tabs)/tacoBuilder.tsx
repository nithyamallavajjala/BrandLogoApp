import React from "react";
import { Text, View } from "react-native";
import defaultStyles from "../styles/defaultStyles";

export default function BuilderScreen() {
  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={defaultStyles.bodyText}>Taco Builder</Text>
    </View>
  );
}
