import { useEffect } from "react";
import { useState } from "react";

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
import FormImageBg from "../../assets/img/registration-bg.png";
import AddPhoto from "../../assets/img/add-photo.png";
import AddPhotoIcon from "../../assets/img/add-icon.png";
import { useNavigation } from "@react-navigation/native";
import { CustomInput } from "../CustomInput/CustomInput";

export const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isLoginFocus, setLoginFocus] = useState(false);
  const [isEmailFocus, setEmailFocus] = useState(false);
  const [isPasswordFocus, setPasswordFocus] = useState(false);

  const navigation = useNavigation();

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onSubmit = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ImageBackground source={MainBgImage} style={styles.image}>
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? -50 : 45,
            }}
          >
            <Image source={FormImageBg} style={styles.formImageBg} />
            <TouchableOpacity style={styles.btnAdd}>
              <Image source={AddPhotoIcon} style={styles.icon} />
            </TouchableOpacity>

            <Image source={AddPhoto} style={styles.imageAvatar} />

            <Text style={styles.formTitle}>Реєстрація</Text>
            <CustomInput
              control={control}
              name="login"
              placeholder="Логін"
              isLoginFocus={isLoginFocus}
              setFocus={setLoginFocus}
              rules={{ required: "*Логін обов'язкове поле" }}
            />
            {errors.email && (
              <Text style={{ color: "red", marginTop: -14, marginBottom: 4 }}>
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
  formImageBg: {
    position: "absolute",
    bottom: -55,
  },
  imageAvatar: {
    alignItems: "center",
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
    resizeMode: "contain",
    justifyContent: "flex-end",
  },
  formTitle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: 500,
    margin: 33,
    marginVertical: 32,
  },

  form: {
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
