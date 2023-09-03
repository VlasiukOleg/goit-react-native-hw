import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { useEffect, useState } from "react";


import { db } from "../../firebase/config";
import { collection, setDoc, doc, query, onSnapshot, orderBy} from "firebase/firestore";

export const PostCard = ({ image, postName, postLocation, userLocation, postId }) => {
  const navigation = useNavigation();
  const [allComments, setAllComments] = useState([]);


  useEffect(() => {
    getCommentsDataFromDataBase();
  }, [])

  const getCommentsDataFromDataBase = async () => {
    try {
      const q = query(collection(db, `posts/${postId}/comments`), orderBy('date'))
      
      onSnapshot(q, data => {
        setAllComments(data.docs.map(doc => ({...doc.data(), id: doc.id})))
      });
            
    } catch (error) {
      console.log(error);
            throw error;
    }
  }

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={styles.image}>
        <Image source={{ uri: image }} style={{ flex: 1 }} />
      </View>

      <Text style={{ marginTop: 8, marginBottom: 8, }}>
        {postName}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CommentsScreen", {imagePost: image, postId: postId})}
          >
            <Ionicons name="chatbubbles-outline" size={18} color={allComments.length > 0 ? "#FF6C00" : "#BDBDBD"} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 4, color: allComments.length > 0 ? "#000000" : "#BDBDBD" }}>{allComments.length}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() =>
              navigation.navigate("MapScreen", {
                userLocation: userLocation,
              })
            }
          >
            <Ionicons name="location-outline" size={18} color={"#BDBDBD"} />
            <Text>{postLocation}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: 240,
    borderRadius: 10,
    overflow: "hidden",
  },
});
