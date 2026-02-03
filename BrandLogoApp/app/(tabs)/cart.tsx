import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Button from '../../components/Button';
import TextField from "../../components/TextField";


export default function CartScreen() {
  const [protein, setProtein] = useState("");
  const [toppings, setToppings] = useState("");

  return (
    <View>
    <Text>Time to Build your Taco!</Text>
    <Button
     title="Hard Shell"
    onPress={() => {
    console.log("Hard Shell pressed");
    }}
    />
    <Button
    title="Soft Shell"
    onPress={() => {
    console.log("Soft Shell pressed");
    }}
    />
    <Picker
        selectedValue={protein}
        onValueChange={(itemValue: string) => setProtein(itemValue)}
      >
        <Picker.Item label="Select a protien..." value="" />
        <Picker.Item label="Chicken" value="c" />
        <Picker.Item label="Steak" value="s" />
        <Picker.Item label="Beans" value="b" />
      </Picker>
      <TextField
          placeholder="Please enter what toppings you want"
          value={toppings}
          onChangeText={setToppings}></TextField>

        

  </View>
  );
}
