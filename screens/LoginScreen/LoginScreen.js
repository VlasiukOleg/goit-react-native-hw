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
  Alert,
} from "react-native";
import MainBgImage from "../../assets/img/main-bg-image.jpg";

import FormImageBg from "../../assets/img/login-bg.png";

export const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isEmailFocus, setEmailFocus] = useState(false);
  const [isPasswordFocus, setPasswordFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = () => {
    Alert.alert(` ${email}, ${password} `);

    setEmail("");
    setPassword("");
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

            <TextInput
              style={{
                ...styles.input,
                borderColor: isEmailFocus ? "#FF6C00" : "#E8E8E8",
                backgroundColor: isEmailFocus ? "white" : "#F6F6F6",
              }}
              value={email}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#BDBDBD"
              keyboardType="email-address"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              onChangeText={setEmail}
            />
            <View>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isPasswordFocus ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isPasswordFocus ? "white" : "#F6F6F6",
                }}
                value={password}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                secureTextEntry={true}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.buttonShowPassword}>
                <Text style={styles.buttonShowPassword.text}>Показати</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.button.text} onPress={handleSubmit}>
                Увійти
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonEnter}>
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
