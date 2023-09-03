import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { db } from "../../firebase/config";
import { collection, setDoc, doc, query, onSnapshot, orderBy} from "firebase/firestore";

import { useSelector } from "react-redux";
import { getUserLogin, getUserUID } from "../../redux/auth/selectors";
import { getUserAvatar } from "../../redux/auth/selectors";

import { CommentCard } from "./CommentItem";

export const CommentsScreen = ({route}) => {
  const [comment, setComment] = useState(null);
  const [allComments, setAllComments] = useState([]);

  const image = route.params.imagePost;
  const postId = route.params.postId;

  const userLogin = useSelector(getUserLogin);
  const userAvatar = useSelector(getUserAvatar);
  const userId = useSelector(getUserUID);

  useEffect(() => {
    getCommentsDataFromDataBase();
  }, [])

  const onComment = async () => {
      const commentObjInfo = {
        userLogin,
        userId,
        userAvatar,
        comment,
        date: Date.now(),
      }

      await uploadCommentsToServer(commentObjInfo);

      setComment(null);
  }

  console.log(allComments);

  const uploadCommentsToServer = async (commentObjInfo) => {
    try {
      const commentsRef = doc(collection(db, `posts/${postId}/comments`))
      await setDoc(commentsRef, commentObjInfo);
    } catch (e) {
      console.error('Error adding document: ', e);
        throw e;
    }
      
  }

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
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={{ uri: image }} style={{ flex: 1 }} />
      </View>
      <View style={styles.commentsWrap}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <CommentCard
              userAvatar={item.userAvatar}
              date={item.date}
              comment={item.comment}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            onChangeText={setComment}
            value={comment}
          ></TextInput>
           <TouchableOpacity
          style={{
            ...styles.addCommentBtn,
            backgroundColor: comment ? "#FF6C00" : "#BDBDBD",
          }}
          disabled={comment ? false : true}
          onPress={onComment}
        >
          <Ionicons
            name="arrow-up"
            size={14}
            color={"white"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // justifyContent: "flex-end",6
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
  },
  inputWrap: {
    flex: 0.2,
    justifyContent: "flex-end",
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
  addCommentBtn: {
    width: 34,
    height: 34, 
    borderRadius: 17,
    backgroundColor: "#F6F6F6",
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    right: 8,
    bottom: 22,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 10,
    overflow: "hidden",
  },
  commentsWrap: {
    flex: 1,
    paddingVertical: 10,
  },
});
