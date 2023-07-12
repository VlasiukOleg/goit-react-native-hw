import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import UserAvatar from "../../assets/img/avatar-image.png";

import mapIcon from "../../assets/img/map-icon.png";
import { useNavigation } from "@react-navigation/native";

export const PostsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <Image source={UserAvatar} style={styles.avatar}></Image>
        <View style={styles.userInfo}>
          <Text style={styles.userInfo.name}>Natali Romanov</Text>
          <Text style={styles.userInfo.email}>natali@gmail.com</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
        <Image source={mapIcon}></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  userWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 8,
  },
  userInfo: {
    name: {
      fontSize: 13,
      fontWeight: 700,
    },
    email: {
      fontSize: 11,
    },
  },
});
