import { supabase } from "@/utils/supabase";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Button from '../../components/Button';
import TextField from "../../components/TextField";

export default function CartScreen() {
  const [protein, setProtein] = useState("");
  const [toppings, setToppings] = useState("");
//based of Mrs.Denna's profile and edited with chat gpt
//https://chatgpt.com/share/6984a0cb-d534-800a-9eab-3efbd38ea8f1
  async function addOrder(){
   const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("No user signed in");
      return;
    }
  const userId = user.id; 
  const { data, error } = await supabase
    .from("profiles")
    .select("total_orders")
    .eq("id", userId)
    .single();

  if (error) {
    console.log('Error fetching order:', error.message);
    return;
  }
  const currentNumber = data.total_orders;
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ total_orders: currentNumber + 1 })
    .eq('id', userId);

  if (updateError) {
    console.log('Error updating order:', updateError.message);
  } else {
    console.log('Order number incremented!');
  }
}


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
        <Picker.Item label="Select a protein..." value="" />
        <Picker.Item label="Chicken" value="c" />
        <Picker.Item label="Steak" value="s" />
        <Picker.Item label="Beans" value="b" />
      </Picker>
      <TextField
          placeholder="Please enter what toppings you want"
          value={toppings}
          onChangeText={setToppings}></TextField>
      <Button title = "add order" onPress={addOrder}></Button>
        

  </View>
  );
}
  function setInitialLoading(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

