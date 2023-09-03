import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
} from "react-native";

import uuid from "react-native-uuid";

import CameraAddPhotoIcon from "../../assets/img/add-photo-camera.png";
import mapIcon from "../../assets/img/map-icon.png";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";



import * as Location from "expo-location";

import Ionicons from "@expo/vector-icons/Ionicons";

import { storage, auth, db} from "../../firebase/config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";

export const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);

  const [photoName, setPhotoName] = useState("");
  const [photoLocation, setPhotoLocation] = useState("");

  const [location, setLocation] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // !Перенести в takePhoto
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const deletePicture = () => {
    setImage(null);
    setPhotoName("");
    setPhotoLocation("");
  };

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setImage(uri);
    }
  };

  const onPublish = async () => {
    const photoPosts = await  uploadPhotoToStorage();

    let postCardObj = {
      idUser: auth.currentUser.uid,
      postName: photoName,
      postLocation: photoLocation,
      userLocation: JSON.stringify(location),
      imagePosts: photoPosts,
    };

    await uploadPostToDatabase(postCardObj);

    navigation.navigate("Home", {
      postCardInfo: postCardObj,
    });
    setImage(null);
    setPhotoName("");
    setPhotoLocation("");
  };


  const uploadPostToDatabase = async postCardObj => {
      try {
        await addDoc(collection(db, "posts"), postCardObj);
      } catch (e) {
        console.error('Error adding document: ', e);
        throw e;
      }
  }


  const uploadPhotoToStorage =  async () => {
    const blob = await uriToBlob(image);
    const photoId = Date.now().toString();
    const imageRef = ref(storage, `postimage/${photoId}`)

    await uploadBytes(imageRef, blob);

    return await getDownloadURL(imageRef);
   
  }

  const uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);

      xhr.send(null);
    });
  };

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const isActiveBtn = image && photoName && photoLocation;

  return (
    <View style={styles.container}>
      <View style={styles.photoView}>
        {!image ? (
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => setCameraRef(ref)}
          >
            <TouchableOpacity
              style={styles.flipContainer}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addCameraPhotoIcon}
              onPress={() => takePicture()}
            >
              <Image source={CameraAddPhotoIcon}></Image>
            </TouchableOpacity>
          </Camera>
        ) : (
          <Image source={{ uri: image }} style={{ flex: 1 }} />
        )}
      </View>

      <TouchableOpacity style={styles.addPhotoBtn}>
        <Text style={styles.addPhotoBtn.text}>Завантажте фото</Text>
      </TouchableOpacity>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          placeholderTextColor="#BDBDBD"
          onChangeText={setPhotoName}
          value={photoName}
        ></TextInput>
        <View>
          <TextInput
            style={{ ...styles.input, paddingLeft: 30 }}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
            onChangeText={setPhotoLocation}
            value={photoLocation}
          ></TextInput>
          <Image source={mapIcon} style={styles.mapIcon}></Image>
        </View>

        <TouchableOpacity
          style={{
            ...styles.publicBtn,
            backgroundColor: isActiveBtn ? "#FF6C00" : "#F6F6F6",
          }}
          disabled={image ? false : true}
        >
          <Text
            style={{
              ...styles.publicBtn.text,
              color: isActiveBtn ? "white" : "#BDBDBD",
            }}
            onPress={onPublish}
          >
            Опублікувати
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.deletePublicIcon,
            backgroundColor: image ? "#FF6C00" : "#F6F6F6",
          }}
          onPress={deletePicture}
          disabled={image ? false : true}
        >
          <Ionicons
            name="trash-outline"
            size={24}
            color={image ? "white" : "#BDBDBD"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 19,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  camera: { flex: 1 },
  photoView: {
    flex: 0.9,
    backgroundColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
  },
  flipContainer: {
    alignSelf: "flex-end",
  },
  addCameraPhotoIcon: {
    position: "absolute",
    top: "35%",
    left: "42%",
  },
  addPhotoBtn: {
    marginTop: 8,
    marginBottom: 32,
    text: {
      color: "#BDBDBD",
      fontSize: 16,
    },
  },
  input: {
    height: 50,
    marginBottom: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  mapIcon: {
    position: "absolute",
    top: 12,
  },
  publicBtn: {
    paddingVertical: 16,
    paddingHorizontal: 120,
    borderRadius: 25,

    marginTop: 28,
    text: {
      color: "#BDBDBD",
      fontSize: 16,
    },
  },
  deletePublicIcon: {
    width: 70,
    paddingVertical: 8,
    paddingHorizontal: 23,
    marginTop: 60,
    borderRadius: 25,
    backgroundColor: "#F6F6F6",
    left: "40%",
  },
});
