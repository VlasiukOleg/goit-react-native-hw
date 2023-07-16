import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import UserAvatar from "../../assets/img/avatar-image.png";

import mapIcon from "../../assets/img/map-icon.png";
import PostsImageForest from "../../assets/img/posts-image-forest.jpg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";

import { PostCard } from "./PostItem";

const POSTS = [
  // {
  //   id: "1",
  //   image: PostsImageForest,
  //   postName: "Лісівава",
  //   postLocation: "Україна",
  //   userLocation: JSON.stringify({
  //     latitude: 37.78825,
  //     longitude: -122.4324,
  //   }),
  // },
  // {
  //   id: "2",
  //   image: PostsImageForest,
  //   postName: "Лісммм",
  //   postLocation: "Україна",
  //   userLocation: JSON.stringify({
  //     latitude: 37.78825,
  //     longitude: -122.4324,
  //   }),
  // },
];

export const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState(POSTS);
  const navigation = useNavigation();

  useEffect(() => {
    {
      route.params?.postCardInfo &&
        setPosts([...posts, route.params?.postCardInfo]);
    }
  }, [route.params?.postCardInfo]);

  console.log("params", route.params?.postCardInfo);

  // let postCardInfo = {
  //   id: route.params?.imagePosts,
  //   image: route.params?.imagePosts,
  //   postName: route.params?.postName,
  //   postLocation: route.params?.postLocation,
  //   userLocation: route.params?.userLocation,
  // };

  console.log("State", posts);

  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <Image source={UserAvatar} style={styles.avatar}></Image>
        <View style={styles.userInfo}>
          <Text style={styles.userInfo.name}>Natali Romanov</Text>
          <Text style={styles.userInfo.email}>natali@gmail.com</Text>
        </View>
      </View>
      <View style={styles.postsWrap}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostCard
              image={item.imagePosts}
              postLocation={item.postLocation}
              postName={item.postName}
              userLocation={item.userLocation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
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
  postsWrap: {
    flex: 1,
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
