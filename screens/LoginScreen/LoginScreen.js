import { useEffect } from "react";
import { useState } from "react";

import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { CustomInput } from "../CustomInput/CustomInput";
import MainBgImage from "../../assets/img/main-bg-image.jpg";

import FormImageBg from "../../assets/img/login-bg.png";
import { useNavigation } from "@react-navigation/native";

import { useForm } from "react-hook-form";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isEmailFocus, setEmailFocus] = useState(false);
  const [isPasswordFocus, setPasswordFocus] = useState(false);

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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
    reset();
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
              marginBottom: isShowKeyboard ? -25 : 120,
            }}
          >
            <Image source={FormImageBg} style={styles.formImageBg} />

            <Text style={styles.formTitle}>Увійти</Text>
            {errors.email && (
              <Text style={{ color: "red", marginTop: -24, marginBottom: 4 }}>
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
                Увійти
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonEnter}
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.buttonEnter.text}>
                Немає акаунту? Зареєструватися
              </Text>
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
    bottom: -130,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formTitle: {
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
  form: {
    alignItems: "center",
  },

  button: {
    maxWidth: 343,
    backgroundColor: "#FF6C00",

    paddingVertical: 16,
    paddingHorizontal: 145,
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
