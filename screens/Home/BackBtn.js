import { Image, TouchableOpacity } from "react-native";

import BackIcon from "../../assets/img/arrow-left.png";
import { useNavigation } from "@react-navigation/native";

export const BackBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <Image source={BackIcon}></Image>
    </TouchableOpacity>
  );
};
