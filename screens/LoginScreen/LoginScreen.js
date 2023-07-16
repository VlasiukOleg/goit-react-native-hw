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

import { useNavigation } from "@react-navigation/native";

import { useForm } from "react-hook-form";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isEmailFocus, setEmailFocus] = useState(false);
  const [isPasswordFocus, setPasswordFocus] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

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

  const showPassword = () => {
    isShowPassword ? setIsShowPassword(false) : setIsShowPassword(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ImageBackground
          source={MainBgImage}
          style={{ ...styles.image, marginBottom: isShowKeyboard ? -120 : 0 }}
        >
          <View
            style={{
              ...styles.form,
              // marginBottom: isShowKeyboard ? -120 : 0,
            }}
          >
            <Text style={styles.formTitle}>Увійти</Text>
            {errors.email && (
              <Text
                style={{
                  color: "red",
                  marginTop: -21,
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
                secureTextEntry={isShowPassword}
                rules={{
                  required: "Пароль обов'язкове поле",
                }}
                errorColorText="red"
              />
              <TouchableOpacity
                style={styles.buttonShowPassword}
                onPress={showPassword}
              >
                <Text style={styles.buttonShowPassword.text}>
                  {isShowPassword ? "Показати" : "Скрити"}
                </Text>
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
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 100,
  },

  button: {
    maxWidth: 343,
    backgroundColor: "#FF6C00",

    paddingVertical: 16,
    paddingHorizontal: 140,
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
