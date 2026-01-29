import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, AppState, AppStateStatus, StyleSheet, Text, View } from 'react-native';
import defaultStyles from '../app/styles/defaultStyles';

import { supabase } from '@/utils/supabase';
import colors from '../app/styles/colors';
import Button from './Button';
import TextField from './TextField';

export default function Auth() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("@gmail.com");
    const [password, setPassword] = useState<string>("123456");
    //learned how to check for digits in a password and helped corrcet syntax for if statements 
    //https://chatgpt.com/share/697230ce-7270-800a-b88f-54c11f78eab8
    //Date: 1/22/26

    useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        try {
          supabase.auth.stopAutoRefresh();
        } catch {}
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    if (AppState.currentState === "active") {
      supabase.auth.startAutoRefresh();
    }

    return () => {
      if (typeof subscription?.remove === "function") {
        subscription.remove();
      }
      try {
        supabase.auth.stopAutoRefresh();
      } catch {}
    };
  }, []);

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    }
  }

  async function signUpWithEmail() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    }
  }

    const checkFields = () => {
        console.log(email)
        console.log(password)
        if (email === "" || password === ""){
            console.log("no values for email & password")
            alert("Please enter your email and password");
            return false;
        }
        if (password.length < 6) {
            console.log("password not long enough")
            alert("Password must be at least 6 characters");
            return false;
        }
        if (!/\d/.test(password)) {
            console.log("password has no number")
            alert("Password must contain at least one number");
            return false;
        }
        console.log("You may try to sign up or log in");
        return true;
    }

  const openTabNav = () => {
    if(!checkFields()) 
        return
    if (email != "" && password != "") {
        setEmail(email);
        router.push({ pathname: "/(tabs)/cart", params: { email, password } });
    }
    else    
    alert("Please enter your email and password");
    
    

  };
  return (
    <View style={styles.container}>
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

      <Button title="Login" onPress={signInWithEmail} />
      <Button title="SignUp" onPress={signUpWithEmail} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
  flex: 1,
  alignItems: "center",
  paddingTop: 60,
  backgroundColor: colors.lightbackground,
  justifyContent: "center"
    },
});

