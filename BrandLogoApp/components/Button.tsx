
import React from "react";
import { Text, TouchableHighlight } from "react-native";
import colors from "../app/styles/colors";
import defaultStyles from "../app/styles/defaultStyles";

type propsType = {
  title: string;
  color?: string;
  onPress: () => void;
};

const Button: React.FC<propsType> = ({
  title,
  color = colors.primarylight,
  onPress,
}) => {
  return (
    <TouchableHighlight
      style={[defaultStyles.button, { backgroundColor: color }]}
      onPress={onPress}
      underlayColor={colors.secondary}
    >
      <Text style={defaultStyles.buttonText}>{title}</Text>
    </TouchableHighlight>
  );
};

export default Button;
