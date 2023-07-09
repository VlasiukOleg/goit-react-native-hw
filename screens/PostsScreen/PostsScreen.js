import { View, Text, StyleSheet, Image } from "react-native";

import UserAvatar from "../../assets/img/avatar-image.png";

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <Image source={UserAvatar} style={styles.avatar}></Image>
        <View style={styles.userInfo}>
          <Text style={styles.userInfo.name}>Natali Romanov</Text>
          <Text style={styles.userInfo.email}>natali@gmail.com</Text>
        </View>
      </View>
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
