import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import colors from "../styles/colors";
import defaultStyles from "../styles/defaultStyles";

//https://chatgpt.com/share/696664fc-b008-800a-ad68-7805715e9211
type propsType = {
  placeholder: string;
  placeholderTextColor?: string;
  borderColor?: string;
  value: string; 
  onChangeText: (newValue: string) => void; 
  style?: object;
  isPassword?: boolean;
};

const TextField: React.FC<propsType> = ({
  placeholder,
  placeholderTextColor = colors.darkbackground,
  borderColor = colors.secondarydark,
  value,
  onChangeText,
  style,
  isPassword = false,
}) => {
   const [isHidden, setIsHidden] = useState(isPassword);
  return (
    <View>
      <TextInput
        style={[defaultStyles.textInputBox, { borderColor: borderColor }, style]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && isHidden}
      />
      {isPassword && (
        <Pressable onPress={() => setIsHidden(prev => !prev)}>
          <Ionicons
            name={isHidden ? "eye-off" : "eye"}
            size={22}
            color={colors.secondarydark}
            style={{ marginLeft: 8 }}
          />
        </Pressable>
      )}
    </View>
  );
};

export default TextField;
