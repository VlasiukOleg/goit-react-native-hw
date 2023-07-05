import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import MainBgImage from "../../assets/img/main-bg-image.jpg";

import RegistrationImage from "../../assets/img/registration-bg.png";
import AddPhoto from "../../assets/img/add-photo.png";
import AddPhotoIcon from "../../assets/img/add-icon.png";

export const RegistrationScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground source={MainBgImage} style={styles.image}>
        <Image style={styles.registration} source={RegistrationImage} />
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.btnAdd}>
            <Image source={AddPhotoIcon} style={styles.icon} />
          </TouchableOpacity>

          <Image source={AddPhoto} />

          <Text style={styles.registration_header}>Реєстрація</Text>
          <TextInput
            style={styles.input}
            placeholder="Логін"
            placeholderTextColor="#BDBDBD"
          />
          <TextInput
            style={styles.input}
            placeholder="Адреса електронної пошти"
            placeholderTextColor="#BDBDBD"
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor="#BDBDBD"
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.button.text}>Зареєструватися</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_enter}>
            <Text style={styles.button_enter.text}>Вже є акаунт? Увійти</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  registration: {
    position: "absolute",
    width: 380,
  },
  icon: {
    left: 58,
    bottom: -105,
  },
  btnAdd: {
    zIndex: 10,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  registration_header: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: 500,
    margin: 33,
    marginVertical: 32,
  },
  input: {
    width: 343,
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
  inputWrapper: {
    bottom: 55,
    alignItems: "center",
  },
  button: {
    maxWidth: 343,
    backgroundColor: "#FF6C00",

    paddingVertical: 16,
    paddingHorizontal: 107,
    borderRadius: 25,
    marginTop: 43,
    marginBottom: 16,
    text: {
      color: "#FFFFFF",
      fontSize: 16,
    },
  },
  button_enter: {
    fontSize: 16,

    text: {
      color: "#1B4371",
    },
  },
});
