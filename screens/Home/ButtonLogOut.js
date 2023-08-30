import { Image, TouchableOpacity } from "react-native";

import logOutIcon from "../../assets/img/log-out-icon.png";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";

export const LogOutBtn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const handleSignOut = async () => {
  //   try {
  //     await signOut(auth);
  //     navigation.navigate("Login");
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const handleSignOut = () => {
    console.log("Press Button");
    dispatch(logOut());
  }

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Image source={logOutIcon}></Image>
    </TouchableOpacity>
  );
};
