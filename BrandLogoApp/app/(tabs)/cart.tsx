import React from "react";
import { Text, View } from "react-native";
import defaultStyles from "../styles/defaultStyles";

export default function CartScreen() {
  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={defaultStyles.bodyText}>Cart</Text>
    </View>
  );
}
