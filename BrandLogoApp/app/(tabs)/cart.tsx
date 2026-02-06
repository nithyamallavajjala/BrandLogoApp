import colors from "@/styles/colors";
import { supabase } from "@/utils/supabase";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import TextField from "../../components/TextField";

export default function CartScreen() {
  const [protein, setProtein] = useState("");
  const [toppings, setToppings] = useState("");

  async function addOrder() {
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
      console.log("Error fetching order:", error.message);
      return;
    }

    const currentNumber = data.total_orders;
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ total_orders: currentNumber + 1 })
      .eq("id", userId);

    if (updateError) {
      console.log("Error updating order:", updateError.message);
    } else {
      console.log("Order number incremented!");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Build Your Taco 🌮</Text>

      <Text style={styles.sectionTitle}>Choose Your Shell</Text>
      <View style={styles.buttonRow}>
        <Button
          title="Hard Shell"
          onPress={() => console.log("Hard Shell pressed")}
        />
        <Button
          title="Soft Shell"
          onPress={() => console.log("Soft Shell pressed")}
        />
      </View>

      <Text style={styles.sectionTitle}>Select Protein</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={protein}
          onValueChange={(itemValue: string) => setProtein(itemValue)}
          style={styles.picker}
          dropdownIconColor={colors.secondarydark}
        >
          <Picker.Item label="Select a protein..." value="" />
          <Picker.Item label="Chicken" value="c" />
          <Picker.Item label="Steak" value="s" />
          <Picker.Item label="Beans" value="b" />
        </Picker>
      </View>

      <Text style={styles.sectionTitle}>Toppings</Text>
      <TextField
        placeholder="Enter toppings you want"
        value={toppings}
        onChangeText={setToppings}
        style={styles.textField}
        placeholderTextColor={colors.mediumgrey}
      />

      <Button title="Add Order" onPress={addOrder} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.lightbackground,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    color: colors.textonlight,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  choiceButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.darkgrey,
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: colors.textondark,
  },
  picker: {
    height: 50,
    width: "100%",
    color: colors.textonlight,
  },
  textField: {
    marginBottom: 20,
    color: colors.textonlight,
  },
  addButton: {
    paddingVertical: 15,
    borderRadius: 8,
  },
});
