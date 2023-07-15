import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import UserAvatar from "../../assets/img/avatar-image.png";

import mapIcon from "../../assets/img/map-icon.png";
import PostsImageForest from "../../assets/img/posts-image-forest.jpg";
import { useNavigation, useRoute } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";

export const PostsScreen = ({ route }) => {
  const navigation = useNavigation();

  let image = route.params?.imagePosts;
  console.log(image);

  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <Image source={UserAvatar} style={styles.avatar}></Image>
        <View style={styles.userInfo}>
          <Text style={styles.userInfo.name}>Natali Romanov</Text>
          <Text style={styles.userInfo.email}>natali@gmail.com</Text>
        </View>
      </View>
      {/* <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
        <Image source={mapIcon}></Image>
      </TouchableOpacity> */}
      {route.params?.postView && (
        <View style={styles.postCard}>
          <View style={{ width: "100%", height: "55%" }}>
            <Image source={{ uri: image }} style={{ flex: 1 }} />
          </View>

          <Text style={{ marginTop: 8, marginBottom: 8, fontWeight: 700 }}>
            {route.params?.postName}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CommentsScreen")}
              >
                <Ionicons
                  name="chatbubbles-outline"
                  size={18}
                  color={"#BDBDBD"}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 4, color: "#BDBDBD" }}>0</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() =>
                  navigation.navigate("MapScreen", {
                    userLocation: route.params?.userLocation,
                  })
                }
              >
                <Ionicons name="location-outline" size={18} color={"#BDBDBD"} />
                <Text>{route.params?.postLocation}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingTop: 32,
  },
  userWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
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
