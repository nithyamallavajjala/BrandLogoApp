import React, { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from '../../components/Button';
import TextField from "../../components/TextField";
import defaultStyles from "../../styles/defaultStyles";

export default function CartScreen() {
  const [text, setText] = useState("")
  return (
    <SafeAreaView style={defaultStyles.pageContainer}>
      <Text style={defaultStyles.bodyText}>Cart</Text>
      <Button title="TEST" 
      onPress={() => {
        console.log("Button Pressed")
      }}></Button>

    <TextField
    placeholder="Enter text"
    value={text}
    onChangeText={setText}
/>
    </SafeAreaView>
  );
}
