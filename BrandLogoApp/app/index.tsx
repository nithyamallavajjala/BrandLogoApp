import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Button from "./components/Button";
import TextField from "./components/TextField";
import defaultStyles from "./styles/defaultStyles";

export default function Index() {
 const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const openTabNav = () => {
    if (email != "" && password != "") {
      setEmail(email);
      router.push({ pathname: "/", params: { email, password } });
    } else alert("Please enter your email and password");
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={defaultStyles.headerText}>Welcome to Taco 'bout It</Text>
    
      <TextField 
        placeholder="Enter your email here" 
        value={email} 
        onChangeText={setEmail} />

      <TextField
        placeholder="Enter your password here"
        value={password}
        onChangeText={setPassword}
        isPassword
      />

      <Button title="Continue" onPress={openTabNav} />
    </View>
  );
}

