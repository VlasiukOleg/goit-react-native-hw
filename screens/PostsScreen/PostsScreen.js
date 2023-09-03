import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import UserAvatar from "../../assets/img/avatar-image.png";

import mapIcon from "../../assets/img/map-icon.png";
import PostsImageForest from "../../assets/img/posts-image-forest.jpg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { getUserAvatar, getUserEmail, getUserLogin } from "../../redux/auth/selectors";

import { PostCard } from "./PostItem";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase/config";
import { getDocs, doc, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";



export const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  const userEmail = useSelector(getUserEmail);
  const userAvatar = useSelector(getUserAvatar);
  const userLogin = useSelector(getUserLogin);


  const getPostDataFromDatabase = async () => {
    try {
      const q = query(collection(db, 'posts'))
      
      onSnapshot(q, data => {
        setPosts(data.docs.map(doc => ({...doc.data(), id: doc.id})))
      });
            
    } catch (error) {
      console.log(error);
            throw error;
    }
  }


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("Login");
      }
      console.log(user);
    });
    getPostDataFromDatabase();
  
    return () => {
      unSubscribe();
    };
  }, []);

  console.log(posts);

  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <Image source={{uri: userAvatar}} style={styles.avatar}></Image>
        <View style={styles.userInfo}>
          <Text style={styles.userInfo.name}>{userLogin}</Text>
          <Text style={styles.userInfo.email}>{userEmail}</Text>
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
              postId={item.id}
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
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 8,
  },
  userInfo: {
    name: {
      fontSize: 13,
      fontWeight: '700',
    },
    email: {
      fontSize: 11,
    },
  },
});
