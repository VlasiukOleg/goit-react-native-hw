import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
} from "react-native";

import PublicAddPhoto from "../../assets/img/public-add-photo.png";
import CameraAddPhotoIcon from "../../assets/img/add-photo-camera.png";
import mapIcon from "../../assets/img/map-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import { useNavigation } from "@react-navigation/native";

import { Camera } from "expo-camera";
import { useState, useEffect } from "react";

export const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const deletePicture = () => {
    setImage(null);
    console.log("Press Delete");
  };

  console.log(image);

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setImage(uri);
    }
  };
  console.log(image);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.photoView}>
        {/* <Image source={PublicAddPhoto}></Image> */}
        {!image ? (
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => setCameraRef(ref)}
          >
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
        ></TextInput>
        <View>
          <TextInput
            style={{ ...styles.input, paddingLeft: 30 }}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
          ></TextInput>
          <Image source={mapIcon} style={styles.mapIcon}></Image>
        </View>

        <TouchableOpacity
          style={{
            ...styles.publicBtn,
            backgroundColor: image ? "#FF6C00" : "#F6F6F6",
          }}
          disabled={image ? false : true}
        >
          <Text style={styles.publicBtn.text}>Опублікувати</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deletePublicIcon}
          onPress={deletePicture}
        >
          <Image source={deleteIcon}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 19,
    paddingVertical: 0,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  camera: { flex: 1 },
  photoView: {
    flex: 0.9,
    backgroundColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
  },
  addCameraPhotoIcon: {
    position: "absolute",
    top: 90,
    left: 141,
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
    // backgroundColor: "#F6F6F6",
    marginTop: 28,
    text: {
      color: "#BDBDBD",
      fontSize: 16,
    },
  },
  deletePublicIcon: {
    marginTop: 60,
    alignItems: "center",
  },
});
