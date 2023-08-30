import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";

import { useForm } from "react-hook-form";

import MainBgImage from "../../assets/img/main-bg-image.jpg";
import AddPhoto from "../../assets/img/add-photo.png";
import { useNavigation } from "@react-navigation/native";
import { CustomInput } from "../CustomInput/CustomInput";
import Ionicons from "@expo/vector-icons/Ionicons";

import { auth, storage } from "../../firebase/config";
import { ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { signUp } from "../../redux/auth/operations";

export const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isLoginFocus, setLoginFocus] = useState(false);
  const [isEmailFocus, setEmailFocus] = useState(false);
  const [isPasswordFocus, setPasswordFocus] = useState(false);

  const [avatar, setAvatar] = useState(null);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("HomeScreen");
      }
    });

    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
      unSubscribe();
    };
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });



    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const deleteImage = () => {
    setAvatar(null);
  };



  const onSubmit = async (data) => {
    const userSignUpData = {
      ...data,
      avatar
    }

    dispatch(signUp(userSignUpData));
    
  };

 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ImageBackground
          source={MainBgImage}
          style={{ ...styles.image, marginBottom: isShowKeyboard ? -150 : 0 }}
        >
          <View
            style={{
              ...styles.form,
              // marginBottom: isShowKeyboard ? -100 : 0,
            }}
          >
            <TouchableOpacity
              style={styles.btnAdd}
              onPress={avatar ? deleteImage : pickImage}
            >
              <View style={styles.iconWrap}>
                {avatar ? (
                  <Ionicons
                    name="close-circle-outline"
                    size={32}
                    color={"#E8E8E8"}
                    style={styles.iconClose}
                  />
                ) : (
                  <Ionicons
                    name="add-circle-outline"
                    size={32}
                    color={"#FF6C00"}
                    style={styles.icon}
                  />
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.avatarWrap}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.imageAvatar} />
              ) : (
                <Image source={AddPhoto} style={styles.imageAvatarPlug} />
              )}
            </View>

            <Text style={styles.formTitle}>Реєстрація</Text>
            <CustomInput
              control={control}
              name="login"
              placeholder="Логін"
              isLoginFocus={isLoginFocus}
              setFocus={setLoginFocus}
              rules={{ required: "Логін обов'язкове поле" }}
              errorColorText="red"
            />
            {errors.email && (
              <Text
                style={{
                  color: "red",
                  marginTop: -8,
                  marginBottom: 4,
                  fontSize: 12,
                }}
              >
                Електронна пошта невірна
              </Text>
            )}
            <CustomInput
              control={control}
              name="email"
              placeholder="Адреса електронної пошти"
              isLoginFocus={isEmailFocus}
              setFocus={setEmailFocus}
              rules={{
                required: "Адреса електронної пошти",
                pattern: EMAIL_REGEX,
              }}
              errorColorText="#BDBDBD"
            />

            <View>
              <CustomInput
                control={control}
                name="password"
                placeholder="Пароль"
                isLoginFocus={isPasswordFocus}
                setFocus={setPasswordFocus}
                secureTextEntry={true}
                rules={{
                  required: "Пароль обов'язкове поле",
                }}
                errorColorText="red"
              />
              <TouchableOpacity style={styles.buttonShowPassword}>
                <Text style={styles.buttonShowPassword.text}>Показати</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.button.text} onPress={handleSubmit(onSubmit)}>
                Зареєструватися
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonEnter}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonEnter.text}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  avatarWrap: {
    position: "absolute",
    top: "-13%",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },

  imageAvatarPlug: {},

  imageAvatar: {
    width: 120,
    height: 120,

    alignItems: "center",
  },

  iconWrap: {
    left: "16%",
    bottom: "-40%",
    backgroundColor: "white",
    borderRadius: 50,

    width: 32,
    height: 32,
  },
  iconClose: {
    top: "-5%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    top: "-8%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnAdd: {
    zIndex: 10,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
  },
  formTitle: {
    fontSize: 30,
    textAlign: "center",
    // fontWeight: 500,
    margin: 33,
    marginVertical: 32,
  },

  form: {
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 45,
  },

  button: {
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
  buttonEnter: {
    fontSize: 16,
    alignItems: "center",
    text: {
      color: "#1B4371",
    },
  },
  buttonShowPassword: {
    position: "absolute",
    right: 20,
    top: 13,
    fontSize: 16,
    alignItems: "center",
    text: {
      color: "#1B4371",
    },
  },
});
