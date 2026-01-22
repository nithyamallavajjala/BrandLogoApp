import React from "react";
import { View } from "react-native";
import AppHeader from "./components/AppHeader";
import Auth from "./components/Auth";

export default function Index() {


  return (
    <View style={{ flex: 1 }}>
      <AppHeader></AppHeader>
      <Auth></Auth>
    </View>
  );
}


