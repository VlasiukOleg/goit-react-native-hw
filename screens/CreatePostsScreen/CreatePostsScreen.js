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

export const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={PublicAddPhoto}></Image>
        <TouchableOpacity style={styles.addCameraPhotoIcon}>
          <Image source={CameraAddPhotoIcon}></Image>
        </TouchableOpacity>
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

        <TouchableOpacity style={styles.publicBtn} disabled>
          <Text style={styles.publicBtn.text}>Опублікувати</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deletePublicIcon}>
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
    backgroundColor: "#F6F6F6",
    marginTop: 32,
    text: {
      color: "#BDBDBD",
      fontSize: 16,
    },
  },
  deletePublicIcon: {
    marginTop: 120,
    alignItems: "center",
  },
});
