import { ImageBackground } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";

import MainBgImage from "../../assets/img/main-bg-image.jpg";
import AddPhoto from "../../assets/img/add-photo.png";

import { useSelector } from "react-redux";

import { getUserAvatar } from "../../redux/auth/selectors";

export const ProfileScreen = () => {
  const avatar = useSelector(getUserAvatar);


  return (

    <ImageBackground source={MainBgImage} style={styles.container}>
        <View style={styles.postsWrap}></View>
        <View style={styles.avatarWrap}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.imageAvatar} />
              ) : (
                <Image source={AddPhoto} style={styles.imageAvatarPlug} />
              )}
            </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postsWrap: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 145,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  avatarWrap: {
    position: "absolute",
    top: "11%",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
  },

  imageAvatarPlug: {},

  imageAvatar: {
    width: 120,
    height: 120,

    alignItems: "center",
  },
});
