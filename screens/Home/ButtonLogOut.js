import { Image, TouchableOpacity } from "react-native";

import logOutIcon from "../../assets/img/log-out-icon.png";
import { useNavigation } from "@react-navigation/native";

export const LogOutBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
      <Image source={logOutIcon}></Image>
    </TouchableOpacity>
  );
};
